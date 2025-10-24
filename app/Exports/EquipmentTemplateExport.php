<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
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

class EquipmentTemplateExport implements FromArray, WithHeadings, WithStyles, WithColumnWidths, WithTitle, ShouldAutoSize
{
    /**
     * @return array
     */
    public function array(): array
    {
        // Datos de ejemplo para la plantilla
        return [
            [
                'Balanza Analítica',
                'BAL-001',
                'Mettler Toledo',
                'XS205',
                'MT123456789',
                'SYS001',
                '12 meses',
                '6 meses',
                '2024-01-15',
                '2025-01-15',
                'TRUE'
            ],
            [
                'Micropipeta Variable',
                'MIC-002',
                'Eppendorf',
                'Research Plus',
                'EPP987654321',
                'SYS002',
                '24 meses',
                '3 meses',
                '2023-06-10',
                '2025-06-10',
                'TRUE'
            ],
            [
                'pH Metro Digital',
                'PHM-003',
                'Hanna Instruments',
                'HI-2020',
                'HAN456789123',
                'SYS003',
                '18 meses',
                '1 mes',
                '2023-12-01',
                '2025-06-01',
                'FALSE'
            ]
        ];
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'Instrumento *',
            'Código Interno *',
            'Marca *',
            'Modelo *',
            'Número de Serie',
            'Número de Sistema',
            'Periodicidad Cal. Externa',
            'Periodicidad Chequeo Interno',
            'Última Cal. Externa (YYYY-MM-DD)',
            'Próxima Cal. Externa (YYYY-MM-DD)',
            'Activo (TRUE/FALSE) *'
        ];
    }

    /**
     * @param Worksheet $sheet
     * @return array
     */
    public function styles(Worksheet $sheet)
    {
        // Estilo para el encabezado
        $sheet->getStyle('A1:K1')->applyFromArray([
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

        // Estilo para los datos de ejemplo
        $sheet->getStyle('A2:K4')->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => 'CCCCCC'],
                ],
            ],
            'alignment' => [
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'F8F9FA'],
            ],
        ]);

        // Ajustar altura de filas
        $sheet->getDefaultRowDimension()->setRowHeight(25);
        $sheet->getRowDimension('1')->setRowHeight(35);

        // Insertar información en la parte superior
        $sheet->insertNewRowBefore(1, 5);

        $sheet->setCellValue('A1', 'PLANTILLA PARA CARGA MASIVA DE EQUIPOS');
        $sheet->setCellValue('A2', 'INSTRUCCIONES:');
        $sheet->setCellValue('A3', '• Los campos marcados con * son obligatorios');
        $sheet->setCellValue('A4', '• Las fechas deben estar en formato YYYY-MM-DD (ej: 2024-12-31)');
        $sheet->setCellValue('A5', '• El campo "Activo" debe ser TRUE o FALSE');

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

        $sheet->getStyle('A2')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 12,
                'color' => ['rgb' => 'dc2626'],
            ],
        ]);

        $sheet->getStyle('A3:A5')->applyFromArray([
            'font' => [
                'size' => 10,
                'color' => ['rgb' => '374151'],
            ],
        ]);

        // Mergear celdas del título
        $sheet->mergeCells('A1:K1');

        return [];
    }

    /**
     * @return array
     */
    public function columnWidths(): array
    {
        return [
            'A' => 25,  // Instrumento
            'B' => 15,  // Código Interno
            'C' => 20,  // Marca
            'D' => 20,  // Modelo
            'E' => 18,  // Número de Serie
            'F' => 18,  // Número de Sistema
            'G' => 25,  // Periodicidad Cal. Externa
            'H' => 25,  // Periodicidad Chequeo Interno
            'I' => 25,  // Última Cal. Externa
            'J' => 25,  // Próxima Cal. Externa
            'K' => 18,  // Activo
        ];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Plantilla Equipos';
    }
}
