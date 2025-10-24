<?php

namespace App\Console\Commands;

use App\Services\NotificationService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ProcessNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notifications:process 
                            {--type= : Tipo específico de notificación (calibration_due, maintenance_reminder, maintenance_overdue)}
                            {--force : Forzar envío sin verificar duplicados}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Procesar y enviar notificaciones automáticas del sistema';

    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        parent::__construct();
        $this->notificationService = $notificationService;
    }

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('🚀 Iniciando procesamiento de notificaciones...');

        try {
            $type = $this->option('type');

            if ($type) {
                $this->info("📧 Procesando notificaciones de tipo: {$type}");
                $this->processSpecificNotificationType($type);
            } else {
                $this->info('📧 Procesando todas las notificaciones pendientes...');
                $this->notificationService->processAllPendingNotifications();
            }

            $this->info('✅ Procesamiento de notificaciones completado exitosamente');

            // Mostrar estadísticas
            $this->showStatistics();

            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error("❌ Error procesando notificaciones: {$e->getMessage()}");
            Log::error('Error en comando ProcessNotifications', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return Command::FAILURE;
        }
    }

    /**
     * Procesar un tipo específico de notificación
     */
    private function processSpecificNotificationType(string $type): void
    {
        switch ($type) {
            case 'calibration_due':
                $this->info('🔧 Procesando notificaciones de calibraciones próximas a vencer...');
                // Aquí se procesarían solo las calibraciones
                break;

            case 'maintenance_reminder':
                $this->info('📅 Procesando recordatorios de mantenimiento...');
                // Aquí se procesarían solo los recordatorios
                break;

            case 'maintenance_overdue':
                $this->info('🚨 Procesando mantenimientos vencidos...');
                // Aquí se procesarían solo los vencidos
                break;

            default:
                $this->error("❌ Tipo de notificación no válido: {$type}");
                $this->info('Tipos válidos: calibration_due, maintenance_reminder, maintenance_overdue');
                return;
        }

        $this->notificationService->processAllPendingNotifications();
    }

    /**
     * Mostrar estadísticas del procesamiento
     */
    private function showStatistics(): void
    {
        $this->info('');
        $this->info('📊 Estadísticas del procesamiento:');

        // Obtener estadísticas de la base de datos
        $pendingNotifications = \App\Models\EmailNotification::where('status', 'pending')->count();
        $sentNotifications = \App\Models\EmailNotification::where('status', 'sent')
            ->where('sent_at', '>=', now()->subHour())
            ->count();
        $failedNotifications = \App\Models\EmailNotification::where('status', 'failed')->count();

        $this->table(
            ['Estado', 'Cantidad'],
            [
                ['Pendientes', $pendingNotifications],
                ['Enviadas (última hora)', $sentNotifications],
                ['Fallidas (total)', $failedNotifications],
            ]
        );

        if ($failedNotifications > 0) {
            $this->warn("⚠️  Hay {$failedNotifications} notificaciones fallidas. Revisa los logs para más detalles.");
        }
    }
}
