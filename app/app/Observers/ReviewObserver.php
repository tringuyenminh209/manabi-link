<?php

namespace App\Observers;

use App\Models\Review;

class ReviewObserver
{
    public function created(Review $review): void
    {
        $this->recalculate($review);
    }

    public function deleted(Review $review): void
    {
        $this->recalculate($review);
    }

    public function updated(Review $review): void
    {
        $this->recalculate($review);
    }

    private function recalculate(Review $review): void
    {
        $lesson = $review->booking->schedule->lesson;
        $lesson->average_rating = $lesson->reviews()->avg('rating') ?? 0;
        $lesson->review_count = $lesson->reviews()->count();
        $lesson->save();

        $instructor = $lesson->instructor;
        $instructor->average_rating = Review::where('reviewee_id', $instructor->id)->avg('rating') ?? 0;
        $instructor->review_count = Review::where('reviewee_id', $instructor->id)->count();
        $instructor->save();
    }
}
