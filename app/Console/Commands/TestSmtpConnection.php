<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Exception;

class TestSmtpConnection extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'smtp:test {email : Email donde enviar la prueba}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Probar la conexión SMTP enviando un correo real';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $testEmail = $this->argument('email');

        $this->info("🔌 PROBANDO CONEXIÓN SMTP");
        $this->line("==========================");

        // Mostrar configuración actual
        $this->line("📧 Configuración actual:");
        $this->line("   Host: " . config('mail.mailers.smtp.host'));
        $this->line("   Puerto: " . config('mail.mailers.smtp.port'));
        $this->line("   Usuario: " . config('mail.mailers.smtp.username'));
        $this->line("   Encriptación: " . config('mail.mailers.smtp.encryption'));
        $this->line("   Desde: " . config('mail.from.address'));
        $this->line("");

        $this->line("📤 Enviando correo de prueba a: {$testEmail}");

        try {
            Mail::raw(
                "¡Hola! 👋\n\nEste es un correo de prueba del Sistema de Gestión de Equipos.\n\nSi recibes este mensaje, la configuración SMTP está funcionando correctamente.\n\n✅ Conexión SMTP exitosa\n📧 Sistema operativo\n\nSaludos,\nSistema de Gestión de Equipos",
                function ($message) use ($testEmail) {
                    $message->to($testEmail)
                        ->subject('🧪 Prueba de Conexión SMTP - Sistema de Equipos');
                }
            );

            $this->info("✅ ¡ÉXITO! El correo se envió correctamente.");
            $this->line("📧 Revisa tu bandeja de entrada: {$testEmail}");
            $this->line("📁 También revisa la carpeta de spam/promociones");
        } catch (Exception $e) {
            $this->error("❌ ERROR al enviar el correo:");
            $this->line("   {$e->getMessage()}");
            $this->line("");
            $this->line("🔧 Posibles soluciones:");
            $this->line("   1. Verifica las credenciales en el .env");
            $this->line("   2. Asegúrate de usar una contraseña de aplicación (no tu contraseña normal)");
            $this->line("   3. Verifica que la verificación en 2 pasos esté activada");
            $this->line("   4. Ejecuta: php artisan config:clear");

            return 1;
        }

        return 0;
    }
}
