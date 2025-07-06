<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'reviewer_id',
        'reviewee_id',
        'rating',
        'comment',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    /**
     * Get the booking this review belongs to
     */
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    /**
     * Get the user who wrote this review
     */
    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    /**
     * Get the user who received this review
     */
    public function reviewee()
    {
        return $this->belongsTo(User::class, 'reviewee_id');
    }

    /**
     * Scope to get reviews by rating
     */
    public function scopeByRating($query, $rating)
    {
        return $query->where('rating', $rating);
    }

    /**
     * Scope to get high-rated reviews (4-5 stars)
     */
    public function scopeHighRated($query)
    {
        return $query->where('rating', '>=', 4);
    }

    /**
     * Scope to get low-rated reviews (1-2 stars)
     */
    public function scopeLowRated($query)
    {
        return $query->where('rating', '<=', 2);
    }
}
