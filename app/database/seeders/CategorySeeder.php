<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Music',
                'slug' => 'music',
                'description' => 'Learn musical instruments and music theory',
                'icon' => 'music',
                'is_active' => true,
            ],
            [
                'name' => 'Language',
                'slug' => 'language',
                'description' => 'Foreign language learning courses',
                'icon' => 'language',
                'is_active' => true,
            ],
            [
                'name' => 'Art',
                'slug' => 'art',
                'description' => 'Drawing, painting, and digital art courses',
                'icon' => 'palette',
                'is_active' => true,
            ],
            [
                'name' => 'Technology',
                'slug' => 'technology',
                'description' => 'Programming, web development, and IT skills',
                'icon' => 'code',
                'is_active' => true,
            ],
            [
                'name' => 'Cooking',
                'slug' => 'cooking',
                'description' => 'Culinary arts and cooking techniques',
                'icon' => 'chef-hat',
                'is_active' => true,
            ],
            [
                'name' => 'Sports',
                'slug' => 'sports',
                'description' => 'Physical fitness and sports training',
                'icon' => 'activity',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $categoryData) {
            $category = Category::create($categoryData);

            // Add translations for each category
            $this->addTranslations($category);
        }
    }

    private function addTranslations($category)
    {
        $translations = [
            'Music' => [
                'ja' => ['name' => '音楽', 'description' => '楽器演奏と音楽理論を学ぶ'],
                'vi' => ['name' => 'Âm nhạc', 'description' => 'Học nhạc cụ và lý thuyết âm nhạc'],
                'en' => ['name' => 'Music', 'description' => 'Learn musical instruments and music theory'],
            ],
            'Language' => [
                'ja' => ['name' => '言語', 'description' => '外国語学習コース'],
                'vi' => ['name' => 'Ngôn ngữ', 'description' => 'Khóa học ngoại ngữ'],
                'en' => ['name' => 'Language', 'description' => 'Foreign language learning courses'],
            ],
            'Art' => [
                'ja' => ['name' => '芸術', 'description' => '絵画、描画、デジタルアートコース'],
                'vi' => ['name' => 'Nghệ thuật', 'description' => 'Khóa học vẽ tranh và nghệ thuật số'],
                'en' => ['name' => 'Art', 'description' => 'Drawing, painting, and digital art courses'],
            ],
            'Technology' => [
                'ja' => ['name' => 'テクノロジー', 'description' => 'プログラミング、ウェブ開発、ITスキル'],
                'vi' => ['name' => 'Công nghệ', 'description' => 'Lập trình, phát triển web và kỹ năng IT'],
                'en' => ['name' => 'Technology', 'description' => 'Programming, web development, and IT skills'],
            ],
            'Cooking' => [
                'ja' => ['name' => '料理', 'description' => '料理芸術と調理技術'],
                'vi' => ['name' => 'Nấu ăn', 'description' => 'Nghệ thuật ẩm thực và kỹ thuật nấu ăn'],
                'en' => ['name' => 'Cooking', 'description' => 'Culinary arts and cooking techniques'],
            ],
            'Sports' => [
                'ja' => ['name' => 'スポーツ', 'description' => '体力づくりとスポーツトレーニング'],
                'vi' => ['name' => 'Thể thao', 'description' => 'Rèn luyện thể lực và huấn luyện thể thao'],
                'en' => ['name' => 'Sports', 'description' => 'Physical fitness and sports training'],
            ],
        ];

        if (isset($translations[$category->name])) {
            foreach ($translations[$category->name] as $locale => $data) {
                $category->setTranslation('name', $locale, $data['name']);
                $category->setTranslation('description', $locale, $data['description']);
            }
        }
    }
}
