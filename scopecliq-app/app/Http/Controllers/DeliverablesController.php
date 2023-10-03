<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Models\Deliverable;
use Illuminate\Support\Facades\DB;

class DeliverablesController extends Controller
{
    public function fetchDeliverableById($id){
        $deliverable = DB::table('deliverables')
        -> select('*')
        -> where('id', $id)
        -> first();
        
        return $deliverable;
    }


    public function fetchDeliverablesByProject($project_id){
        $deliverables = DB::table('deliverables')
        -> select('*')
        -> where('project_id', $project_id)
        -> get();
        return $deliverables;
    }
    
    public function updateDeliverableStatus($id, $status) {

        $deliverable = DB::table('deliverables')
            -> where('id', $id)
            -> update([
                'status'=> $status
            ]);
        return $deliverable;
    }

    public function editDeliverableById(Request $req, $id) {
      
        $d = [];
        if($req->description){  $d['description'] = $req->description;}
        if($req->status){  $d['status'] = $req->status; }
        // add datetime_start
        // add datetime_end

        $deliverable = DB::table('deliverables')
            -> where('id', $id)
            -> update( $d );
        return $deliverable;
    }

    static public function getLastPositionByMilestone($milestone_id){
    

         $result = DB::table('deliverables')
         ->select('position')
         ->where('milestone_id', $milestone_id)
         ->orderByDesc('position')
         ->limit(1)
         ->value('position');

        return $result;
    }



    public function addDeliverableToMilestone(Request $req, $milestone_id){
        $lastPosition = $this -> getLastPositionByMilestone($milestone_id);
        $projId =  DB::table('milestones')
        ->select('project_id')
        ->where('id', $milestone_id)
        ->limit(1)
        ->value('project_id');

        DB::table('deliverables')
            ->insert([
            [
                'project_id'=> $projId,
                'milestone_id' => $milestone_id,
                'position' => $lastPosition+1 || 0,
                'status'=> 'new_stat',
                'description' => $req->description,
            ],
        ]);
    }
}
