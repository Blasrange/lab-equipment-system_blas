<?php

namespace App\Services;

use App\Models\Equipment;
use App\Models\EmailNotification;
use App\Models\MaintenanceRecord;
use App\Models\NotificationSetting;
use App\Jobs\SendEmailNotification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    /**
     * Crear notificación de calibración próxima a vencer
     */
    public function createCalibrationDueNotification(Equipment $equipment): void
    {
        $setting = NotificationSetting::getByName('calibration_due');

        if (!$setting || !$setting->hasEmailNotifications()) {
            return;
        }

        $nextCalibration = Carbon::parse($equipment->next_ext_calibration);
        $daysUntilDue = Carbon::now('America/Bogota')->diffInDays($nextCalibration, false);

        // Solo crear notificación si está dentro del rango configurado
        if ($daysUntilDue > $setting->days_before || $daysUntilDue < 0) {
            return;
        }

        $subject = "⚠️ Calibración Externa Próxima a Vencer - {$equipment->instrument}";

        if ($daysUntilDue <= 0) {
            $message = "La calibración externa del equipo {$equipment->instrument} (Código: {$equipment->int_code}) ha VENCIDO.\n\n";
            $message .= "Fecha de vencimiento: {$nextCalibration->format('d/m/Y')}\n";
            $message .= "Es necesario realizar la calibración externa de manera URGENTE.";
        } else {
            $message = "La calibración externa del equipo {$equipment->instrument} (Código: {$equipment->int_code}) vence en {$daysUntilDue} día(s).\n\n";
            $message .= "Fecha de vencimiento: {$nextCalibration->format('d/m/Y')}\n";
            $message .= "Por favor, programa la calibración externa lo antes posible.";
        }

        $this->createEmailNotification(
            $equipment,
            null,
            'calibration_due',
            $subject,
            $message,
            $setting->email_addresses
        );
    }

    /**
     * Crear notificación de mantenimiento próximo
     */
    public function createMaintenanceReminderNotification(MaintenanceRecord $maintenance): void
    {
        $setting = NotificationSetting::getByName('maintenance_reminder');

        if (!$setting || !$setting->hasEmailNotifications()) {
            return;
        }

        $scheduledDate = Carbon::parse($maintenance->scheduled_date);
        $daysUntilDue = Carbon::now('America/Bogota')->diffInDays($scheduledDate, false);

        // Solo crear notificación si está dentro del rango configurado
        if ($daysUntilDue > $setting->days_before || $daysUntilDue < 0) {
            return;
        }

        $equipment = $maintenance->equipment;
        $subject = "📅 Recordatorio: Mantenimiento Programado - {$equipment->instrument}";

        $message = "Tienes un mantenimiento programado para el equipo {$equipment->instrument} (Código: {$equipment->int_code}).\n\n";
        $message .= "Tipo de mantenimiento: {$maintenance->maintenance_type_name}\n";
        $message .= "Fecha programada: {$scheduledDate->format('d/m/Y H:i')}\n";
        $message .= "Prioridad: " . ucfirst($maintenance->priority) . "\n\n";

        if ($maintenance->description) {
            $message .= "Descripción: {$maintenance->description}\n\n";
        }

        $message .= "Por favor, asegúrate de completar este mantenimiento a tiempo.";

        $this->createEmailNotification(
            $equipment,
            $maintenance,
            'maintenance_reminder',
            $subject,
            $message,
            $setting->email_addresses
        );
    }

    /**
     * Crear notificación de mantenimiento completado
     */
    public function createMaintenanceCompletedNotification(MaintenanceRecord $maintenance): void
    {
        $setting = NotificationSetting::getByName('maintenance_completed');

        if (!$setting || !$setting->hasEmailNotifications()) {
            return;
        }

        $equipment = $maintenance->equipment;
        $subject = "✅ Mantenimiento Completado - {$equipment->instrument}";

        $message = "Se ha completado el mantenimiento del equipo {$equipment->instrument} (Código: {$equipment->int_code}).\n\n";
        $message .= "Tipo de mantenimiento: {$maintenance->maintenance_type_name}\n";
        $message .= "Fecha de realización: " . ($maintenance->performed_date ? Carbon::parse($maintenance->performed_date)->format('d/m/Y H:i') : 'No especificada') . "\n";
        $message .= "Responsable: {$maintenance->responsible_person}\n\n";

        if ($maintenance->work_performed) {
            $message .= "Trabajo realizado: {$maintenance->work_performed}\n\n";
        }

        if ($maintenance->findings) {
            $message .= "Hallazgos: {$maintenance->findings}\n\n";
        }

        if ($maintenance->recommendations) {
            $message .= "Recomendaciones: {$maintenance->recommendations}\n\n";
        }

        $message .= "El equipo está listo para su uso normal.";

        $this->createEmailNotification(
            $equipment,
            $maintenance,
            'maintenance_completed',
            $subject,
            $message,
            $setting->email_addresses
        );
    }

    /**
     * Crear notificación de mantenimiento vencido
     */
    public function createOverdueMaintenanceNotification(MaintenanceRecord $maintenance): void
    {
        $setting = NotificationSetting::getByName('maintenance_overdue');

        if (!$setting || !$setting->hasEmailNotifications()) {
            return;
        }

        $equipment = $maintenance->equipment;
        $scheduledDate = Carbon::parse($maintenance->scheduled_date);
        $daysOverdue = Carbon::now('America/Bogota')->diffInDays($scheduledDate);

        $subject = "🚨 Mantenimiento VENCIDO - {$equipment->instrument}";

        $message = "ATENCIÓN: El mantenimiento del equipo {$equipment->instrument} (Código: {$equipment->int_code}) está VENCIDO.\n\n";
        $message .= "Tipo de mantenimiento: {$maintenance->maintenance_type_name}\n";
        $message .= "Fecha programada: {$scheduledDate->format('d/m/Y H:i')}\n";
        $message .= "Días de retraso: {$daysOverdue}\n";
        $message .= "Prioridad: " . ucfirst($maintenance->priority) . "\n\n";
        $message .= "Es URGENTE completar este mantenimiento lo antes posible.";

        $this->createEmailNotification(
            $equipment,
            $maintenance,
            'maintenance_overdue',
            $subject,
            $message,
            $setting->email_addresses
        );
    }

    /**
     * Crear una notificación de email en la base de datos
     */
    private function createEmailNotification(
        Equipment $equipment,
        ?MaintenanceRecord $maintenance,
        string $type,
        string $subject,
        string $message,
        array $recipients
    ): void {
        try {
            // Verificar si ya existe una notificación similar reciente (últimas 24 horas)
            $existingNotification = EmailNotification::where('equipment_id', $equipment->id)
                ->where('notification_type', $type)
                ->where('created_at', '>=', Carbon::now('America/Bogota')->subDay())
                ->first();

            if ($existingNotification) {
                Log::info('Notificación duplicada evitada', [
                    'equipment_id' => $equipment->id,
                    'type' => $type,
                ]);
                return;
            }

            // Crear la notificación
            $notification = EmailNotification::create([
                'equipment_id' => $equipment->id,
                'maintenance_record_id' => $maintenance?->id,
                'notification_type' => $type,
                'subject' => $subject,
                'message' => $message,
                'recipients' => $recipients,
                'scheduled_at' => Carbon::now('America/Bogota'),
            ]);

            // Enviar inmediatamente
            SendEmailNotification::dispatch($notification);

            Log::info('Notificación de email creada y programada', [
                'notification_id' => $notification->id,
                'equipment_id' => $equipment->id,
                'type' => $type,
            ]);
        } catch (\Exception $e) {
            Log::error('Error creando notificación de email', [
                'equipment_id' => $equipment->id,
                'type' => $type,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Procesar todas las notificaciones pendientes
     */
    public function processAllPendingNotifications(): void
    {
        // Procesar calibraciones próximas a vencer
        $this->processCalibrationDueNotifications();

        // Procesar recordatorios de mantenimientos
        $this->processMaintenanceReminders();

        // Procesar mantenimientos vencidos
        $this->processOverdueMaintenances();
    }

    /**
     * Procesar notificaciones de calibraciones próximas a vencer
     */
    private function processCalibrationDueNotifications(): void
    {
        $setting = NotificationSetting::getByName('calibration_due');

        if (!$setting || !$setting->hasEmailNotifications()) {
            return;
        }

        $equipments = Equipment::where('active', true)
            ->whereNotNull('next_ext_calibration')
            ->where('next_ext_calibration', '<=', Carbon::now('America/Bogota')->addDays($setting->days_before))
            ->get();

        foreach ($equipments as $equipment) {
            $this->createCalibrationDueNotification($equipment);
        }
    }

    /**
     * Procesar recordatorios de mantenimientos
     */
    private function processMaintenanceReminders(): void
    {
        $setting = NotificationSetting::getByName('maintenance_reminder');

        if (!$setting || !$setting->hasEmailNotifications()) {
            return;
        }

        $maintenances = MaintenanceRecord::where('status', 'scheduled')
            ->where('scheduled_date', '<=', Carbon::now('America/Bogota')->addDays($setting->days_before))
            ->where('scheduled_date', '>=', Carbon::now('America/Bogota'))
            ->get();

        foreach ($maintenances as $maintenance) {
            $this->createMaintenanceReminderNotification($maintenance);
        }
    }

    /**
     * Procesar mantenimientos vencidos
     */
    private function processOverdueMaintenances(): void
    {
        $setting = NotificationSetting::getByName('maintenance_overdue');

        if (!$setting || !$setting->hasEmailNotifications()) {
            return;
        }

        $maintenances = MaintenanceRecord::where('status', 'scheduled')
            ->where('scheduled_date', '<', Carbon::now('America/Bogota'))
            ->get();

        foreach ($maintenances as $maintenance) {
            $this->createOverdueMaintenanceNotification($maintenance);
        }
    }
}
