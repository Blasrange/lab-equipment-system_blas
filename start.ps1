# ==============================
# 🚀 START.PS1 - Docker + LocalTunnel
# ==============================

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  🚀 Iniciando Lab Equipment System con Docker y LocalTunnel..."
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar instalación de LocalTunnel
Write-Host "🔍 Verificando instalación de LocalTunnel..."
if (-not (Get-Command "lt" -ErrorAction SilentlyContinue)) {
    Write-Host "⚙️  Instalando Localtunnel globalmente..." -ForegroundColor Yellow
    npm install -g localtunnel
} else {
    Write-Host "✅ Localtunnel ya está instalado." -ForegroundColor Green
}

# Detener contenedores antiguos
Write-Host ""
Write-Host "🧹 Deteniendo contenedores antiguos..." -ForegroundColor Yellow
docker compose down

# Levantar el contenedor Docker
Write-Host ""
Write-Host "🐳 Iniciando contenedor Docker..." -ForegroundColor Cyan
docker compose up --build -d

# Esperar unos segundos para asegurar que Laravel esté listo
Write-Host "⏳ Esperando que Laravel arranque (15 segundos)..."
Start-Sleep -Seconds 15

# Verificar contenedor
$container = docker ps --filter "name=lab-equipment-system" --format "{{.Names}}"
if (-not $container) {
    Write-Host "❌ El contenedor no se está ejecutando. Revisa los logs con:" -ForegroundColor Red
    Write-Host "   docker compose logs --tail 50"
    exit 1
}

# Mostrar acceso local
Write-Host ""
Write-Host "✅ Laravel está corriendo localmente en: http://localhost:8000" -ForegroundColor Green

# Crear túnel público
Write-Host ""
Write-Host "🌍 Creando URL pública con Localtunnel..." -ForegroundColor Cyan
Write-Host "------------------------------------------" -ForegroundColor DarkCyan
Write-Host "   🔗 Copia y comparte la URL que aparece abajo"
Write-Host "------------------------------------------" -ForegroundColor DarkCyan

# Ejecutar túnel y mantener ventana abierta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "lt --port 8000 --print-requests"
