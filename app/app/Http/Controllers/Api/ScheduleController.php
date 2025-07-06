<?php

namespace App\Http\Controllers\Api;

use App\Models\LessonSchedule;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ScheduleController extends BaseApiController
{
    /**
     * Get schedules for instructor's lessons
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = LessonSchedule::with(['lesson'])
            ->whereHas('lesson', function ($q) use ($user) {
                $q->where('instructor_id', $user->id);
            });

        // Filter by status
        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        // Filter by date range
        if ($request->has('start_date')) {
            $query->where('scheduled_at', '>=', $request->start_date);
        }
        if ($request->has('end_date')) {
            $query->where('scheduled_at', '<=', $request->end_date);
        }

        // Filter by lesson
        if ($request->has('lesson_id')) {
            $query->where('lesson_id', $request->lesson_id);
        }

        $schedules = $query->orderBy('scheduled_at', 'asc')->paginate(20);

        $transformedSchedules = $schedules->getCollection()->map(function ($schedule) {
            return [
                'id' => $schedule->id,
                'lesson_id' => $schedule->lesson_id,
                'lesson_title' => $schedule->lesson->title,
                'scheduled_at' => $schedule->scheduled_at,
                'duration_minutes' => $schedule->duration_minutes,
                'max_students' => $schedule->max_students,
                'available_slots' => $schedule->available_slots,
                'status' => $schedule->status,
                'meeting_url' => $schedule->meeting_url,
                'location' => $schedule->location,
                'created_at' => $schedule->created_at,
            ];
        });

        $data = [
            'schedules' => $transformedSchedules,
            'pagination' => [
                'current_page' => $schedules->currentPage(),
                'last_page' => $schedules->lastPage(),
                'per_page' => $schedules->perPage(),
                'total' => $schedules->total(),
            ],
        ];

        return $this->sendResponse($data);
    }

    /**
     * Store a newly created schedule
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'lesson_id' => 'required|exists:lessons,id',
            'scheduled_at' => 'required|date|after:now',
            'duration_minutes' => 'required|integer|min:30|max:480',
            'max_students' => 'required|integer|min:1|max:50',
            'meeting_url' => 'nullable|url',
            'location' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        // Check if lesson belongs to the instructor
        $lesson = Lesson::where('id', $request->lesson_id)
            ->where('instructor_id', $request->user()->id)
            ->first();

        if (!$lesson) {
            return $this->sendError('Lesson not found or you are not authorized', [], 404);
        }

        // Check for scheduling conflicts
        $conflictingSchedule = LessonSchedule::where('lesson_id', $request->lesson_id)
            ->where('status', '!=', 'cancelled')
            ->where(function ($query) use ($request) {
                $startTime = Carbon::parse($request->scheduled_at);
                $endTime = $startTime->copy()->addMinutes($request->duration_minutes);

                $query->whereBetween('scheduled_at', [$startTime, $endTime])
                      ->orWhere(function ($q) use ($startTime, $endTime) {
                          $q->where('scheduled_at', '<=', $startTime)
                            ->whereRaw('DATE_ADD(scheduled_at, INTERVAL duration_minutes MINUTE) >= ?', [$startTime]);
                      });
            })
            ->exists();

        if ($conflictingSchedule) {
            return $this->sendError('Schedule conflict detected. Please choose a different time.', [], 409);
        }

        $schedule = LessonSchedule::create([
            'lesson_id' => $request->lesson_id,
            'scheduled_at' => $request->scheduled_at,
            'duration_minutes' => $request->duration_minutes,
            'max_students' => $request->max_students,
            'available_slots' => $request->max_students, // Initially all slots are available
            'status' => 'available',
            'meeting_url' => $request->meeting_url,
            'location' => $request->location,
        ]);

        return $this->sendResponse([
            'id' => $schedule->id,
            'lesson_id' => $schedule->lesson_id,
            'scheduled_at' => $schedule->scheduled_at,
            'status' => $schedule->status,
        ], 'Schedule created successfully', 201);
    }

    /**
     * Display the specified schedule
     *
     * @param LessonSchedule $schedule
     * @return JsonResponse
     */
    public function show(Request $request, LessonSchedule $schedule): JsonResponse
    {
        // Check if schedule belongs to the instructor
        if ($schedule->lesson->instructor_id !== $request->user()->id) {
            return $this->sendError('Unauthorized', [], 403);
        }

        $schedule->load(['lesson', 'bookings.user']);

        $data = [
            'id' => $schedule->id,
            'lesson' => [
                'id' => $schedule->lesson->id,
                'title' => $schedule->lesson->title,
                'duration_minutes' => $schedule->lesson->duration_minutes,
            ],
            'scheduled_at' => $schedule->scheduled_at,
            'duration_minutes' => $schedule->duration_minutes,
            'max_students' => $schedule->max_students,
            'available_slots' => $schedule->available_slots,
            'status' => $schedule->status,
            'meeting_url' => $schedule->meeting_url,
            'location' => $schedule->location,
            'bookings' => $schedule->bookings->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'user' => [
                        'id' => $booking->user->id,
                        'name' => $booking->user->name,
                        'email' => $booking->user->email,
                    ],
                    'status' => $booking->status,
                    'created_at' => $booking->created_at,
                ];
            }),
            'created_at' => $schedule->created_at,
        ];

        return $this->sendResponse($data);
    }

    /**
     * Update the specified schedule
     *
     * @param Request $request
     * @param LessonSchedule $schedule
     * @return JsonResponse
     */
    public function update(Request $request, LessonSchedule $schedule): JsonResponse
    {
        // Check if schedule belongs to the instructor
        if ($schedule->lesson->instructor_id !== $request->user()->id) {
            return $this->sendError('Unauthorized', [], 403);
        }

        $validator = Validator::make($request->all(), [
            'scheduled_at' => 'sometimes|date|after:now',
            'duration_minutes' => 'sometimes|integer|min:30|max:480',
            'max_students' => 'sometimes|integer|min:1|max:50',
            'status' => 'sometimes|in:available,full,cancelled,completed',
            'meeting_url' => 'nullable|url',
            'location' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        // Don't allow updates if there are confirmed bookings and trying to change time
        if ($request->has('scheduled_at') && $schedule->bookings()->where('status', 'confirmed')->exists()) {
            return $this->sendError('Cannot change schedule time when there are confirmed bookings', [], 409);
        }

        $schedule->update($request->only([
            'scheduled_at', 'duration_minutes', 'max_students',
            'status', 'meeting_url', 'location'
        ]));

        return $this->sendResponse([
            'id' => $schedule->id,
            'status' => $schedule->status,
            'scheduled_at' => $schedule->scheduled_at,
        ], 'Schedule updated successfully');
    }

    /**
     * Remove the specified schedule
     *
     * @param Request $request
     * @param LessonSchedule $schedule
     * @return JsonResponse
     */
    public function destroy(Request $request, LessonSchedule $schedule): JsonResponse
    {
        // Check if schedule belongs to the instructor
        if ($schedule->lesson->instructor_id !== $request->user()->id) {
            return $this->sendError('Unauthorized', [], 403);
        }

        // Don't allow deletion if there are confirmed bookings
        if ($schedule->bookings()->where('status', 'confirmed')->exists()) {
            return $this->sendError('Cannot delete schedule with confirmed bookings', [], 409);
        }

        // Cancel any pending bookings
        $schedule->bookings()->where('status', 'pending')->update(['status' => 'cancelled']);

        $schedule->delete();

        return $this->sendResponse([], 'Schedule deleted successfully');
    }

    /**
     * Get available schedules for a lesson (public endpoint)
     *
     * @param Lesson $lesson
     * @return JsonResponse
     */
    public function availableForLesson(Lesson $lesson): JsonResponse
    {
        $schedules = LessonSchedule::where('lesson_id', $lesson->id)
            ->where('status', 'available')
            ->where('scheduled_at', '>', now())
            ->where('available_slots', '>', 0)
            ->orderBy('scheduled_at')
            ->get();

        $data = $schedules->map(function ($schedule) {
            return [
                'id' => $schedule->id,
                'scheduled_at' => $schedule->scheduled_at,
                'duration_minutes' => $schedule->duration_minutes,
                'available_slots' => $schedule->available_slots,
                'location' => $schedule->location,
            ];
        });

        return $this->sendResponse($data);
    }
}
