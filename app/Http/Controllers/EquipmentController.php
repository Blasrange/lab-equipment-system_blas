<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MaintenanceRecord;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    public function index(Request $request)
    {
        $query = \App\Models\Equipment::with(['pendingMaintenances']);

        // Filtros por campos principales
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('instrument', 'like', "%$search%")
                    ->orWhere('int_code', 'like', "%$search%")
                    ->orWhere('brand', 'like', "%$search%")
                    ->orWhere('model', 'like', "%$search%")
                    ->orWhere('serial_number', 'like', "%$search%")
                    ->orWhere('system_number', 'like', "%$search%")
                    ->orWhere('active', 'like', "%$search%");
            });
        }

        $perPage = $request->input('per_page', 5); // Recibe el parámetro del frontend
        $equipments = $query->orderBy('id', 'desc')->paginate($perPage)->withQueryString();
        return inertia('equipment/EquipmentPage', [
            'equipments' => $equipments,
            'filters' => $request->only('search'),
        ]);
    }
    public function store(\App\Http\Requests\EquipmentRequest $request)
    {
        try {
            \App\Models\Equipment::create($request->validated());
            return redirect()->route('equipment.index')->with('success', 'Equipo creado correctamente');
        } catch (\Illuminate\Database\QueryException $e) {
            $errorMsg = 'Error al crear el equipo.';
            if ($e->getCode() === '23000') { // Violación de restricción única
                $errorMsg = 'Ya existe un equipo con ese código interno.';
            }
            return redirect()->route('equipment.index')->with('error', $errorMsg);
        }
    }

    public function update(\App\Http\Requests\EquipmentRequest $request, $id)
    {
        $equipment = \App\Models\Equipment::findOrFail($id);
        $equipment->update($request->validated());
        return redirect()->route('equipment.index')->with('success', 'Equipo actualizado correctamente');
    }

    public function inactivate($id)
    {
        $equipment = \App\Models\Equipment::findOrFail($id);
        $equipment->active = false;
        $equipment->save();
        return redirect()->route('equipment.index')->with('success', 'Equipo inactivado correctamente');
    }

    public function activate($id)
    {
        $equipment = \App\Models\Equipment::findOrFail($id);
        $equipment->active = true;
        $equipment->save();
        return redirect()->route('equipment.index')->with('success', 'Equipo activado correctamente');
    }

    public function getMaintenanceHistory($id)
    {
        // Primero verificar si existe el equipo
        $equipment = \App\Models\Equipment::find($id);
        if (!$equipment) {
            return response()->json(['error' => 'Equipo no encontrado'], 404);
        }

        // Obtener todos los mantenimientos del equipo
        $maintenances = MaintenanceRecord::where('equipment_id', $id)
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($maintenance) {
                return [
                    'date' => $maintenance->performed_date ?? $maintenance->scheduled_date ?? $maintenance->created_at->format('Y-m-d'),
                    'action' => $maintenance->maintenance_type_name ?? 'Mantenimiento',
                    'result' => $this->getStatusLabel($maintenance->status),
                    'users' => $maintenance->responsible_person ?? 'N/A',
                    'findings' => $maintenance->findings,
                    'work_performed' => $maintenance->work_performed,
                ];
            });

        return response()->json($maintenances);
    }

    private function getStatusLabel($status)
    {
        $labels = [
            'scheduled' => 'Programado',
            'in_progress' => 'En progreso',
            'completed' => 'Completado',
            'cancelled' => 'Cancelado',
            'postponed' => 'Pospuesto'
        ];

        return $labels[$status] ?? ucfirst($status);
    }

    public function maintenanceHistory(Request $request, $id)
    {
        $equipment = \App\Models\Equipment::findOrFail($id);

        $query = MaintenanceRecord::with(['maintenanceType', 'performedByUser'])
            ->where('equipment_id', $id);

        // Filtros
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('maintenance_category', $request->category);
        }

        if ($request->has('priority') && $request->priority !== 'all') {
            $query->where('priority', $request->priority);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->where('scheduled_date', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->where('scheduled_date', '<=', $request->date_to);
        }

        // Búsqueda por texto
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', "%$search%")
                    ->orWhere('responsible_person', 'like', "%$search%")
                    ->orWhere('maintenance_type_name', 'like', "%$search%")
                    ->orWhere('work_performed', 'like', "%$search%")
                    ->orWhere('findings', 'like', "%$search%");
            });
        }

        $perPage = $request->input('per_page', 5); // Valor por defecto: 5
        $maintenances = $query->orderBy('scheduled_date', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        // Estadísticas del equipo
        $stats = [
            'total' => MaintenanceRecord::where('equipment_id', $id)->count(),
            'completed' => MaintenanceRecord::where('equipment_id', $id)->where('status', 'completed')->count(),
            'pending' => MaintenanceRecord::where('equipment_id', $id)->whereIn('status', ['scheduled', 'in_progress'])->count(),
            'preventive' => MaintenanceRecord::where('equipment_id', $id)->where('maintenance_category', 'preventive')->count(),
            'corrective' => MaintenanceRecord::where('equipment_id', $id)->where('maintenance_category', 'corrective')->count(),
        ];

        return Inertia::render('equipment/EquipmentHistoryPage', [
            'equipment' => $equipment,
            'maintenances' => $maintenances,
            'filters' => $request->only(['status', 'category', 'priority', 'date_from', 'date_to', 'search']),
            'stats' => $stats
        ]);
    }

    public function exportToExcel(Request $request)
    {
        Log::info('Iniciando exportación Excel', $request->all());

        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        try {
            $startDate = $request->start_date;
            $endDate = $request->end_date;

            Log::info('Fechas validadas', ['start' => $startDate, 'end' => $endDate]);

            // Crear el nombre del archivo
            $filename = "historial_equipos_" . date('Y-m-d_H-i-s') . ".xlsx";

            Log::info('Generando archivo', ['filename' => $filename]);

            // Usar Laravel Excel para generar el archivo .xlsx real
            return \Maatwebsite\Excel\Facades\Excel::download(
                new \App\Exports\EquipmentHistoryExport($startDate, $endDate),
                $filename
            );
        } catch (\Exception $e) {
            Log::error('Error en exportación Excel', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Error al generar el archivo Excel: ' . $e->getMessage()
            ], 500);
        }
    }

    public function downloadTemplate()
    {
        try {
            $filename = "plantilla_equipos_" . date('Y-m-d_H-i-s') . ".xlsx";

            return \Maatwebsite\Excel\Facades\Excel::download(
                new \App\Exports\EquipmentTemplateExport(),
                $filename
            );
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al generar la plantilla: ' . $e->getMessage()
            ], 500);
        }
    }

    public function previewImport(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls|max:10240', // 10MB máximo
        ]);

        try {
            $import = new \App\Imports\EquipmentImport(true); // Modo preview

            \Maatwebsite\Excel\Facades\Excel::import($import, $request->file('file'));

            $previewData = $import->getPreviewData();
            $stats = $import->getImportStats();
            $errors = $import->failures();

            // Formatear errores para el frontend
            $formattedErrors = [];
            foreach ($errors as $failure) {
                $formattedErrors[] = [
                    'row' => $failure->row(),
                    'attribute' => $failure->attribute(),
                    'errors' => $failure->errors(),
                    'values' => $failure->values(),
                ];
            }

            return response()->json([
                'success' => true,
                'preview_data' => array_slice($previewData, 0, 10), // Solo primeras 10 filas para preview
                'stats' => $stats,
                'errors' => $formattedErrors,
                'total_rows' => count($previewData),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al procesar el archivo: ' . $e->getMessage()
            ], 400);
        }
    }

    public function importEquipment(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls|max:10240', // 10MB máximo
        ]);

        try {
            $import = new \App\Imports\EquipmentImport(false); // Modo importación real

            \Maatwebsite\Excel\Facades\Excel::import($import, $request->file('file'));

            $failures = $import->failures();
            $stats = $import->getImportStats();

            if (count($failures) > 0) {
                // Hay errores en la importación
                $formattedErrors = [];
                foreach ($failures as $failure) {
                    $formattedErrors[] = [
                        'row' => $failure->row(),
                        'attribute' => $failure->attribute(),
                        'errors' => $failure->errors(),
                        'values' => $failure->values(),
                    ];
                }

                return response()->json([
                    'success' => false,
                    'error' => 'Se encontraron errores en algunas filas.',
                    'errors' => $formattedErrors,
                    'stats' => $stats,
                ], 422);
            }

            return response()->json([
                'success' => true,
                'message' => 'Equipos importados correctamente.',
                'stats' => $stats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error al importar equipos: ' . $e->getMessage()
            ], 500);
        }
    }

    public function dashboard()
    {
        // Estadísticas generales
        $totalEquipments = \App\Models\Equipment::count();
        $activeEquipments = \App\Models\Equipment::where('active', true)->count();
        $inactiveEquipments = \App\Models\Equipment::where('active', false)->count();

        // Estadísticas de mantenimientos
        $totalMaintenances = MaintenanceRecord::count();
        $completedMaintenances = MaintenanceRecord::where('status', 'completed')->count();
        $pendingMaintenances = MaintenanceRecord::whereIn('status', ['scheduled', 'in_progress'])->count();
        $overdueMaintenances = MaintenanceRecord::where('status', 'scheduled')
            ->where('scheduled_date', '<', today())
            ->count();

        // Mantenimientos por categoría
        $preventiveMaintenances = MaintenanceRecord::where('maintenance_category', 'preventive')->count();
        $correctiveMaintenances = MaintenanceRecord::where('maintenance_category', 'corrective')->count();
        $predictiveMaintenances = MaintenanceRecord::where('maintenance_category', 'predictive')->count();

        // Mantenimientos por prioridad
        $highPriorityMaintenances = MaintenanceRecord::where('priority', 'high')->count();
        $criticalPriorityMaintenances = MaintenanceRecord::where('priority', 'critical')->count();

        // Mantenimientos recientes (últimos 7 días)
        $recentMaintenances = MaintenanceRecord::with('equipment')
            ->select(['id', 'equipment_id', 'scheduled_date', 'performed_date', 'maintenance_type_name', 'maintenance_category', 'status', 'priority'])
            ->where('created_at', '>=', now()->subDays(7))
            ->whereNotNull('scheduled_date')
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get()
            ->map(function ($maintenance) {
                return [
                    'id' => $maintenance->id,
                    'scheduled_date' => $maintenance->scheduled_date ? \Carbon\Carbon::parse($maintenance->scheduled_date)->format('Y-m-d') : null,
                    'performed_date' => $maintenance->performed_date ? \Carbon\Carbon::parse($maintenance->performed_date)->format('Y-m-d') : null,
                    'maintenance_type_name' => $maintenance->maintenance_type_name,
                    'maintenance_category' => $maintenance->maintenance_category,
                    'status' => $maintenance->status,
                    'priority' => $maintenance->priority,
                    'equipment' => $maintenance->equipment,
                ];
            });

        // Próximos mantenimientos
        $upcomingMaintenances = MaintenanceRecord::with('equipment')
            ->select(['id', 'equipment_id', 'scheduled_date', 'performed_date', 'maintenance_type_name', 'maintenance_category', 'status', 'priority'])
            ->where('status', 'scheduled')
            ->where('scheduled_date', '>=', today())
            ->whereNotNull('scheduled_date')
            ->orderBy('scheduled_date', 'asc')
            ->limit(20)
            ->get()
            ->map(function ($maintenance) {
                return [
                    'id' => $maintenance->id,
                    'scheduled_date' => $maintenance->scheduled_date ? \Carbon\Carbon::parse($maintenance->scheduled_date)->format('Y-m-d') : null,
                    'performed_date' => $maintenance->performed_date ? \Carbon\Carbon::parse($maintenance->performed_date)->format('Y-m-d') : null,
                    'maintenance_type_name' => $maintenance->maintenance_type_name,
                    'maintenance_category' => $maintenance->maintenance_category,
                    'status' => $maintenance->status,
                    'priority' => $maintenance->priority,
                    'equipment' => $maintenance->equipment,
                ];
            });

        // Mantenimientos en progreso (todos)
        $inProgressMaintenances = MaintenanceRecord::with('equipment')
            ->select(['id', 'equipment_id', 'scheduled_date', 'performed_date', 'maintenance_type_name', 'maintenance_category', 'status', 'priority'])
            ->where('status', 'in_progress')
            ->orderBy('scheduled_date', 'asc')
            ->limit(15)
            ->get()
            ->map(function ($maintenance) {
                return [
                    'id' => $maintenance->id,
                    'scheduled_date' => $maintenance->scheduled_date ? \Carbon\Carbon::parse($maintenance->scheduled_date)->format('Y-m-d') : null,
                    'performed_date' => $maintenance->performed_date ? \Carbon\Carbon::parse($maintenance->performed_date)->format('Y-m-d') : null,
                    'maintenance_type_name' => $maintenance->maintenance_type_name,
                    'maintenance_category' => $maintenance->maintenance_category,
                    'status' => $maintenance->status,
                    'priority' => $maintenance->priority,
                    'equipment' => $maintenance->equipment,
                ];
            });

        // Mantenimientos completados recientes (últimos 30 días)
        $recentCompletedMaintenances = MaintenanceRecord::with('equipment')
            ->select(['id', 'equipment_id', 'scheduled_date', 'performed_date', 'maintenance_type_name', 'maintenance_category', 'status', 'priority'])
            ->where('status', 'completed')
            ->where('performed_date', '>=', now()->subDays(30))
            ->orderBy('performed_date', 'desc')
            ->limit(15)
            ->get()
            ->map(function ($maintenance) {
                return [
                    'id' => $maintenance->id,
                    'scheduled_date' => $maintenance->scheduled_date ? \Carbon\Carbon::parse($maintenance->scheduled_date)->format('Y-m-d') : null,
                    'performed_date' => $maintenance->performed_date ? \Carbon\Carbon::parse($maintenance->performed_date)->format('Y-m-d') : null,
                    'maintenance_type_name' => $maintenance->maintenance_type_name,
                    'maintenance_category' => $maintenance->maintenance_category,
                    'status' => $maintenance->status,
                    'priority' => $maintenance->priority,
                    'equipment' => $maintenance->equipment,
                ];
            });

        // Datos mensuales de cumplimiento (últimos 6 meses)
        $monthlyData = $this->getMonthlyComplianceData();

        // Estadísticas por categoría y mes
        $categoryMonthlyData = $this->getCategoryMonthlyData();

        return Inertia::render('dashboard', [
            'stats' => [
                'equipment' => [
                    'total' => $totalEquipments,
                    'active' => $activeEquipments,
                    'inactive' => $inactiveEquipments,
                ],
                'maintenance' => [
                    'total' => $totalMaintenances,
                    'completed' => $completedMaintenances,
                    'pending' => $pendingMaintenances,
                    'overdue' => $overdueMaintenances,
                ],
                'category' => [
                    'preventive' => $preventiveMaintenances,
                    'corrective' => $correctiveMaintenances,
                    'predictive' => $predictiveMaintenances,
                ],
                'priority' => [
                    'high' => $highPriorityMaintenances,
                    'critical' => $criticalPriorityMaintenances,
                ],
            ],
            'recentMaintenances' => $recentMaintenances,
            'upcomingMaintenances' => $upcomingMaintenances,
            'inProgressMaintenances' => $inProgressMaintenances,
            'completedMaintenances' => $recentCompletedMaintenances,
            'monthlyData' => $monthlyData,
            'categoryMonthlyData' => $categoryMonthlyData,
        ]);
    }

    /**
     * Obtiene los datos de cumplimiento mensual (últimos 3 meses)
     */
    private function getMonthlyComplianceData()
    {
        $monthlyData = [];

        for ($i = 2; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $startOfMonth = $date->copy()->startOfMonth();
            $endOfMonth = $date->copy()->endOfMonth();

            // Mantenimientos programados en el mes
            $scheduled = MaintenanceRecord::whereBetween('scheduled_date', [$startOfMonth, $endOfMonth])
                ->count();

            // Mantenimientos completados en el mes (todos los completados)
            $completed = MaintenanceRecord::whereBetween('scheduled_date', [$startOfMonth, $endOfMonth])
                ->where('status', 'completed')
                ->count();

            // Mantenimientos completados a tiempo (sin retraso)
            $completedOnTime = MaintenanceRecord::whereBetween('scheduled_date', [$startOfMonth, $endOfMonth])
                ->where('status', 'completed')
                ->whereNotNull('performed_date')
                ->whereColumn('performed_date', '<=', 'scheduled_date')
                ->count();

            $efficiency = $scheduled > 0 ? round(($completed / $scheduled) * 100, 1) : 0;
            $onTimeEfficiency = $scheduled > 0 ? round(($completedOnTime / $scheduled) * 100, 1) : 0;
            $monthlyData[] = [
                'month' => $date->format('M'),
                'monthName' => $date->translatedFormat('M'),
                'year' => $date->format('Y'),
                'scheduled' => $scheduled,
                'completed' => $completed,
                'completedOnTime' => $completedOnTime,
                'efficiency' => $efficiency,
                'onTimeEfficiency' => $onTimeEfficiency,
            ];
        }

        return $monthlyData;
    }

    /**
     * Obtiene los datos mensuales por categoría de mantenimiento
     */
    private function getCategoryMonthlyData()
    {
        $categories = ['preventive', 'corrective', 'predictive'];
        $categoryData = [];

        foreach ($categories as $category) {
            $monthlyData = [];

            for ($i = 2; $i >= 0; $i--) {
                $date = now()->subMonths($i);
                $startOfMonth = $date->copy()->startOfMonth();
                $endOfMonth = $date->copy()->endOfMonth();

                // Mantenimientos programados en el mes para esta categoría
                $scheduled = MaintenanceRecord::whereBetween('scheduled_date', [$startOfMonth, $endOfMonth])
                    ->where('maintenance_category', $category)
                    ->count();

                // Mantenimientos completados en el mes para esta categoría
                $completed = MaintenanceRecord::whereBetween('scheduled_date', [$startOfMonth, $endOfMonth])
                    ->where('maintenance_category', $category)
                    ->where('status', 'completed')
                    ->count();

                // Mantenimientos completados a tiempo para esta categoría
                $completedOnTime = MaintenanceRecord::whereBetween('scheduled_date', [$startOfMonth, $endOfMonth])
                    ->where('maintenance_category', $category)
                    ->where('status', 'completed')
                    ->whereNotNull('performed_date')
                    ->whereColumn('performed_date', '<=', 'scheduled_date')
                    ->count();

                $efficiency = $scheduled > 0 ? round(($completed / $scheduled) * 100, 1) : 0;
                $onTimeEfficiency = $scheduled > 0 ? round(($completedOnTime / $scheduled) * 100, 1) : 0;

                $monthlyData[] = [
                    'month' => $date->format('M'),
                    'monthName' => $date->translatedFormat('M'),
                    'year' => $date->format('Y'),
                    'scheduled' => $scheduled,
                    'completed' => $completed,
                    'completedOnTime' => $completedOnTime,
                    'efficiency' => $efficiency,
                    'onTimeEfficiency' => $onTimeEfficiency,
                ];
            }

            $categoryData[$category] = $monthlyData;
        }

        return $categoryData;
    }
}
