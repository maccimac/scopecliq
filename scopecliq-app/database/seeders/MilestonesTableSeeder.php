<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MilestonesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
    
        DB::table('milestones')->insert([
            [
                'project_id' => 2,
                'position' => 0,
                'name' => 'Negotiation',
                'description' => "The consistent theme / image you want in your consumer’s mind.",
                'budget_percentage'=> 0,
                'status_completion' => 'COMPLETE',
                'status_invoice' => 'PAID',
                'datetime_started' => Carbon::create(2023, 6, 12, 14, 30, 0),
            ],
            [
                'project_id' => 2,
                'position' => 1,
                'name' => 'Branding',
                'description' => "The consistent theme / image you want in your consumer’s mind.",
                'budget_percentage'=>25,
                'status_completion' => 'STARTED',
                'status_invoice' => 'SENT',
                'datetime_started' => Carbon::create(2023, 6, 12, 14, 30, 0),
            ],
            [
                'project_id' => 2,
                'position' => 2,
                'name' => 'Website',
                'description' => "Best way possible leads can reach out. Home for articles and resources we can provide client.",
                'budget_percentage'=> 50,
                'status_completion' => 'PENDING',
                'status_invoice' => null,
                'datetime_started' => Carbon::create(2023, 9, 1, 14, 30, 0),
            ],
            [
                'project_id' => 2,
                'position' => 3,
                'name' => 'Digital Marketing Strategy and Setup',
                'description' => "Research. Marketing Plan. Corporate versus Personal Branding. Setup and Implementation.",
                'budget_percentage'=> 25,
                'status_completion' => 'PENDING',
                'status_invoice' => null,
                'datetime_started' => null
            ],

            // WAVEKO
            [
                'project_id' => 1,
                'position' => 0,
                'name' => 'Website',
                'description' => "Best way possible leads can reach out. Home for articles and resources we can provide client.",
                'budget_percentage'=> 50,
                'status_completion' => 'PENDING',
                'status_invoice' => null,
                'datetime_started' => Carbon::create(2023, 9, 1, 14, 30, 0),
            ],
            [
                'project_id' => 1,
                'position' => 1,
                'name' => 'Digital Marketing',
                'description' => "Research. Marketing Plan. Corporate versus Personal Branding. Setup and Implementation.",
                'budget_percentage'=> 25,
                'status_completion' => 'PENDING',
                'status_invoice' => null,
                'datetime_started' => null
            ],

            [
                'project_id' => 1,
                'position' => 1,
                'name' => 'On Field Marketing',
                'description' => "Distribution of branding on the floor",
                'budget_percentage'=> 25,
                'status_completion' => 'PENDING',
                'status_invoice' => null,
                'datetime_started' => null
            ],
            
        ]);
    }
}
