<?php

namespace App\Http\Controllers;

use App\Models\NotificationSetting;
use App\Models\EmailNotification;
use App\Services\NotificationService;
use App\Exports\NotificationHistoryExportSimple;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class NotificationController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Mostrar configuraciones de notificaciones
     */
    public function index()
    {
        $settings = NotificationSetting::all();

        $stats = [
            'total_settings' => $settings->count(),
            'active_settings' => $settings->where('is_active', true)->count(),
            'pending_notifications' => EmailNotification::where('status', 'pending')->count(),
            'sent_today' => EmailNotification::where('status', 'sent')
                ->whereDate('sent_at', today())
                ->count(),
            'failed_notifications' => EmailNotification::where('status', 'failed')->count(),
        ];

        return Inertia::render('notifications/NotificationSettings', [
            'settings' => $settings,
            'stats' => $stats,
        ]);
    }

    /**
     * Actualizar configuración de notificación
     */
    public function updateSetting(Request $request, NotificationSetting $setting)
    {
        $request->validate([
            'is_active' => 'required|boolean',
            'days_before' => 'required|integer|min:0|max:365',
            'email_addresses' => 'nullable|array',
            'email_addresses.*' => 'email',
        ]);

        $setting->update([
            'is_active' => $request->is_active,
            'days_before' => $request->days_before,
            'email_addresses' => $request->email_addresses ?? [],
        ]);

        return redirect()->back()->with('success', 'Configuración actualizada correctamente');
    }

    /**
     * Mostrar historial de notificaciones
     */
    public function history(Request $request)
    {
        $query = EmailNotification::with(['equipment', 'maintenanceRecord']);

        // Filtros
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('notification_type') && $request->notification_type !== 'all') {
            $query->where('notification_type', $request->notification_type);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        // Búsqueda por texto
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('subject', 'like', "%$search%")
                    ->orWhere('message', 'like', "%$search%")
                    ->orWhere('notification_type', 'like', "%$search%")
                    ->orWhereHas('equipment', function ($eq) use ($search) {
                        $eq->where('instrument', 'like', "%$search%")
                            ->orWhere('int_code', 'like', "%$search%");
                    });
            });
        }

        // Paginación con parámetro per_page dinámico
        $perPage = $request->input('per_page', 5);
        $notifications = $query->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('notifications/NotificationHistory', [
            'notifications' => $notifications,
            'filters' => $request->only(['search', 'status', 'notification_type', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Reenviar notificación fallida
     */
    public function resend(EmailNotification $notification)
    {
        if ($notification->status !== 'failed') {
            return redirect()->back()->with('error', 'Solo se pueden reenviar notificaciones fallidas');
        }

        // Resetear estado y reenviar
        $notification->update([
            'status' => 'pending',
            'attempts' => 0,
            'error_message' => null,
            'scheduled_at' => now(),
        ]);

        \App\Jobs\SendEmailNotification::dispatch($notification);

        return redirect()->back()->with('success', 'Notificación reenviada correctamente');
    }

    /**
     * Ejecutar procesamiento manual de notificaciones
     */
    public function processNow()
    {
        try {
            $this->notificationService->processAllPendingNotifications();
            return redirect()->back()->with('success', 'Procesamiento de notificaciones ejecutado correctamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error procesando notificaciones: ' . $e->getMessage());
        }
    }

    /**
     * Probar envío de notificación
     */
    public function testNotification(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'equipment_id' => 'required|exists:equipment,id',
        ]);

        try {
            $equipment = \App\Models\Equipment::find($request->equipment_id);

            $notification = EmailNotification::create([
                'equipment_id' => $equipment->id,
                'notification_type' => 'test',
                'subject' => '🧪 Prueba de Notificación - Sistema de Gestión de Equipos',
                'message' => 'Esta es una notificación de prueba para verificar que el sistema de correos funciona correctamente.',
                'recipients' => [$request->email],
                'scheduled_at' => Carbon::now('America/Bogota'),
            ]);

            \App\Jobs\SendEmailNotification::dispatch($notification);

            return redirect()->back()->with('success', 'Notificación de prueba enviada correctamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error enviando notificación de prueba: ' . $e->getMessage());
        }
    }

    /**
     * Exportar historial de notificaciones a Excel
     */
    public function exportToExcel(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        try {
            $startDate = $request->start_date;
            $endDate = $request->end_date;

            // Crear el nombre del archivo
            $filename = "historial_notificaciones_" . date('Y-m-d_H-i-s') . ".xlsx";

            // Usar Laravel Excel para generar el archivo .xlsx real
            return \Maatwebsite\Excel\Facades\Excel::download(
                new NotificationHistoryExportSimple($startDate, $endDate),
                $filename
            );
        } catch (\Exception $e) {
            Log::error('Error en exportación de notificaciones: ' . $e->getMessage());

            return response()->json([
                'error' => 'Error al generar el archivo Excel: ' . $e->getMessage()
            ], 500);
        }
    }
}
