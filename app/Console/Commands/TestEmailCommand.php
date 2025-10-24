<?php

namespace App\Console\Commands;

use App\Jobs\SendEmailNotification;
use App\Models\EmailNotification;
use App\Models\Equipment;
use Illuminate\Console\Command;

class TestEmailCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:test {--email=test@example.com}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Enviar un email de prueba para verificar la configuración';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->option('email');

        // Obtener un equipo para la prueba
        $equipment = Equipment::first();

        if (!$equipment) {
            $this->error('No se encontró ningún equipo en la base de datos.');
            return 1;
        }

        // Crear notificación de prueba
        $notification = EmailNotification::create([
            'equipment_id' => $equipment->id,
            'notification_type' => 'test',
            'recipients' => [$email],
            'subject' => '🔬 Correo de Prueba - Sistema de Gestión de Equipos',
            'message' => 'Este es un correo de prueba para verificar que el sistema de notificaciones funciona correctamente.',
            'scheduled_at' => now(),
            'sent_at' => null,
            'status' => 'pending'
        ]);

        // Enviar el email
        SendEmailNotification::dispatch($notification);

        $this->info("✅ Email de prueba enviado a: {$email}");
        $this->info("📋 Notificación ID: {$notification->id}");
        $this->info("🔧 Equipo usado: {$equipment->instrument} ({$equipment->int_code})");
        $this->line("📧 Para ver el correo, abra: http://127.0.0.1:8025");

        return 0;
    }
}
