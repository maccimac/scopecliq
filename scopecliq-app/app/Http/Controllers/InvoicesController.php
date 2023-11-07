<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoicesController extends Controller
{
    public function fetchInvoicesByProject($project_id){
        $invoices = DB::table('invoices as i')
            ->select(
                'i.id',
                'i.total',
                'i.project_id',
                'i.milestone_id',
                'i.datetime_generated',
                'i.datetime_paid',
                'i.datetime_void',
                'i.notes',
                'm.position',
            )
            ->join('milestones as m', 'i.milestone_id', '=', 'm.id')
            ->where('project_id', $project_id)
            ->get();
        return $invoices;

        // select i.id, i.total, i.project_id, i.milestone_id, i.datetime_generated, i.datetime_paid, i.datetime_void, i.notes, m.position from invoices as i inner join milestones as m on i.milestone_id = m.id;

        // select 
        // 	i.id, i.total, i.project_id, i.milestone_id, 
        //     i.datetime_generated, i.datetime_paid, i.datetime_void, 
        //     i.notes, 
        //     m.position,
        //     p.about,
        //     o.organization_name, o.organization_address, o.contact_name
        // from invoices as i 
        // 	inner join milestones as m 
        //     	on i.milestone_id = m.id
        //     inner join projects as p
        //     	on i.project_id = p.id
        //     inner join organizations as o
        //     	on p.organization_id = o.id
    }


    public function fetchInvoiceByInvoiceIdFull($invoice_id){
        $invoice = DB::table('invoices as i')
            ->select(
                'i.id',
                'i.total',
                'i.project_id',
                'i.milestone_id',
                'i.datetime_generated',
                'i.datetime_paid',
                'i.datetime_void',
                'i.notes',
                'm.name',
                'm.position',
                'm.budget_percentage',
                'p.about',
                'p.budget',
                'o.organization_name',
                'o.organization_address',
                'o.contact_name',
            )
            ->join('milestones as m', 'i.milestone_id', '=', 'm.id')
            ->join('projects as p', 'i.project_id', '=', 'p.id')
            ->join('organizations as o', 'p.organization_id', '=', 'o.id')
            ->where('i.id', $invoice_id)
            ->first();
        return $invoice;
    }

    public function fetchInvoiceByInvoiceId($invoice_id){
        $invoice = DB::table('invoices')
            -> select('*')
            -> where('id', $invoice_id)
            -> first();
        return $invoice;
    }


    public function fetchInvoiceByMilestoneId($milestone_id){
        $invoice = DB::table('invoices')
            -> select('*')
            -> where('milestone_id', $milestone_id)
            -> first();
        return $invoice;
    }

    public function addInvoiceOfMilestone(Request $req) {
        $newId = DB::table('invoices')
            ->insertGetId([
            'project_id' => $req->$project_id,
            'milestone_id' => $req->$milestone_id,
            'total' => $req->total,
            'description' => $req->description,
            'notes' => $req->notes,
            'datetime_generated' => now(),
            'created_at'=>now()
            ]);

        return $newId;
    }

    // mark as paid
    // mark as void
}
