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
        Schema::create('notification_settings', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // maintenance_reminder, calibration_due, etc.
            $table->string('description');
            $table->boolean('is_active')->default(true);
            $table->integer('days_before')->default(7); // Días antes para enviar notificación
            $table->json('email_addresses')->nullable(); // Array de correos
            $table->string('email_template')->nullable(); // Template de email
            $table->json('notification_types')->default('["email"]'); // Tipos de notificación
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification_settings');
    }
};
