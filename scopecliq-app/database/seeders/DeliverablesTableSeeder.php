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
                'description' => 'Mooboard',
                'status' => 'completed',
                'datetime_started' => Carbon::create(2023, 6, 15, 6, 30, 0),
                'datetime_completed' => Carbon::create(2023, 6, 16, 6, 30, 0),
            ],
            [
                'project_id' => 2,
                'milestone_id' => 1,
                'position' => 1,
                'description' => 'Study Concepts and Logo options',
                'status' => 'completed',
                'datetime_started' => Carbon::create(2023, 6, 18, 6, 30, 0),
                'datetime_completed' => Carbon::create(2023, 6, 20, 6, 30, 0),
            ],
        ]);
    }
}
