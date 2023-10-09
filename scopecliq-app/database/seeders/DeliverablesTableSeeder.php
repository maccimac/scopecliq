<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DeliverablesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('deliverables')->insert([
            [
                'project_id' => 2,
                'milestone_id' => 1,
                'position' => 0,
                'description' => 'Contract signing',
                'status' => 'COMPLETE',
                'datetime_started' => Carbon::create(2023, 6, 15, 6, 30, 0),
                'datetime_completed' => Carbon::create(2023, 6, 16, 6, 30, 0),
            ],
            [
                'project_id' => 2,
                'milestone_id' => 2,
                'position' => 0,
                'description' => 'Mooboard',
                'status' => 'COMPLETE',
                'datetime_started' => Carbon::create(2023, 6, 15, 6, 30, 0),
                'datetime_completed' => Carbon::create(2023, 6, 16, 6, 30, 0),
            ],
            [
                'project_id' => 2,
                'milestone_id' => 2,
                'position' => 1,
                'description' => 'Study Concepts and Logo options. Lorem ipsum dolor sit amet.',
                'status' => 'COMPLETE',
                'datetime_started' => Carbon::create(2023, 6, 18, 6, 30, 0),
                'datetime_completed' => Carbon::create(2023, 6, 20, 6, 30, 0),
            ],
            [
                'project_id' => 2,
                'milestone_id' => 2,
                'position' => 2,
                'description' => 'Editing incomplete deliverable. Ongoing deliverable with images. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
                'status' => 'INCOMPLETE',
                'datetime_started' => Carbon::create(2023, 6, 18, 6, 30, 0),
                'datetime_completed' => Carbon::create(2023, 6, 20, 6, 30, 0),
            ],
            [
                'project_id' => 2,
                'milestone_id' => 2,
                'position' => 3,
                'description' => 'Cancelled deliverable',
                'status' => 'CANCELLED',
                'datetime_started' => Carbon::create(2023, 6, 18, 6, 30, 0),
                'datetime_completed' => Carbon::create(2023, 6, 20, 6, 30, 0),
            ],
            [
                'project_id' => 2,
                'milestone_id' => 3,
                'position' => 0,
                'description' => 'Wireframes',
                'status' => 'INCOMPLETE',
                'datetime_started' => Carbon::create(2023, 6, 18, 6, 30, 0),
                'datetime_completed' => Carbon::create(2023, 6, 20, 6, 30, 0),
            ],
            [
                'project_id' => 2,
                'milestone_id' => 3,
                'position' => 1,
                'description' => 'User interface and component mockups',
                'status' => 'COMPLETE',
                'datetime_started' => Carbon::create(2023, 6, 18, 6, 30, 0),
                'datetime_completed' => Carbon::create(2023, 6, 20, 6, 30, 0),
            ],
            [
                'project_id' => 2,
                'milestone_id' => 3,
                'position' => 2,
                'description' => 'Protoype',
                'status' => 'INCOMPLETE',
                'datetime_started' => Carbon::create(2023, 6, 18, 6, 30, 0),
                'datetime_completed' => Carbon::create(2023, 6, 20, 6, 30, 0),
            ],
            [
                'project_id' => 2,
                'milestone_id' => 4,
                'position' => 0,
                'description' => 'Market, competition, and demography research',
                'status' => 'INCOMPLETE',
                'datetime_started' => Carbon::create(2023, 6, 18, 6, 30, 0),
                'datetime_completed' => Carbon::create(2023, 6, 20, 6, 30, 0),
            ],
            [
                'project_id' => 2,
                'milestone_id' => 4,
                'position' => 1,
                'description' => 'Setup of marketing channels: Facebook, LinkedIn, Instagram, Tiktok,',
                'status' => 'INCOMPLETE',
                'datetime_started' => Carbon::create(2023, 6, 18, 6, 30, 0),
                'datetime_completed' => Carbon::create(2023, 6, 20, 6, 30, 0),
            ],
            [
                'project_id' => 2,
                'milestone_id' => 4,
                'position' => 2,
                'description' => 'Google analytics setup',
                'status' => 'INCOMPLETE',
                'datetime_started' => Carbon::create(2023, 6, 18, 6, 30, 0),
                'datetime_completed' => Carbon::create(2023, 6, 20, 6, 30, 0),
            ],
        ]);
    }
}
