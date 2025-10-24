# 🔬 Sistema de Gestión de Equipos de Laboratorio

## 📋 Descripción

Sistema completo de gestión de equipos de laboratorio desarrollado con Laravel y React. Funciona completamente offline con base de datos SQLite integrada.

## 🚀 Inicio Rápido

### Opción 1: Instalación Automática (Recomendada)

1. Ejecutar `instalar-dependencias.bat` como administrador
2. Esperar a que se instalen todas las dependencias
3. Ejecutar `iniciar-lab-equipment-system.bat`

### Opción 2: Instalación Manual

Si ya tienes Node.js, PHP y Composer instalados:

1. Ejecutar directamente `iniciar-lab-equipment-system.bat`

## 🌐 Acceso al Sistema

Una vez iniciado el sistema, estará disponible en:

- **Local**: http://localhost:8000
- **Red local**: http://[TU-IP]:8000 (se mostrará en la consola)

## 📱 Compartir en la Red

Para que otras computadoras accedan al sistema:

1. **Obtener tu IP**: Se muestra automáticamente al iniciar el sistema
2. **Compartir la URL**: Envía `http://[TU-IP]:8000` a otros usuarios
3. **Configurar firewall**: Asegúrate de que el puerto 8000 esté abierto

### Configuración de Firewall (Windows)

```cmd
netsh advfirewall firewall add rule name="Lab Equipment System" dir=in action=allow protocol=TCP localport=8000
```

## 📁 Estructura de Archivos Importantes

```
📁 lab-equipment-system/
├── 🚀 iniciar-lab-equipment-system.bat    # Ejecutar el sistema
├── ⚙️ instalar-dependencias.bat           # Instalar dependencias
├── 📊 database/
│   └── database.sqlite                     # Base de datos SQLite
├── 📝 .env                                # Configuración del sistema
└── 📁 storage/                            # Archivos y logs del sistema
```

## 🔧 Requisitos del Sistema

### Automáticos (se instalan automáticamente)

- **Node.js** v18 o superior
- **PHP** v8.2 o superior
- **Composer** (gestor de dependencias PHP)

### Manuales

- **Windows** 10/11
- **4GB RAM** mínimo
- **1GB espacio libre** en disco

## 🛠️ Funcionalidades

- ✅ Gestión completa de equipos de laboratorio
- ✅ Control de mantenimientos y calibraciones
- ✅ Sistema de notificaciones
- ✅ Exportación de reportes a Excel
- ✅ Interfaz moderna y responsive
- ✅ Base de datos SQLite integrada
- ✅ Funciona sin internet
- ✅ Acceso desde múltiples dispositivos en red

## 🔄 Actualizaciones

Para actualizar el sistema:

1. Reemplazar los archivos del proyecto
2. Ejecutar `iniciar-lab-equipment-system.bat`
3. El sistema se actualizará automáticamente

## 🆘 Solución de Problemas

### Error: "Node.js no está instalado"

**Solución**: Ejecutar `instalar-dependencias.bat` como administrador

### Error: "PHP no está instalado"

**Solución**: Ejecutar `instalar-dependencias.bat` como administrador

### Error: "No se puede acceder desde otra PC"

**Soluciones**:

1. Verificar que ambas PC estén en la misma red
2. Configurar firewall (ver sección anterior)
3. Usar la IP mostrada en la consola, no localhost

### Error: "Base de datos no encontrada"

**Solución**: El sistema creará automáticamente la base de datos al iniciar

### El sistema va lento

**Soluciones**:

1. Cerrar otros programas pesados
2. Verificar que tienes al menos 4GB RAM disponible
3. Asegurar espacio libre en disco

## 📞 Soporte

Si encuentras problemas:

1. Verificar que los archivos `.bat` se ejecuten como administrador
2. Revisar los logs en la consola
3. Reiniciar el sistema y volver a intentar

## 🔒 Seguridad

- El sistema funciona solo en red local
- No se envían datos a internet
- Toda la información se almacena localmente
- Recomendado para uso en redes confiables

## 📈 Rendimiento

- **Tiempo de inicio**: 30-60 segundos (primera vez)
- **Tiempo de inicio**: 10-20 segundos (siguientes veces)
- **Usuarios simultáneos**: Hasta 20 usuarios en red local
- **Tamaño de base de datos**: Ilimitado (SQLite)

---

**Desarrollado con ❤️ para la gestión eficiente de laboratorios**
