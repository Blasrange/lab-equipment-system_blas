<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MaintenanceType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category',
        'estimated_duration',
        'estimated_cost',
        'requires_external_service',
        'frequency',
        'required_tools',
        'required_parts',
        'instructions',
        'active'
    ];

    protected $casts = [
        'requires_external_service' => 'boolean',
        'active' => 'boolean',
        'estimated_cost' => 'decimal:2',
        'required_tools' => 'array',
        'required_parts' => 'array',
    ];

    /**
     * Relación con los registros de mantenimiento
     */
    public function maintenanceRecords(): HasMany
    {
        return $this->hasMany(MaintenanceRecord::class);
    }

    /**
     * Scope para tipos activos
     */
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    /**
     * Scope por categoría
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Obtener color del tipo de mantenimiento
     */
    public function getColorAttribute($value)
    {
        return $value ?: '#2196F3';
    }
}
