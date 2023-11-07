<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InvoicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('invoices')->insert([
            //  SIESTA
            [
                'project_id' => 2,
                'milestone_id' => 1,
                'total'=> 0,
                'datetime_generated' => Carbon::create(2023, 6, 12, 14, 30, 0),
                'datetime_paid' => Carbon::create(2023, 6, 12, 14, 30, 0),
            ],

            // WAVEKO
            // [
            //     'project_id' => 1,
            //     'position' => 0,
            //     'name' => 'Website',
            //     'description' => "Best way possible leads can reach out. Home for articles and resources we can provide client.",
            //     'budget_percentage'=> 50,
            //     'status_completion' => 'PENDING',
            //     'status_invoice' => null,
            //     'datetime_started' => Carbon::create(2023, 9, 1, 14, 30, 0),
            // ],
            // [
            //     'project_id' => 1,
            //     'position' => 1,
            //     'name' => 'Digital Marketing',
            //     'description' => "Research. Marketing Plan. Corporate versus Personal Branding. Setup and Implementation.",
            //     'budget_percentage'=> 25,
            //     'status_completion' => 'PENDING',
            //     'status_invoice' => null,
            //     'datetime_started' => null
            // ],

            // [
            //     'project_id' => 1,
            //     'position' => 1,
            //     'name' => 'On Field Marketing',
            //     'description' => "Distribution of branding on the floor",
            //     'budget_percentage'=> 25,
            //     'status_completion' => 'PENDING',
            //     'status_invoice' => null,
            //     'datetime_started' => null
            // ],
        ]);
    }
}
