@echo off
chcp 65001 >nul
title Lab Equipment System - Iniciando...
color 0A

REM Cambiar al directorio del proyecto (un nivel arriba desde scripts)
cd /d "%~dp0\.."

echo ================================================================
echo       SISTEMA DE GESTIÓN DE EQUIPOS DE LABORATORIO
echo ================================================================
echo.
echo Inicializando el sistema...
echo 📁 Directorio de trabajo: %CD%
echo.

REM === Verificar dependencias básicas ===
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no está instalado.
    echo Por favor instale Node.js desde: https://nodejs.org/
    echo O ejecute la opción 2 del menú principal para instalación automática.
    pause
    exit /b 1
)

where php >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] PHP no está instalado.
    echo Por favor instale PHP desde: https://www.php.net/downloads.php
    echo O ejecute la opción 2 del menú principal para instalación automática.
    pause
    exit /b 1
)

where composer >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Composer no está instalado.
    echo Por favor instale Composer desde: https://getcomposer.org/download/
    echo O ejecute la opción 2 del menú principal para instalación automática.
    pause
    exit /b 1
)

echo [INFO] Verificando estado del proyecto...
echo.

REM === Verificar si ya está todo configurado ===
set NECESITA_INSTALACION=0

if not exist "node_modules" set NECESITA_INSTALACION=1
if not exist "vendor" set NECESITA_INSTALACION=1
if not exist ".env" set NECESITA_INSTALACION=1
if not exist "database\database.sqlite" set NECESITA_INSTALACION=1

if %NECESITA_INSTALACION%==1 (
    echo [INFO] Primera ejecución detectada. Configurando proyecto...
) else (
    echo [OK] Proyecto ya configurado. Iniciando directamente...
    goto iniciar_servidor_directo
)

REM === Instalar dependencias de Node.js si no existen ===
if not exist "node_modules" (
    echo [INFO] Instalando dependencias de Node.js...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Error al instalar dependencias de Node.js.
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependencias de Node.js ya instaladas
)

REM === Instalar dependencias de Composer si no existen ===
if not exist "vendor" (
    echo [INFO] Instalando dependencias de PHP/Laravel...
    call composer install --no-dev --optimize-autoloader
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Error al instalar dependencias de PHP.
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependencias de PHP ya instaladas
)

REM === Crear archivo .env si no existe ===
if not exist ".env" (
    echo [INFO] Creando archivo de configuración...
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
    ) else (
        call :crear_env
    )
)

REM === Generar clave de aplicación si no existe ===
findstr /C:"APP_KEY=" .env | findstr /C:"base64:" >nul
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Generando clave de seguridad...
    call php artisan key:generate --force
)

REM === Crear base de datos SQLite si no existe ===
if not exist "database\database.sqlite" (
    echo [INFO] Creando base de datos SQLite...
    type nul > "database\database.sqlite"
    echo [INFO] Configurando base de datos...
    call php artisan migrate --force
    call php artisan db:seed --force 2>nul
) else (
    echo [OK] Base de datos ya existe
    REM Solo ejecutar migraciones pendientes
    call php artisan migrate --force >nul 2>&1
)

REM === Compilar assets de frontend solo si es necesario ===
if not exist "public\build" (
    echo [INFO] Compilando interfaz de usuario...
    call npm run build
) else (
    echo [OK] Interfaz ya compilada
)

:iniciar_servidor_directo

echo.
echo ================================================================
echo               SISTEMA LISTO - INICIANDO SERVIDORES
echo ================================================================
echo.

REM === Obtener IP local ===
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /C:"IPv4"') do set LOCAL_IP=%%i
set LOCAL_IP=%LOCAL_IP: =%
if "%LOCAL_IP%"=="" set LOCAL_IP=127.0.0.1

REM === Actualizar APP_URL con IP dinámica ===
if exist ".env" (
    powershell -Command "(Get-Content '.env') -replace 'APP_URL=.*', 'APP_URL=http://%LOCAL_IP%:8000' | Set-Content '.env'" >nul 2>&1
)

