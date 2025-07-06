<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'amount',
        'currency',
        'status',
        'payment_gateway',
        'transaction_id',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    /**
     * Get the booking this payment belongs to
     */
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    /**
     * Scope to get successful payments
     */
    public function scopeSucceeded($query)
    {
        return $query->where('status', 'succeeded');
    }

    /**
     * Scope to get failed payments
     */
    public function scopeFailed($query)
    {
        return $query->where('status', 'failed');
    }

    /**
     * Scope to get refunded payments
     */
    public function scopeRefunded($query)
    {
        return $query->where('status', 'refunded');
    }

    /**
     * Mark payment as succeeded
     */
    public function markAsSucceeded()
    {
        $this->update(['status' => 'succeeded']);
    }

    /**
     * Mark payment as failed
     */
    public function markAsFailed()
    {
        $this->update(['status' => 'failed']);
    }

    /**
     * Mark payment as refunded
     */
    public function markAsRefunded()
    {
        $this->update(['status' => 'refunded']);
    }
}
