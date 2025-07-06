<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Payment;
use Stripe\StripeClient;
use Illuminate\Support\Facades\Log;

class PaymentService
{
    protected ?StripeClient $stripe = null;

    public function getStripe(): StripeClient
    {
        if ($this->stripe === null) {
            $secret = config('services.stripe.secret');
            // Fallback dummy key to avoid route:list errors if not set yet
            $this->stripe = new StripeClient($secret ?: 'sk_test_dummy');
        }
        return $this->stripe;
    }

    /**
     * Create a Stripe PaymentIntent for a booking and return client_secret
     */
    public function createPaymentIntent(Booking $booking): string
    {
        $intent = $this->getStripe()->paymentIntents->create([
            'amount' => (int) ($booking->total_amount * 100),
            'currency' => $booking->currency ?? 'jpy',
            'metadata' => [
                'booking_id' => $booking->id,
                'user_id' => $booking->user_id,
            ],
            'automatic_payment_methods' => ['enabled' => true],
        ]);

        // Create payment record (pending)
        Payment::create([
            'booking_id' => $booking->id,
            'amount' => $booking->total_amount,
            'currency' => $booking->currency ?? 'JPY',
            'status' => 'pending',
            'payment_gateway' => 'stripe',
            'transaction_id' => $intent->id,
        ]);

        return $intent->client_secret;
    }

    /**
     * Handle Stripe webhook events
     */
    public function handleWebhook(array $payload): void
    {
        $eventType = $payload['type'] ?? '';
        $data = $payload['data']['object'] ?? [];

        $paymentIntentId = $data['id'] ?? null;
        if (!$paymentIntentId) {
            return;
        }

        $payment = Payment::where('transaction_id', $paymentIntentId)->first();
        if (!$payment) {
            return;
        }

        switch ($eventType) {
            case 'payment_intent.succeeded':
                $payment->markAsSucceeded();
                $payment->booking()->update(['status' => 'confirmed']);
                break;
            case 'payment_intent.payment_failed':
                $payment->markAsFailed();
                $payment->booking()->update(['status' => 'pending']);
                break;
            case 'charge.refunded':
                $payment->markAsRefunded();
                $payment->booking()->update(['status' => 'refunded']);
                break;
            default:
                Log::info('Unhandled Stripe event', ['type' => $eventType]);
        }
    }
}
