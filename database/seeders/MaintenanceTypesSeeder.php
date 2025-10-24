<?php

namespace Database\Seeders;

use App\Models\MaintenanceType;
use Illuminate\Database\Seeder;

class MaintenanceTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $maintenanceTypes = [
            [
                'name' => 'Mantenimiento Preventivo Rutinario',
                'description' => 'Inspección y limpieza general del equipo',
                'category' => 'preventive',
                'estimated_duration' => 60, // Cambio: sin '_minutes'
                'estimated_cost' => 0,
                'requires_external_service' => false,
                'frequency' => 'monthly',
                'required_tools' => ['Paños', 'Alcohol isopropílico', 'Herramientas básicas'],
                'required_parts' => [], // Nueva columna de la migración
                'instructions' => 'Realizar inspección visual y limpieza superficial del equipo',
                'active' => true
            ],
            [
                'name' => 'Mantenimiento Preventivo Profundo',
                'description' => 'Revisión completa de componentes internos',
                'category' => 'preventive',
                'estimated_duration' => 180,
                'estimated_cost' => 50000,
                'requires_external_service' => false,
                'frequency' => 'quarterly',
                'required_tools' => ['Multímetro', 'Destornilladores', 'Herramientas especializadas'],
                'required_parts' => ['Filtros', 'Fusibles', 'Sellos'],
                'instructions' => 'Desmontar componentes principales, revisar conexiones eléctricas y mecánicas',
                'active' => true
            ],
            [
                'name' => 'Mantenimiento Correctivo',
                'description' => 'Reparación de fallas o averías',
                'category' => 'corrective',
                'estimated_duration' => 120,
                'estimated_cost' => 100000,
                'requires_external_service' => true,
                'frequency' => 'as_needed',
                'required_tools' => ['Kit de diagnóstico', 'Herramientas de reparación'],
                'required_parts' => ['Repuestos varios', 'Componentes electrónicos'],
                'instructions' => 'Diagnosticar falla, identificar componente defectuoso y proceder con reparación',
                'active' => true
            ],
            [
                'name' => 'Limpieza Especializada',
                'description' => 'Limpieza profunda con protocolos específicos',
                'category' => 'preventive',
                'estimated_duration' => 90,
                'estimated_cost' => 25000,
                'requires_external_service' => false,
                'frequency' => 'weekly',
                'required_tools' => ['Productos químicos especializados', 'Equipos de limpieza', 'EPP'],
                'required_parts' => ['Filtros desechables', 'Paños especializados'],
                'instructions' => 'Seguir protocolo de limpieza específico según tipo de equipo',
                'active' => true
            ],
            [
                'name' => 'Calibración',
                'description' => 'Ajuste y verificación de precisión',
                'category' => 'preventive',
                'estimated_duration' => 150,
                'estimated_cost' => 200000,
                'requires_external_service' => true,
                'frequency' => 'yearly',
                'required_tools' => ['Patrones de referencia', 'Equipos de medición'],
                'required_parts' => ['Certificados de calibración'],
                'instructions' => 'Realizar calibración según procedimientos metrológicos estándar',
                'active' => true
            ],
            [
                'name' => 'Validación',
                'description' => 'Verificación de cumplimiento normativo',
                'category' => 'predictive',
                'estimated_duration' => 240,
                'estimated_cost' => 300000,
                'requires_external_service' => true,
                'frequency' => 'yearly',
                'required_tools' => ['Documentos normativos', 'Software especializado', 'Equipos de prueba'],
                'required_parts' => ['Documentación técnica', 'Certificados'],
                'instructions' => 'Verificar cumplimiento con normas aplicables y documentar resultados',
                'active' => true
            ]
        ];

        foreach ($maintenanceTypes as $type) {
            MaintenanceType::create($type);
        }
    }
}