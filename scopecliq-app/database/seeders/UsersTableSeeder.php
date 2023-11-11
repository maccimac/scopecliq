<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Douglas Dev' ,
                'email' => 'doug@douglasdevs.com',
                'password' => '$2y$10$ePeR9rh9pEIqlHL7LM0BnuESGMjUIMiEXp37SqoN9bwe2jcMWF6BK', // pass1234
                 
            ],

            [
                'name' => 'Margaret McMoo' ,
                'email' => 'web@webcrafterinc.com',
                'password' => '$2y$10$zv21Uy3QzuImfvsZVsSWc.IFML8whlaXdOSudPjKGn7vzgWTpSdPS', // scopecliq_v1
                 
            ],
        ]);    
    }
}
