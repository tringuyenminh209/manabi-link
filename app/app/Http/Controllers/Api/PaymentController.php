<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Booking;
use App\Services\PaymentService;
use Illuminate\Support\Facades\Log;

class PaymentController extends BaseApiController
{
    protected PaymentService $payments;

    public function __construct(PaymentService $payments)
    {
        $this->payments = $payments;
    }

    /**
     * Create PaymentIntent and return client_secret
     */
    public function intent(Request $request): JsonResponse
    {
        $request->validate([
            'booking_id' => 'required|exists:bookings,id',
        ]);

        $booking = Booking::findOrFail($request->booking_id);

        // Authorization: only booking owner
        if ($booking->user_id !== $request->user()->id) {
            return $this->sendError('Unauthorized', [], 403);
        }

        // Only create intent if booking pending
        if ($booking->status !== 'pending') {
            return $this->sendError('Booking already paid or invalid status', [], 409);
        }

        $clientSecret = $this->payments->createPaymentIntent($booking);

        return $this->sendResponse(['client_secret' => $clientSecret]);
    }

    /**
     * Stripe webhook endpoint
     */
    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sigHeader,
                config('stripe.webhook_secret')
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            return response('Invalid payload', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            return response('Invalid signature', 400);
        }

        // Handle event
        $this->payments->handleWebhook($event->toArray());

        return response('Webhook handled', 200);
    }
}
