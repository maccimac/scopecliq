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
            [
                'project_id' => 2,
                'milestone_id' => 2,
                'total'=> 10150.00,
                'datetime_generated' => Carbon::create(2023, 6, 12, 14, 30, 0),
                'datetime_paid' => null,
            ],

            // WAVEKO
            [
                'project_id' => 1,
                'milestone_id' => 5,
                'total'=> 44000.00,
                'datetime_generated' => Carbon::create(2023, 6, 12, 14, 30, 0),
                'datetime_paid' => null,
            ],

        ]);
    }
}
