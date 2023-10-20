<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('projects')->insert([
            [
                'organization_id' => 1,
                'name' => 'WaveKo Surf Lounge',
                'about' => 'Design and build of resort villa',
                'budget' => 88000,
                'status' => 'pending',
                'portal_domain' => 'waveko',
                'portal_password' => 'beach'
            ],
            [
                'organization_id' => 2,
                'name' => 'Siesta Farm and Restaurant',
                'about' => 'Markekting package. Farm to table artisinal easy dining',
                'budget' => 40600,
                'status' => 'started',
                'portal_domain' => 'siesta',
                'portal_password' => 'pizza'
            ],
            [
                'organization_id' => 3,
                'name' => 'Lettered Leather',
                'about' => 'Markating package. Local leathered goods',
                'budget' => 8000,
                'status' => 'pending',
                'portal_domain' => 'lettered-leather',
                'portal_password' => 'luna'
            ],
        ]);
    }
}
