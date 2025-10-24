@echo off
title Lab Equipment System - Inicio Automático
color 0A
echo.
echo ================================================================
echo           SISTEMA DE GESTION DE EQUIPOS DE LABORATORIO
echo                        INICIO AUTOMÁTICO
echo ================================================================
echo.
echo 🚀 Características mejoradas:
echo    ✅ Auto-instalación de dependencias si faltan
echo    ✅ Apertura automática del navegador
echo    ✅ Adaptación automática a cambios de IP
echo    ✅ Terminal oculta después del inicio
echo    ✅ Compartible en red local automáticamente
echo.
echo ⏳ Iniciando sistema...
echo.

REM Verificar si las dependencias están instaladas
where node >nul 2>&1
set NODE_OK=%ERRORLEVEL%

where php >nul 2>&1
set PHP_OK=%ERRORLEVEL%

where composer >nul 2>&1
set COMPOSER_OK=%ERRORLEVEL%

REM Verificar si el proyecto ya está configurado
if not exist "node_modules" set NODE_MODULES_OK=1
if not exist "vendor" set VENDOR_OK=1
if not exist ".env" set ENV_OK=1

if %NODE_OK% NEQ 0 (
    echo [INFO] Dependencias del sistema no encontradas. Instalando automáticamente...
    call "scripts\instalar-dependencias.bat"
) else if not exist "node_modules" (
    echo [INFO] Proyecto no configurado. Instalando dependencias...
    call "scripts\instalar-dependencias.bat"
) else if not exist "vendor" (
    echo [INFO] Proyecto no configurado. Instalando dependencias...
    call "scripts\instalar-dependencias.bat"
) else (
    echo [INFO] ✅ Todo está listo. Iniciando sistema directamente...
    call "scripts\iniciar-lab-equipment-system.bat"
)