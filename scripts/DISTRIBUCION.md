# 📦 Distribución del Sistema de Equipos de Laboratorio

## 🎯 Para Distribuir el Sistema

### Archivos Esenciales a Incluir

#### ✅ Archivos de Ejecución

**📁 Carpeta `scripts/`** (todos los archivos .bat están organizados aquí):

- `menu-principal.bat` - **ARCHIVO PRINCIPAL** (ejecutar este primero)
- `iniciar-lab-equipment-system.bat` - Inicia el sistema
- `instalar-dependencias.bat` - Instala dependencias automáticamente
- `crear-backup.bat` - Crea respaldos de la base de datos
- `restaurar-backup.bat` - Restaura respaldos
- `detener-sistema.bat` - Detiene el sistema de forma segura

**📁 Raíz del proyecto**:

- `EJECUTAR.bat` - **ACCESO DIRECTO** (ejecuta el menú principal)

#### ✅ Archivos de Configuración

- `.env.example` - Configuración base optimizada para SQLite
- `composer.json` - Dependencias PHP
- `package.json` - Dependencias Node.js
- `vite.config.ts` - Configuración de compilación
- `artisan` - CLI de Laravel

#### ✅ Estructura de Carpetas Requeridas

```
📁 lab-equipment-system/
├── 📁 scripts/                               # Scripts de ejecución organizados
│   ├── menu-principal.bat                    # Menú principal
│   ├── iniciar-lab-equipment-system.bat     # Iniciar sistema
│   ├── instalar-dependencias.bat            # Instalar dependencias
│   ├── crear-backup.bat                     # Crear respaldos
│   ├── restaurar-backup.bat                 # Restaurar respaldos
│   └── detener-sistema.bat                  # Detener sistema
├── EJECUTAR.bat                             # Acceso directo al menú
├── 📁 app/ (completa)
├── 📁 bootstrap/ (completa)
├── 📁 config/ (completa)
├── 📁 database/ (completa)
├── 📁 public/ (completa)
├── 📁 resources/ (completa)
├── 📁 routes/ (completa)
└── 📁 storage/ (completa - crear estructura vacía)
```

#### ❌ Archivos/Carpetas NO Incluir

- `node_modules/` (se instala automáticamente)
- `vendor/` (se instala automáticamente)
- `.env` (se crea automáticamente)
- `database/database.sqlite` (se crea automáticamente)
- `storage/logs/` (contenido - carpeta sí)
- `storage/app/` (contenido - carpeta sí)

## 🔄 **ORDEN DE EJECUCIÓN PASO A PASO**

### **PRIMERA VEZ - Instalación Completa**

#### 1️⃣ **`EJECUTAR.bat`** (ACCESO DIRECTO - MÁS FÁCIL)

**Función**: Acceso directo al menú principal desde la raíz del proyecto
**Qué hace**:

- Ejecuta automáticamente `scripts\menu-principal.bat`
- **Más fácil de encontrar** para usuarios finales
- **Mismo resultado** que ejecutar el menú directamente

#### 2️⃣ **`scripts\menu-principal.bat`** (MENÚ PRINCIPAL)

**Función**: Menú principal con todas las opciones disponibles
**Qué hace**:

- Cambia automáticamente al directorio del proyecto
- Muestra interfaz gráfica con 8 opciones
- Permite navegar entre todas las funciones del sistema
- **SIEMPRE ejecutar como ADMINISTRADOR la primera vez**

**Opciones del menú**:

```
1. 🚀 Iniciar Sistema (Principal)
2. ⚙️ Instalar Dependencias (Primera vez) ← USAR PRIMERO
3. 💾 Crear Backup de Base de Datos
4. 📂 Restaurar Backup
5. 🛑 Detener Sistema
6. 📖 Ver Información del Sistema
7. 🔧 Verificar Estado del Sistema
8. ❌ Salir
```

#### 2️⃣ **Seleccionar Opción 2: `instalar-dependencias.bat`**

**Función**: Instala automáticamente todas las dependencias del sistema
**Qué hace**:

