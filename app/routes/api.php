<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\RecommendationController;
use App\Http\Controllers\Api\SubscriptionController;
use App\Http\Controllers\Api\CompanyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API routes
Route::prefix('v1')->group(function () {
    // Authentication routes
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    // Public content routes
    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('categories/{category}', [CategoryController::class, 'show']);
    Route::get('lessons', [LessonController::class, 'index']);
    Route::get('lessons/featured', [LessonController::class, 'featured']);
    Route::get('lessons/{lesson}', [LessonController::class, 'show']);
    Route::get('lessons/{lesson}/schedules', [ScheduleController::class, 'availableForLesson']);
    Route::get('search', [SearchController::class, 'index']);
    Route::get('lessons/{lesson}/reviews', [ReviewController::class, 'lessonReviews']);
    Route::get('instructors/{instructor}/reviews', [ReviewController::class, 'instructorReviews']);
    Route::get('plans', [SubscriptionController::class, 'plans']);

    // Public instructor routes
    Route::get('instructors', [UserController::class, 'instructors']);
    Route::get('instructors/{instructor}', [UserController::class, 'instructorProfile']);

    // Protected routes (require authentication)
    Route::middleware('auth:sanctum')->group(function () {
        // Auth management
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('logout-all', [AuthController::class, 'logoutAll']);
        Route::get('me', [AuthController::class, 'me']);

        // User profile management
        Route::get('profile', [UserController::class, 'profile']);
        Route::put('profile', [UserController::class, 'updateProfile']);
        Route::put('profile/password', [UserController::class, 'updatePassword']);
        Route::post('profile/ekyc', [UserController::class, 'submitEkyc']);
        Route::delete('profile/delete', [UserController::class, 'deleteAccount']);

        // Booking management (learners)
        Route::prefix('bookings')->group(function () {
            Route::get('/', [BookingController::class, 'index']);
            Route::post('/', [BookingController::class, 'store']);
            Route::get('stats', [BookingController::class, 'stats']);
            Route::get('{booking}', [BookingController::class, 'show']);
            Route::put('{booking}/cancel', [BookingController::class, 'cancel']);
        });

        // Instructor-only routes
        Route::middleware(['role:instructor', 'ekyc'])->group(function () {
            // Lesson management
            Route::post('lessons', [LessonController::class, 'store']);
            Route::put('lessons/{lesson}', [LessonController::class, 'update']);
            Route::delete('lessons/{lesson}', [LessonController::class, 'destroy']);

            // Schedule management
            Route::prefix('schedules')->group(function () {
                Route::get('/', [ScheduleController::class, 'index']);
                Route::post('/', [ScheduleController::class, 'store']);
                Route::get('{schedule}', [ScheduleController::class, 'show']);
                Route::put('{schedule}', [ScheduleController::class, 'update']);
                Route::delete('{schedule}', [ScheduleController::class, 'destroy']);
            });

            // Subscription management
            Route::post('subscribe', [SubscriptionController::class, 'subscribe']);
            Route::get('subscription', [SubscriptionController::class, 'current']);
        });

        // Admin-only routes
        Route::middleware('role:admin')->group(function () {
            // Admin lesson management
            Route::put('admin/lessons/{lesson}/approve', [LessonController::class, 'approve']);
            Route::put('admin/lessons/{lesson}/reject', [LessonController::class, 'reject']);

            // Admin user management
            Route::get('admin/users', [UserController::class, 'adminIndex']);
            Route::put('admin/users/{user}/ekyc-status', [UserController::class, 'updateEkycStatus']);
            Route::put('admin/users/{user}/role', [UserController::class, 'updateRole']);

            // Admin category management
            Route::post('admin/categories', [CategoryController::class, 'store']);
            Route::put('admin/categories/{category}', [CategoryController::class, 'update']);
            Route::delete('admin/categories/{category}', [CategoryController::class, 'destroy']);
        });

        // Payment
        Route::post('payments/intent', [PaymentController::class, 'intent']);

        // Review management (learners)
        Route::post('reviews', [ReviewController::class, 'store']);

        // Recommendation management
        Route::get('recommendations', [RecommendationController::class, 'index']);

        // Platform admin routes
        Route::get('/companies', [CompanyController::class, 'index']);
        Route::post('/companies', [CompanyController::class, 'store']);
    });

    // Webhook (no auth)
    Route::post('webhooks/stripe', [PaymentController::class, 'webhook']);

    // Subscription webhook
    Route::post('webhooks/stripe/subscription', [SubscriptionController::class, 'webhook']);

    // Company admin routes
    Route::middleware('company.admin')->group(function () {
        Route::get('/companies/{company}', [CompanyController::class, 'show']);
    });
});
