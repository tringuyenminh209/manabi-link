<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Scout\Searchable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'date_of_birth',
        'country',
        'location',
        'address',
        'password',
        'role',
        'avatar_path',
        'bio',
        'ekyc_status',
        'ekyc_data',
        'language_preference',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'ekyc_data' => 'array',
    ];

    /**
     * Get the lessons created by this teacher
     */
    public function lessons()
    {
        return $this->hasMany(Lesson::class, 'teacher_id');
    }

    /**
     * Get the bookings made by this learner
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class, 'learner_id');
    }

    /**
     * Get the reviews written by this user
     */
    public function reviewsGiven()
    {
        return $this->hasMany(Review::class, 'reviewer_id');
    }

    /**
     * Get the reviews received by this user
     */
    public function reviewsReceived()
    {
        return $this->hasMany(Review::class, 'reviewee_id');
    }

    /**
     * Get the messages sent by this user
     */
    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    /**
     * Get the messages received by this user
     */
    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    /**
     * Get the notifications for this user
     */
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    /**
     * Check if user is a teacher
     */
    public function isTeacher()
    {
        return $this->role === 'teacher';
    }

    /**
     * Check if user is an admin
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is a learner
     */
    public function isLearner()
    {
        return $this->role === 'learner';
    }

    /**
     * Data gửi lên search index (chỉ index instructor đã verified)
     */
    public function toSearchableArray(): array
    {
        if ($this->role !== 'instructor' || $this->ekyc_status !== 'verified') {
            return [];
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'bio' => $this->bio,
            'language_preference' => $this->language_preference ?? 'ja',
            'created_at' => $this->created_at,
        ];
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class)->withPivot('role')->withTimestamps();
    }
}
