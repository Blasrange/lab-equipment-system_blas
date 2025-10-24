<?php

namespace App\Jobs;

use App\Models\EmailNotification;
use App\Mail\MaintenanceNotificationMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendEmailNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;
    public $backoff = [60, 300, 900]; // 1 min, 5 min, 15 min

    protected $emailNotification;

    /**
     * Create a new job instance.
     */
    public function __construct(EmailNotification $emailNotification)
    {
        $this->emailNotification = $emailNotification;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Log::info('Enviando notificación de email', [
                'notification_id' => $this->emailNotification->id,
                'type' => $this->emailNotification->notification_type,
                'recipients' => $this->emailNotification->recipients,
            ]);

            // Crear el mail
            $mail = new MaintenanceNotificationMail(
                $this->emailNotification->subject,
                $this->emailNotification->message,
                $this->emailNotification->equipment,
                $this->emailNotification->maintenanceRecord
            );

            // Enviar a todos los destinatarios
            foreach ($this->emailNotification->recipients as $email) {
                Mail::to($email)->send($mail);
            }

            // Marcar como enviado
            $this->emailNotification->markAsSent();

            Log::info('Notificación enviada exitosamente', [
                'notification_id' => $this->emailNotification->id,
            ]);
        } catch (\Exception $e) {
            Log::error('Error enviando notificación', [
                'notification_id' => $this->emailNotification->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            $this->emailNotification->markAsFailed($e->getMessage());
            throw $e;
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('Job de notificación falló permanentemente', [
            'notification_id' => $this->emailNotification->id,
            'error' => $exception->getMessage(),
        ]);

        $this->emailNotification->markAsFailed($exception->getMessage());
    }
}
