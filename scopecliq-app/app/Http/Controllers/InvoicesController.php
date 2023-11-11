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
            ->where('i.project_id', $project_id)
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


    public function fetchInvoiceByMilestoneIdFull($milestone_id){
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
                'p.name as project_name',
                'p.about',
                'p.budget',
                'p.portal_domain',
                'o.organization_name',
                'o.organization_address',
                'o.contact_name',
                'o.contact_email',
                'o.contact_number'
            )
            ->join('milestones as m', 'm.id', '=', 'i.milestone_id')
            ->join('projects as p', 'i.project_id', '=', 'p.id')
            ->join('organizations as o', 'p.organization_id', '=', 'o.id')
            ->where('i.milestone_id', $milestone_id)
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

    public function createInvoiceOfMilestone(Request $req) {

        $exists = $this->fetchInvoiceByMilestoneId($req->milestone_id);
        if($exists){
            throw new \Exception('Invoice of this item exists already');
        }

        $milestone = DB::table('milestones')
            -> select('*')
            -> where('id', $req->milestone_id)
            -> first();
        
        $project = DB::table('projects')
        -> select('*')
        -> where('id', $milestone->project_id)
        -> first();

        $newId = DB::table('invoices')
            ->insertGetId([
            'project_id' => $milestone->project_id,
            'milestone_id' => $req->milestone_id,
            'total' => ($milestone->budget_percentage * $project->budget),
            'notes' => null,
            'datetime_generated' => now(),
            'created_at'=>now()
            ]);
        
        
        DB::table('notifications')
        ->insert([
            [   'deliverable_id' => null,
                'project_id'=> $milestone->project_id,
                'milestone_id' => $req->milestone_id,
                'type'=> 'INVOICE',
                'status'=> 'SENT',
                'description' => "Invoice has been created for $milestone->name",
                'extra' => null,
                'created_at' => now()
            ],
        ]);

        return $newId;

        
    }

    // mark as paid
    public function markInvoicePaid($id) {

        $invoice = DB::table('invoices')
            -> where('id', $id)
            ->first();
        
        DB::table('invoices')
        -> where('id', $id)
        -> update([
            'datetime_paid'=> now()
        ]);

        DB::table('notifications')
        ->insert([
            [   'deliverable_id' => null,
                'project_id'=> $invoice->project_id,
                'milestone_id' => $invoice->milestone_id,
                'type'=> 'INVOICE',
                'status'=> 'PAID',
                'description' => "Invoice has been paid for invoice #$invoice->id",
                'extra' => "Payment date: $invoice->datetime_paid",
                'created_at' => now()
            ],
        ]);

        return $invoice;
    }
    // mark as void
}
