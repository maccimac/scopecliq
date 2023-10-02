<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Models\Deliverable;
use Illuminate\Support\Facades\DB;

class DeliverablesController extends Controller
{
    public function getAll(){
        $deliverables = DB::table('deliverables')
        -> select('*')
        -> get();
        
        return $deliverables;

    }
    
    public function update(Request $req, $id) {
        // $proj =  Deliverable::findorFail($id);

        // $appt['user_id'] = $req->user_id;
        // $appt['doctor_id'] = $req->doctor_id;
        // $appt['datetime_start'] = $startDateTime;

        $deliverable = DB::table('deliverables')
            -> where('id', $id)
            -> update([
                'status'=> $req->status
            ]);
        return $deliverable;
        
    }
}
