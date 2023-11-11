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
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();

            $table->string('organization_name');
            $table->string('contact_name');
            $table->string('contact_number');
            $table->string('contact_email')->unique();
            $table->text('contact_about');
            $table->string('organization_logo')->nullable();
            $table->text('organization_address')->nullable();

            // $table->boolean('is_consultant')->default(false);
            $table->bigInteger('consultant_user_id')->unsigned()->nullable();
            $table->foreign('consultant_user_id')->references('id')->on('users')->onDelete('set null'); // Set the onDelete action
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logo');
    }
};
