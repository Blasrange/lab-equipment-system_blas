@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title Lab Equipment System - Restaurar Backup
color 0E

REM Cambiar al directorio del proyecto (un nivel arriba desde scripts)
cd /d "%~dp0\.."

echo ================================================================
echo        ♻️ RESTAURAR BACKUP - LAB EQUIPMENT SYSTEM
echo ================================================================
echo.
echo 📁 Directorio de trabajo: %CD%
echo.

if not exist "backups" (
    echo [❌ ERROR] No existe la carpeta de backups.
    echo [ℹ️ INFO] Use la opción 3 del menú principal para crear un backup primero.
    echo.
    pause
    exit /b 1
)

echo [INFO] Buscando backups disponibles...
echo ------------------------------------------------
set /a count=0
for %%f in (backups\*.sqlite) do (
    set /a count+=1
    echo !count!. %%~nxf
    set "file!count!=%%f"
)

if %count%==0 (
    echo.
    echo [❌ ERROR] No hay backups disponibles.
    echo [ℹ️ INFO] Use la opción 3 del menú principal para crear un backup primero.
    echo.
    pause
    exit /b 1
)

echo.
set /p choice="Seleccione el número del backup a restaurar (1-%count%): "

if not defined file%choice% (
    echo [⚠️ ERROR] Selección inválida.
    echo.
    pause
    exit /b 1
)

call set "selected_file=%%file%choice%%%"
echo.
echo ⚠️  Esta acción sobrescribirá la base de datos actual.
echo ⚠️  Se perderán todos los datos no respaldados.
echo ------------------------------------------------
echo 🗃️  Archivo seleccionado: %selected_file%
echo ------------------------------------------------
echo.
set /p confirm="¿Está seguro de continuar? (S/N): "

if /i "%confirm%" NEQ "S" (
    echo.
    echo [ℹ️ INFO] Operación cancelada por el usuario.
    echo.
    pause
    exit /b 0
)

echo.
echo [INFO] Creando backup de seguridad antes de restaurar...
if exist "database\database.sqlite" (
    set FECHA=%date:~-4,4%-%date:~-7,2%-%date:~-10,2%
    set HORA=%time:~0,2%-%time:~3,2%-%time:~6,2%
    set HORA=%HORA: =0%
    set BACKUP_NAME=backup_antes_restauracion_%FECHA%_%HORA%.sqlite
    copy "database\database.sqlite" "backups\!BACKUP_NAME!" >nul
    echo [✅ OK] Backup previo creado: backups\!BACKUP_NAME!
)

echo.
echo [INFO] Restaurando backup seleccionado...
copy "%selected_file%" "database\database.sqlite" >nul

if %ERRORLEVEL%==0 (
    echo [✅ OK] Backup restaurado exitosamente.
    echo ------------------------------------------------
    echo [ℹ️ INFO] La base de datos ha sido restaurada correctamente.
    echo [➡️ INFO] Puede iniciar el sistema con la opción 1 del menú.
) else (
    echo [❌ ERROR] Ocurrió un problema al restaurar el backup.
)

echo.
pause
