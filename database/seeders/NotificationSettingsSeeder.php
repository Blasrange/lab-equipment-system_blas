<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NotificationSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            [
                'name' => 'calibration_due',
                'description' => 'Notificación cuando una calibración externa está próxima a vencer',
                'is_active' => true,
                'days_before' => 7,
                'email_addresses' => ['admin@laboratorio.com', 'mantenimiento@laboratorio.com'],
                'notification_types' => ['email'],
                'email_template' => 'maintenance-notification',
            ],
            [
                'name' => 'maintenance_reminder',
                'description' => 'Recordatorio de mantenimientos programados',
                'is_active' => true,
                'days_before' => 3,
                'email_addresses' => ['admin@laboratorio.com', 'mantenimiento@laboratorio.com'],
                'notification_types' => ['email'],
                'email_template' => 'maintenance-notification',
            ],
            [
                'name' => 'maintenance_completed',
                'description' => 'Notificación cuando se completa un mantenimiento',
                'is_active' => true,
                'days_before' => 0,
                'email_addresses' => ['admin@laboratorio.com', 'supervisor@laboratorio.com'],
                'notification_types' => ['email'],
                'email_template' => 'maintenance-notification',
            ],
            [
                'name' => 'maintenance_overdue',
                'description' => 'Notificación de mantenimientos vencidos',
                'is_active' => true,
                'days_before' => 0,
                'email_addresses' => ['admin@laboratorio.com', 'gerencia@laboratorio.com'],
                'notification_types' => ['email'],
                'email_template' => 'maintenance-notification',
            ],
        ];

        foreach ($settings as $setting) {
            \App\Models\NotificationSetting::updateOrCreate(
                ['name' => $setting['name']],
                $setting
            );
        }

        $this->command->info('✅ Configuraciones de notificaciones creadas exitosamente');
    }
}