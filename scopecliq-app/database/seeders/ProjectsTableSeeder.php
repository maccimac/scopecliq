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
                'client_id' => 1,
                'name' => 'WaveKo Surf Lounge',
                'about' => 'Design and build of resort villa',
                'budget' => 88000,
                'status' => 'negotiation',
                'portal_subdomain' => 'waveko',
                'portal_password' => 'aurella'
            ],
            [
                'client_id' => 2,
                'name' => 'Siesta Farm and Restaurant',
                'about' => 'Farm to table artisinal easy dining',
                'budget' => 40600,
                'status' => 'started',
                'portal_subdomain' => 'siesta',
                'portal_password' => 'pizza'
            ],
        ]);
    }
}
