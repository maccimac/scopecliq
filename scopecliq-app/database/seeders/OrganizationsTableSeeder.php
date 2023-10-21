<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrganizationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('organizations')->insert([
            [
                'organization_name' => 'Estilo Decada' ,
                'contact_name' => 'Kevin Rizal',
                'contact_email' => 'rizalk@estilodecada.ca',
                'contact_about' => 'Head Contractor at Estilo Decada',
                'contact_number' => '+1 234 567 8901',
                 
            ],
            [
                'organization_name' => 'Julia Studios',  
                'contact_name' => 'Julia Evers',
                'contact_email' => 'director@juliastudios.com',
                'contact_about' => 'Julia Studios est 1992',
                'contact_number' => '+63 234 567 8901',
                
            ],
            [
                'organization_name' => 'Stationery Company',
                'contact_name' => 'Angela Sharma',
                'contact_email' => 'angela@office.com',
                'contact_about' => 'Accounts Manager',
                'contact_number' => '+63 234 567 8901',
                 
            ],
        ]);    
    }
}
