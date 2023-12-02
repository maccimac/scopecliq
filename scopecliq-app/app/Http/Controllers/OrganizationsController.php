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


    public function addOrganization(Request $req, $user_id) {
        $newOrgId = DB::table('organizations')
            ->insertGetId([
                'organization_name' => $req->organization_name,
                'contact_name' => $req->contact_name,
                'contact_email' => $req->contact_email,
                'contact_about' => $req->contact_about,
                'contact_number' => $req->contact_number,
                'consultant_user_id' => $user_id,
            
        ]);
        return $newOrgId;   
    }

    public function updateOrganizationById (Request $req, $organization_id) {
        $data =  [
            'organization_name' => $req->organization_name,
            'contact_name' => $req->contact_name,
            'contact_email' => $req->contact_email,
            'contact_about' => $req->contact_about,
            'contact_number' => $req->contact_number,
            'organization_logo' => $req->organization_logo
        ];

        $organization = DB::table('organizations')
            -> where('id', $organization_id)
            -> update( $data );

        return $organization;
    }

    public function updateOrganizationLogoById (Request $req, $organization_id) {
        $data =  [
            'organization_logo' => $req->organization_logo
        ];

        $organization = DB::table('organizations')
            -> where('id', $organization_id)
            -> update( $data );

        return $organization;
    }

}
