<?php

namespace App\Console\Commands;

use App\Models\EmailNotification;
use App\Models\NotificationSetting;
use Illuminate\Console\Command;

class CheckEmailStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'emails:status {--recent=10 : Número de correos recientes a mostrar}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verificar el estado de los correos enviados y configuraciones activas';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $recent = $this->option('recent');

        $this->info("📧 ESTADO DEL SISTEMA DE CORREOS");
        $this->line("=====================================");

        // 1. Configuraciones activas
        $this->line("");
        $this->info("🔧 CONFIGURACIONES ACTIVAS:");

        $activeSettings = NotificationSetting::where('is_active', true)->get();

        foreach ($activeSettings as $setting) {
            $emails = implode(', ', $setting->email_addresses);
            $this->line("  ✅ {$setting->name}");
            $this->line("     📝 {$setting->description}");
            $this->line("     👥 Destinatarios: {$emails}");
            $this->line("     📅 Días antes: {$setting->days_before}");
            $this->line("");
        }

        // 2. Estadísticas generales
        $this->info("📊 ESTADÍSTICAS:");
        $total = EmailNotification::count();
        $sent = EmailNotification::where('status', 'sent')->count();
        $pending = EmailNotification::where('status', 'pending')->count();
        $failed = EmailNotification::where('status', 'failed')->count();
        $today = EmailNotification::where('status', 'sent')->whereDate('sent_at', today())->count();

        $this->line("  📤 Total enviados: {$sent}/{$total}");
        $this->line("  ⏳ Pendientes: {$pending}");
        $this->line("  ❌ Fallidos: {$failed}");
        $this->line("  📅 Enviados hoy: {$today}");

        // 3. Últimos correos
        $this->line("");
        $this->info("📋 ÚLTIMOS {$recent} CORREOS:");

        $recentEmails = EmailNotification::with('equipment')
            ->orderBy('created_at', 'desc')
            ->take($recent)
            ->get();

        if ($recentEmails->isEmpty()) {
            $this->line("  (No hay correos registrados)");
        } else {
            foreach ($recentEmails as $email) {
                $status = match ($email->status) {
                    'sent' => '✅ Enviado',
                    'pending' => '⏳ Pendiente',
                    'failed' => '❌ Fallido',
                    default => '❓ Desconocido'
                };

                $recipients = is_array($email->recipients)
                    ? implode(', ', array_slice($email->recipients, 0, 2)) . (count($email->recipients) > 2 ? '...' : '')
                    : 'Sin destinatarios';

                $sentAt = $email->sent_at ? $email->sent_at->format('d/m/Y H:i') : 'No enviado';
                $equipment = $email->equipment ? $email->equipment->int_code : 'N/A';

                $this->line("  {$status} | ID: {$email->id} | {$email->notification_type}");
                $this->line("     📧 Para: {$recipients}");
                $this->line("     🏭 Equipo: {$equipment} | ⏰ {$sentAt}");
                $this->line("     📝 {$email->subject}");
                $this->line("");
            }
        }

        // 4. Verificar proceso de cola
        $this->info("🔄 PROCESO DE COLA:");
        $this->line("  💡 Para procesar correos pendientes: php artisan queue:work --once");
        $this->line("  📱 Para ver correos enviados: http://127.0.0.1:8025");

        return 0;
    }
}
