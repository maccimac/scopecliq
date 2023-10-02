<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrganizationsController extends Controller
{
    //
    public function index()
    {

        $id=1;

        $updatedOrgs = DB::table('organizations')
            -> where('id', $id)
            -> update([
                'name'=> 'Company name'
            ]);



        $orgs = DB::table('organizations')
            -> select('name')
            -> where('id', $id)
            -> orWhere('id', 2)
            -> get();

            // whereBetween, whereNotNull, distinct, latest / oldest, inRandom 
            // first (only if there is result), find(id), 

            // $orgs = DB::select(
        //     'select * from organizations where id=:id', 
        //     [
        //         'id' => 1
        //     ]
        // );
        dd($orgs);
        // return view('organizations/index'); 
    }
}
