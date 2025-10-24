<?php

namespace App\Exports;

use App\Models\Equipment;
use App\Models\MaintenanceRecord;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Font;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use Carbon\Carbon;

class EquipmentHistoryExport implements FromCollection, WithHeadings, WithStyles, WithColumnWidths, WithTitle, ShouldAutoSize
{
    protected $startDate;
    protected $endDate;

    public function __construct($startDate, $endDate)
    {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        // Obtener equipos con sus mantenimientos en el rango de fechas usando whereDate
        $equipments = Equipment::with(['maintenanceRecords' => function ($query) {
            $query->where(function ($subQuery) {
                $subQuery->whereDate('scheduled_date', '>=', $this->startDate)
                    ->whereDate('scheduled_date', '<=', $this->endDate);
            })->orWhere(function ($subQuery) {
                $subQuery->whereDate('performed_date', '>=', $this->startDate)
                    ->whereDate('performed_date', '<=', $this->endDate);
            });
        }])->get();

        $data = collect();

        foreach ($equipments as $equipment) {
            if ($equipment->maintenanceRecords->count() > 0) {
                foreach ($equipment->maintenanceRecords as $maintenance) {
                    $data->push([
                        'ID Equipo' => $equipment->id,
                        'Instrumento' => $equipment->instrument,
                        'Código Interno' => $equipment->int_code,
                        'Marca' => $equipment->brand,
                        'Modelo' => $equipment->model,
                        'N° Serie' => $equipment->serial_number,
                        'N° Sistema' => $equipment->system_number,
                        'Periodicidad Cal. Ext.' => $equipment->ext_calibration_periodicity,
                        'Últ. Cal. Externa' => $equipment->last_ext_calibration ?
                            Carbon::parse($equipment->last_ext_calibration)->format('d/m/Y') : '',
                        'Próx. Cal. Externa' => $equipment->next_ext_calibration ?
                            Carbon::parse($equipment->next_ext_calibration)->format('d/m/Y') : '',
                        'Estado Equipo' => $equipment->active ? 'Activo' : 'Inactivo',
                        'Tipo Mantenimiento' => $maintenance->maintenance_type_name,
                        'Categoría' => $this->getCategoryLabel($maintenance->maintenance_category),
                        'Fecha Programada' => $maintenance->scheduled_date ?
                            Carbon::parse($maintenance->scheduled_date)->format('d/m/Y') : '',
                        'Fecha Realizada' => $maintenance->performed_date ?
                            Carbon::parse($maintenance->performed_date)->format('d/m/Y') : '',
                        'Estado Mantenimiento' => $this->getStatusLabel($maintenance->status),
                        'Prioridad' => $this->getPriorityLabel($maintenance->priority),
                        'Responsable' => $maintenance->responsible_person ?? '',
                        'Descripción' => $maintenance->description ?? '',
                        'Trabajo Realizado' => $maintenance->work_performed ?? '',
                        'Hallazgos' => $maintenance->findings ?? '',
                        'Recomendaciones' => $maintenance->recommendations ?? '',
                        'Notas' => $maintenance->notes ?? '',
                    ]);
                }
            }
            // Comentamos esta parte para mostrar solo equipos con mantenimientos en el período
            // Si se desea incluir equipos sin mantenimientos, descomentar:
            /*
            else {
                // Si no tiene mantenimientos en el rango, mostrar solo la info del equipo
                $data->push([
                    'ID Equipo' => $equipment->id,
                    'Instrumento' => $equipment->instrument,
                    'Código Interno' => $equipment->int_code,
                    'Marca' => $equipment->brand,
                    'Modelo' => $equipment->model,
                    'N° Serie' => $equipment->serial_number,
                    'N° Sistema' => $equipment->system_number,
                    'Periodicidad Cal. Ext.' => $equipment->ext_calibration_periodicity,
                    'Últ. Cal. Externa' => $equipment->last_ext_calibration ?
                        Carbon::parse($equipment->last_ext_calibration)->format('d/m/Y') : '',
                    'Próx. Cal. Externa' => $equipment->next_ext_calibration ?
                        Carbon::parse($equipment->next_ext_calibration)->format('d/m/Y') : '',
                    'Estado Equipo' => $equipment->active ? 'Activo' : 'Inactivo',
                    'Tipo Mantenimiento' => 'Sin mantenimientos en el período',
                    'Categoría' => '',
                    'Fecha Programada' => '',
                    'Fecha Realizada' => '',
                    'Estado Mantenimiento' => '',
                    'Prioridad' => '',
                    'Responsable' => '',
                    'Descripción' => '',
                    'Trabajo Realizado' => '',
                    'Hallazgos' => '',
                    'Recomendaciones' => '',
                    'Notas' => '',
                ]);
            }
            */
        }

        return $data;
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'ID Equipo',
            'Instrumento',
            'Código Interno',
            'Marca',
            'Modelo',
            'N° Serie',
            'N° Sistema',
            'Periodicidad Cal. Ext.',
            'Últ. Cal. Externa',
            'Próx. Cal. Externa',
            'Estado Equipo',
            'Tipo Mantenimiento',
            'Categoría',
            'Fecha Programada',
            'Fecha Realizada',
            'Estado Mantenimiento',
            'Prioridad',
            'Responsable',
            'Descripción',
            'Trabajo Realizado',
            'Hallazgos',
            'Recomendaciones',
            'Notas',
        ];
    }

    /**
     * @param Worksheet $sheet
     * @return array
     */
    public function styles(Worksheet $sheet)
    {
        // Estilo para el encabezado
        $sheet->getStyle('A1:W1')->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
                'size' => 12,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '4472C4'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);

        // Estilo para el contenido
        $sheet->getStyle('A2:W' . ($sheet->getHighestRow()))->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => 'CCCCCC'],
                ],
            ],
            'alignment' => [
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ]);

        // Ajustar altura de filas
        $sheet->getDefaultRowDimension()->setRowHeight(25);
        $sheet->getRowDimension('1')->setRowHeight(35);

        // Insertar información del reporte en la parte superior
        $sheet->insertNewRowBefore(1, 3);

        $sheet->setCellValue('A1', 'HISTORIAL DE EQUIPOS Y MANTENIMIENTOS');
        $sheet->setCellValue('A2', 'Período: ' . Carbon::parse($this->startDate)->format('d/m/Y') . ' - ' . Carbon::parse($this->endDate)->format('d/m/Y'));
        $sheet->setCellValue('A3', 'Generado: ' . Carbon::now()->format('d/m/Y H:i:s'));

        // Estilo para el título
        $sheet->getStyle('A1')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 16,
                'color' => ['rgb' => '1d4ed8'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
            ],
        ]);

        $sheet->getStyle('A2:A3')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 11,
                'color' => ['rgb' => '4472C4'],
            ],
        ]);

        // Mergear celdas del título
        $sheet->mergeCells('A1:W1');
        $sheet->mergeCells('A2:W2');
        $sheet->mergeCells('A3:W3');

        return [];
    }

    /**
     * @return array
     */
    public function columnWidths(): array
    {
        return [
            'A' => 10,  // ID Equipo
            'B' => 25,  // Instrumento
            'C' => 15,  // Código Interno
            'D' => 15,  // Marca
            'E' => 15,  // Modelo
            'F' => 15,  // N° Serie
            'G' => 15,  // N° Sistema
            'H' => 20,  // Periodicidad Cal. Ext.
            'I' => 15,  // Últ. Cal. Externa
            'J' => 15,  // Próx. Cal. Externa
            'K' => 12,  // Estado Equipo
            'L' => 20,  // Tipo Mantenimiento
            'M' => 15,  // Categoría
            'N' => 15,  // Fecha Programada
            'O' => 15,  // Fecha Realizada
            'P' => 18,  // Estado Mantenimiento
            'Q' => 12,  // Prioridad
            'R' => 20,  // Responsable
            'S' => 30,  // Descripción
            'T' => 30,  // Trabajo Realizado
            'U' => 30,  // Hallazgos
            'V' => 30,  // Recomendaciones
            'W' => 25,  // Notas
        ];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Historial Equipos';
    }

    private function getStatusLabel($status)
    {
        $labels = [
            'scheduled' => 'Programado',
            'in_progress' => 'En Progreso',
            'completed' => 'Completado',
            'cancelled' => 'Cancelado',
            'postponed' => 'Pospuesto'
        ];

        return $labels[$status] ?? ucfirst($status);
    }

    private function getCategoryLabel($category)
    {
        $labels = [
            'preventive' => 'Preventivo',
            'corrective' => 'Correctivo',
            'predictive' => 'Predictivo'
        ];

        return $labels[$category] ?? ucfirst($category);
    }

    private function getPriorityLabel($priority)
    {
        $labels = [
            'low' => 'Baja',
            'medium' => 'Media',
            'high' => 'Alta',
            'critical' => 'Crítica'
        ];

        return $labels[$priority] ?? ucfirst($priority);
    }
}
