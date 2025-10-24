<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Migration Routes (Solo para producción inicial)
|--------------------------------------------------------------------------
| IMPORTANTE: Eliminar estas rutas después de la primera migración
| por seguridad. Solo usar para setup inicial.
*/

if (app()->environment('production')) {
    Route::middleware(['throttle:3,10'])->group(function () {

        // Endpoint para ejecutar migraciones (eliminar después del setup)
        Route::get('/setup/migrate/{token}', function ($token) {
            // Token de seguridad simple - cambiar por uno seguro
            if ($token !== 'mi-token-super-secreto-123') {
                abort(403, 'Token inválido');
            }

            try {
                // Verificar estado de migraciones
                $status = Artisan::call('migrate:status');

                // Ejecutar migraciones
                Artisan::call('migrate', ['--force' => true]);

                return response()->json([
                    'message' => 'Migraciones ejecutadas correctamente',
                    'output' => Artisan::output()
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Error ejecutando migraciones',
                    'message' => $e->getMessage()
                ], 500);
            }
        });

        // Endpoint para verificar estado de la base de datos
        Route::get('/setup/db-status/{token}', function ($token) {
            if ($token !== 'mi-token-super-secreto-123') {
                abort(403, 'Token inválido');
            }

            try {
                Artisan::call('migrate:status');

                return response()->json([
                    'message' => 'Estado de la base de datos',
                    'output' => Artisan::output()
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Error verificando estado de la base de datos',
                    'message' => $e->getMessage()
                ], 500);
            }
        });
    });
}
