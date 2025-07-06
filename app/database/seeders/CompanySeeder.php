<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        Company::updateOrCreate([
            'name' => 'ACME Corp',
        ], [
            'domain' => 'acme.com',
            'contact_email' => 'admin@acme.com',
        ]);
    }
}