1. **Verifica permisos de administrador** (solicita si es necesario)
2. **Descarga e instala Node.js** si no está presente
3. **Descarga e instala PHP 8.2** con extensiones necesarias
4. **Descarga e instala Composer** para gestión de paquetes PHP
5. **Configura variables de entorno** automáticamente
6. **Habilita extensiones PHP** necesarias (SQLite, OpenSSL, etc.)

**Tiempo estimado**: 3-8 minutos (depende de la velocidad de internet)

#### 3️⃣ **Seleccionar Opción 1: `iniciar-lab-equipment-system.bat`**

**Función**: Inicia el sistema completo de gestión de equipos
**Qué hace paso a paso**:

1. **Verificación de dependencias**:
    - ✅ Verifica que Node.js esté instalado
    - ✅ Verifica que PHP esté instalado
    - ✅ Verifica que Composer esté instalado

2. **Instalación de librerías del proyecto**:
    - 📦 Ejecuta `npm install` (instala librerías de React)
    - 📦 Ejecuta `composer install` (instala librerías de Laravel)

3. **Configuración automática**:
    - 📝 Crea archivo `.env` desde `.env.example`
    - 🔐 Genera clave de seguridad de Laravel
    - 🗃️ Crea base de datos SQLite vacía

4. **Preparación de base de datos**:
    - 🏗️ Ejecuta migraciones (crea tablas)
    - 🌱 Ejecuta seeders (datos iniciales)

5. **Compilación de interfaz**:
    - ⚡ Compila archivos React con Vite
    - 🎨 Procesa CSS y JavaScript

6. **Inicio del servidor**:
    - 🌐 Inicia servidor Laravel en puerto 8000
    - 📡 Detecta y muestra IP local para compartir
    - ✅ Sistema listo para usar

**Tiempo estimado**: 30 segundos - 2 minutos

### **USO NORMAL - Ejecuciones Siguientes**

#### **Opción 1: Iniciar Sistema** (Uso diario)

- Solo ejecuta pasos 4, 5 y 6 del proceso inicial
- **Tiempo**: 10-30 segundos
- **Resultado**: Sistema listo en `http://localhost:8000`

#### **Opción 3: `crear-backup.bat`**

**Función**: Crea respaldo de la base de datos
**Qué hace**:

1. 📅 Genera nombre con fecha y hora actual
2. 📁 Crea carpeta `backups/` si no existe
3. 💾 Copia `database.sqlite` con nombre único
4. 📊 Muestra información del backup creado
5. 📋 Lista todos los backups existentes

**Cuándo usar**: Antes de actualizaciones o cambios importantes

#### **Opción 4: `restaurar-backup.bat`**

**Función**: Restaura una base de datos desde backup
**Qué hace**:

1. 📋 Lista todos los backups disponibles
2. 🔢 Permite seleccionar cual restaurar
3. ⚠️ Crea backup de seguridad antes de restaurar
4. 🔄 Reemplaza base de datos actual con el backup seleccionado

**Cuándo usar**: Cuando hay problemas con la base de datos

#### **Opción 5: `detener-sistema.bat`**

**Función**: Detiene el sistema de forma segura
**Qué hace**:

1. 🛑 Busca procesos PHP ejecutando Laravel
2. 🛑 Busca procesos Node.js ejecutando Vite
3. 🛑 Busca procesos usando puerto 8000
4. ❌ Termina todos los procesos relacionados
5. ✅ Confirma que el sistema se detuvo

**Cuándo usar**: Antes de cerrar la PC o cuando el sistema no responde

#### **Opción 6: Ver Información del Sistema**

**Función**: Muestra estado actual del sistema
**Qué muestra**:

- 📋 Nombre y configuración del proyecto
- 📊 Estado de archivos (base de datos, dependencias)
- 🌐 URLs de acceso (local y red)
- 💾 Tamaño de base de datos

#### **Opción 7: Verificar Estado del Sistema**

**Función**: Diagnóstico completo del sistema
**Qué verifica**:

- ✅ Node.js instalado y versión
- ✅ PHP instalado y versión
- ✅ Composer instalado y versión
- 🔌 Estado del puerto 8000
- 🌐 Conectividad de red

