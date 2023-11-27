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
                'datetime_due' => null
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
                'datetime_due' => Carbon::create(2023, 10, 30, 0, 0, 0),
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
                'datetime_due' => Carbon::create(2023, 11, 15, 0, 0, 0),
            ],
            [
                'project_id' => 2,
                'position' => 3,
                'name' => 'Digital Marketing Strategy and Setup',
                'description' => "Research. Marketing Plan. Corporate versus Personal Branding. Setup and Implementation.",
                'budget_percentage'=> 25,
                'status_completion' => 'PENDING',
                'status_invoice' => null,
                'datetime_started' => null,
                'datetime_due' => null,
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
                'datetime_due' => Carbon::create(2024, 12, 20, 0, 0, 0),
            ],
            [
                'project_id' => 1,
                'position' => 1,
                'name' => 'Digital Marketing',
                'description' => "Research. Marketing Plan. Corporate versus Personal Branding. Setup and Implementation.",
                'budget_percentage'=> 25,
                'status_completion' => 'PENDING',
                'status_invoice' => null,
                'datetime_started' => null,
                'datetime_due' => null
            ],

            [
                'project_id' => 1,
                'position' => 1,
                'name' => 'On Field Marketing',
                'description' => "Distribution of branding on the floor",
                'budget_percentage'=> 25,
                'status_completion' => 'PENDING',
                'status_invoice' => null,
                'datetime_started' => null,
                'datetime_due' => Carbon::create(2024, 2, 28, 0, 0, 0),
            ],

            [
                'project_id' => 5,
                'position' => 0,
                'name' => 'Geographic Research',
                'description' => "Define requirements and objectives",
                'budget_percentage'=> 30,
                'status_completion' => 'COMPLETE',
                'status_invoice' => null,
                'datetime_started' => null,
                'datetime_due' => Carbon::create(2023, 5, 28, 0, 0, 0),
            ],

            [
                'project_id' => 5,
                'position' => 1,
                'name' => 'Technical Architecture',
                'description' => "Choose a technology stack (programming language, database, framework).
                Design the system architecture, considering scalability and performance.",
                'budget_percentage'=> 40,
                'status_completion' => 'COMPLETE',
                'status_invoice' => null,
                'datetime_started' => null,
                'datetime_due' => Carbon::create(2023, 6, 28, 0, 0, 0),
            ],

            [
                'project_id' => 5,
                'position' => 2,
                'name' => 'Mobile Applications',
                'description' => "Develop mobile applications for drivers and customers to facilitate order management and tracking.",
                'budget_percentage'=> 30,
                'status_completion' => 'COMPLETE',
                'status_invoice' => null,
                'datetime_started' => null,
                'datetime_due' => Carbon::create(2023, 8, 28, 0, 0, 0),
            ],
            
        ]);
    }
}
