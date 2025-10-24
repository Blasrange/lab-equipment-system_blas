<?php

namespace Database\Seeders;

use App\Models\Equipment;
use App\Models\MaintenanceRecord;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class MaintenanceRecordsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $equipment = Equipment::first();

        if (!$equipment) {
            return;
        }

        // Crear tareas de mantenimiento de ejemplo
        $maintenanceTasks = [
            [
                'maintenance_type_name' => 'Mantenimiento Preventivo Rutinario',
                'maintenance_category' => 'preventive',
                'scheduled_date' => Carbon::now()->addDays(3),
                'responsible_person' => 'Juan Pérez',
                'description' => 'Inspección general y limpieza del equipo. Verificar conexiones y calibración básica.',
                'priority' => 'medium',
                'status' => 'scheduled',
                'estimated_duration' => 120,
                'estimated_cost' => 50000,
                'notes' => 'Mantenimiento programado mensual'
            ],
            [
                'maintenance_type_name' => 'Calibración',
                'maintenance_category' => 'preventive',
                'scheduled_date' => Carbon::now()->addWeek(),
                'responsible_person' => 'María García',
                'description' => 'Calibración completa del equipo con patrones certificados. Verificar precisión y exactitud.',
                'priority' => 'high',
                'status' => 'scheduled',
                'estimated_duration' => 180,
                'estimated_cost' => 150000,
                'requires_external_service' => true,
                'external_provider' => 'Laboratorio Nacional de Metrología',
                'notes' => 'Calibración anual requerida'
            ],
            [
                'maintenance_type_name' => 'Limpieza Especializada',
                'maintenance_category' => 'preventive',
                'scheduled_date' => Carbon::now()->subDay(),
                'responsible_person' => 'Carlos López',
                'description' => 'Limpieza profunda de componentes internos con solventes especializados.',
                'priority' => 'low',
                'status' => 'in_progress',
                'estimated_duration' => 90,
                'estimated_cost' => 25000,
                'work_performed' => 'Iniciada limpieza de cámara principal',
                'notes' => 'En progreso desde ayer'
            ],
            [
                'maintenance_type_name' => 'Mantenimiento Correctivo',
                'maintenance_category' => 'corrective',
                'scheduled_date' => Carbon::now()->addDays(5),
                'responsible_person' => 'Ana Rodríguez',
                'description' => 'Reparación de sensor de temperatura que presenta lecturas erróneas.',
                'priority' => 'critical',
                'status' => 'scheduled',
                'estimated_duration' => 240,
                'estimated_cost' => 300000,
                'parts_needed' => 'Sensor PT100, cables de conexión',
                'notes' => 'Urgente - afecta precisión de mediciones'
            ]
        ];

        foreach ($maintenanceTasks as $task) {
            MaintenanceRecord::create(array_merge([
                'equipment_id' => $equipment->id,
                'actual_duration' => null,
                'actual_cost' => null,
            ], $task));
        }

        $this->command->info('✅ Tareas de mantenimiento de ejemplo creadas correctamente');
    }
}
