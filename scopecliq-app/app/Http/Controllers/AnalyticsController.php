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
        };

        return $stats;
    }

    public function fetchMilestonesAnalytics($user_id){

        // get open projects

        $projectsController = new ProjectsController();
        $projects = $projectsController->fetchAllProjectsByConsultantUserId($user_id);

        $stats = array(
            'open_milestones_id' => [],
            'deliverables_open_milestones_all'=> 0,
            'deliverables_open_milestones_complete'=> 0,
            'open_milestones_due' => 0,
            'deliverables_completed_all' => 0  
        );

        $today = Carbon::now();
        $in30days = $today->addDays(30);


        foreach ($projects as $proj) {
            // deliverables
            $projDeliverables = DB::table('deliverables')
                ->select('*')
                ->where('project_id', $proj->id)
                ->get();

            $complete = $projDeliverables
                ->where('status', 'COMPLETE')
                ->count();
            $stats['deliverables_completed_all' ] += $complete; 
        
            $all = $projDeliverables
                ->count();
        
            $progress = $all > 0 ? $complete / $all : 0;

            if( $progress == 0){
                // if proj not started

            }else if ($progress == 1){
                // if proj complete

            }else{
                $ongoingMilestones = DB::table('deliverables')
                    ->select('milestone_id')
                    ->where('project_id', $proj->id)
                    ->groupBy('milestone_id')
                    ->whereIn('status', ['COMPLETE', 'INCOMPLETE'])
                    ->havingRaw('COUNT(DISTINCT status) = 2') // Ensure both statuses are present
                    ->pluck('milestone_id')
                    ->toArray();

                $stats['open_milestones_id'] = array_merge($stats['open_milestones_id'], $ongoingMilestones);
                $stats['open_milestones_id'] = array_unique($stats['open_milestones_id']); 
                foreach( $ongoingMilestones as $milestoneId){
                    $milestoneDeliverable = DB::table('deliverables')
                    ->select('*')
                    ->where('milestone_id', $milestoneId)
                    ->get();
                    $countCompleteDeliverable =  $milestoneDeliverable
                    ->where('status', 'COMPLETE')
                    ->count();
                    $stats['deliverables_open_milestones_all'] += $milestoneDeliverable->count();
                    $stats['deliverables_open_milestones_complete'] += $countCompleteDeliverable;                    
                }
                
                $incompleteMilestones = $projDeliverables
                ->where('status', 'INCOMPLETE')
                ->pluck('milestone_id')
                ->toArray();

                $dueMilestones = DB::table('milestones')
                ->select('*')
                ->where('project_id', $proj->id)
                ->whereIn('id', $incompleteMilestones)
                ->where('datetime_due','<', $in30days)
                ->count();
                $stats['open_milestones_due'] += $dueMilestones;


            }
        };

        $stats['open_milestones_id'] = array_values($stats['open_milestones_id']);
        return $stats;

    }
}