### **FUNCIONES AUXILIARES**

#### **`preparar-distribucion.bat`**

**Función**: Prepara el proyecto para compartir con otros
**Qué hace**:

1. 📁 Crea carpeta `distribucion/`
2. 📋 Copia todos los archivos necesarios
3. 🚫 Excluye archivos innecesarios (node_modules, vendor)
4. 📝 Crea archivo de instrucciones
5. 📊 Calcula tamaño final
6. ✅ Deja proyecto listo para comprimir y compartir

**Cuándo usar**: Cuando quieres compartir el sistema con otra persona

### **🔗 FLUJO COMPLETO DE EJECUCIÓN**

```
📦 NUEVA INSTALACIÓN (Opción Fácil):
User → EJECUTAR.bat (admin) → Opción 2 → Opción 1 → http://localhost:8000

📦 NUEVA INSTALACIÓN (Opción Directa):
User → scripts\menu-principal.bat (admin) → Opción 2 → Opción 1 → http://localhost:8000

🚀 USO DIARIO (Opción Fácil):
User → EJECUTAR.bat → Opción 1 → http://localhost:8000

🚀 USO DIARIO (Opción Directa):
User → scripts\menu-principal.bat → Opción 1 → http://localhost:8000

💾 MANTENIMIENTO:
User → [Cualquier acceso] → Opción 3 (backup) → Continuar trabajando

🔧 PROBLEMAS:
User → [Cualquier acceso] → Opción 7 (verificar) → Opción 5 (detener) → Opción 1 (reiniciar)

📤 COMPARTIR:
Developer → preparar-distribucion.bat → Comprimir → Enviar a otro usuario
```

### 📋 Instrucciones para el Usuario Final (Resumidas)

**Opción 1: Usar acceso directo**

1. **Descomprimir** el archivo en cualquier carpeta
2. **Ejecutar** `EJECUTAR.bat` como administrador (primera vez)
3. **Seleccionar opción 2** para instalar dependencias automáticamente (primera vez)
4. **Seleccionar opción 1** para iniciar el sistema
5. **Acceder** a `http://localhost:8000` en el navegador

**Opción 2: Usar scripts directamente**

1. **Descomprimir** el archivo en cualquier carpeta
2. **Ir a carpeta** `scripts/`
3. **Ejecutar** `menu-principal.bat` como administrador (primera vez)
4. **Seleccionar opción 2** para instalar dependencias automáticamente (primera vez)
5. **Seleccionar opción 1** para iniciar el sistema
6. **Acceder** a `http://localhost:8000` en el navegador

### ⏱️ **TIEMPOS DE EJECUCIÓN DETALLADOS**

#### **Primera Instalación Completa**

- **Opción 2 (Dependencias)**: 3-8 minutos
    - Descarga Node.js: 1-2 minutos
    - Descarga PHP: 1-2 minutos
    - Descarga Composer: 30 segundos
    - Configuración: 30 segundos

- **Opción 1 (Primera vez)**: 1-3 minutos
    - npm install: 30-90 segundos
    - composer install: 20-60 segundos
    - Migraciones: 5-10 segundos
    - Compilación: 10-30 segundos
    - Inicio servidor: 5 segundos

**Total primera vez**: 4-11 minutos

#### **Ejecuciones Posteriores**

- **Opción 1 (Normal)**: 10-30 segundos
    - Verificaciones: 2-5 segundos
    - Compilación: 5-20 segundos
    - Inicio servidor: 3-5 segundos

#### **Funciones Auxiliares**

- **Backup**: 1-5 segundos
- **Restaurar**: 5-15 segundos
- **Detener**: 2-5 segundos
- **Verificar**: 3-8 segundos

### 🔍 **QUÉ PASA INTERNAMENTE**

#### **Durante `instalar-dependencias.bat`**

```
[1] Verificar permisos de administrador
[2] Comprobar si Node.js existe → Si NO: descargar e instalar
[3] Comprobar si PHP existe → Si NO: descargar e instalar
[4] Comprobar si Composer existe → Si NO: descargar e instalar
[5] Configurar PHP.ini (habilitar SQLite, OpenSSL, etc.)
[6] Agregar rutas al PATH del sistema
[7] Mensaje de éxito
```

