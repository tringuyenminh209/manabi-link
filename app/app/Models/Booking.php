<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'lesson_schedule_id',
        'learner_id',
        'status',
        'price',
        'platform_fee',
        'final_amount',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'platform_fee' => 'decimal:2',
        'final_amount' => 'decimal:2',
    ];

    /**
     * Get the schedule for this booking
     */
    public function schedule()
    {
        return $this->belongsTo(LessonSchedule::class, 'lesson_schedule_id');
    }

    /**
     * Get the learner who made this booking
     */
    public function learner()
    {
        return $this->belongsTo(User::class, 'learner_id');
    }

    /**
     * Get the lesson through schedule
     */
    public function lesson()
    {
        return $this->hasOneThrough(
            Lesson::class,
            LessonSchedule::class,
            'id',
            'id',
            'lesson_schedule_id',
            'lesson_id'
        );
    }

    /**
     * Get the payment for this booking
     */
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    /**
     * Get the reviews for this booking
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Scope to get confirmed bookings
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    /**
     * Scope to get completed bookings
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Calculate platform fee (15-20%)
     */
    public function calculatePlatformFee($percentage = 15)
    {
        return $this->price * ($percentage / 100);
    }
}
