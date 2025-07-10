<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends BaseApiController
{
    /**
     * Get user profile
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function profile(Request $request): JsonResponse
    {
        $user = $request->user();
        $user->load(['lessons', 'bookings', 'reviews']);

        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'avatar_path' => $user->avatar_path,
            'bio' => $user->bio,
            'language_preference' => $user->language_preference,
            'timezone' => $user->timezone,
            'ekyc_status' => $user->ekyc_status,
            'stats' => [
                'total_lessons' => $user->lessons->count(),
                'total_bookings' => $user->bookings->count(),
                'total_reviews' => $user->reviews->count(),
                'average_rating' => $user->reviews->avg('rating') ?? 0,
            ],
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ];

        return $this->sendResponse($data);
    }

    /**
     * Update user profile
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'bio' => 'nullable|string|max:1000',
            'language_preference' => 'sometimes|in:ja,vi,en',
            'timezone' => 'sometimes|string|max:50',
            'avatar' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        $updateData = $request->only(['name', 'bio', 'language_preference', 'timezone']);

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }

            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $updateData['avatar_path'] = $avatarPath;
        }

        $user->update($updateData);

        return $this->sendResponse([
            'id' => $user->id,
            'name' => $user->name,
            'bio' => $user->bio,
            'avatar_path' => $user->avatar_path,
            'language_preference' => $user->language_preference,
            'timezone' => $user->timezone,
        ], 'Profile updated successfully');
    }

    /**
     * Update password
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updatePassword(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return $this->sendError('Current password is incorrect', [], 400);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return $this->sendResponse([], 'Password updated successfully');
    }

    /**
     * Submit eKYC documents (for teachers)
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function submitEkyc(Request $request): JsonResponse
    {
        $user = $request->user();

        // Chỉ cho phép giáo viên xác thực eKYC
        if ($user->role !== 'teacher') {
            return $this->sendError('Chỉ giáo viên mới được xác thực eKYC', [], 403);
        }

        $validator = Validator::make($request->all(), [
            'document_type'   => 'required|in:passport,national_id,driver_license',
            'document_number' => 'required|string|max:50',
            'document_front'  => 'required|image|mimes:jpeg,png,jpg|max:5120',
            'document_back'   => 'sometimes|image|mimes:jpeg,png,jpg|max:5120',
            'selfie'          => 'required|image|mimes:jpeg,png,jpg|max:5120',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        // Lưu file vào storage
        $frontPath = $request->file('document_front')->store('ekyc/documents', 'public');
        $selfiePath = $request->file('selfie')->store('ekyc/selfies', 'public');
        $backPath = $request->hasFile('document_back')
            ? $request->file('document_back')->store('ekyc/documents', 'public')
            : null;

        // Lưu thông tin vào trường json 'ekyc_data'
        $user->update([
            'ekyc_status' => 'pending',
            'ekyc_data' => [
                'document_type' => $request->document_type,
                'document_number' => $request->document_number,
                'document_front_path' => $frontPath,
                'document_back_path' => $backPath,
                'selfie_path' => $selfiePath,
                'submitted_at' => now(),
            ]
        ]);

        return $this->sendResponse([
            'ekyc_status' => $user->ekyc_status,
            'ekyc_data' => $user->ekyc_data,
        ], 'Đã gửi hồ sơ eKYC, vui lòng chờ duyệt.');
    }

    /**
     * Update user's eKYC status (Admin only)
     *
     * @param Request $request
     * @param User $user
     * @return JsonResponse
     */
    public function updateEkycStatus(Request $request, User $user): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:verified,rejected',
            'reason' => 'required_if:status,rejected|string|max:500',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        // Cập nhật trạng thái eKYC
        $updateData = ['ekyc_status' => $request->status];

        // Nếu từ chối, lưu lý do vào ekyc_data
        if ($request->status === 'rejected' && $request->reason) {
            $ekycData = $user->ekyc_data ?? [];
            $ekycData['rejection_reason'] = $request->reason;
            $ekycData['rejected_at'] = now();
            $updateData['ekyc_data'] = $ekycData;
        }

        $user->update($updateData);

        // TODO: Gửi notification/email cho user

        return $this->sendResponse([
            'id' => $user->id,
            'name' => $user->name,
            'ekyc_status' => $user->ekyc_status,
        ], 'Đã cập nhật trạng thái eKYC thành công.');
    }

    /**
     * Get instructors list (public endpoint)
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function instructors(Request $request): JsonResponse
    {
        $query = User::where('role', 'instructor')
            ->where('ekyc_status', 'verified')
            ->with(['lessons' => function ($q) {
                $q->where('status', 'approved')->take(3);
            }]);

        // Search by name
        if ($request->has('search') && !empty($request->search)) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by category (through lessons)
        if ($request->has('category_id')) {
            $query->whereHas('lessons', function ($q) use ($request) {
                $q->where('category_id', $request->category_id)
                  ->where('status', 'approved');
            });
        }

        // Sort options
        $sortBy = $request->get('sort_by', 'name');
        $sortOrder = $request->get('sort_order', 'asc');

        switch ($sortBy) {
            case 'rating':
                $query->withAvg('receivedReviews', 'rating')
                      ->orderBy('received_reviews_avg_rating', $sortOrder);
                break;
            case 'lessons_count':
                $query->withCount(['lessons' => function ($q) {
                    $q->where('status', 'approved');
                }])->orderBy('lessons_count', $sortOrder);
                break;
            default:
                $query->orderBy($sortBy, $sortOrder);
        }

        $instructors = $query->paginate(20);

        $transformedInstructors = $instructors->getCollection()->map(function ($instructor) {
            return [
                'id' => $instructor->id,
                'name' => $instructor->name,
                'avatar_path' => $instructor->avatar_path,
                'bio' => $instructor->bio,
                'language_preference' => $instructor->language_preference,
                'stats' => [
                    'total_lessons' => $instructor->lessons->count(),
                    'average_rating' => $instructor->receivedReviews->avg('rating') ?? 0,
                    'total_reviews' => $instructor->receivedReviews->count(),
                ],
                'recent_lessons' => $instructor->lessons->map(function ($lesson) {
                    return [
                        'id' => $lesson->id,
                        'title' => $lesson->title,
                        'price' => $lesson->price,
                        'cover_image_path' => $lesson->cover_image_path,
                    ];
                }),
                'created_at' => $instructor->created_at,
            ];
        });

        $data = [
            'instructors' => $transformedInstructors,
            'pagination' => [
                'current_page' => $instructors->currentPage(),
                'last_page' => $instructors->lastPage(),
                'per_page' => $instructors->perPage(),
                'total' => $instructors->total(),
            ],
        ];

        return $this->sendResponse($data);
    }

    /**
     * Get instructor profile (public endpoint)
     *
     * @param User $instructor
     * @return JsonResponse
     */
    public function instructorProfile(User $instructor): JsonResponse
    {
        if ($instructor->role !== 'instructor' || $instructor->ekyc_status !== 'verified') {
            return $this->sendError('Instructor not found or not verified', [], 404);
        }

        $instructor->load([
            'lessons' => function ($q) {
                $q->where('status', 'approved')->latest()->take(10);
            },
            'receivedReviews' => function ($q) {
                $q->latest()->take(5);
            },
            'receivedReviews.user'
        ]);

        $data = [
            'id' => $instructor->id,
            'name' => $instructor->name,
            'avatar_path' => $instructor->avatar_path,
            'bio' => $instructor->bio,
            'language_preference' => $instructor->language_preference,
            'stats' => [
                'total_lessons' => $instructor->lessons->count(),
                'average_rating' => $instructor->receivedReviews->avg('rating') ?? 0,
                'total_reviews' => $instructor->receivedReviews->count(),
                'total_students' => $instructor->lessons->sum(function ($lesson) {
                    return $lesson->schedules->sum('bookings_count');
                }),
            ],
            'lessons' => $instructor->lessons->map(function ($lesson) {
                return [
                    'id' => $lesson->id,
                    'title' => $lesson->title,
                    'description' => $lesson->description,
                    'price' => $lesson->price,
                    'duration_minutes' => $lesson->duration_minutes,
                    'cover_image_path' => $lesson->cover_image_path,
                    'category' => $lesson->category->name,
                    'created_at' => $lesson->created_at,
                ];
            }),
            'reviews' => $instructor->receivedReviews->map(function ($review) {
                return [
                    'id' => $review->id,
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'user' => [
                        'name' => $review->user->name,
                        'avatar_path' => $review->user->avatar_path,
                    ],
                    'created_at' => $review->created_at,
                ];
            }),
            'created_at' => $instructor->created_at,
        ];

        return $this->sendResponse($data);
    }

    /**
     * Delete user account
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteAccount(Request $request): JsonResponse
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'confirmation' => 'required|in:DELETE_MY_ACCOUNT',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        if (!Hash::check($request->password, $user->password)) {
            return $this->sendError('Password is incorrect', [], 400);
        }

        // Check for active bookings
        $activeBookings = $user->bookings()->whereIn('status', ['pending', 'confirmed'])->count();
        if ($activeBookings > 0) {
            return $this->sendError('Cannot delete account with active bookings', [], 409);
        }

        // For instructors, check for active lessons
        if ($user->role === 'instructor') {
            $activeLessons = $user->lessons()->where('status', 'approved')->count();
            if ($activeLessons > 0) {
                return $this->sendError('Cannot delete account with active lessons', [], 409);
            }
        }

        // Delete user data
        $user->tokens()->delete(); // Delete all tokens
        $user->delete();

        return $this->sendResponse([], 'Account deleted successfully');
    }
}
