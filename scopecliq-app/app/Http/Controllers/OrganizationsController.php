<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrganizationsController extends Controller
{
    //
    public function fetchAllOrganizations(){
        $clients = DB::table('organizations')
            -> select('*')
            -> get();
        return $clients;
    }

    public function fetchOrganizationById($organization_id){
        $clients = DB::table('organizations')
            -> select('*')
            -> where('id', $organization_id)
            -> first();
        return $clients;
    }

    public function fetchOrganizationByConsultantId($user_id){
        $clients = DB::table('organizations')
            -> select('*')
            -> where('consultant_user_id', $user_id)
            -> first();
        return $clients;
    }

}
