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
            ->  orderBy('position')
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


    public function deleteMilestoneById($milestone_id){

        $deliverablesCount = DB::table('deliverables')
            ->where('milestone_id', $milestone_id)
            ->count();

        if($deliverablesCount > 0){
            throw new \Exception("Cannot delete milestone with deliverables. Delete deliverables first.");
        }

        $deleted = DB::table('milestones')
            ->where('id', $milestone_id)
            ->delete();

        if ($deleted) {
            // Optionally, you can return a success message or a response here
            return [
                'status' => 'success',
                'message' => "Milestone with ID $milestone_id has been deleted."
            ];
        } else {
            return [
                'status' => "fail",
                'message' => "Milestone with ID $milestone_id not found."
            ];
        }
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

        $newId = DB::table('milestones')
            ->insertGetId([
            'project_id' => $project_id,
            'position' => $lastPosition+1,
            'name' => $req->name,
            'description' => $req->description,
            'budget_percentage' => $req->budget_percentage,
            'datetime_due' => $req->datetime_due,
            'status_completion' => null,
            'status_invoice' => null,
            'datetime_started' => null,
            ]);

        return $newId;
    }

    public function updateMilestoneById (Request $req, $milestone_id) {
        $data = [
            'name' => $req->name,
            'description' => $req->description,
            'budget_percentage' => $req->budget_percentage,
            'datetime_due' => $req->datetime_due,
        ];

        $milestone = DB::table('milestones')
            -> where('id', $milestone_id)
            -> update( $data );
        return $milestone;
    }

    public function updateMilestonePositionById (Request $req, $milestone_id, $position) {
        $data = [
            'position' => $position
            // 'name' => $req->name,
            // 'description' => $req->description,
            // 'budget_percentage' => $req->budget_percentage,
        ];

        $milestone = DB::table('milestones')
            -> where('id', $milestone_id)
            -> update( $data );
        return $milestone;
    }

   
}
