<?php

namespace App\Imports;

use App\Models\Equipment;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Validators\Failure;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class EquipmentImport implements ToModel, WithHeadingRow, WithBatchInserts, WithChunkReading, SkipsOnFailure
{
    use Importable, SkipsFailures;

    protected $preview = false;
    protected $previewData = [];
    protected $currentRow = 0;

    public function __construct($preview = false)
    {
        $this->preview = $preview;
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        $this->currentRow++;

        // Limpiar y normalizar los datos
        $row = $this->cleanRowData($row);

        // Saltar filas completamente vacías
        if ($this->isEmptyRow($row)) {
            return null;
        }

        // Validación manual de campos obligatorios
        $this->validateRow($row);

        // Si es preview, almacenar los datos sin crear el modelo
        if ($this->preview) {
            $this->previewData[] = $row;
            return null;
        }

        // Verificar si el equipo ya existe por código interno
        $existingEquipment = Equipment::where('int_code', $row['codigo_interno'])->first();

        if ($existingEquipment) {
            // Si ya existe, actualizar en lugar de crear
            $existingEquipment->update([
                'instrument' => $row['instrumento'],
                'brand' => $row['marca'],
                'model' => $row['modelo'],
                'serial_number' => $row['numero_de_serie'] ?? null,
                'system_number' => $row['numero_de_sistema'] ?? null,
                'ext_calibration_periodicity' => $row['periodicidad_cal_externa'] ?? null,
                'internal_check_periodicity' => $row['periodicidad_chequeo_interno'] ?? null,
                'last_ext_calibration' => $this->parseDate($row['ultima_cal_externa_yyyy_mm_dd']),
                'next_ext_calibration' => $this->parseDate($row['proxima_cal_externa_yyyy_mm_dd']),
                'active' => $this->parseBoolean($row['activo_true_false']),
            ]);

            return null; // No crear nuevo modelo
        }

        // Crear nuevo equipo
        return new Equipment([
            'instrument' => $row['instrumento'],
            'int_code' => $row['codigo_interno'],
            'brand' => $row['marca'],
            'model' => $row['modelo'],
            'serial_number' => $row['numero_de_serie'] ?? null,
            'system_number' => $row['numero_de_sistema'] ?? null,
            'ext_calibration_periodicity' => $row['periodicidad_cal_externa'] ?? null,
            'internal_check_periodicity' => $row['periodicidad_chequeo_interno'] ?? null,
            'last_ext_calibration' => $this->parseDate($row['ultima_cal_externa_yyyy_mm_dd']),
            'next_ext_calibration' => $this->parseDate($row['proxima_cal_externa_yyyy_mm_dd']),
            'active' => $this->parseBoolean($row['activo_true_false']),
        ]);
    }

    /**
     * Validar manualmente una fila de datos
     */
    private function validateRow(array $row)
    {
        $errors = [];
        $rowNumber = $this->currentRow + 6; // +6 porque empezamos en fila 7 del Excel (6 + 1)

        // Debug específico para filas problemáticas
        if (app()->environment('local')) {
            Log::info("Validando fila {$rowNumber}:", [
                'row_data' => $row,
                'activo_field' => [
                    'exists' => array_key_exists('activo_true_false', $row),
                    'isset' => isset($row['activo_true_false']),
                    'value' => $row['activo_true_false'] ?? 'NOT_SET',
                    'empty' => empty($row['activo_true_false']),
                    'string_empty' => ($row['activo_true_false'] ?? '') === '',
                ]
            ]);
        }

        // Validar campos obligatorios solo si la fila tiene al menos un campo principal
        $hasMainData = !empty($row['instrumento']) || !empty($row['codigo_interno']) ||
            !empty($row['marca']) || !empty($row['modelo']);

        if (!$hasMainData) {
            return; // Saltar validación para filas completamente vacías
        }

        if (empty($row['instrumento'])) {
            $errors[] = 'El campo Instrumento es obligatorio.';
        }

        if (empty($row['codigo_interno'])) {
            $errors[] = 'El campo Código Interno es obligatorio.';
        }

        if (empty($row['marca'])) {
            $errors[] = 'El campo Marca es obligatorio.';
        }

        if (empty($row['modelo'])) {
            $errors[] = 'El campo Modelo es obligatorio.';
        }

        // Validación más específica para el campo activo
        if (
            !array_key_exists('activo_true_false', $row) ||
            $row['activo_true_false'] === null ||
            $row['activo_true_false'] === '' ||
            trim((string)$row['activo_true_false']) === ''
        ) {
            $errors[] = 'El campo Activo es obligatorio.';
        }

        // Si hay errores, agregar al listado de fallos
        if (!empty($errors)) {
            $failure = new Failure($rowNumber, 'general', $errors, $row);
            $this->onFailure($failure);
        }
    }



    /**
     * @return int
     */
    public function batchSize(): int
    {
        return 100;
    }

    /**
     * @return int
     */
    public function chunkSize(): int
    {
        return 100;
    }

    /**
     * @return int
     */
    public function headingRow(): int
    {
        return 6; // Los headers están en la fila 6 debido a las instrucciones
    }

    /**
     * Limpiar y normalizar los datos de la fila
     */
    private function cleanRowData(array $row): array
    {
        $cleaned = [];

        foreach ($row as $key => $value) {
            // Convertir la clave a snake_case y limpiar
            $cleanKey = $this->normalizeKey($key);
            $cleaned[$cleanKey] = is_string($value) ? trim($value) : $value;
        }

        // Debug: Log las claves para ver qué está llegando
        if (app()->environment('local')) {
            Log::info('Claves normalizadas:', array_keys($cleaned));
            Log::info('Datos de fila:', $cleaned);
            Log::info('Campo activo_true_false:', [
                'isset' => isset($cleaned['activo_true_false']),
                'value' => $cleaned['activo_true_false'] ?? 'NULL',
                'empty' => empty($cleaned['activo_true_false']),
                'is_null' => is_null($cleaned['activo_true_false'] ?? null)
            ]);
        }

        return $cleaned;
    }
    /**
     * Normalizar las claves de las columnas
     */
    private function normalizeKey(string $key): string
    {
        // Convertir a minúsculas y limpiar caracteres especiales
        $normalized = strtolower(trim($key));
        $normalized = $this->removeAccents($normalized);

        // Mapeo directo para columnas específicas
        $directMappings = [
            'instrumento' => 'instrumento',
            'instrumento *' => 'instrumento',
            'codigo interno' => 'codigo_interno',
            'codigo interno *' => 'codigo_interno',
            'marca' => 'marca',
            'marca *' => 'marca',
            'modelo' => 'modelo',
            'modelo *' => 'modelo',
            'numero de serie' => 'numero_de_serie',
            'numero de sistema' => 'numero_de_sistema',
            'periodicidad cal. externa' => 'periodicidad_cal_externa',
            'periodicidad cal externa' => 'periodicidad_cal_externa',
            'periodicidad chequeo interno' => 'periodicidad_chequeo_interno',
            'ultima cal. externa (yyyy-mm-dd)' => 'ultima_cal_externa_yyyy_mm_dd',
            'ultima cal externa (yyyy-mm-dd)' => 'ultima_cal_externa_yyyy_mm_dd',
            'proxima cal. externa (yyyy-mm-dd)' => 'proxima_cal_externa_yyyy_mm_dd',
            'proxima cal externa (yyyy-mm-dd)' => 'proxima_cal_externa_yyyy_mm_dd',
            'activo (true/false)' => 'activo_true_false',
            'activo (true/false) *' => 'activo_true_false',
            'activo' => 'activo_true_false',
            'activo *' => 'activo_true_false',
        ];

        // Buscar mapeo directo
        if (isset($directMappings[$normalized])) {
            return $directMappings[$normalized];
        }

        // Búsqueda por contiene palabras clave
        if (strpos($normalized, 'instrumento') !== false) {
            return 'instrumento';
        }
        if (strpos($normalized, 'codigo') !== false && strpos($normalized, 'interno') !== false) {
            return 'codigo_interno';
        }
        if (strpos($normalized, 'marca') !== false) {
            return 'marca';
        }
        if (strpos($normalized, 'modelo') !== false) {
            return 'modelo';
        }
        if (strpos($normalized, 'serie') !== false) {
            return 'numero_de_serie';
        }
        if (strpos($normalized, 'sistema') !== false) {
            return 'numero_de_sistema';
        }
        if (strpos($normalized, 'periodicidad') !== false && strpos($normalized, 'externa') !== false) {
            return 'periodicidad_cal_externa';
        }
        if (strpos($normalized, 'periodicidad') !== false && strpos($normalized, 'interno') !== false) {
            return 'periodicidad_chequeo_interno';
        }
        if (strpos($normalized, 'ultima') !== false) {
            return 'ultima_cal_externa_yyyy_mm_dd';
        }
        if (strpos($normalized, 'proxima') !== false) {
            return 'proxima_cal_externa_yyyy_mm_dd';
        }
        if (strpos($normalized, 'activo') !== false) {
            return 'activo_true_false';
        }

        // Fallback: normalización genérica
        $fallback = str_replace(['*', '(', ')', ' ', '-', '.'], '_', $normalized);
        $fallback = preg_replace('/_{2,}/', '_', $fallback);
        return trim($fallback, '_');
    }

    /**
     * Remover acentos y caracteres especiales
     */
    private function removeAccents(string $string): string
    {
        $replacements = [
            'á' => 'a',
            'à' => 'a',
            'ä' => 'a',
            'â' => 'a',
            'ā' => 'a',
            'ã' => 'a',
            'é' => 'e',
            'è' => 'e',
            'ë' => 'e',
            'ê' => 'e',
            'ē' => 'e',
            'í' => 'i',
            'ì' => 'i',
            'ï' => 'i',
            'î' => 'i',
            'ī' => 'i',
            'ó' => 'o',
            'ò' => 'o',
            'ö' => 'o',
            'ô' => 'o',
            'ō' => 'o',
            'õ' => 'o',
            'ú' => 'u',
            'ù' => 'u',
            'ü' => 'u',
            'û' => 'u',
            'ū' => 'u',
            'ñ' => 'n',
            'ç' => 'c',
        ];

        return strtr($string, $replacements);
    }

    /**
     * Verificar si una fila está completamente vacía
     */
    private function isEmptyRow(array $row): bool
    {
        // Verificar si todos los campos principales están vacíos
        $mainFields = ['instrumento', 'codigo_interno', 'marca', 'modelo'];

        foreach ($mainFields as $field) {
            if (!empty($row[$field])) {
                return false;
            }
        }

        return true;
    }

    /**
     * Parsear fecha desde string
     */
    private function parseDate($dateString)
    {
        if (empty($dateString)) {
            return null;
        }

        try {
            // Intentar parsear diferentes formatos de fecha
            if (is_numeric($dateString)) {
                // Fecha de Excel (número serial)
                return Carbon::createFromFormat('Y-m-d', gmdate('Y-m-d', ($dateString - 25569) * 86400));
            }

            // Formato YYYY-MM-DD
            if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $dateString)) {
                return Carbon::createFromFormat('Y-m-d', $dateString);
            }

            // Otros formatos comunes
            return Carbon::parse($dateString);
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Parsear valor booleano
     */
    private function parseBoolean($value): bool
    {
        if (is_bool($value)) {
            return $value;
        }

        $value = strtolower(trim($value));

        return in_array($value, ['true', '1', 'yes', 'sí', 'verdadero', 'activo']);
    }

    /**
     * Obtener datos de preview
     */
    public function getPreviewData(): array
    {
        return $this->previewData;
    }

    /**
     * Obtener estadísticas de la importación
     */
    public function getImportStats(): array
    {
        $total = count($this->previewData);
        $valid = 0;
        $duplicates = 0;
        $errors = count($this->failures());

        foreach ($this->previewData as $row) {
            if (!empty($row['codigo_interno'])) {
                $existing = Equipment::where('int_code', $row['codigo_interno'])->exists();
                if ($existing) {
                    $duplicates++;
                } else {
                    $valid++;
                }
            }
        }

        return [
            'total' => $total,
            'valid' => $valid,
            'duplicates' => $duplicates,
            'errors' => $errors,
            'will_create' => $valid,
            'will_update' => $duplicates,
        ];
    }
}
