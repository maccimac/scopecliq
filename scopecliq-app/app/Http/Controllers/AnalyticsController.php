<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    //
    public function fetchProgressPercentByProject($project_id){
        $totalDeliverables = DB::table('deliverables')
            ->select('*')
            ->where('project_id', $project_id)
            ->get();
        
        $complete = $totalDeliverables
            ->where('status', 'COMPLETE')
            ->count();
        
        $all = $totalDeliverables
            ->count();
        
        return $complete / $all;
    }
}