#### **Durante `iniciar-lab-equipment-system.bat`**

```
[1] where node → ¿Existe? → Si NO: Error y salir
[2] where php → ¿Existe? → Si NO: Error y salir
[3] where composer → ¿Existe? → Si NO: Error y salir
[4] ¿Existe node_modules? → Si NO: npm install
[5] ¿Existe vendor? → Si NO: composer install
[6] ¿Existe .env? → Si NO: crear desde .env.example
[7] ¿Existe APP_KEY en .env? → Si NO: php artisan key:generate
[8] ¿Existe database.sqlite? → Si NO: crear archivo vacío
[9] php artisan migrate --force (crear tablas)
[10] php artisan db:seed --force (datos iniciales)
[11] npm run build (compilar React + CSS)
[12] Obtener IP local con ipconfig
[13] Mostrar URLs (local + red)
[14] php artisan serve --host=0.0.0.0 --port=8000
```

#### **Durante navegación web**

```
[1] Usuario abre http://localhost:8000
[2] Laravel Router → routes/web.php
[3] Inertia.js carga componente React
[4] React renderiza interfaz
[5] Usuario interactúa → AJAX a Laravel
[6] Laravel procesa → SQLite database
[7] Respuesta JSON → React actualiza interfaz
```

### 🌐 Para Usar en Red Local

1. **Compartir la IP** que se muestra en la consola
2. **Otros usuarios** acceden a `http://[IP]:8000`
3. **Configurar firewall** si es necesario:
    ```cmd
    netsh advfirewall firewall add rule name="Lab Equipment System" dir=in action=allow protocol=TCP localport=8000
    ```

### 📦 Crear Paquete de Distribución

#### Opción 1: ZIP/RAR

1. Comprimir toda la carpeta `lab-equipment-system`
2. Incluir archivo `README.md` en la raíz
3. Resultado: `lab-equipment-system-portable.zip`

#### Opción 2: Instalador (Avanzado)

- Usar herramientas como NSIS o Inno Setup
- Incluir verificación de dependencias
- Crear accesos directos automáticamente

### 🔧 Requisitos del Sistema Destino

#### Mínimos

- Windows 10/11
- 4GB RAM
- 2GB espacio libre
- Conexión a internet (solo para instalación inicial)

#### Automáticos (se instalan solos)

- Node.js v18+
- PHP 8.2+
- Composer

### 🚀 Optimizaciones para Rendimiento

#### Pre-compilar Assets (Opcional)

```bash
npm run build
```

Esto crea los archivos en `public/build/` que son más rápidos de servir.

#### Optimizar Composer (Incluido en scripts)

```bash
composer install --no-dev --optimize-autoloader
```

### 🔒 Configuración de Seguridad

El sistema está configurado para:

- ✅ Funcionar solo en red local
- ✅ No enviar datos a internet
- ✅ Usar SQLite (sin configuración de base de datos)
- ✅ Autenticación local
- ✅ Logs locales únicamente

### 📝 Notas Importantes

1. **Primera ejecución**: Puede tardar 2-5 minutos en instalar dependencias
2. **Siguientes ejecuciones**: 10-30 segundos en iniciar
3. **Usuarios simultáneos**: Hasta 20 en red local
4. **Backup automático**: Se recomienda usar la función de backup regularmente
5. **Actualizaciones**: Reemplazar archivos y ejecutar nuevamente

### 🆘 Solución de Problemas Comunes

| Problema               | Solución                                           |
| ---------------------- | -------------------------------------------------- |
| No inicia el sistema   | Ejecutar como administrador                        |
| Error de dependencias  | Usar opción 2 del menú                             |
| No accesible desde red | Configurar firewall                                |
| Base de datos corrupta | Usar función de restaurar backup                   |
| Puerto ocupado         | Cambiar puerto en `.env` o detener otros servicios |

---

**Sistema desarrollado para funcionar de forma completamente autónoma** ✨
