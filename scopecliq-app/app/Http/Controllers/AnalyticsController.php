<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Controllers\ProjectsController;

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
        
        if($all==0){
            return 0;
        }
        return $complete / $all;
    }

    public function fetchProjectsAnalytics($user_id){
        // $projects = DB::table('projects')
        //     -> select('id')
        //     -> where('consultant_user_id', $user_id)
        //     -> where ('status', 'started')
        //     -> get();
        

        // $milestones = DB::table('milestones')
        // -> select('')
        // -> whereIn('project_id', $project_id)
        // -> orderBy('project_id')
        // -> get();
        // return $milestones;

        // return $projects;

        $projectsController = new ProjectsController();
        $projects = $projectsController->fetchAllProjectsByConsultantUserId($user_id);

        $stats = array(
            'pending' => 0,
            'open'=> 0,
            'due' => 0,
            'complete' => 0  
        );

        $today = Carbon::now();
        $in30days = $today->addDays(30);
        // $thisMonth = $today->startOfMonth();
        // $startOfNextMonth = $thisMonth->addMonth();

        foreach ($projects as $proj) {
            $progressPercent = $this->fetchProgressPercentByProject($proj->id);
            if($progressPercent == 0){
                $stats['pending']+= 1;
            }else if( $progressPercent == 1){
                $stats['complete'] += 1;
            }else{
                $stats['open'] += 1;
                if($proj->datetime_due != null && $proj->datetime_due < $in30days){
                    $stats['due'] += 1;
                }
            }

            // code to be executed for each key-value pair
        };

        return $stats;

        // return $all;

        // $stats = array();
        // $stats['open'] = 4;
        // $stats['due'] = 5;
        // $stats['pending'] = 6;
        // $stats['completed'] = 120;
        // return $stats;
    }
}
