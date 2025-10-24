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
        Schema::create('email_notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipment_id')->constrained()->onDelete('cascade');
            $table->foreignId('maintenance_record_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('notification_type'); // calibration_due, maintenance_reminder, maintenance_completed
            $table->string('subject');
            $table->text('message');
            $table->json('recipients'); // Array de emails
            $table->enum('status', ['pending', 'sent', 'failed'])->default('pending');
            $table->datetime('scheduled_at'); // Cuándo debe enviarse
            $table->datetime('sent_at')->nullable(); // Cuándo se envió
            $table->text('error_message')->nullable(); // Si falló, por qué
            $table->integer('attempts')->default(0); // Intentos de envío
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_notifications');
    }
};
