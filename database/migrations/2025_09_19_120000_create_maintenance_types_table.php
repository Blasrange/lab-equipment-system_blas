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
        Schema::create('maintenance_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('category', ['preventive', 'corrective', 'predictive']);
            $table->integer('estimated_duration')->nullable(); // en minutos
            $table->decimal('estimated_cost', 10, 2)->nullable();
            $table->boolean('requires_external_service')->default(false);
            $table->string('frequency')->nullable(); // ej: 'monthly', 'quarterly', etc.
            $table->json('required_tools')->nullable();
            $table->json('required_parts')->nullable();
            $table->text('instructions')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_types');
    }
};
