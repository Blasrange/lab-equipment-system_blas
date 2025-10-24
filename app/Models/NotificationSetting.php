<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'is_active',
        'days_before',
        'email_addresses',
        'email_template',
        'notification_types',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'email_addresses' => 'array',
        'notification_types' => 'array',
    ];

    /**
     * Scope para configuraciones activas
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Obtener configuración por nombre
     */
    public static function getByName(string $name): ?self
    {
        return static::where('name', $name)->first();
    }

    /**
     * Verificar si tiene notificaciones por email habilitadas
     */
    public function hasEmailNotifications(): bool
    {
        return $this->is_active && in_array('email', $this->notification_types ?? []);
    }
}
