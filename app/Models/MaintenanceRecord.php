<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class MaintenanceRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'equipment_id',
        'maintenance_type_name',
        'maintenance_category',
        'scheduled_date',
        'performed_date',
        'responsible_person',
        'description',
        'priority',
        'status',
        'actual_duration',
        'actual_cost',
        'work_performed',
        'findings',
        'recommendations',
        'notes',
        'requires_external_service',
        'external_provider',
        'parts_needed',
        'parts_used',
        'completed_at',
        'completed_by',
        'completion_status'
    ];

    protected $casts = [
        'scheduled_date' => 'date',
        'performed_date' => 'date',
        'actual_cost' => 'decimal:2',
        'requires_external_service' => 'boolean',
        'parts_used' => 'array',
        'completed_at' => 'datetime',
        'attachments' => 'array',
        'requires_validation' => 'boolean',
        'validated_at' => 'datetime',
        'next_maintenance_date' => 'date',
    ];

    /**
     * Relación con el equipo
     */
    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }

    /**
     * Relación con el tipo de mantenimiento
     */
    public function maintenanceType(): BelongsTo
    {
        return $this->belongsTo(MaintenanceType::class);
    }

    /**
     * Relación con el usuario que realizó el mantenimiento
     */
    public function performedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'performed_by');
    }

    /**
     * Relación con el usuario que validó el mantenimiento
     */
    public function validatedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'validated_by');
    }

    /**
     * Scopes
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByPriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('maintenance_category', $category);
    }

    public function scopeScheduledBetween($query, $startDate, $endDate)
    {
        return $query->whereBetween('scheduled_date', [$startDate, $endDate]);
    }

    public function scopeOverdue($query)
    {
        return $query->where('status', 'scheduled')
            ->where('scheduled_date', '<', Carbon::now()->toDateString());
    }

    /**
     * Accessors
     */
    public function getIsOverdueAttribute()
    {
        return $this->status === 'scheduled' &&
            $this->scheduled_date < Carbon::now()->toDateString();
    }

    public function getIsCompletedAttribute()
    {
        return $this->status === 'completed';
    }

    public function getDurationDifferenceAttribute()
    {
        return $this->actual_duration - $this->estimated_duration;
    }

    public function getCostDifferenceAttribute()
    {
        return $this->actual_cost - $this->estimated_cost;
    }

    /**
     * Métodos de estado
     */
    public function markAsCompleted($performedBy = null, $workPerformed = null, $findings = null)
    {
        $this->update([
            'status' => 'completed',
            'performed_date' => Carbon::now()->toDateString(),
            'performed_by' => $performedBy,
            'work_performed' => $workPerformed,
            'findings' => $findings,
        ]);
    }

    public function markAsInProgress()
    {
        $this->update(['status' => 'in_progress']);
    }

    public function cancel($reason = null)
    {
        $this->update([
            'status' => 'cancelled',
            'notes' => $this->notes . "\nCancelado: " . $reason
        ]);
    }
}
