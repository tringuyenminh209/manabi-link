<?php

namespace App\Services;

use App\Models\Plan;
use App\Models\Subscription;
use App\Models\User;
use Stripe\StripeClient;
use Illuminate\Support\Facades\URL;

class SubscriptionService
{
    protected ?StripeClient $stripe = null;

    public function getStripe(): StripeClient
    {
        if ($this->stripe === null) {
            $secret = config('services.stripe.secret');
            $this->stripe = new StripeClient($secret ?: 'sk_test_dummy');
        }
        return $this->stripe;
    }

    /**
     * Create Stripe Checkout session and pending subscription.
     */
    public function createCheckout(User $user, Plan $plan): string
    {
        // create pending subscription row
        $subscription = Subscription::create([
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'status' => 'pending',
        ]);

        $session = $this->getStripe()->checkout->sessions->create([
            'mode' => 'subscription',
            'line_items' => [[
                'price' => $plan->stripe_price_id,
                'quantity' => 1,
            ]],
            'customer_email' => $user->email,
            'metadata' => [
                'subscription_id' => $subscription->id,
                'user_id' => $user->id,
            ],
            'success_url' => URL::to('/subscription/success?session_id={CHECKOUT_SESSION_ID}'),
            'cancel_url' => URL::to('/subscription/cancel'),
        ]);

        $subscription->update(['stripe_subscription_id' => $session->subscription ?? null]);

        return $session->url;
    }

    /**
     * Handle Stripe webhook events for subscription
     */
    public function handleWebhook(array $payload): void
    {
        $type = $payload['type'] ?? '';
        $data = $payload['data']['object'] ?? [];
        $sessionId = $data['id'] ?? null;
        $metadata = $data['metadata'] ?? [];
        $subId = $metadata['subscription_id'] ?? null;
        if (!$subId) return;

        $subscription = Subscription::find($subId);
        if (!$subscription) return;

        switch ($type) {
            case 'checkout.session.completed':
                $subscription->update([
                    'status' => 'active',
                    'stripe_subscription_id' => $data['subscription'] ?? null,
                ]);
                break;
            case 'invoice.payment_failed':
                $subscription->update(['status' => 'past_due']);
                break;
            case 'customer.subscription.deleted':
                $subscription->update(['status' => 'cancelled', 'ends_at' => now()]);
                break;
        }
    }
}
