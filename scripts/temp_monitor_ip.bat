@echo off
:monitor_loop
for /f "tokens=2 delims=:" %%i in ('ipconfig | findstr /C:"IPv4"') do set NEW_IP=%%i
set NEW_IP=%NEW_IP: =%
if "%NEW_IP%" NEQ "172.18.128.1" (
    powershell -Command "^(Get-Content '.env'^) -replace 'APP_URL=.*', 'APP_URL=http://%NEW_IP%:8000' | Set-Content '.env'" >nul 2>&1
    set LOCAL_IP=%NEW_IP%
)
timeout /t 30 /nobreak >nul
goto monitor_loop
