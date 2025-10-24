<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\MaintenanceRecord;
use App\Models\MaintenanceType;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Carbon\Carbon;

class MaintenanceController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MaintenanceRecord::with(['equipment', 'maintenanceType', 'performedByUser']);

        // Filtros
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('priority') && $request->priority !== 'all') {
            $query->where('priority', $request->priority);
        }

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('maintenance_category', $request->category);
        }

        if ($request->has('equipment_id') && $request->equipment_id !== 'all') {
            $query->where('equipment_id', $request->equipment_id);
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
                    ->orWhereHas('equipment', function ($eq) use ($search) {
                        $eq->where('instrument', 'like', "%$search%")
                            ->orWhere('model', 'like', "%$search%")
                            ->orWhere('brand', 'like', "%$search%");
                    });
            });
        }

        $maintenances = $query->orderBy('scheduled_date', 'desc')
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Maintenance/MaintenancePage', [
            'maintenances' => $maintenances,
            'filters' => $request->only(['status', 'priority', 'category', 'equipment_id', 'date_from', 'date_to', 'search']),
            'equipments' => Equipment::select('id', 'instrument', 'model', 'brand')->get(),
            'stats' => $this->getMaintenanceStats()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info('Datos recibidos para mantenimiento:', $request->all());

        $validator = Validator::make($request->all(), [
            'equipment_id' => 'required|exists:equipment,id',
            'maintenance_type_name' => 'required|string',
            'maintenance_category' => 'required|in:preventive,corrective,predictive',
            'scheduled_date' => 'required|date',
            'performed_date' => 'nullable|date',
            'responsible_person' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high,critical',
            'actual_duration' => 'nullable|integer|min:0',
            'actual_cost' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
            'requires_external_service' => 'boolean',
            'external_provider' => 'nullable|string|max:255',
            'parts_needed' => 'nullable|string',
            'status' => 'required|in:scheduled,in_progress,completed,cancelled,postponed'
        ]);

        if ($validator->fails()) {
            Log::error('Validation failed for maintenance creation:', $validator->errors()->toArray());
            return back()->withErrors($validator)->withInput();
        }

        try {
            $maintenance = MaintenanceRecord::create([
                'equipment_id' => $request->equipment_id,
                'maintenance_type_name' => $request->maintenance_type_name,
                'maintenance_category' => $request->maintenance_category,
                'scheduled_date' => $request->scheduled_date,
                'performed_date' => $request->performed_date,
                'responsible_person' => $request->responsible_person,
                'description' => $request->description,
                'priority' => $request->priority,
                'status' => $request->status,
                'actual_duration' => $request->actual_duration ?? null,
                'actual_cost' => $request->actual_cost ?? null,
                'requires_external_service' => $request->requires_external_service ?? false,
                'external_provider' => $request->external_provider,
                'parts_needed' => $request->parts_needed,
                'notes' => $request->notes,
            ]);

            Log::info('Maintenance created successfully:', ['id' => $maintenance->id]);

            // Enviar notificación de recordatorio si es un mantenimiento programado
            if ($maintenance->status === 'scheduled') {
                $this->notificationService->createMaintenanceReminderNotification($maintenance);
            }

            return redirect()->route('equipment.index')->with('success', 'Mantenimiento registrado exitosamente.');
        } catch (\Exception $e) {
            Log::error('Error creating maintenance:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()->withErrors(['error' => 'Error al guardar el mantenimiento: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(MaintenanceRecord $maintenance)
    {
        $maintenance->load(['equipment', 'maintenanceType', 'performedByUser', 'validatedByUser']);

        return Inertia::render('Maintenance/MaintenanceDetail', [
            'maintenance' => $maintenance
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MaintenanceRecord $maintenance)
    {
        $validator = Validator::make($request->all(), [
            'scheduled_date' => 'sometimes|required|date',
            'performed_date' => 'nullable|date',
            'responsible_person' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'priority' => 'sometimes|required|in:low,medium,high,critical',
            'estimated_duration' => 'sometimes|required|integer|min:1',
            'actual_duration' => 'nullable|integer|min:0',
            'estimated_cost' => 'nullable|numeric|min:0',
            'actual_cost' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
            'requires_external_service' => 'boolean',
            'external_provider' => 'nullable|string|max:255',
            'parts_needed' => 'nullable|string',
            'status' => 'sometimes|required|in:scheduled,in_progress,completed,cancelled',
            'work_performed' => 'nullable|string',
            'findings' => 'nullable|string',
            'recommendations' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $maintenance->update($request->only([
            'scheduled_date',
            'performed_date',
            'responsible_person',
            'description',
            'priority',
            'estimated_duration',
            'actual_duration',
            'estimated_cost',
            'actual_cost',
            'notes',
            'requires_external_service',
            'external_provider',
            'parts_needed',
            'status',
            'work_performed',
            'findings',
            'recommendations'
        ]));

        return back()->with('success', 'Mantenimiento actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MaintenanceRecord $maintenance)
    {
        $maintenance->delete();
        return back()->with('success', 'Mantenimiento eliminado exitosamente.');
    }

    /**
     * Marcar mantenimiento como completado
     */
    public function complete(Request $request, MaintenanceRecord $maintenance)
    {
        $validator = Validator::make($request->all(), [
            'work_performed' => 'required|string',
            'findings' => 'nullable|string',
            'recommendations' => 'nullable|string',
            'actual_duration' => 'required|integer|min:1',
            'actual_cost' => 'nullable|numeric|min:0',
            'next_maintenance_date' => 'nullable|date|after:today'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $maintenance->update([
            'status' => 'completed',
            'performed_date' => Carbon::now('America/Bogota')->toDateString(),
            'performed_by' => \Illuminate\Support\Facades\Auth::user()->id,
            'work_performed' => $request->work_performed,
            'findings' => $request->findings,
            'recommendations' => $request->recommendations,
            'actual_duration' => $request->actual_duration,
            'actual_cost' => $request->actual_cost ?? 0,
            'next_maintenance_date' => $request->next_maintenance_date
        ]);

        // Enviar notificación de mantenimiento completado
        $this->notificationService->createMaintenanceCompletedNotification($maintenance);

        return back()->with('success', 'Mantenimiento marcado como completado.');
    }

    /**
     * Obtener estadísticas de mantenimiento
     */
    private function getMaintenanceStats()
    {
        $currentMonth = Carbon::now()->startOfMonth();
        $currentYear = Carbon::now()->startOfYear();

        return [
            'total_this_month' => MaintenanceRecord::where('scheduled_date', '>=', $currentMonth)->count(),
            'completed_this_month' => MaintenanceRecord::where('status', 'completed')
                ->where('performed_date', '>=', $currentMonth)->count(),
            'overdue' => MaintenanceRecord::overdue()->count(),
            'scheduled_next_week' => MaintenanceRecord::where('status', 'scheduled')
                ->whereBetween('scheduled_date', [
                    Carbon::now()->startOfWeek(),
                    Carbon::now()->endOfWeek()
                ])->count(),
            'by_category' => MaintenanceRecord::selectRaw('maintenance_category, COUNT(*) as total')
                ->where('scheduled_date', '>=', $currentYear)
                ->groupBy('maintenance_category')
                ->pluck('total', 'maintenance_category')
                ->toArray(),
            'by_priority' => MaintenanceRecord::selectRaw('priority, COUNT(*) as total')
                ->where('status', '!=', 'completed')
                ->groupBy('priority')
                ->pluck('total', 'priority')
                ->toArray()
        ];
    }
}
