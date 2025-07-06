<?php

namespace App\Http\Controllers\Api;

use App\Models\Booking;
use App\Models\LessonSchedule;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class BookingController extends BaseApiController
{
    /**
     * Get user's bookings
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = Booking::with(['schedule.lesson.instructor', 'schedule.lesson.category'])
            ->where('user_id', $user->id);

        // Filter by status
        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        // Filter by date range
        if ($request->has('start_date')) {
            $query->whereHas('schedule', function ($q) use ($request) {
                $q->where('scheduled_at', '>=', $request->start_date);
            });
        }
        if ($request->has('end_date')) {
            $query->whereHas('schedule', function ($q) use ($request) {
                $q->where('scheduled_at', '<=', $request->end_date);
            });
        }

        $bookings = $query->orderBy('created_at', 'desc')->paginate(20);

        $transformedBookings = $bookings->getCollection()->map(function ($booking) {
            return [
                'id' => $booking->id,
                'status' => $booking->status,
                'booking_code' => $booking->booking_code,
                'total_amount' => $booking->total_amount,
                'lesson' => [
                    'id' => $booking->schedule->lesson->id,
                    'title' => $booking->schedule->lesson->title,
                    'cover_image_path' => $booking->schedule->lesson->cover_image_path,
                    'category' => $booking->schedule->lesson->category->name,
                    'instructor' => [
                        'id' => $booking->schedule->lesson->instructor->id,
                        'name' => $booking->schedule->lesson->instructor->name,
                        'avatar_path' => $booking->schedule->lesson->instructor->avatar_path,
                    ],
                ],
                'schedule' => [
                    'id' => $booking->schedule->id,
                    'scheduled_at' => $booking->schedule->scheduled_at,
                    'duration_minutes' => $booking->schedule->duration_minutes,
                    'meeting_url' => $booking->schedule->meeting_url,
                    'location' => $booking->schedule->location,
                ],
                'created_at' => $booking->created_at,
                'updated_at' => $booking->updated_at,
            ];
        });

        $data = [
            'bookings' => $transformedBookings,
            'pagination' => [
                'current_page' => $bookings->currentPage(),
                'last_page' => $bookings->lastPage(),
                'per_page' => $bookings->perPage(),
                'total' => $bookings->total(),
            ],
        ];

        return $this->sendResponse($data);
    }

    /**
     * Store a newly created booking
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'schedule_id' => 'required|exists:lesson_schedules,id',
            'notes' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        $schedule = LessonSchedule::with('lesson')->find($request->schedule_id);

        // Check if schedule is available
        if ($schedule->status !== 'available') {
            return $this->sendError('Schedule is not available for booking', [], 409);
        }

        // Check if there are available slots
        if ($schedule->available_slots <= 0) {
            return $this->sendError('No available slots for this schedule', [], 409);
        }

        // Check if user already booked this schedule
        $existingBooking = Booking::where('user_id', $request->user()->id)
            ->where('schedule_id', $request->schedule_id)
            ->whereIn('status', ['pending', 'confirmed'])
            ->exists();

        if ($existingBooking) {
            return $this->sendError('You have already booked this schedule', [], 409);
        }

        // Check if schedule is in the future
        if ($schedule->scheduled_at <= now()) {
            return $this->sendError('Cannot book past schedules', [], 409);
        }

        DB::beginTransaction();
        try {
            // Create booking
            $booking = Booking::create([
                'user_id' => $request->user()->id,
                'schedule_id' => $request->schedule_id,
                'booking_code' => $this->generateBookingCode(),
                'total_amount' => $schedule->lesson->price,
                'status' => 'pending',
                'notes' => $request->notes,
            ]);

            // Decrease available slots
            $schedule->decrement('available_slots');

            // Update schedule status if full
            if ($schedule->available_slots <= 0) {
                $schedule->update(['status' => 'full']);
            }

            // Notify instructor
            $instructor = $schedule->lesson->instructor;
            $instructor->notify(new \App\Notifications\BookingCreatedNotification($booking));

            DB::commit();

            $data = [
                'id' => $booking->id,
                'booking_code' => $booking->booking_code,
                'status' => $booking->status,
                'total_amount' => $booking->total_amount,
                'lesson_title' => $schedule->lesson->title,
                'scheduled_at' => $schedule->scheduled_at,
            ];

            return $this->sendResponse($data, 'Booking created successfully. Please proceed to payment.', 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Failed to create booking', [], 500);
        }
    }

    /**
     * Display the specified booking
     *
     * @param Booking $booking
     * @return JsonResponse
     */
    public function show(Request $request, Booking $booking): JsonResponse
    {
        // Check if booking belongs to the user
        if ($booking->user_id !== $request->user()->id) {
            return $this->sendError('Unauthorized', [], 403);
        }

        $booking->load(['schedule.lesson.instructor', 'schedule.lesson.category', 'payment']);

        $data = [
            'id' => $booking->id,
            'booking_code' => $booking->booking_code,
            'status' => $booking->status,
            'total_amount' => $booking->total_amount,
            'notes' => $booking->notes,
            'lesson' => [
                'id' => $booking->schedule->lesson->id,
                'title' => $booking->schedule->lesson->title,
                'description' => $booking->schedule->lesson->description,
                'cover_image_path' => $booking->schedule->lesson->cover_image_path,
                'category' => $booking->schedule->lesson->category->name,
                'instructor' => [
                    'id' => $booking->schedule->lesson->instructor->id,
                    'name' => $booking->schedule->lesson->instructor->name,
                    'avatar_path' => $booking->schedule->lesson->instructor->avatar_path,
                    'bio' => $booking->schedule->lesson->instructor->bio,
                ],
            ],
            'schedule' => [
                'id' => $booking->schedule->id,
                'scheduled_at' => $booking->schedule->scheduled_at,
                'duration_minutes' => $booking->schedule->duration_minutes,
                'meeting_url' => $booking->schedule->meeting_url,
                'location' => $booking->schedule->location,
            ],
            'payment' => $booking->payment ? [
                'id' => $booking->payment->id,
                'amount' => $booking->payment->amount,
                'status' => $booking->payment->status,
                'payment_method' => $booking->payment->payment_method,
                'paid_at' => $booking->payment->paid_at,
            ] : null,
            'created_at' => $booking->created_at,
            'updated_at' => $booking->updated_at,
        ];

        return $this->sendResponse($data);
    }

    /**
     * Cancel a booking
     *
     * @param Request $request
     * @param Booking $booking
     * @return JsonResponse
     */
    public function cancel(Request $request, Booking $booking): JsonResponse
    {
        // Check if booking belongs to the user
        if ($booking->user_id !== $request->user()->id) {
            return $this->sendError('Unauthorized', [], 403);
        }

        // Check if booking can be cancelled
        if (!in_array($booking->status, ['pending', 'confirmed'])) {
            return $this->sendError('Booking cannot be cancelled', [], 409);
        }

        // Check cancellation policy (e.g., at least 24 hours before)
        $schedule = $booking->schedule;
        $hoursUntilSchedule = now()->diffInHours($schedule->scheduled_at, false);

        if ($hoursUntilSchedule < 24) {
            return $this->sendError('Cannot cancel booking less than 24 hours before the scheduled time', [], 409);
        }

        DB::beginTransaction();
        try {
            // Update booking status
            $booking->update(['status' => 'cancelled']);

            // Increase available slots
            $schedule->increment('available_slots');

            // Update schedule status if it was full
            if ($schedule->status === 'full') {
                $schedule->update(['status' => 'available']);
            }

            // Handle refund if payment was made
            if ($booking->payment && $booking->payment->status === 'completed') {
                // TODO: Implement refund logic
                $booking->payment->update(['status' => 'refunded']);
            }

            DB::commit();

            return $this->sendResponse([
                'id' => $booking->id,
                'status' => $booking->status,
            ], 'Booking cancelled successfully');

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Failed to cancel booking', [], 500);
        }
    }

    /**
     * Get booking statistics for user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function stats(Request $request): JsonResponse
    {
        $user = $request->user();

        $stats = [
            'total_bookings' => Booking::where('user_id', $user->id)->count(),
            'confirmed_bookings' => Booking::where('user_id', $user->id)->where('status', 'confirmed')->count(),
            'completed_bookings' => Booking::where('user_id', $user->id)->where('status', 'completed')->count(),
            'cancelled_bookings' => Booking::where('user_id', $user->id)->where('status', 'cancelled')->count(),
            'total_spent' => Booking::where('user_id', $user->id)
                ->where('status', 'completed')
                ->sum('total_amount'),
        ];

        return $this->sendResponse($stats);
    }

    /**
     * Generate unique booking code
     *
     * @return string
     */
    private function generateBookingCode(): string
    {
        do {
            $code = 'BK' . strtoupper(uniqid());
        } while (Booking::where('booking_code', $code)->exists());

        return $code;
    }
}
