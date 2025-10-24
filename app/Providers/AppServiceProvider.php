<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Detectar si estamos en entorno local (localhost o 127.0.0.1)
        $isLocalhost = in_array(request()->getHost(), ['localhost', '127.0.0.1']);

        // Si NO es localhost, forzamos HTTPS
        if (! $isLocalhost) {
            // Si la app está detrás de un proxy (como ngrok, Cloudflare, etc.)
            if (
                isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
                $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https'
            ) {
                URL::forceScheme('https');
            }

            // También forzar HTTPS si la APP_URL en .env comienza con https://
            if (str_starts_with(config('app.url'), 'https://')) {
                URL::forceScheme('https');
            }
        }
    }
}
