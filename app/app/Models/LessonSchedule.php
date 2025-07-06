<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'lesson_id',
        'start_time',
        'end_time',
        'status',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    /**
     * Get the lesson this schedule belongs to
     */
    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    /**
     * Get the booking for this schedule
     */
    public function booking()
    {
        return $this->hasOne(Booking::class);
    }

    /**
     * Scope to get only available schedules
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    /**
     * Scope to get upcoming schedules
     */
    public function scopeUpcoming($query)
    {
        return $query->where('start_time', '>', now());
    }

    /**
     * Mark this schedule as booked
     */
    public function markAsBooked()
    {
        $this->update(['status' => 'booked']);
    }

    /**
     * Mark this schedule as available
     */
    public function markAsAvailable()
    {
        $this->update(['status' => 'available']);
    }
}
