<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\Translatable;
use Laravel\Scout\Searchable;

class Lesson extends Model
{
    use HasFactory, SoftDeletes, Translatable, Searchable;

    protected $fillable = [
        'title',
        'description',
        'content',
        'instructor_id',
        'category_id',
        'price',
        'duration_minutes',
        'max_students',
        'difficulty_level',
        'language',
        'cover_image_path',
        'video_preview_path',
        'status',
        'is_featured',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'duration_minutes' => 'integer',
        'max_students' => 'integer',
        'is_featured' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    // Define translatable fields
    protected $translatable = ['title', 'description', 'content'];

    // Status constants
    const STATUS_DRAFT = 'draft';
    const STATUS_PENDING = 'pending';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';

    // Difficulty levels
    const DIFFICULTY_BEGINNER = 'beginner';
    const DIFFICULTY_INTERMEDIATE = 'intermediate';
    const DIFFICULTY_ADVANCED = 'advanced';

    /**
     * Get the instructor that owns the lesson
     */
    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    /**
     * Get the category that owns the lesson
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the lesson schedules for the lesson
     */
    public function schedules(): HasMany
    {
        return $this->hasMany(LessonSchedule::class);
    }

    /**
     * Get the bookings for the lesson
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Get the reviews for the lesson
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Scope for approved lessons
     */
    public function scopeApproved($query)
    {
        return $query->where('status', self::STATUS_APPROVED);
    }

    /**
     * Scope for featured lessons
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope for lessons by difficulty
     */
    public function scopeByDifficulty($query, $difficulty)
    {
        return $query->where('difficulty_level', $difficulty);
    }

    /**
     * Get average rating
     */
    public function getAverageRatingAttribute()
    {
        return $this->reviews()->avg('rating') ?? 0;
    }

    /**
     * Get total students count
     */
    public function getTotalStudentsAttribute()
    {
        return $this->bookings()->where('status', 'confirmed')->count();
    }

    /**
     * Specify data to be indexed for search
     */
    public function toSearchableArray(): array
    {
        // Ensure only approved lessons được index
        if ($this->status !== self::STATUS_APPROVED) {
            return [];
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category_id' => $this->category_id,
            'price' => $this->price,
            'difficulty_level' => $this->difficulty_level,
            'language' => $this->language,
            'instructor_id' => $this->instructor_id,
            'created_at' => $this->created_at,
        ];
    }
}