echo.
echo ================================================================
echo               🌐 SISTEMA INICIADO CORRECTAMENTE
echo ================================================================
echo.
echo 📍 Acceso Local:    http://localhost:8000
echo 📍 Acceso en Red:   http://%LOCAL_IP%:8000
echo.
echo 🔗 URL para compartir: http://%LOCAL_IP%:8000
echo 💡 El sistema se adaptará automáticamente a cambios de IP
echo.

REM === Crear monitor de IP en background ===
(
echo @echo off
echo :monitor_loop
echo for /f "tokens=2 delims=:" %%%%i in ^('ipconfig ^| findstr /C:"IPv4"'^) do set NEW_IP=%%%%i
echo set NEW_IP=%%NEW_IP: =%%
echo if "%%NEW_IP%%" NEQ "%LOCAL_IP%" ^(
echo     powershell -Command "^(Get-Content '.env'^) -replace 'APP_URL=.*', 'APP_URL=http://%%NEW_IP%%:8000' | Set-Content '.env'" ^>nul 2^>^&1
echo     set LOCAL_IP=%%NEW_IP%%
echo ^)
echo timeout /t 30 /nobreak ^>nul
echo goto monitor_loop
) > "scripts\temp_monitor_ip.bat"

REM === Crear archivo de estado del sistema ===
echo RUNNING > "storage\system.status"
echo URL=http://%LOCAL_IP%:8000 >> "storage\system.status"
echo START_TIME=%date% %time% >> "storage\system.status"

REM === Crear script del servidor en background ===
(
echo @echo off
echo cd /d "%CD%"
echo title Lab Equipment System - Servidor
echo php artisan serve --host=0.0.0.0 --port=8000
) > "scripts\temp_servidor.bat"

REM === Iniciar servidor en background ===
echo [INFO] Iniciando servidor en background...
start /MIN "" "scripts\temp_servidor.bat"

REM === Esperar a que el servidor esté listo ===
timeout /t 2 /nobreak >nul

REM === Abrir navegador automáticamente ===
echo [INFO] Abriendo navegador...
start "" "http://%LOCAL_IP%:8000"

REM === Iniciar monitor de IP en background ===
start /MIN "" "scripts\temp_monitor_ip.bat"

echo.
echo ✅ Sistema iniciado correctamente
echo 📍 URL Local:    http://localhost:8000
echo 📍 URL en Red:   http://%LOCAL_IP%:8000
echo.
echo � Comparte esta URL: http://%LOCAL_IP%:8000
echo �🛑 Para detener: ejecuta detener-sistema.bat
echo.
echo ⏳ Cerrando terminal en 3 segundos...
timeout /t 3 /nobreak >nul

REM === Cerrar esta terminal ===
exit /b 0
goto :eof

:crear_env
echo APP_NAME="Lab Equipment System" > .env
echo APP_ENV=local >> .env
echo APP_KEY= >> .env
echo APP_DEBUG=true >> .env
echo APP_TIMEZONE=UTC >> .env
echo APP_URL=http://localhost:8000 >> .env
echo. >> .env
echo APP_LOCALE=es >> .env
echo APP_FALLBACK_LOCALE=en >> .env
echo APP_FAKER_LOCALE=es_ES >> .env
echo. >> .env
echo VITE_APP_NAME="${APP_NAME}" >> .env
echo. >> .env
echo DB_CONNECTION=sqlite >> .env
echo DB_DATABASE=database/database.sqlite >> .env
echo. >> .env
echo SESSION_DRIVER=file >> .env
echo SESSION_LIFETIME=120 >> .env
echo SESSION_ENCRYPT=false >> .env
echo SESSION_PATH=/ >> .env
echo SESSION_DOMAIN=null >> .env
echo. >> .env
echo CACHE_STORE=file >> .env
echo CACHE_PREFIX= >> .env
echo. >> .env
echo QUEUE_CONNECTION=sync >> .env
echo. >> .env
echo MAIL_MAILER=log >> .env
echo MAIL_HOST=127.0.0.1 >> .env
echo MAIL_PORT=2525 >> .env
echo MAIL_USERNAME=null >> .env
echo MAIL_PASSWORD=null >> .env
echo MAIL_ENCRYPTION=null >> .env
echo MAIL_FROM_ADDRESS="hello@example.com" >> .env
echo MAIL_FROM_NAME="${APP_NAME}" >> .env
goto :eof
