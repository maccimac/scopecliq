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
            $table->integer('receiver_type')->default(0); // 0 is consultant, 1 is client, 2  is both
            $table->integer('project_id');
            $table->bigInteger('milestone_id')->unsigned()->nullable();
            $table->bigInteger('deliverable_id')->unsigned()->nullable();
            $table->string('type'); 
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
            $table->string('status');
            $table->text('description')->nullable();
            $table->text('extra')->nullable();
            $table->dateTime('client_read_at')->nullable();
            $table->dateTime('consultant_read_at')->nullable();
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
