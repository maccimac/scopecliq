<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class NotificationsController extends Controller
{
    
    // STATUS_UPDATE' : {
    //     COMPLETE: `✅ ${attachmentType} has been completed`,
    //     INCOMPLETE: `⚪️ Hmm.  A ${attachmentType} has been marked incomplete`,
    // },
    // 'INVOICE':{
    //     SENT: '📬 Invoice has been sent',
    //     PAID: '💸 Invoice has been paid',
    // },
    // 'CHANGE':{
    //     'MADE': `✏️ ${attachmentType} has been changed`,
    //     'CREATED': `✨ ${attachmentType} has been added`,
    //     'DELETED': `🗑  ${attachmentType} deleted`,
    // }
            
    public function addNotificationToProject(Request $req, $project_id){
        DB::table('notifications')
            ->insert([
            [   'deliverable_id' => $req->deliverable_id,
                'project_id'=> $project_id,
                'milestone_id' => $req->milestone_id,
                'type'=> $req->type,
                'status'=> $req->status,
                'description' => $req->description,
                'extra' => $req->extra,
                'created_at' => now()
            ],
        ]);
    }

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
        -> where('client_read_at', null)
        -> orderByDesc('created_at')
        -> get();
        return $notifications;
    }

    public function fetchNotificationsByProjectAsConsultant($project_id){
        $notifications = DB::table('notifications')
        -> select('*')
        -> where('project_id', $project_id)
        -> where('receiver_type', 1)
        -> where('client_read_at', null)
        -> orderByDesc('created_at')
        -> get();
        return $notifications;
    }

    public function markNotificationAsRead($id) {
        $notification = DB::table('notifications')
            -> where('id', $id)
            -> update([
                'client_read_at'=> now()
            ]);
        return $notification;
    }


    

    
}
