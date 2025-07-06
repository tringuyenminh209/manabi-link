<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonRecommendation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lesson_id',
        'score',
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}
