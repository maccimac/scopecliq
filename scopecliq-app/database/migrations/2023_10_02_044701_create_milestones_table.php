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
            $table->foreignId('project_id')->constrained('projects');
            $table->integer('position');
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('budget_percentage');
            $table->string('status_completion')->nullable();
            $table->string('status_invoice')->nullable();
            $table->dateTime('datetime_started')->nullable();
            $table->dateTime('datetime_completed')->nullable();
            $table->dateTime('datetime_due')->nullable();
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
