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
            $table->integer('project_id');
            $table->integer('milestone_id')->nullable();
            $table->integer('deliverable_id')->nullable();
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