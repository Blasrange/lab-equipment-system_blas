<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailNotification extends Model
{
    use HasFactory;

    protected $fillable = [
        'equipment_id',
        'maintenance_record_id',
        'notification_type',
        'subject',
        'message',
        'recipients',
        'status',
        'scheduled_at',
        'sent_at',
        'error_message',
        'attempts',
    ];

    protected $casts = [
        'recipients' => 'array',
        'scheduled_at' => 'datetime',
        'sent_at' => 'datetime',
    ];

    /**
     * Relación con Equipment
     */
    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }

    /**
     * Relación con MaintenanceRecord
     */
    public function maintenanceRecord()
    {
        return $this->belongsTo(MaintenanceRecord::class);
    }

    /**
     * Scope para notificaciones pendientes
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope para notificaciones que deben enviarse
     */
    public function scopeReadyToSend($query)
    {
        return $query->where('status', 'pending')
            ->where('scheduled_at', '<=', \Carbon\Carbon::now('America/Bogota'))
            ->where('attempts', '<', 3);
    }

    /**
     * Marcar como enviado
     */
    public function markAsSent(): void
    {
        $this->update([
            'status' => 'sent',
            'sent_at' => \Carbon\Carbon::now('America/Bogota'),
        ]);
    }

    /**
     * Marcar como fallido
     */
    public function markAsFailed(string $errorMessage): void
    {
        $this->update([
            'status' => 'failed',
            'error_message' => $errorMessage,
            'attempts' => $this->attempts + 1,
        ]);
    }
}
