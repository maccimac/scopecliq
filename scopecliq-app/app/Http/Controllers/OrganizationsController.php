<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientsController extends Controller
{
    //
    public function fetchAllClients(){
        $clients = DB::table('organizations')
            -> select('*')
            -> get();
        return $clients;
    }

    public function fetchClientById($client_id){
        $clients = DB::table('organizations')
            -> select('*')
            -> where('id', $id)
            -> get();
        return $clients;
    }

}
