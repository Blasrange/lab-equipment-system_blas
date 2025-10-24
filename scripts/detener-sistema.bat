@echo off
chcp 65001 >nul
title Lab Equipment System - Deteniendo Sistema
color 0C

REM Cambiar al directorio del proyecto (un nivel arriba desde scripts)
cd /d "%~dp0\.."

echo ================================================================
echo       🛑 DETENIENDO SISTEMA DE EQUIPOS DE LABORATORIO
echo ================================================================
echo.
echo 📁 Directorio de trabajo: %CD%
echo.
echo [INFO] Cerrando servidores y procesos asociados...
echo.

REM === Eliminar archivo de estado del sistema ===
if exist "storage\system.status" (
    del "storage\system.status" >nul 2>&1
    echo [OK] Estado del sistema limpiado
)

REM === Eliminar archivos temporales ===
if exist "scripts\temp_monitor_ip.bat" (
    del "scripts\temp_monitor_ip.bat" >nul 2>&1
    echo [OK] Monitor de IP detenido
)

if exist "scripts\temp_servidor.bat" (
    del "scripts\temp_servidor.bat" >nul 2>&1
    echo [OK] Script del servidor eliminado
)

REM === Finalizar procesos de PHP (artisan serve) ===
for /f "tokens=2 delims=," %%A in ('tasklist /FI "IMAGENAME eq php.exe" /FO CSV ^| findstr /I "php.exe"') do (
    taskkill /f /pid %%~A >nul 2>&1
)

REM === Finalizar procesos de Node.js (Vite, build, etc.) ===
for /f "tokens=2 delims=," %%A in ('tasklist /FI "IMAGENAME eq node.exe" /FO CSV ^| findstr /I "node.exe"') do (
    taskkill /f /pid %%~A >nul 2>&1
)

REM === Cerrar cualquier proceso en el puerto 8000 ===
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000') do (
    taskkill /f /pid %%a >nul 2>&1
)

REM === Restaurar ventanas minimizadas ===
powershell -Command "Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public class Win32 { [DllImport(\"user32.dll\")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow); [DllImport(\"kernel32.dll\")] public static extern IntPtr GetConsoleWindow(); }'; [Win32]::ShowWindow([Win32]::GetConsoleWindow(), 1)" >nul 2>&1

echo ✅ Todos los procesos relacionados han sido cerrados.
echo ------------------------------------------------
echo 💡 Es seguro cerrar esta ventana.
echo ------------------------------------------------
echo.
pause
