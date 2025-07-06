<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CategoryController extends BaseApiController
{
    /**
     * Display a listing of categories
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $language = $this->getPreferredLanguage();

        $categories = Category::withCount('lessons')
            ->orderBy('name', 'asc')
            ->get()
            ->map(function ($category) use ($language) {
                // Prepare multilingual response
                return [
                    'id' => $category->id,
                    'name' => $this->getLocalizedName($category, $language),
                    'description' => $this->getLocalizedDescription($category, $language),
                    'lessons_count' => $category->lessons_count,
                    'created_at' => $category->created_at,
                ];
            });

        return $this->sendResponse($categories);
    }

    /**
     * Display the specified category
     *
     * @param Category $category
     * @return JsonResponse
     */
    public function show(Category $category): JsonResponse
    {
        $language = $this->getPreferredLanguage();

        $category->loadCount('lessons');

        $data = [
            'id' => $category->id,
            'name' => $this->getLocalizedName($category, $language),
            'description' => $this->getLocalizedDescription($category, $language),
            'lessons_count' => $category->lessons_count,
            'created_at' => $category->created_at,
        ];

        return $this->sendResponse($data);
    }

    /**
     * Get localized category name
     * TODO: Implement proper i18n when translation tables are ready
     */
    private function getLocalizedName($category, $language)
    {
        // Temporary implementation - will be replaced with proper i18n
        $names = [
            'music' => ['ja' => '音楽', 'vi' => 'Âm nhạc', 'en' => 'Music'],
            'language' => ['ja' => '言語', 'vi' => 'Ngôn ngữ', 'en' => 'Language'],
            'art' => ['ja' => '芸術', 'vi' => 'Nghệ thuật', 'en' => 'Art'],
            'technology' => ['ja' => 'テクノロジー', 'vi' => 'Công nghệ', 'en' => 'Technology'],
            'cooking' => ['ja' => '料理', 'vi' => 'Nấu ăn', 'en' => 'Cooking'],
            'sports' => ['ja' => 'スポーツ', 'vi' => 'Thể thao', 'en' => 'Sports'],
        ];

        $categoryKey = strtolower($category->name);
        return $names[$categoryKey][$language] ?? $category->name;
    }

    /**
     * Get localized category description
     * TODO: Implement proper i18n when translation tables are ready
     */
    private function getLocalizedDescription($category, $language)
    {
        // For now, return the original description
        // Will implement proper translation later
        return $category->description;
    }
}
