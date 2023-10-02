<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientsController extends Controller
{
    //
    public function getAll(){
        $clients = DB::table('clients')
            -> select('*')
            -> get();
        return $clients;
    }

}
