<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('clients')->insert([
            [
                'consultant_id' => 1,
                'name' => 'Kevin Rizal',
                'email' => 'rizalk@estilodecada.ca',
                'about' => 'Head Contractor at Estilo Decada',
                'contact_number' => '+1 234 567 8901',
                'organization_name' => 'Estilo Decada'  
            ],
            [
                'consultant_id' => 1,
                'name' => 'Julia Evers',
                'email' => 'director@juliastudios.com',
                'about' => 'Julia Studios est 1992',
                'contact_number' => '+63 234 567 8901',
                'organization_name' => 'Julia Studios'  
            ],
        ]);    
    }
}
