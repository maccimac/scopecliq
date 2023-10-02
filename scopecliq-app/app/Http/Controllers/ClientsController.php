<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientsController extends Controller
{
    //
    public function fetchAllClients(){
        $clients = DB::table('clients')
            -> select('*')
            -> get();
        return $clients;
    }

    public function fetchSingleClient($client_id){
        $clients = DB::table('clients')
            -> select('*')
            -> where('id', $id)
            -> get();
        return $clients;
    }

    public function fetchClientsOfConsultant($user_id){
        $clients = DB::table('clients')
            -> select('*')
            -> where('consultant_id', $user_id)
            -> get();
        return $clients;
    }


}
