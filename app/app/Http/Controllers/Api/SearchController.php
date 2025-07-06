<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Lesson;
use App\Models\User;

class SearchController extends BaseApiController
{
    /**
     * Global search across lessons and instructors
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $query = $request->get('q');
        $type = $request->get('type', 'all'); // lessons, instructors, or all
        $language = $this->getPreferredLanguage();

        if (!$query || strlen($query) < 2) {
            return $this->sendError('Query must be at least 2 characters', [], 422);
        }

        $results = [];

        if ($type === 'all' || $type === 'lessons') {
            $lessons = Lesson::search($query)->take(10)->get();
            $results['lessons'] = $lessons->map(function ($lesson) use ($language) {
                return [
                    'id' => $lesson->id,
                    'title' => $this->getLocalizedField($lesson, 'title', $language),
                    'price' => $lesson->price,
                    'cover_image_path' => $lesson->cover_image_path,
                    'category_id' => $lesson->category_id,
                ];
            });
        }

        if ($type === 'all' || $type === 'instructors') {
            $instructors = User::search($query)->take(10)->get();
            $results['instructors'] = $instructors->map(function ($instructor) {
                return [
                    'id' => $instructor->id,
                    'name' => $instructor->name,
                    'avatar_path' => $instructor->avatar_path,
                    'bio' => $instructor->bio,
                ];
            });
        }

        return $this->sendResponse($results);
    }

    /**
     * Helper to get localized field using Translatable trait if available
     */
    private function getLocalizedField($model, string $field, string $lang)
    {
        if (method_exists($model, 'getTranslation')) {
            return $model->getTranslation($field, $lang);
        }

        return $model->{$field};
    }
}
