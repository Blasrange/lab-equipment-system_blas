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
        // Esta migración ya no es necesaria porque corregimos la estructura
        // en la migración original 2025_09_24_183953_create_notification_settings_table.php
        // Solo la mantenemos para compatibilidad
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notification_settings', function (Blueprint $table) {
            // Revertir cambios
            $table->dropColumn(['type', 'recipients']);

            // Restaurar columnas originales
            $table->string('name')->unique();
            $table->json('email_addresses');
            $table->string('email_template')->nullable();
            $table->json('notification_types')->default('["email"]');
        });
    }
};
