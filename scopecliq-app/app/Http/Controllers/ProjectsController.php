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

    public function fetchProjectById($project_id){
        $project = DB::table('projects')
            -> select('*')
            -> where('id', $project_id)
            -> get();
        return $project;
    }

    public function fetchProjectsByClient($client_id){
        $projects = DB::table('projects')
            -> select('*')
            -> where('client_id', $client_id)
            -> get();
        return $projects;
    }

    public function fetchProjectsByConsultant($consultant_id){

        /*
            select * 
            from projects as p 
            inner join clients as c 
            on p.client_id = c.id
            where consultant_id = 1;
        */

        $projects = DB::table('projects')
        ->select('*')
        ->join('clients', 'projects.client_id', '=', 'clients.id')
        ->where('consultant_id', '=', $consultant_id)
        ->get();

        return $projects;
    }
}
