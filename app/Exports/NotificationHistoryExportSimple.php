<?php

namespace App\Exports;

use App\Models\EmailNotification;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class NotificationHistoryExportSimple implements FromCollection, WithHeadings, WithMapping, WithStyles, WithColumnWidths
{
    protected $startDate;
    protected $endDate;

    public function __construct($startDate, $endDate)
    {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function collection()
    {
        return EmailNotification::with(['equipment', 'maintenanceRecord'])
            ->whereDate('created_at', '>=', $this->startDate)
            ->whereDate('created_at', '<=', $this->endDate)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Fecha Creación',
            'Tipo de Notificación',
            'Equipo',
            'Código Interno',
            'Asunto',
            'Destinatarios',
            'Estado',
            'Fecha Envío',
            'Error',
        ];
    }

    public function map($notification): array
    {
        return [
            $notification->id,
            $notification->created_at ? $notification->created_at->format('d/m/Y H:i') : '',
            $this->getNotificationTypeLabel($notification->notification_type),
            $notification->equipment ? $notification->equipment->instrument : 'N/A',
            $notification->equipment ? $notification->equipment->int_code : 'N/A',
            $notification->subject,
            is_array($notification->recipients) ? implode(', ', $notification->recipients) : $notification->recipients,
            $this->getStatusLabel($notification->status),
            $notification->sent_at ? \Carbon\Carbon::parse($notification->sent_at)->format('d/m/Y H:i') : '',
            $notification->error_message ?? '',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => [
                'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
                'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '2563EB']],
                'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
            ],
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 8,
            'B' => 18,
            'C' => 25,
            'D' => 30,
            'E' => 15,
            'F' => 40,
            'G' => 35,
            'H' => 12,
            'I' => 18,
            'J' => 30,
        ];
    }

    private function getNotificationTypeLabel($type)
    {
        $labels = [
            'calibration_due' => 'Calibración Próxima',
            'maintenance_reminder' => 'Recordatorio Mantenimiento',
            'maintenance_completed' => 'Mantenimiento Completado',
            'maintenance_overdue' => 'Mantenimiento Vencido',
            'test' => 'Prueba'
        ];

        return $labels[$type] ?? $type;
    }

    private function getStatusLabel($status)
    {
        $labels = [
            'pending' => 'Pendiente',
            'sent' => 'Enviado',
            'failed' => 'Fallido'
        ];

        return $labels[$status] ?? $status;
    }
}
