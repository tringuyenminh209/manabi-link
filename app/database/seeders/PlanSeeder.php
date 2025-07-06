<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        Plan::updateOrCreate(
            ['name' => 'Sensei Pro'],
            [
                'price' => 1500,
                'currency' => 'JPY',
                'interval' => 'monthly',
                'features' => json_encode(['lower_commission' => true, 'badge' => 'Pro']),
                'is_active' => true,
            ]
        );
    }
}
