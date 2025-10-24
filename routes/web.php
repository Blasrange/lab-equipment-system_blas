<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\MaintenanceTypeController;
use App\Http\Controllers\QrController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
})->name('home');

// Rutas públicas para QR (sin autenticación)
Route::get('/qr-maintenance/{token}', [QrController::class, 'showMaintenanceForm'])->name('qr.maintenance.form');
Route::post('/qr-maintenance/{token}', [QrController::class, 'storeMaintenance'])->name('qr.maintenance.store');
Route::patch('/qr-maintenance/{token}/task/{maintenance}', [QrController::class, 'updateMaintenanceStatus'])->name('qr.maintenance.update');
Route::post('/qr-maintenance/{token}/create-task', [QrController::class, 'createMaintenanceTask'])->name('qr.maintenance.create');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [EquipmentController::class, 'dashboard'])->name('dashboard');

    // Rutas de Equipos
    Route::post('/equipment', [EquipmentController::class, 'store'])->name('equipment.store');
    Route::get('/equipment', [EquipmentController::class, 'index'])->name('equipment.index');
    Route::put('/equipment/{id}', [EquipmentController::class, 'update'])->name('equipment.update');
    Route::patch('/equipment/{id}/inactivate', [EquipmentController::class, 'inactivate'])->name('equipment.inactivate');
    Route::patch('/equipment/{id}/activate', [EquipmentController::class, 'activate'])->name('equipment.activate');
    Route::get('/equipment/{id}/history', [EquipmentController::class, 'maintenanceHistory'])->name('equipment.history');
    Route::post('/equipment/export-excel', [EquipmentController::class, 'exportToExcel'])->name('equipment.export.excel');
    Route::get('/equipment/download-template', [EquipmentController::class, 'downloadTemplate'])->name('equipment.download.template');
    Route::post('/equipment/preview-import', [EquipmentController::class, 'previewImport'])->name('equipment.preview.import');
    Route::post('/equipment/import', [EquipmentController::class, 'importEquipment'])->name('equipment.import');

    // Rutas de QR (requieren autenticación para generar)
    Route::get('/equipment/{id}/qr', [QrController::class, 'generateQr'])->name('equipment.qr');
    Route::get('/api/equipment/{id}/qr-token', [QrController::class, 'getQrToken'])->name('api.equipment.qr-token');
    Route::get('/api/equipment/{id}/maintenance-history', [EquipmentController::class, 'getMaintenanceHistory'])->name('api.equipment.maintenance-history');

    // Rutas de Mantenimientos
    Route::resource('maintenance', MaintenanceController::class);
    Route::post('maintenance/{maintenance}/complete', [MaintenanceController::class, 'complete'])->name('maintenance.complete');

    // Rutas de Tipos de Mantenimiento
    Route::resource('maintenance-types', MaintenanceTypeController::class);

    // Rutas de Notificaciones
    Route::prefix('notifications')->name('notifications.')->group(function () {
        Route::get('/', [\App\Http\Controllers\NotificationController::class, 'index'])->name('index');
        Route::get('/settings', [\App\Http\Controllers\NotificationController::class, 'index'])->name('settings');
        Route::put('/settings/{setting}', [\App\Http\Controllers\NotificationController::class, 'updateSetting'])->name('settings.update');
        Route::get('/history', [\App\Http\Controllers\NotificationController::class, 'history'])->name('history');
        Route::post('/export-excel', [\App\Http\Controllers\NotificationController::class, 'exportToExcel'])->name('export.excel');
        Route::get('/test', function () {
            $equipments = \App\Models\Equipment::where('active', true)->get(['id', 'instrument', 'int_code']);
            return \Inertia\Inertia::render('notifications/TestNotification', compact('equipments'));
        })->name('test.form');
        Route::post('/{notification}/resend', [\App\Http\Controllers\NotificationController::class, 'resend'])->name('resend');
        Route::post('/process', [\App\Http\Controllers\NotificationController::class, 'processNow'])->name('process');
        Route::post('/test', [\App\Http\Controllers\NotificationController::class, 'testNotification'])->name('test');
    });

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    // En routes/web.php
    Route::post('/users/{user}/activate', [UserController::class, 'activate'])->name('users.activate');
    Route::post('/users/{user}/inactivate', [UserController::class, 'inactivate'])->name('users.inactivate');
    Route::post('/users/export-excel', [UserController::class, 'exportToExcel'])->name('users.export.excel');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
