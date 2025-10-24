<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Equipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'instrument',
        'int_code',
        'brand',
        'model',
        'serial_number',
        'system_number',
        'ext_calibration_periodicity',
        'internal_check_periodicity',
        'last_ext_calibration',
        'next_ext_calibration',
        'active',
        'qr_token',
    ];

    protected $casts = [
        'active' => 'boolean',
        'last_ext_calibration' => 'date',
        'next_ext_calibration' => 'date',
    ];

    /**
     * Relación con los registros de mantenimiento
     */
    public function maintenanceRecords(): HasMany
    {
        return $this->hasMany(MaintenanceRecord::class);
    }

    /**
     * Mantenimientos pendientes
     */
    public function pendingMaintenances(): HasMany
    {
        return $this->hasMany(MaintenanceRecord::class)
            ->whereIn('status', ['scheduled', 'in_progress']);
    }

    /**
     * Último mantenimiento realizado
     */
    public function lastMaintenance()
    {
        return $this->hasOne(MaintenanceRecord::class)
            ->where('status', 'completed')
            ->latest('performed_date');
    }

    /**
     * Próximo mantenimiento programado
     */
    public function nextMaintenance()
    {
        return $this->hasOne(MaintenanceRecord::class)
            ->where('status', 'scheduled')
            ->orderBy('scheduled_date');
    }

    /**
     * Generar token QR único si no existe
     */
    public function generateQrToken()
    {
        if (!$this->qr_token) {
            $this->qr_token = Str::random(32);
            $this->save();
        }
        return $this->qr_token;
    }

    /**
     * Obtener URL del formulario QR
     */
    public function getQrUrl()
    {
        $token = $this->qr_token ?: $this->generateQrToken();
        return url("/qr-maintenance/{$token}");
    }

    /**
     * Boot method para generar QR token automáticamente
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($equipment) {
            if (!$equipment->qr_token) {
                $equipment->qr_token = Str::random(32);
            }
        });
    }
}
