<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectsController extends Controller
{
    //

    public function fetchAllProjects(){
        $projects = DB::table('projects')
            -> select('*')
            -> get();
        return $projects;
    }


    public function fetchAllProjectsByConsultantUserId($user_id){
        $projects = DB::table('projects')
            -> select('*')
            ->  where('consultant_user_id', $user_id)
            -> get();
        return $projects;
    }
    public function fetchById($project_id){
        $project = DB::table('projects')
            -> select('*')
            -> where('id', $project_id)
            -> first();
        return $project;
    }

    public function fetchByPortal($portal){
        $projects = DB::table('projects')
            -> select('*')
            -> where('portal_domain', $portal)
            -> first();
        return $projects;
    }

    public function fetchProjectsByOrganization($organization_id){
        $projects = DB::table('projects')
            -> select('*')
            -> where('organization_id', $organization_id)
            -> get();
        return $projects;
    }

    
    public function fetchProjectsByConsultant($consultant_id){

        /*
            select * 
            from projects as p 
            inner join organizations as c 
            on p.organization_id = c.id
            where consultant_id = 1;
        */

        $projects = DB::table('projects')
        ->select('*')
        ->join('organizations', 'projects.organization_id', '=', 'organizations.id')
        ->where('consultant_id', '=', $consultant_id)
        ->get();

        return $projects;
    }

    public function addProject(Request $req, $organization_id) {
        $newProjId = DB::table('projects')
            ->insertGetId([
                'organization_id' => $organization_id,
                'name' => $req->name,
                'budget' => $req->budget,
                'about' => $req->about,
                'status' => 'pending',
                'portal_domain' => $req->portal_domain,
                'portal_password' => $req->portal_password,
                'terms' => $req->terms,
                'consultant_user_id'=>$req->consultant_user_id
            
        ]);

        return $newProjId;
    }
}
