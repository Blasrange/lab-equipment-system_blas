<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Equipment;
use Carbon\Carbon;

class EquipmentSeeder extends Seeder
{
    public function run(): void
    {
        $equipments = [
            [
                'instrument' => 'Balanza Analítica',
                'int_code' => 'BAL-001',
                'brand' => 'Mettler Toledo',
                'model' => 'XS205DU',
                'serial_number' => 'MT2023001',
                'system_number' => 'SYS-001',
                'ext_calibration_periodicity' => 12, // 12 meses
                'internal_check_periodicity' => 3, // 3 meses
                'active' => true,
                'last_ext_calibration' => Carbon::now()->subMonths(10)->format('Y-m-d'),
                'next_ext_calibration' => Carbon::now()->addDays(5)->format('Y-m-d'), // Próxima a vencer
            ],
            [
                'instrument' => 'Espectrofotómetro UV-Vis',
                'int_code' => 'ESP-001',
                'brand' => 'Agilent',
                'model' => 'Cary 60',
                'serial_number' => 'AG2023002',
                'system_number' => 'SYS-002',
                'ext_calibration_periodicity' => 12,
                'internal_check_periodicity' => 6,
                'active' => true,
                'last_ext_calibration' => Carbon::now()->subMonths(8)->format('Y-m-d'),
                'next_ext_calibration' => Carbon::now()->addDays(15)->format('Y-m-d'),
            ],
            [
                'instrument' => 'pH Metro',
                'int_code' => 'PHM-001',
                'brand' => 'Hanna Instruments',
                'model' => 'HI-2020',
                'serial_number' => 'HI2023003',
                'system_number' => 'SYS-003',
                'ext_calibration_periodicity' => 6,
                'internal_check_periodicity' => 1,
                'active' => true,
                'last_ext_calibration' => Carbon::now()->subMonths(6)->format('Y-m-d'),
                'next_ext_calibration' => Carbon::now()->addDays(3)->format('Y-m-d'), // Próxima a vencer urgente
            ],
            [
                'instrument' => 'Cromatógrafo Líquido',
                'int_code' => 'HPLC-001',
                'brand' => 'Waters',
                'model' => 'Alliance 2695',
                'serial_number' => 'WT2023004',
                'system_number' => 'SYS-004',
                'ext_calibration_periodicity' => 12,
                'internal_check_periodicity' => 3,
                'active' => true,
                'last_ext_calibration' => Carbon::now()->subMonth()->format('Y-m-d'),
                'next_ext_calibration' => Carbon::now()->addMonths(2)->format('Y-m-d'),
            ],
            [
                'instrument' => 'Microscopio Óptico',
                'int_code' => 'MIC-001',
                'brand' => 'Olympus',
                'model' => 'BX53',
                'serial_number' => 'OL2023005',
                'system_number' => 'SYS-005',
                'ext_calibration_periodicity' => 24,
                'internal_check_periodicity' => 6,
                'active' => true,
                'last_ext_calibration' => Carbon::now()->subYear()->format('Y-m-d'),
                'next_ext_calibration' => Carbon::now()->subDays(2)->format('Y-m-d'), // VENCIDO
            ],
        ];

        foreach ($equipments as $equipment) {
            Equipment::updateOrCreate(
                ['int_code' => $equipment['int_code']],
                $equipment
            );
        }

        $this->command->info('✅ Equipos de prueba creados exitosamente');
    }
}
