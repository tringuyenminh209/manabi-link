<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use App\Models\LessonRecommendation;
use Illuminate\Support\Facades\DB;

class GenerateRecommendations extends Command
{
    protected $signature = 'recommend:generate';

    protected $description = 'Generate lesson recommendations for users (collaborative filtering MVP)';

    public function handle(): void
    {
        $this->info('Generating recommendations...');

        // Simple algorithm: recommend top 5 most booked lessons not yet booked by user
        $topLessons = Booking::select('schedule_id', DB::raw('count(*) as cnt'))
            ->groupBy('schedule_id')
            ->orderByDesc('cnt')
            ->take(50)
            ->pluck('schedule_id');

        $lessons = DB::table('lesson_schedules')->whereIn('id', $topLessons)->pluck('lesson_id')->unique();

        $users = DB::table('users')->pluck('id');

        foreach ($users as $userId) {
            // lessons user already booked
            $booked = Booking::where('user_id', $userId)->pluck('schedule_id');
            $bookedLessons = DB::table('lesson_schedules')->whereIn('id', $booked)->pluck('lesson_id');

            $candidates = $lessons->diff($bookedLessons)->take(5);

            LessonRecommendation::where('user_id', $userId)->delete();
            foreach ($candidates as $lessonId) {
                LessonRecommendation::create([
                    'user_id' => $userId,
                    'lesson_id' => $lessonId,
                    'score' => 1, // simple popularity score
                ]);
            }
        }

        $this->info('Done.');
    }
}
