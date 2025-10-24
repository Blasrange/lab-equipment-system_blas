@echo off
chcp 65001 >nul
title Lab Equipment System - Backup de Base de Datos
color 0B

REM Cambiar al directorio del proyecto (un nivel arriba desde scripts)
cd /d "%~dp0\.."

echo ================================================================
echo        💾 BACKUP DE BASE DE DATOS - LAB EQUIPMENT SYSTEM
echo ================================================================
echo.
echo 📁 Directorio de trabajo: %CD%
echo.

REM === Preparar fecha y hora ===
set FECHA=%date:~-4,4%-%date:~-7,2%-%date:~-10,2%
set HORA=%time:~0,2%-%time:~3,2%-%time:~6,2%
set HORA=%HORA: =0%

set BACKUP_NAME=backup_lab_equipment_%FECHA%_%HORA%.sqlite

REM === Crear carpeta de backups si no existe ===
if not exist "backups" (
    echo [INFO] Creando carpeta de backups...
    mkdir backups
)

REM === Verificar base de datos existente ===
if exist "database\database.sqlite" (
    echo [INFO] Creando copia de seguridad de la base de datos...
    copy "database\database.sqlite" "backups\%BACKUP_NAME%" >nul
    echo ✅ Backup creado exitosamente: backups\%BACKUP_NAME%
    echo.
    echo 📋 Información del backup:
    echo    - Archivo: %BACKUP_NAME%
    echo    - Ubicación: %CD%\backups\
    echo    - Fecha: %date%
    echo    - Hora: %time:~0,8%
    
    REM Mostrar tamaño del archivo
    for %%I in ("backups\%BACKUP_NAME%") do echo    - Tamaño: %%~zI bytes

    echo.
    echo [INFO] Para restaurar este backup, use la opción 4 del menú principal.
) else (
    echo ❌ No se encontró la base de datos en: database\database.sqlite
    echo 💡 Asegúrese de haber iniciado el sistema al menos una vez.
)

echo.
echo ================================================================
echo            📂 LISTA DE BACKUPS EXISTENTES
echo ================================================================
echo.

if exist "backups\*.sqlite" (
    dir "backups\*.sqlite" /B
) else (
    echo (No hay copias de seguridad registradas)
)

echo.
echo 🔸 Proceso completado.
echo.
pause
