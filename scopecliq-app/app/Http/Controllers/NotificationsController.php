<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class NotificationsController extends Controller
{
    // retrieve unread notifications by project
    public function fetchNotificationById($id){
        $notification = DB::table('notifications')
        -> select('*')
        -> where('id', $id)
        -> first();
        return $notification;
    }

    public function fetchNotificationsByProject($project_id){
        $notifications = DB::table('notifications')
        -> select('*')
        -> where('project_id', $project_id)
        -> where('read_at', null)
        ->orderByDesc('created_at')
        -> get();
        return $notifications;
    }

    public function markNotificationAsRead($id) {
        $notification = DB::table('notifications')
            -> where('id', $id)
            -> update([
                'read_at'=> now()
            ]);
        return $notification;
    }


    // markaAsRead
    

    
}
