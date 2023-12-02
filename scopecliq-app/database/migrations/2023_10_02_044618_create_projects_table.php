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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('consultant_user_id')->unsigned()->nullable();
            $table->foreign('consultant_user_id')->references('id')->on('users');
            $table->foreignId('organization_id')->constrained('organizations');
            $table->string('name');
            $table->text('about')->nullable();
            $table->decimal('budget', 20, 2);
            $table->string('portal_domain')->unique();
            $table->string('portal_password');
            $table->text('terms')->nullable();
            $table->dateTime('datetime_due')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
