<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class NotificationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('notifications')->insert([
            
            [
                'project_id' => 2,
                'milestone_id' => 3,
                'deliverable_id' => 7,
                'type' => 'STATUS_UPDATE',
                'status' => 'COMPLETE',
                'description' => 'Market, competition, and demography research',
                'extra' => 'This is done, thanks for your help.',
                'created_at' => Carbon::yesterday()  
            ],
            [
                'project_id' => 2,
                'milestone_id' => 1,
                'deliverable_id' => null,
                'type' => 'INVOICE',
                'status' => 'SENT',
                'description' => 'Negotiation',
                'extra' => null,
                'created_at' => Carbon::yesterday()  
            ],


            [
                'project_id' => 2,
                'milestone_id' => 1,
                'deliverable_id' => 2,
                'type' => 'STATUS_UPDATE',
                'status' => 'COMPLETE',
                'description' => 'Moodboard',
                'extra' => null,
                'created_at' => Carbon::yesterday()  
            ],
            [
                'project_id' => 2,
                'milestone_id' => 2,
                'deliverable_id' => 5,
                'type' => 'STATUS_UPDATE',
                'status' => 'INCOMPLETE',
                'description' => 'Wireframe',
                'extra' => 'Please recreate',
                'created_at' => Carbon::yesterday()  
            ],
            [
                'project_id' => 2,
                'milestone_id' => 11,
                'deliverable_id' => null,
                'type' => 'CHANGE',
                'status' => 'CREATED',
                'description' => 'Retrospective',
                'extra' => '',
                'created_at' => Carbon::yesterday()  
            ],
            [
                'project_id' => 2,
                'milestone_id' => 11,
                'deliverable_id' => 33,
                'type' => 'CHANGE',
                'status' => 'CREATED',
                'description' => 'All hand meeting',
                'extra' => '',
                'created_at' => Carbon::yesterday()  
            ],
        ]);    
    }
}
