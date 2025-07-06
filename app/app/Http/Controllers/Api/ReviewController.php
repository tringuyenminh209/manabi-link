<?php

namespace App\Http\Controllers\Api;

use App\Models\Booking;
use App\Models\Review;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class ReviewController extends BaseApiController
{
    /**
     * Create a review for a completed booking
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'booking_id' => 'required|exists:bookings,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        $booking = Booking::with(['schedule.lesson'])->findOrFail($request->booking_id);

        // Must be the learner
        if ($booking->user_id !== $request->user()->id) {
            return $this->sendError('Unauthorized', [], 403);
        }

        // Booking must be completed
        if ($booking->status !== 'completed') {
            return $this->sendError('You can only review completed lessons', [], 409);
        }

        // Check existing review
        if (Review::where('booking_id', $booking->id)->where('reviewer_id', $request->user()->id)->exists()) {
            return $this->sendError('You have already reviewed this booking', [], 409);
        }

        $lesson = $booking->schedule->lesson;
        $instructor = $lesson->instructor;

        $review = Review::create([
            'booking_id' => $booking->id,
            'reviewer_id' => $request->user()->id,
            'reviewee_id' => $instructor->id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return $this->sendResponse([
            'id' => $review->id,
            'rating' => $review->rating,
            'comment' => $review->comment,
        ], 'Review submitted successfully', 201);
    }

    /**
     * Get reviews for a lesson (public)
     */
    public function lessonReviews(Lesson $lesson, Request $request): JsonResponse
    {
        $reviews = Review::whereHas('booking.schedule', function ($q) use ($lesson) {
            $q->where('lesson_id', $lesson->id);
        })->with('reviewer')->latest()->paginate(10);

        return $this->sendResponse($reviews);
    }

    /**
     * Get reviews for an instructor (public)
     */
    public function instructorReviews(User $instructor, Request $request): JsonResponse
    {
        if ($instructor->role !== 'instructor') {
            return $this->sendError('User is not an instructor', [], 404);
        }

        $reviews = Review::where('reviewee_id', $instructor->id)->with('reviewer', 'booking')->latest()->paginate(10);

        return $this->sendResponse($reviews);
    }
}
