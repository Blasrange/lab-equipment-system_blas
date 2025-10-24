@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title Lab Equipment System - Menú Principal
color 0A

REM Cambiar al directorio del proyecto (un nivel arriba)
cd /d "%~dp0\.."

:menu
cls
echo.
echo ================================================================
echo             SISTEMA DE GESTIÓN DE EQUIPOS DE LABORATORIO
echo                        Menú Principal
echo ================================================================
echo.
echo 📁 Directorio actual: %CD%
echo.
echo Seleccione una opción:
echo.
echo   1. 🚀 Iniciar Sistema (Auto-config + Browser + IP dinámica)
echo   2. ⚙️  Instalar Dependencias (Primera vez)
echo   3. 💾 Crear Backup de Base de Datos
echo   4. 📂 Restaurar Backup
echo   5. 🛑 Detener Sistema
echo   6. 📖 Ver Información del Sistema
echo   7. 🔧 Verificar Estado del Sistema
echo   8. ❌ Salir
echo.
echo 💡 MEJORAS en Opción 1:
echo    • Auto-instalación si faltan dependencias
echo    • Abre navegador automáticamente
echo    • Se adapta a cambios de IP de red
echo    • Terminal se oculta después del inicio
echo.
set /p opcion="Ingrese su opción (1-8): "

if "%opcion%"=="1" goto iniciar
if "%opcion%"=="2" goto instalar
if "%opcion%"=="3" goto backup
if "%opcion%"=="4" goto restaurar
if "%opcion%"=="5" goto detener
if "%opcion%"=="6" goto info
if "%opcion%"=="7" goto verificar
if "%opcion%"=="8" goto salir

echo Opción inválida. Presione cualquier tecla para continuar...
pause >nul
goto menu

:iniciar
echo.
echo [INFO] Iniciando sistema con funcionalidades mejoradas...
echo       • Verificación automática de dependencias
echo       • Apertura automática del navegador
echo       • Adaptación automática de IP
echo       • Terminal oculta después del inicio
echo.
call "scripts\iniciar-lab-equipment-system.bat"
goto menu

:instalar
echo.
echo [INFO] Instalando dependencias...
call "scripts\instalar-dependencias.bat"
echo.
echo Presione cualquier tecla para continuar...
pause >nul
goto menu

:backup
echo.
echo [INFO] Creando backup...
call "scripts\crear-backup.bat"
echo.
echo Presione cualquier tecla para continuar...
pause >nul
goto menu

:restaurar
echo.
echo [INFO] Restaurando backup...
call "scripts\restaurar-backup.bat"
echo.
echo Presione cualquier tecla para continuar...
pause >nul
goto menu

:detener
echo.
echo [INFO] Deteniendo sistema...
call "scripts\detener-sistema.bat"
echo.
echo Presione cualquier tecla para continuar...
pause >nul
goto menu

:info
cls
echo ================================================================
echo                      INFORMACIÓN DEL SISTEMA
echo ================================================================
echo.
echo 📋 Nombre: Lab Equipment System
echo 🏗️  Framework: Laravel + React + Inertia.js
echo 💾 Base de Datos: SQLite (Local)
echo 🌐 Puerto: 8000
echo 📁 Directorio: %CD%
echo.
echo 📊 Estado de Archivos:
if exist "database\database.sqlite" (
    echo    ✅ Base de datos: OK
    for %%I in ("database\database.sqlite") do echo       Tamaño: %%~zI bytes
) else (
    echo    ❌ Base de datos: No encontrada
)

if exist "node_modules" (
    echo    ✅ Dependencias Node.js: OK
) else (
    echo    ❌ Dependencias Node.js: No instaladas
)

if exist "vendor" (
    echo    ✅ Dependencias PHP: OK
) else (
    echo    ❌ Dependencias PHP: No instaladas
)

if exist ".env" (
    echo    ✅ Configuración: OK
) else (
    echo    ❌ Configuración: No encontrada
)

echo.
echo 🌐 URLs de Acceso:
echo    Local: http://localhost:8000
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /C:"IPv4"') do (
    set LOCAL_IP=%%i
    set LOCAL_IP=!LOCAL_IP: =!
    echo    Red:   http://!LOCAL_IP!:8000
    goto found_ip
)
:found_ip

echo.
echo Presione cualquier tecla para continuar...
pause >nul
goto menu

:verificar
cls
echo ================================================================
echo                   VERIFICACIÓN DEL SISTEMA
echo ================================================================
echo.

echo [INFO] Verificando dependencias...
echo.

REM Verificar Node.js
where node >nul 2>&1
if %ERRORLEVEL%==0 (
    echo ✅ Node.js: Instalado
    for /f "tokens=*" %%i in ('node --version 2^>nul') do echo    Versión: %%i
) else (
    echo ❌ Node.js: No instalado
)

REM Verificar PHP
where php >nul 2>&1
if %ERRORLEVEL%==0 (
    echo ✅ PHP: Instalado
    for /f "tokens=*" %%i in ('php --version 2^>nul ^| findstr /C:"PHP"') do echo    Versión: %%i
) else (
    echo ❌ PHP: No instalado
)

REM Verificar Composer
where composer >nul 2>&1
if %ERRORLEVEL%==0 (
    echo ✅ Composer: Instalado
    for /f "tokens=*" %%i in ('composer --version 2^>nul') do echo    Versión: %%i
) else (
    echo ❌ Composer: No instalado
)

echo.
echo [INFO] Verificando puerto 8000...
netstat -an | findstr :8000 >nul
if %ERRORLEVEL%==0 (
    echo ✅ Puerto 8000: En uso (Sistema probablemente ejecutándose)
) else (
    echo ⚪ Puerto 8000: Libre
)

echo.
echo [INFO] Verificando conectividad de red...
ping -n 1 127.0.0.1 >nul
if %ERRORLEVEL%==0 (
    echo ✅ Loopback: OK
) else (
    echo ❌ Loopback: Error
)

echo.
echo Presione cualquier tecla para continuar...
pause >nul
goto menu

:salir
echo.
echo ¡Hasta luego! 👋
echo.
exit /b 0
