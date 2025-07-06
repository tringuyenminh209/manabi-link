<?php

namespace App\Http\Controllers\Api;

use App\Models\Lesson;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class LessonController extends BaseApiController
{
    /**
     * Display a listing of lessons with search and filters
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $language = $this->getPreferredLanguage();

        $query = Lesson::with(['instructor', 'category'])
            ->approved()
            ->latest();

        // Search by title or description
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        // Filter by category
        if ($request->has('category_id') && !empty($request->category_id)) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by difficulty level
        if ($request->has('difficulty') && !empty($request->difficulty)) {
            $query->where('difficulty_level', $request->difficulty);
        }

        // Filter by price range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Filter by language
        if ($request->has('language') && !empty($request->language)) {
            $query->where('language', $request->language);
        }

        // Filter by instructor
        if ($request->has('instructor_id') && !empty($request->instructor_id)) {
            $query->where('instructor_id', $request->instructor_id);
        }

        // Sort options
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');

        switch ($sortBy) {
            case 'price':
                $query->orderBy('price', $sortOrder);
                break;
            case 'rating':
                $query->withAvg('reviews', 'rating')
                      ->orderBy('reviews_avg_rating', $sortOrder);
                break;
            case 'popularity':
                $query->withCount('bookings')
                      ->orderBy('bookings_count', $sortOrder);
                break;
            default:
                $query->orderBy('created_at', $sortOrder);
        }

        // Pagination
        $perPage = min($request->get('per_page', 15), 50); // Max 50 items per page
        $lessons = $query->paginate($perPage);

        // Transform data with translations
        $transformedLessons = $lessons->getCollection()->map(function ($lesson) use ($language) {
            return [
                'id' => $lesson->id,
                'title' => $lesson->getLocalizedAttribute('title', $language),
                'description' => $lesson->getLocalizedAttribute('description', $language),
                'price' => $lesson->price,
                'duration_minutes' => $lesson->duration_minutes,
                'max_students' => $lesson->max_students,
                'difficulty_level' => $lesson->difficulty_level,
                'language' => $lesson->language,
                'cover_image_path' => $lesson->cover_image_path,
                'is_featured' => $lesson->is_featured,
                'average_rating' => round($lesson->average_rating, 1),
                'total_students' => $lesson->total_students,
                'instructor' => [
                    'id' => $lesson->instructor->id,
                    'name' => $lesson->instructor->name,
                    'avatar_path' => $lesson->instructor->avatar_path,
                ],
                'category' => [
                    'id' => $lesson->category->id,
                    'name' => $lesson->category->getLocalizedAttribute('name', $language),
                ],
                'created_at' => $lesson->created_at,
            ];
        });

        $data = [
            'lessons' => $transformedLessons,
            'pagination' => [
                'current_page' => $lessons->currentPage(),
                'last_page' => $lessons->lastPage(),
                'per_page' => $lessons->perPage(),
                'total' => $lessons->total(),
                'from' => $lessons->firstItem(),
                'to' => $lessons->lastItem(),
            ],
        ];

        return $this->sendResponse($data);
    }

    /**
     * Display the specified lesson
     *
     * @param Lesson $lesson
     * @return JsonResponse
     */
    public function show(Lesson $lesson): JsonResponse
    {
        $language = $this->getPreferredLanguage();

        $lesson->load(['instructor', 'category', 'schedules' => function ($query) {
            $query->where('status', 'available')
                  ->where('scheduled_at', '>', now())
                  ->orderBy('scheduled_at');
        }]);

        $data = [
            'id' => $lesson->id,
            'title' => $lesson->getLocalizedAttribute('title', $language),
            'description' => $lesson->getLocalizedAttribute('description', $language),
            'content' => $lesson->getLocalizedAttribute('content', $language),
            'price' => $lesson->price,
            'duration_minutes' => $lesson->duration_minutes,
            'max_students' => $lesson->max_students,
            'difficulty_level' => $lesson->difficulty_level,
            'language' => $lesson->language,
            'cover_image_path' => $lesson->cover_image_path,
            'video_preview_path' => $lesson->video_preview_path,
            'is_featured' => $lesson->is_featured,
            'average_rating' => round($lesson->average_rating, 1),
            'total_students' => $lesson->total_students,
            'instructor' => [
                'id' => $lesson->instructor->id,
                'name' => $lesson->instructor->name,
                'avatar_path' => $lesson->instructor->avatar_path,
                'bio' => $lesson->instructor->bio,
            ],
            'category' => [
                'id' => $lesson->category->id,
                'name' => $lesson->category->getLocalizedAttribute('name', $language),
                'description' => $lesson->category->getLocalizedAttribute('description', $language),
            ],
            'available_schedules' => $lesson->schedules->map(function ($schedule) {
                return [
                    'id' => $schedule->id,
                    'scheduled_at' => $schedule->scheduled_at,
                    'available_slots' => $schedule->available_slots,
                ];
            }),
            'created_at' => $lesson->created_at,
        ];

        return $this->sendResponse($data);
    }

    /**
     * Store a newly created lesson (Instructor only)
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'duration_minutes' => 'required|integer|min:30|max:480', // 30 min to 8 hours
            'max_students' => 'required|integer|min:1|max:50',
            'difficulty_level' => 'required|in:beginner,intermediate,advanced',
            'language' => 'required|in:ja,vi,en',
            'cover_image' => 'sometimes|image|mimes:jpeg,png,jpg|max:5120', // 5MB max
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        $lesson = new Lesson($request->only([
            'title', 'description', 'content', 'category_id', 'price',
            'duration_minutes', 'max_students', 'difficulty_level', 'language'
        ]));

        $lesson->instructor_id = $request->user()->id;
        $lesson->status = Lesson::STATUS_PENDING; // Needs approval

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            $coverImagePath = $request->file('cover_image')->store('lessons/covers', 'public');
            $lesson->cover_image_path = $coverImagePath;
        }

        $lesson->save();

        return $this->sendResponse([
            'id' => $lesson->id,
            'title' => $lesson->title,
            'status' => $lesson->status,
        ], 'Lesson created successfully. It will be reviewed by our team.', 201);
    }

    /**
     * Get featured lessons
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function featured(Request $request): JsonResponse
    {
        $language = $this->getPreferredLanguage();
        $limit = min($request->get('limit', 8), 20); // Max 20 featured lessons

        $lessons = Lesson::with(['instructor', 'category'])
            ->approved()
            ->featured()
            ->latest()
            ->limit($limit)
            ->get();

        $transformedLessons = $lessons->map(function ($lesson) use ($language) {
            return [
                'id' => $lesson->id,
                'title' => $lesson->getLocalizedAttribute('title', $language),
                'description' => $lesson->getLocalizedAttribute('description', $language),
                'price' => $lesson->price,
                'cover_image_path' => $lesson->cover_image_path,
                'average_rating' => round($lesson->average_rating, 1),
                'total_students' => $lesson->total_students,
                'instructor' => [
                    'id' => $lesson->instructor->id,
                    'name' => $lesson->instructor->name,
                    'avatar_path' => $lesson->instructor->avatar_path,
                ],
                'category' => [
                    'id' => $lesson->category->id,
                    'name' => $lesson->category->getLocalizedAttribute('name', $language),
                ],
            ];
        });

        return $this->sendResponse($transformedLessons);
    }
}
