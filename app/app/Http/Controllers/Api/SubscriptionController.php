<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Plan;
use App\Models\Subscription;
use App\Services\SubscriptionService;

class SubscriptionController extends BaseApiController
{
    public function plans(): JsonResponse
    {
        $plans = Plan::where('is_active', true)->get();
        return $this->sendResponse($plans);
    }

    public function subscribe(Request $request, SubscriptionService $subs): JsonResponse
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        $user = $request->user();
        if ($user->role !== 'instructor') {
            return $this->sendError('Only instructors can subscribe', [], 403);
        }

        $plan = Plan::findOrFail($request->plan_id);

        $url = $subs->createCheckout($user, $plan);
        return $this->sendResponse(['checkout_url' => $url]);
    }

    public function current(Request $request): JsonResponse
    {
        $sub = Subscription::where('user_id', $request->user()->id)->where('status', 'active')->first();
        return $this->sendResponse($sub);
    }

    public function webhook(Request $request, SubscriptionService $subs)
    {
        $payload = $request->getContent();
        $sig = $request->header('Stripe-Signature');
        try {
            $event = \Stripe\Webhook::constructEvent($payload, $sig, config('stripe.webhook_secret'));
        } catch (\Exception $e) {
            return response('Invalid', 400);
        }
        $subs->handleWebhook($event->toArray());
        return response('ok');
    }
}
