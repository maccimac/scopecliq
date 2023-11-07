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
                'organization_address' => '2945 Jacklin Rd #406, Victoria, British Columbia, V9B 5E3, Canada',
                'consultant_user_id'=> null
                 
            ],
            [
                'organization_name' => 'Julia Studios',  
                'contact_name' => 'Julia Evers',
                'contact_email' => 'director@juliastudios.com',
                'contact_about' => 'Julia Studios est 1992',
                'contact_number' => '+63 234 567 8901',
                'organization_address' => '2200 Eagle St, Cambridge, Ontario, N3H 0A1, Canada',
                'consultant_user_id'=> null
                
            ],
            [
                'organization_name' => 'Stationery Company',
                'contact_name' => 'Angela Sharma',
                'contact_email' => 'angela@office.com',
                'contact_about' => 'Accounts Manager',
                'contact_number' => '+63 234 567 8901',
                'organization_address' => '2945 Jacklin Rd #406, Victoria, British Columbia, V9B 5E3, Canada',
                'consultant_user_id'=> null
            ],

            [
                'organization_name' => 'Douglas Devs',
                'contact_name' => 'Douglas Antonov',
                'contact_email' => 'doug@douglasdevs.io',
                'contact_about' => 'Founder',
                'contact_number' => '+63 234 567 8901',
                'organization_address' => '700 Royal Ave, New Westminster, BC V3M 5Z5',
                'consultant_user_id'=> 1
            ],
        ]);    
    }
}
