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
                'datetime_paid' => null,
                'payment_client_secret' => null
            ],
            [
                'project_id' => 2,
                'milestone_id' => 2,
                'total'=> 10150.00,
                'datetime_generated' => Carbon::create(2023, 6, 12, 14, 30, 0),
                'datetime_paid' => null,
                'payment_client_secret' => 'PI_3OGW5ICUUD2E5VCQ06DWOUCX'
            ],

            // WAVEKO
            [
                'project_id' => 1,
                'milestone_id' => 5,
                'total'=> 44000.00,
                'datetime_generated' => Carbon::create(2023, 6, 12, 14, 30, 0),
                'datetime_paid' => null,
                'payment_client_secret' => 'PI_3OGW5ICUUD2E5VCQ06DXXXXXX'
            ],

            // TRUCKFLOW
            [
                'project_id' => 5,
                'milestone_id' => 8,
                'total'=> 1260.00,
                'datetime_generated' => Carbon::create(2023, 8, 10, 0, 0, 0),
                'datetime_paid' => Carbon::create(2023, 8, 11, 0, 0, 0),
                'payment_client_secret' => 'PI_3OGW5ICUUD2E5VCQ06DZZZZZZ'
            ],
            [
                'project_id' => 5,
                'milestone_id' => 9,
                'total'=> 1680.00,
                'datetime_generated' => Carbon::create(2023, 9, 10, 0, 0, 0),
                'datetime_paid' => Carbon::create(2023, 8, 11, 10, 0, 0),
                'payment_client_secret' => 'PI_3OGW5ICUUD2E5VCQ06DYYYYYY'
            ],


        ]);
    }
}
