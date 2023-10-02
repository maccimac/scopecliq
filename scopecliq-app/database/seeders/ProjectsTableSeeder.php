<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('projects')->insert([
            [
                'client_id' => 1,
                'name' => 'Siesta Restort Villa',
                'about' => 'Design and build of resort villa',
                'budget' => 60000,
                'status' => 'negotiation',
                'portal_subdomain' => 'siestavilla',
                'portal_password' => 'aurella'
            ],
            [
                'client_id' => 2,
                'name' => 'Leatherworks Branding',
                'about' => 'Help kick-off leatherworks',
                'budget' => 4000,
                'status' => 'started',
                'portal_subdomain' => 'leatherworks',
                'portal_password' => 'pizza'
            ],
        ]);
    }
}
