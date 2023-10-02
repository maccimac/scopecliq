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

    static public function getProjectLastPosition($project_id){
        
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


    public function createMilestoneInProject(Request $req, $project_id) {
        // $proj =  Deliverable::findorFail($id);

        // $appt['user_id'] = $req->user_id;
        // $appt['doctor_id'] = $req->doctor_id;
        // $appt['datetime_start'] = $startDateTime;
        
        
        // get last position
        $lastPosition = $this -> getProjectLastPosition($project_id);
        // return $lastPosition;

        // dd($lastPosition);
        DB::table('milestones')
            ->insert([
            [
                'project_id' => $project_id,
                'position' => $lastPosition+1,
                'name' => $req->name,
                'description' => $req->description,
                'status_completion' => null,
                'status_payment' => null,
                'datetime_started' => null,
            ],
        ]);

        
        // $deliverable = DB::table('deliverables')
        //     -> where('id', $id)
        //     -> update([
        //         'status'=> $req->status
        //     ]);
        // return $deliverable;

        
    }
}
