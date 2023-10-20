<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects');
            $table->bigInteger('milestone_id')->unsigned()->nullable();
            $table->foreign('milestone_id')->references('id')->on('milestones');
            $table->bigInteger('deliverable_id')->unsigned()->nullable();
            $table->foreign('deliverable_id')->references('id')->on('deliverables');
            $table->string('type'); 
                /***
                 * STATUS_UPDATE,
                 * CHANGE,
                 *      CHANGE_MADE, CHANGE_APPROVED, CHANGE_DELIVERABLE_DENIED
                 * INVOICE_SENT
                 * INVOICE_PAID,
                ***/
            $table->string('status');
            $table->text('description')->nullable();
            $table->text('extra')->nullable();
            $table->dateTime('read_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
