<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Programar el procesamiento de notificaciones cada hora
Schedule::command('notifications:process')->hourly()
    ->withoutOverlapping()
    ->runInBackground()
    ->appendOutputTo(storage_path('logs/notifications-cron.log'));

// Procesar notificaciones vencidas cada 6 horas
Schedule::command('notifications:process --type=maintenance_overdue')->everySixHours()
    ->withoutOverlapping()
    ->runInBackground();
