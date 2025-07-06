<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\LessonRecommendation;

class RecommendationController extends BaseApiController
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $recs = LessonRecommendation::with('lesson.category')
            ->where('user_id', $user->id)
            ->orderByDesc('score')
            ->get();

        $data = $recs->map(function ($rec) {
            return [
                'lesson_id' => $rec->lesson_id,
                'title' => $rec->lesson->title,
                'price' => $rec->lesson->price,
                'cover_image_path' => $rec->lesson->cover_image_path,
                'category' => $rec->lesson->category->name ?? null,
                'score' => $rec->score,
            ];
        });

        return $this->sendResponse($data);
    }
}
