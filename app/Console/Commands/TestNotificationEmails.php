<?php

namespace App\Console\Commands;

use App\Jobs\SendEmailNotification;
use App\Models\EmailNotification;
use App\Models\Equipment;
use App\Models\NotificationSetting;
use Illuminate\Console\Command;

class TestNotificationEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notifications:test {--type=calibration_due : Tipo de notificación a probar}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Probar envío de correos usando las configuraciones de la base de datos';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $type = $this->option('type');

        // Obtener la configuración del tipo especificado
        $setting = NotificationSetting::where('name', $type)->first();

        if (!$setting) {
            $this->error("❌ No se encontró configuración para el tipo: {$type}");
            $this->line("Tipos disponibles: calibration_due, maintenance_reminder, maintenance_completed, maintenance_overdue");
            return 1;
        }

        if (!$setting->is_active) {
            $this->error("❌ La configuración '{$type}' está desactivada");
            return 1;
        }

        // Obtener un equipo para la prueba
        $equipment = Equipment::first();

        if (!$equipment) {
            $this->error('❌ No se encontró ningún equipo en la base de datos.');
            return 1;
        }

        $this->info("🧪 PROBANDO ENVÍO DE CORREOS");
        $this->line("=====================================");
        $this->line("📋 Tipo: {$setting->name}");
        $this->line("📝 Descripción: {$setting->description}");
        $this->line("✉️  Destinatarios: " . implode(', ', $setting->email_addresses));
        $this->line("🏭 Equipo de prueba: {$equipment->instrument} ({$equipment->int_code})");

        if (!$this->confirm('¿Continuar con el envío?')) {
            $this->line('Operación cancelada.');
            return 0;
        }

        // Crear notificación usando la configuración real
        $notification = EmailNotification::create([
            'equipment_id' => $equipment->id,
            'notification_type' => $type,
            'recipients' => $setting->email_addresses,
            'subject' => "🧪 PRUEBA - {$setting->description} - {$equipment->instrument}",
            'message' => "Esta es una prueba del sistema de notificaciones.\n\nTipo: {$setting->name}\nEquipo: {$equipment->instrument} (Código: {$equipment->int_code})\n\nSi recibiste este correo, la configuración está funcionando correctamente.",
            'scheduled_at' => now(),
            'sent_at' => null,
            'status' => 'pending'
        ]);

        // Enviar el email
        SendEmailNotification::dispatch($notification);

        $this->info("✅ Correo de prueba creado y enviado");
        $this->line("📧 Notificación ID: {$notification->id}");
        $this->line("👥 Destinatarios: " . implode(', ', $setting->email_addresses));
        $this->line("📱 Para ver el correo: http://127.0.0.1:8025");
        $this->line("");
        $this->line("⏳ Ejecute 'php artisan queue:work --once' para procesar el envío");

        return 0;
    }
}
