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
        Schema::create('maintenance_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipment_id')->constrained()->onDelete('cascade');
            $table->string('maintenance_type_name');
            $table->enum('maintenance_category', ['preventive', 'corrective', 'predictive']);
            $table->date('scheduled_date');
            $table->date('performed_date')->nullable();
            $table->string('responsible_person');
            $table->text('description');
            $table->enum('priority', ['low', 'medium', 'high', 'critical'])->default('medium');
            $table->enum('status', ['scheduled', 'in_progress', 'completed', 'cancelled', 'postponed'])->default('scheduled');

            // Campos para el seguimiento del mantenimiento
            $table->integer('actual_duration')->nullable(); // en minutos
            $table->decimal('actual_cost', 10, 2)->nullable();
            $table->text('work_performed')->nullable();
            $table->text('findings')->nullable();
            $table->text('recommendations')->nullable();
            $table->text('notes')->nullable();

            // Campos para mantenimiento externo
            $table->boolean('requires_external_service')->default(false);
            $table->string('external_provider')->nullable();
            $table->text('parts_needed')->nullable();
            $table->json('parts_used')->nullable();

            // Campos de seguimiento
            $table->timestamp('completed_at')->nullable();
            $table->foreignId('completed_by')->nullable()->constrained('users');
            $table->string('completion_status')->nullable(); // 'successful', 'partial', 'failed'

            $table->timestamps();

            // Índices para mejorar rendimiento
            $table->index(['equipment_id', 'scheduled_date']);
            $table->index(['status', 'priority']);
            $table->index('maintenance_category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_records');
    }
};
