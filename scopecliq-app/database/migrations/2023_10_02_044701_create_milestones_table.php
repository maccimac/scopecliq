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
        Schema::create('milestones', function (Blueprint $table) {
            $table->id();

            $table->integer('project_id');
            $table->integer('position');
            $table->string('name');
            $table->text('description');
            $table->string('status_completion');
            $table->string('status_payment');
            $table->dateTime('datetime_started')->nullable();
            $table->dateTime('datetime_completed')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('milestones');
    }
};
