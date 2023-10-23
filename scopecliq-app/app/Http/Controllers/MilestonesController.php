<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MilestonesController extends Controller
{
    //

    public function fetchMilestonesByProject($project_id){
        $projects = DB::table('milestones')
            -> select('*')
            -> where('project_id', $project_id)
            -> get();
        return $projects;
    }

    public function fetchMilestoneById($milestone_id){
        $projects = DB::table('milestones')
            -> select('*')
            -> where('id', $milestone_id)
            -> get();
        return $projects;
    }

    static public function getLastPositionByProject($project_id){
        
        /*
         SELECT position 
         FROM `milestones` 
         where project_id = 2 
         order by position desc 
         limit 1; 
         */

         $result = DB::table('milestones')
         ->select('position')
         ->where('project_id', $project_id)
         ->orderByDesc('position')
         ->limit(1)
         ->value('position');

        return $result;
    }


    public function addMilestoneToProject(Request $req, $project_id) {
        
        // get last position
        $lastPosition = $this -> getLastPositionByProject($project_id);

        DB::table('milestones')
            ->insert([
            [
                'project_id' => $project_id,
                'position' => $lastPosition+1,
                'name' => $req->name,
                'description' => $req->description,
                'budget_percentage' => $req->budget_percentage,
                'status_completion' => null,
                'status_invoice' => null,
                'datetime_started' => null,
            ],
        ]);
    }

    public function updateMilestoneById (Request $req, $milestone_id) {

        $data = [
            'name' => $req->name,
            'description' => $req->description,
            'budget_percentage' => $req->budget_percentage,
        ];

        $milestone = DB::table('milestones')
            -> where('id', $milestone_id)
            -> update( $data );
        return $milestone;
    }

   
   
}
