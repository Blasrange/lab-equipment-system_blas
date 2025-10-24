@echo off
chcp 65001 >nul
title Lab Equipment System - Instalación Automática
color 0A

REM Cambiar al directorio del proyecto (un nivel arriba desde scripts)
cd /d "%~dp0\.."

echo ================================================================
echo           INSTALACIÓN AUTOMÁTICA - LAB EQUIPMENT SYSTEM
echo ================================================================
echo.
echo Este script instalará automáticamente todas las dependencias
echo necesarias para ejecutar el Sistema de Gestión de Equipos.
echo.
echo 📁 Directorio de trabajo: %CD%
echo.
echo Requisitos que se instalarán automáticamente:
echo - Node.js (si no está instalado)
echo - PHP (si no está instalado)
echo - Composer (si no está instalado)
echo.
pause

REM === Verificar permisos de administrador ===
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
    echo [INFO] Solicitando permisos de administrador...
    goto UACPrompt
) else (
    goto gotAdmin
)

:UACPrompt
echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
"%temp%\getadmin.vbs"
exit /B

:gotAdmin
if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
pushd "%CD%"
CD /D "%~dp0\.."

echo [INFO] Verificando instalaciones existentes...
echo.

REM === Verificar Node.js ===
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Descargando e instalando Node.js...
    powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi' -OutFile 'nodejs-installer.msi'}"
    if exist "nodejs-installer.msi" (
        echo [INFO] Instalando Node.js...
        msiexec /i nodejs-installer.msi /quiet /norestart
        del "nodejs-installer.msi"

        REM Actualizar PATH
        set "PATH=%PATH%;C:\Program Files\nodejs"
        setx PATH "%PATH%;C:\Program Files\nodejs" /M
    )
) else (
    echo [OK] Node.js ya está instalado
)

REM === Verificar PHP ===
where php >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Descargando PHP...
    powershell -Command "& {Invoke-WebRequest -Uri 'https://windows.php.net/downloads/releases/php-8.2.13-Win32-vs16-x64.zip' -OutFile 'php.zip'}"
    if exist "php.zip" (
        echo [INFO] Instalando PHP...
        powershell -Command "Expand-Archive -Path 'php.zip' -DestinationPath 'C:\php' -Force"
        del "php.zip"

        REM Configurar PHP
        copy "C:\php\php.ini-development" "C:\php\php.ini" >nul

        REM Habilitar extensiones necesarias
        powershell -Command "(Get-Content 'C:\php\php.ini') -replace ';extension=pdo_sqlite', 'extension=pdo_sqlite' | Set-Content 'C:\php\php.ini'"
        powershell -Command "(Get-Content 'C:\php\php.ini') -replace ';extension=sqlite3', 'extension=sqlite3' | Set-Content 'C:\php\php.ini'"
        powershell -Command "(Get-Content 'C:\php\php.ini') -replace ';extension=openssl', 'extension=openssl' | Set-Content 'C:\php\php.ini'"
        powershell -Command "(Get-Content 'C:\php\php.ini') -replace ';extension=mbstring', 'extension=mbstring' | Set-Content 'C:\php\php.ini'"
        powershell -Command "(Get-Content 'C:\php\php.ini') -replace ';extension=curl', 'extension=curl' | Set-Content 'C:\php\php.ini'"
        powershell -Command "(Get-Content 'C:\php\php.ini') -replace ';extension=fileinfo', 'extension=fileinfo' | Set-Content 'C:\php\php.ini'"

        REM Actualizar PATH
        setx PATH "%PATH%;C:\php" /M
        set "PATH=%PATH%;C:\php"
    )
) else (
    echo [OK] PHP ya está instalado
)

REM === Verificar Composer ===
where composer >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Descargando Composer...
    powershell -Command "& {Invoke-WebRequest -Uri 'https://getcomposer.org/Composer-Setup.exe' -OutFile 'composer-setup.exe'}"
    if exist "composer-setup.exe" (
        echo [INFO] Instalando Composer...
        composer-setup.exe /SILENT /SUPPRESSMSGBOXES
        del "composer-setup.exe"
    )
) else (
    echo [OK] Composer ya está instalado
)

echo.
echo ================================================================
echo                INSTALACIÓN COMPLETADA
echo ================================================================
echo.
echo Todas las dependencias han sido instaladas correctamente.
echo.
echo [INFO] Iniciando el sistema automáticamente en 3 segundos...
echo.
timeout /t 3 /nobreak >nul

REM Actualizar PATH para la sesión actual
for /f "tokens=2*" %%a in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v PATH 2^>nul') do set "SystemPath=%%b"
for /f "tokens=2*" %%a in ('reg query "HKCU\Environment" /v PATH 2^>nul') do set "UserPath=%%b"
if defined UserPath (
    set "PATH=%SystemPath%;%UserPath%"
) else (
    set "PATH=%SystemPath%"
)

REM Auto-ejecutar el sistema
call "iniciar-lab-equipment-system.bat"
