import { type Language } from "@/hooks/use-language";
import { createContext, useContext, type ReactNode } from "react";

type TranslationContextType = {
  language: Language;
  t: (key: string) => string;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

// Definición de traducciones
const translations = {
  es: {
    //titulo principal
    "title.main": "Seguimiento de Equipos",
    // Dashboard
    "dashboard.title": "Panel de Control",
    "dashboard.welcome": "Bienvenido",
    "dashboard.stats": "Estadísticas",
    "dashboard.equipment": "Equipos",
    "dashboard.maintenance": "Mantenimiento",
    "dashboard.notifications": "Notificaciones",
    "dashboard.maintenance.state": "Mantenimientos por Estado",
    "dashboard.equipment.state": "Equipos por Estado",
    "dashboard.equipment.priority.category":
      "Mantenimientos por Prioridad y Categoría",
    "dashboard.general.summary": "Resumen General",
    "dashboard.distribution": "Distribución de Mantenimientos", //-----
    "dashboard.categories": "Categorías de Mantenimiento",
    "dashboard.stats.equipment": "Estado de Equipos",
    "dashboard.stats.maintenance": "Estado de Mantenimiento",
    "dashboard.priorities": "Prioridades",
    "dashboard.maintenance.month": "Tendencia de Mantenimientos por Mes",
    "dashboard.maintenance.efficiency": "Eficiencia de Mantenimientos",
    "dashboard.maintenance.prediction": "Predicción de Mantenimientos",
    "dashboard.sections.all_maintenances": "Todos los Mantenimientos",
    "dashboard.sections.overdue": "Mantenimientos Vencidos",

    //---------------------------------------------------------------
    "dashboard.stats.equipment.total": "Total Equipos",
    "dashboard.stats.equipment.active": "Equipos Activos",
    "dashboard.stats.equipment.inactive": "Equipos Inactivos",
    "dashboard.stats.maintenance.total": "Total Mantenimientos",
    "dashboard.stats.maintenance.scheduled": "Programados",
    "dashboard.stats.maintenance.in_progress": "En Proceso",
    "dashboard.stats.maintenance.completed": "Completados",
    "dashboard.stats.maintenance.cancelled": "Cancelados",
    "dashboard.stats.maintenance.overdue": "Vencidos",

    "dashboard.sections.upcoming": "Próximos Mantenimientos",
    "dashboard.sections.in_progress": "En Proceso",
    "dashboard.sections.recent_completed": "Completados Recientes",
    "dashboard.sections.attention_required": "Atención Requerida",
    "dashboard.sections.cancelled": "Mantenimientos Cancelados",

    "dashboard.table.headers.equipment": "Equipo",
    "dashboard.table.headers.date": "Fecha",
    "dashboard.table.headers.type": "Tipo",
    "dashboard.table.headers.status": "Estado",
    "dashboard.table.headers.priority": "Prioridad",
    "dashboard.table.headers.category": "Categoría",
    "dashboard.table.headers.performed_date": "Fecha Realizada",

    "dashboard.modal.title": "Panel de Análisis y Datos",
    "dashboard.modal.tabs.detailed_tables": "Tablas Detalladas",
    "dashboard.modal.tabs.detailed_tables_System":
      "Tablas Detalladas del Sistema",
    "dashboard.modal.tabs.bar_charts": "Gráficos de Barras",
    "dashboard.modal.tabs.pie_charts": "Gráficos Circulares",
    "dashboard.modal.tabs.trend_analysis": "Análisis de Tendencias",

    "dashboard.messages.no_data.scheduled": "No hay mantenimientos programados",
    "dashboard.messages.no_data.in_progress":
      "No hay mantenimientos en proceso",
    "dashboard.messages.no_data.completed":
      "No hay mantenimientos completados recientes",
    "dashboard.messages.no_data.attention":
      "No hay mantenimientos que requieran atención inmediata",
    "dashboard.messages.no_data.cancelled":
      "No hay mantenimientos cancelados recientes",

    "dashboard.overdue": "VENCIDO",
    "dashboard.completed_late": "Completado con retraso",
    "dashboard.no_date": "Sin fecha",
    "dashboard.unspecified": "Sin especificar",
    "dashboard.invalid_date": "Fecha inválida",

    "dashboard.buttons.close_panel": "Cerrar Panel",
    "dashboard.buttons.close": "cerrar",
    "dashboard.buttons.actions": "acciones",

    // Equipment
    "equipment.title": "Equipos",
    "equipment.total": "Total",
    "equipment.active": "Activos",
    "equipment.inactive": "Inactivos",
    "equipment.add": "Agregar Equipo",
    "equipment.edit": "Editar Equipo",
    "equipment.delete": "Eliminar Equipo",
    "equipment.name": "Instrumento",
    "equipment.code": "Código Interno",
    "equipment.type": "Tipo",
    "equipment.location": "Ubicación",
    "equipment.status": "Estado",
    "equipment.brand": "Marca",
    "equipment.model": "Modelo",
    "equipment.serial": "Número de Serie",
    "equipment.system_number": "N° Sistema",
    "equipment.ext_calibration_periodicity": "Periodicidad Calibración Externa",
    "equipment.internal_check_periodicity": "Periodicidad Chequeo Interno",
    "equipment.last_ext_calibration": "Última Calibración Externa",
    "equipment.next_ext_calibration": "Próxima Calibración Externa",
    "equipment.category": "Categoría",
    "equipment.responsible": "Responsable",
    "equipment.description": "Descripción",
    "equipment.history.duration": "Duración",

    // Equipment History
    "equipment.history.title": "Historial de Mantenimientos",
    "equipment.history.internal_code": "Código Interno",
    "equipment.history.statistics": "Estadísticas de Mantenimientos",
    "equipment.history.total": "Total",
    "equipment.history.completed": "Completados",
    "equipment.history.pending": "Pendientes",
    "equipment.history.preventive": "Preventivos",
    "equipment.history.corrective": "Correctivos",
    "equipment.history.predictive": "Predictivos",
    "equipment.history.filters": "Filtros de Búsqueda",
    "equipment.history.search": "Buscar",
    "equipment.history.search_placeholder":
      "Buscar por tipo, responsable, descripción...",
    "equipment.history.hide_filters": "Ocultar Filtros",
    "equipment.history.more_filters": "Más Filtros",
    "equipment.history.all_states": "Todos",
    "equipment.history.category": "Categoría",
    "equipment.history.all_categories": "Todas",
    "equipment.history.priorities": "Prioridades",
    "equipment.history.all_priorities": "Todas",
    "equipment.history.from": "Desde",
    "equipment.history.to": "Hasta",
    "equipment.history.type_names.mantenimiento_preventivo":
      "Mantenimiento Preventivo",
    "equipment.history.type_names.mantenimiento_correctivo":
      "Mantenimiento Correctivo",
    "equipment.history.type_names.mantenimiento_preventivo_rutinario":
      "Mantenimiento Preventivo Rutinario",
    "equipment.history.type_names.mantenimiento_preventivo_profundo":
      "Mantenimiento Preventivo Profundo",
    "equipment.history.type_names.validacion": "Validación",
    "equipment.history.type_names.calibracion": "Calibración",
    "equipment.history.type_names.calibracion_preventiva":
      "Calibración Preventiva",
    "equipment.history.type_names.limpieza_especializada":
      "Limpieza Especializada",
    "equipment.history.type_names.reparacion": "Reparación",
    "equipment.history.type_names.inspeccion": "Inspección",
    "equipment.history.type_names.routine_preventive_maintenance":
      "Mantenimiento Preventivo Rutinario",
    "equipment.history.type_names.deep_preventive_maintenance":
      "Mantenimiento Preventivo Profundo",
    "equipment.history.type_names.corrective_maintenance":
      "Mantenimiento Correctivo",
    "equipment.history.type_names.preventive_maintenance":
      "Mantenimiento Preventivo",
    "equipment.history.type_names.specialized_cleaning":
      "Limpieza Especializada",
    "equipment.history.type_names.preventive_calibration":
      "Calibración Preventiva",
    "equipment.history.type_names.validation": "Validación",
    "equipment.history.type_names.calibration": "Calibración",
    "equipment.history.type_names.repair": "Reparación",
    "equipment.history.type_names.inspection": "Inspección",
    "equipment.history.no_records":
      "No se encontraron registros de mantenimiento",
    "equipment.history.adjust_filters":
      "Intenta ajustar los filtros para encontrar más resultados",
    "equipment.details": "Detalles",
    "equipment.last_external_calibration": "Última Calibración Externa",
    "equipment.next_external_calibration": "Próxima Calibración Externa",
    "equipment.history": "Historial",

    // Maintenance
    "maintenance.title": "Mantenimiento",
    "maintenance.completed": "Completado",
    "maintenance.pending": "Pendiente",
    "maintenance.overdue": "Vencido",
    "maintenance.schedule": "Programar",
    "maintenance.history": "Historial",
    "maintenance.type": "Tipo de Mantenimiento",
    "maintenance.date": "Fecha",
    "maintenance.description": "Descripción",

    // Common
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.view": "Ver",
    "common.search": "Buscar",
    "common.filter": "Filtrar",
    "common.export": "Exportar",
    "common.import": "Importar",
    "common.actions": "Acciones",
    "common.loading": "Generando...",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.warning": "Advertencia",
    "common.info": "Información",
    "common.confirm": "Confirmar",
    "common.close": "Cerrar",
    "common.showing": "Mostrando de",
    "common.to": "a",
    "common.of": "de",
    "common.entries": "entradas",
    "common.details": "Detalles",
    "common.history.loading": "Cargando historial...",
    "common.history.no_data": "No hay historial de mantenimientos",
    "common.history.date": "Fecha",
    "common.history.result": "Resultado",
    "common.history.user": "Usuario",
    "common.automatic_date_from_history":
      "Fecha actualizada automáticamente desde el historial de mantenimientos",
    "common.calculated_date_from_calibration":
      "Fecha calculada automáticamente basada en la última calibración",
    "common.qr_management":
      "Gestión QR - Ver tareas, cambiar estados y crear mantenimientos",
    "common.pagination.showing": "Mostrando de",
    "common.pagination.to": "a",
    "common.pagination.of": "de",
    "common.pagination.entries": "entradas",
    "common.update": "Actualizar",

    // Charts and Graphics
    "dashboard.charts.title": "Análisis de Mantenimientos por Meses",
    "dashboard.charts.preventive": "Preventivo",
    "dashboard.charts.corrective": "Correctivo",
    "dashboard.charts.predictive": "Predictivo",
    "dashboard.charts.table.month": "Mes",
    "dashboard.charts.table.scheduled": "Programados",
    "dashboard.charts.table.completed": "Completados",
    "dashboard.charts.table.completed_ontime": "A Tiempo",
    "dashboard.charts.table.percentage": "Eficiencia",
    "dashboard.charts.table.ontime_percentage": "Puntualidad",
    "dashboard.charts.tooltip.percentage": "Eficiencia",
    "dashboard.charts.months.jan": "Ene",
    "dashboard.charts.months.feb": "Feb",
    "dashboard.charts.months.mar": "Mar",
    "dashboard.charts.months.apr": "Abr",
    "dashboard.charts.months.may": "May",
    "dashboard.charts.months.jun": "Jun",
    "dashboard.charts.months.jul": "Jul",
    "dashboard.charts.months.aug": "Ago",
    "dashboard.charts.months.sep": "Sep",
    "dashboard.charts.months.oct": "Oct",
    "dashboard.charts.months.nov": "Nov",
    "dashboard.charts.months.dec": "Dic",

    // Status translations from database
    "db.status.completed": "Completado",
    "db.status.in_progress": "En Proceso",
    "db.status.scheduled": "Programado",
    "db.status.cancelled": "Cancelado",
    "db.status.postponed": "Pospuesto",

    // Database Actions
    "db.action.preventive_maintenance": "Mantenimiento Preventivo",
    "db.action.corrective_maintenance": "Mantenimiento Correctivo",
    "db.action.calibration": "Calibración",
    "db.action.verification": "Verificación",
    "db.action.inspection": "Inspección",
    "db.action.cleaning": "Limpieza",
    "db.action.repair": "Reparación",

    // Priority translations from database
    "db.priority.critical": "Crítica",
    "db.priority.high": "Alta",
    "db.priority.medium": "Media",
    "db.priority.low": "Baja",

    // Category translations from database
    "db.category.preventive": "Preventivo",
    "db.category.corrective": "Correctivo",
    "db.category.predictive": "Predictivo",
    "common.stats.scheduled": "Programados",
    "common.stats.in_progress": "En Proceso",
    "common.stats.completed": "Completados",
    "common.stats.cancelled": "Cancelados",
    "common.stats.postponed": "Pospuestos",
    "common.priorities.low": "Baja",
    "common.priorities.medium": "Media",
    "common.priorities.high": "Alta",
    "common.priorities.critical": "Crítica",
    "common.scheduled_date": "Fecha Programada",
    "common.done": "Realizado",
    "common.work": "Trabajo",
    "common.findings": "Hallazgos",
    "common.real": "Real",

    // Work performed translations
    "work.completed_via_qr": "Completado via QR",
    "work.work_performed_successfully": "Trabajo realizado satisfactoriamente",
    "work.maintenance_completed": "Mantenimiento completado",
    "work.calibration_performed": "Calibración realizada",
    "work.equipment_repaired": "Equipo reparado",
    "work.preventive_maintenance_done": "Mantenimiento preventivo realizado",
    "work.corrective_maintenance_done": "Mantenimiento correctivo realizado",
    "work.cleaning_completed": "Limpieza completada",
    "work.inspection_completed": "Inspección completada",
    "work.validation_completed": "Validación completada",

    // Findings translations
    "findings.work_performed_successfully":
      "Trabajo realizado satisfactoriamente",
    "findings.equipment_in_good_condition": "Equipo en buenas condiciones",
    "findings.no_issues_found": "No se encontraron problemas",
    "findings.minor_adjustments_needed": "Se necesitan ajustes menores",
    "findings.calibration_within_tolerance": "Calibración dentro de tolerancia",
    "findings.replacement_parts_needed": "Se necesitan piezas de repuesto",
    "findings.further_inspection_required": "Se requiere inspección adicional",
    "findings.equipment_functioning_properly":
      "Equipo funcionando correctamente",

    // Excel Export
    "excel.export.title": "Exportar Historial a Excel",
    "excel.export.description":
      "📊 Selecciona el rango de fechas para exportar el historial de mantenimientos de equipos.",
    "excel.export.quick_ranges": "Rangos rápidos",
    "excel.export.quick_ranges.7_days": "Últimos 7 días",
    "excel.export.quick_ranges.30_days": "Últimos 30 días",
    "excel.export.quick_ranges.3_months": "Últimos 3 meses",
    "excel.export.quick_ranges.1_year": "Último año",
    "excel.export.start_date": "Fecha de inicio",
    "excel.export.end_date": "Fecha de fin",
    "excel.export.validation.start_date_required":
      "La fecha de inicio es requerida",
    "excel.export.validation.end_date_required": "La fecha de fin es requerida",
    "excel.export.validation.end_date_after_start":
      "La fecha de fin debe ser posterior a la fecha de inicio",
    "excel.export.report_content": "Contenido del reporte",
    "excel.export.report_description":
      "El archivo Excel incluirá: información del equipo, historial de mantenimientos, fechas de calibración, responsables y observaciones en el rango seleccionado.",
    "excel.export.generating": "Generando...",
    "excel.export.download": "Descargar Excel",

    // Excel Import
    "excel.import.title": "Importar Equipos desde Excel",
    "excel.import.description":
      "📊 Carga masiva de equipos usando archivos Excel (.xlsx, .xls)",
    "excel.import.info":
      "Puedes importar equipos masivamente usando un archivo Excel. Descarga la plantilla para ver el formato requerido.",
    "excel.import.download_template": "Descargar Plantilla",
    "excel.import.select_file": "Selecciona un archivo Excel",
    "excel.import.drag_drop": "o arrastra y suelta aquí",
    "excel.import.file_requirements":
      "Solo archivos .xlsx o .xls (máximo 10MB)",
    "excel.import.drop_file": "Suelta el archivo aquí para cargarlo",
    "excel.import.analyzing": "Analizando...",
    "excel.import.preview": "Vista Previa",
    "excel.import.stats.total": "Total",
    "excel.import.stats.new": "Nuevos",
    "excel.import.stats.update": "Actualizar",
    "excel.import.stats.errors": "Errores",
    "excel.import.tabs.preview": "Vista Previa",
    "excel.import.tabs.errors": "Errores",
    "excel.import.table.instrument": "Instrumento",
    "excel.import.table.code": "Código",
    "excel.import.table.brand": "Marca",
    "excel.import.table.model": "Modelo",
    "excel.import.table.status": "Estado",
    "excel.import.no_data": "No hay datos para mostrar",
    "excel.import.row": "Fila",
    "excel.import.no_errors": "No se encontraron errores",
    "excel.import.importing": "Importando equipos...",
    "excel.import.importing_wait":
      "Por favor espera mientras procesamos los datos",
    "excel.import.progress": "% completado",
    "excel.import.completed": "¡Importación Completada!",
    "excel.import.completed_message":
      "Los equipos han sido importados correctamente",
    "excel.import.equipment_created": "Equipos creados:",
    "excel.import.equipment_updated": "Equipos actualizados:",
    "excel.import.back": "Atrás",
    "excel.import.import_equipment": "Importar Equipos",
    "excel.import.validation.invalid_file":
      "Por favor selecciona un archivo Excel válido (.xlsx o .xls)",
    "excel.import.validation.file_too_large":
      "El archivo es demasiado grande. Máximo 10MB permitido.",

    // Maintenance Form
    "maintenance.form.required_fields":
      "Por favor completa los campos obligatorios",
    "maintenance.form.save_error": "Error al guardar el mantenimiento: ",
    "maintenance.form.equipment_info": "Información del Equipo (ID: {id})",
    "maintenance.form.scheduling": "Programación",
    "maintenance.form.scheduled_date": "Fecha Programada *",
    "maintenance.form.performed_date": "Fecha de Realización",
    "maintenance.form.responsibility": "Responsabilidad",
    "maintenance.form.responsible_person": "Persona Responsable *",
    "maintenance.form.priority": "Prioridad",
    "maintenance.form.priority.low": "Baja",
    "maintenance.form.priority.medium": "Media",
    "maintenance.form.priority.high": "Alta",
    "maintenance.form.priority.critical": "Crítica",
    "maintenance.form.details": "Detalles del Mantenimiento",
    "maintenance.form.description": "Descripción *",
    "maintenance.form.actual_duration": "Duración Real (min)",
    "maintenance.form.actual_cost": "Costo Real",
    "maintenance.form.status": "Estado",
    "maintenance.form.status.scheduled": "Programado",
    "maintenance.form.status.in_progress": "En Progreso",
    "maintenance.form.status.completed": "Completado",
    "maintenance.form.status.cancelled": "Cancelado",
    "maintenance.form.status.postponed": "Pospuesto",
    "maintenance.form.external_service": "Requiere Servicio Externo",
    "maintenance.form.external_provider": "Proveedor Externo",
    "maintenance.form.parts_needed": "Partes/Materiales Necesarios",
    "maintenance.form.additional_notes": "Notas Adicionales",
    "maintenance.form.saving": "Guardando...",
    "maintenance.form.save_maintenance": "Guardar Mantenimiento",

    // Maintenance Types Modal
    "maintenance.types.title": "Tipos de Mantenimiento",
    "maintenance.types.select_description":
      "Selecciona el tipo de mantenimiento que deseas realizar",
    "maintenance.types.categories.preventive": "Preventivo",
    "maintenance.types.categories.corrective": "Correctivo",
    "maintenance.types.categories.predictive": "Predictivo",
    "maintenance.types.categories.others": "Otros",
    "maintenance.types.maintenance_prefix": "Mantenimiento",

    // Maintenance Type Names
    "maintenance.types.preventive_routine.name":
      "Mantenimiento Preventivo Rutinario",
    "maintenance.types.preventive_routine.description":
      "Inspección y limpieza general del equipo",
    "maintenance.types.preventive_deep.name":
      "Mantenimiento Preventivo Profundo",
    "maintenance.types.preventive_deep.description":
      "Revisión completa de componentes internos",
    "maintenance.types.corrective_repair.name": "Reparación",
    "maintenance.types.corrective_repair.description":
      "Reparación de fallas o averías",
    "maintenance.types.cleaning.name": "Limpieza",
    "maintenance.types.cleaning.description":
      "Limpieza profunda con protocolos específicos",
    "maintenance.types.calibration.name": "Calibración",
    "maintenance.types.calibration.description":
      "Ajuste y verificación de precisión",
    "maintenance.types.validation.name": "Validación",
    "maintenance.types.validation.description":
      "Verificación de cumplimiento normativo",
    "maintenance.types.inspection.name": "Inspección",
    "maintenance.types.inspection.description":
      "Revisión visual y funcional del equipo",

    // Notifications
    "notifications.title": "Configuraciones de Notificaciones",
    "notifications.stats.title": "Estadísticas de Notificaciones",
    "notifications.export.excel": "Exportar Excel",
    "notifications.history": "Historial",
    "notifications.test": "Probar",
    "notifications.process_now": "Procesar Ahora",
    "notifications.breadcrumb": "Notificaciones",

    // Notification Stats
    "notifications.stats.total_settings": "Total Configuraciones",
    "notifications.stats.active_settings": "Configuraciones Activas",
    "notifications.stats.pending": "Pendientes",
    "notifications.stats.sent_today": "Enviadas Hoy",
    "notifications.stats.failed": "Fallidas",

    // Notification Types Labels
    "notifications.types.calibration_due": "Calibración Próxima",
    "notifications.types.maintenance_reminder": "Recordatorio Mantenimiento",
    "notifications.types.maintenance_completed": "Mantenimiento Completado",
    "notifications.types.maintenance_overdue": "Mantenimiento Vencido",

    // Notification Types Descriptions
    "notifications.descriptions.calibration_due":
      "Notificación cuando una calibración externa está próxima a vencer",
    "notifications.descriptions.maintenance_reminder":
      "Recordatorio de mantenimientos programados",
    "notifications.descriptions.maintenance_completed":
      "Notificación cuando se completa un mantenimiento",
    "notifications.descriptions.maintenance_overdue":
      "Notificación cuando un mantenimiento está vencido",

    // Notification Settings
    "notifications.settings.title": "Configuraciones de Notificaciones",
    "notifications.settings.configure": "Configurar",
    "notifications.settings.active": "Activo",
    "notifications.settings.inactive": "Inactivo",
    "notifications.settings.days_before": "días antes",
    "notifications.settings.recipients": "destinatarios",

    // Edit Dialog
    "notifications.edit.title": "Editar Configuración",
    "notifications.edit.description": "Configurar",
    "notifications.edit.active_notification": "Notificación activa",
    "notifications.edit.days_before_label": "Días de antelación",
    "notifications.edit.days_before_help":
      "Días antes del evento para enviar la notificación",
    "notifications.edit.email_addresses": "Direcciones de correo",
    "notifications.edit.add_email": "+ Agregar",
    "notifications.edit.email_placeholder": "correo@ejemplo.com",
    "notifications.edit.no_emails": "No hay direcciones de correo configuradas",
    "notifications.edit.cancel": "Cancelar",
    "notifications.edit.save": "Guardar",

    // Error Messages
    "notifications.export.error":
      "Error al generar el archivo Excel. Por favor, inténtalo de nuevo.",
    "notifications.export.error_console": "Error al exportar:",

    // Excel Export Modal
    "notifications.excel.title": "Exportar Historial a Excel",
    "notifications.excel.description":
      "Selecciona el rango de fechas para exportar el historial de notificaciones.",
    "notifications.excel.quick_ranges": "Rangos rápidos",
    "notifications.excel.last_7_days": "Últimos 7 días",
    "notifications.excel.last_30_days": "Últimos 30 días",
    "notifications.excel.last_3_months": "Últimos 3 meses",
    "notifications.excel.last_year": "Último año",
    "notifications.excel.start_date": "Fecha de inicio",
    "notifications.excel.end_date": "Fecha de fin",
    "notifications.excel.report_content": "Contenido del reporte",
    "notifications.excel.report_description":
      "El archivo Excel incluirá: información de notificaciones, tipos, estados, destinatarios, equipos relacionados, fechas de envío y errores en el rango seleccionado.",
    "notifications.excel.cancel": "Cancelar",
    "notifications.excel.download": "Descargar Excel",
    "notifications.excel.generating": "Generando...",

    // Excel Export Validation
    "notifications.excel.validation.start_required":
      "La fecha de inicio es requerida",
    "notifications.excel.validation.end_required":
      "La fecha de fin es requerida",
    "notifications.excel.validation.end_after_start":
      "La fecha de fin debe ser posterior a la fecha de inicio",
    "notifications.excel.validation.max_range":
      "El rango de fechas no puede ser mayor a 1 año por razones de rendimiento",
    "notifications.excel.validation.large_range_warning":
      "Rango de fechas grande detectado. La exportación puede tardar más tiempo.",

    // Notification History
    "notifications.history.title": "Historial de Notificaciones",
    "notifications.history.breadcrumb": "Historial de Notificaciones",
    "notifications.history.filters.title": "Filtros de Búsqueda",
    "notifications.history.filters.hide": "Ocultar Filtros",
    "notifications.history.filters.show": "Más Filtros",
    "notifications.history.search.placeholder": "Buscar por asunto, tipo...",
    "notifications.history.search.label": "Buscar",
    "notifications.history.status.label": "Estado",
    "notifications.history.status.all": "Todos",
    "notifications.history.status.pending": "Pendiente",
    "notifications.history.status.sent": "Enviado",
    "notifications.history.status.failed": "Fallido",
    "notifications.history.type.label": "Tipo de Notificación",
    "notifications.history.type.all": "Todos",
    "notifications.history.type.calibration_due": "Calibración Próxima",
    "notifications.history.type.maintenance_reminder": "Recordatorio",
    "notifications.history.type.maintenance_completed": "Completado",
    "notifications.history.type.maintenance_overdue": "Vencido",
    "notifications.history.type.test": "Prueba",
    "notifications.history.date_from": "Desde",
    "notifications.history.date_to": "Hasta",
    "notifications.history.count": "Notificaciones",
    "notifications.history.no_data.title": "No se encontraron notificaciones",
    "notifications.history.no_data.subtitle":
      "Intenta ajustar los filtros para ver más resultados",

    // Table Headers
    "notifications.history.table.date": "Fecha",
    "notifications.history.table.type": "Tipo",
    "notifications.history.table.equipment": "Equipo",
    "notifications.history.table.subject": "Asunto",
    "notifications.history.table.recipients": "Destinatarios",
    "notifications.history.table.status": "Estado",
    "notifications.history.table.actions": "Acciones",
    "notifications.history.table.sent": "Enviado:",
    "notifications.history.table.recipients_count": "destinatario(s)",
    "notifications.history.table.not_available": "N/A",

    // Pagination
    "notifications.history.pagination.showing": "Mostrando de",
    "notifications.history.pagination.to": "a",
    "notifications.history.pagination.of": "de",
    "notifications.history.pagination.entries": "entradas",

    // Detail Dialog
    "notifications.history.detail.title": "Detalles de la Notificación",
    "notifications.history.detail.description":
      "Información completa de la notificación seleccionada",
    "notifications.history.detail.type": "Tipo",
    "notifications.history.detail.status": "Estado",
    "notifications.history.detail.subject": "Asunto",
    "notifications.history.detail.recipients": "Destinatarios",
    "notifications.history.detail.message": "Mensaje",
    "notifications.history.detail.error": "Error",
    "notifications.history.detail.created_at": "Fecha de Creación",
    "notifications.history.detail.sent_at": "Fecha de Envío",
    "notifications.history.detail.close": "Cerrar",
    "notifications.history.detail.resend": "Reenviar",

    // Navigation
    "nav.dashboard": "Panel de Control",
    "nav.equipment": "Equipos",
    "nav.notifications": "Notificaciones",
    "nav.maintenance": "Mantenimiento",
    "nav.reports": "Reportes",
    "nav.settings": "Configuración",
    "nav.profile": "Perfil",
    "nav.logout": "Cerrar Sesión",
    "nav.users": "Usuarios",

    // Status
    "status.active": "Activo",
    "status.inactive": "Inactivo",
    "status.pending": "Pendiente",
    "status.completed": "Completado",
    "status.overdue": "Vencido",

    // Language
    "language.spanish": "Español",
    "language.english": "Inglés",
    "language.switch": "Cambiar idioma",

    // QR Modal
    "qr.modal.title": "Código QR",
    "qr.modal.subtitle": "Sistema de Gestión de Equipos",
    "qr.modal.qr_subtitle": "Código QR para Mantenimiento",
    "qr.modal.scan_title": "📱 Escanea para Gestionar Mantenimiento",
    "qr.modal.access_description":
      "Código QR para acceso móvil al sistema de mantenimiento",
    "qr.modal.equipment_info": "📋 Información del Equipo",
    "qr.modal.equipment.instrument": "Instrumento:",
    "qr.modal.equipment.internal_code": "Código Interno:",
    "qr.modal.equipment.brand": "Marca:",
    "qr.modal.equipment.model": "Modelo:",
    "qr.modal.equipment.serial_number": "Número de Serie:",
    "qr.modal.instructions.title": "📱 Instrucciones de Uso:",
    "qr.modal.instructions.scan":
      "Escanea el código QR con tu dispositivo móvil",
    "qr.modal.instructions.access":
      "Accede a la interfaz de gestión de mantenimiento",
    "qr.modal.instructions.view": "Visualiza tareas programadas y en progreso",
    "qr.modal.instructions.update": "Actualiza estados de las tareas",
    "qr.modal.instructions.create": "Crea nuevas tareas de mantenimiento",
    "qr.modal.footer.generated": "Generado el:",
    "qr.modal.footer.system": "Sistema de Gestión de Equipos de Laboratorio",
    "qr.modal.buttons.manage_tasks": "Gestionar Tareas",
    "qr.modal.buttons.download": "Descargar PNG",
    "qr.modal.buttons.print": "Imprimir",
    "qr.modal.buttons.cancel": "Cancelar",
    "qr.modal.equipment_details": "Detalles del Equipo",
    "qr.modal.usage_instructions": "Instrucciones de Uso",
    "qr.modal.status_flow": "Programada → En Proceso → Completada",

    // QR Maintenance Page
    "qr.maintenance.page_title":
      "Mantenimiento - {equipment} | Sistema de Equipos",
    "qr.maintenance.system_title": "🔧 Sistema de Gestión de Equipos",
    "qr.maintenance.system_subtitle":
      "Mantenimiento y Calibración de Laboratorio",
    "qr.maintenance.equipment.active": "Equipo Activo",
    "qr.maintenance.equipment.inactive": "Equipo Inactivo",
    "qr.maintenance.tasks.title": "📋 Tareas de Mantenimiento",
    "qr.maintenance.tasks.count": "{count} tareas registradas",
    "qr.maintenance.tasks.empty.title": "No hay tareas programadas",
    "qr.maintenance.tasks.empty.description":
      "Crea una nueva tarea para comenzar",
    "qr.maintenance.status.scheduled": "Programada",
    "qr.maintenance.status.in_progress": "En Proceso",
    "qr.maintenance.status.completed": "Completada",
    "qr.maintenance.status.cancelled": "Cancelada",
    "qr.maintenance.form.status_label": "Estado",
    "qr.maintenance.form.notes_label": "Observaciones/Notas",
    "qr.maintenance.form.notes_placeholder":
      "Escribe aquí las observaciones sobre el cambio de estado...",
    "qr.maintenance.actions.save": "Guardar",
    "qr.maintenance.actions.cancel": "Cancelar",
    "qr.maintenance.actions.start": "Iniciar",
    "qr.maintenance.actions.complete": "Completar",
    "qr.maintenance.actions.edit": "Editar Estado",
    "qr.maintenance.actions.view_details": "Ver Detalles",
    "qr.maintenance.error.update_task": "Error al actualizar la tarea",
    "qr.maintenance.error.create_task": "Error al crear la tarea",
    "qr.maintenance.optimistic_update":
      "Actualización optimista del estado local",
    "qr.maintenance.completed_effect":
      "Si se marca como completada, añadir efecto visual",
    "qr.maintenance.task_cancelled": "Tarea cancelada",
    "qr.maintenance.completed_via_qr": "Completado via QR",
    "qr.maintenance.work_performed": "Trabajo realizado satisfactoriamente",
    "qr.maintenance.cancelled_via_qr": "Cancelado via QR",

    // QR Maintenance Types
    "qr.maintenance.types.preventive_routine":
      "Mantenimiento Preventivo Rutinario",
    "qr.maintenance.types.preventive_deep": "Mantenimiento Preventivo Profundo",
    "qr.maintenance.types.corrective_repair": "Mantenimiento Correctivo",
    "qr.maintenance.types.specialized_cleaning": "Limpieza Especializada",
    "qr.maintenance.types.calibration": "Calibración",
    "qr.maintenance.types.validation": "Validación",
    "qr.maintenance.types.repair": "Reparación",
    "qr.maintenance.types.verification": "Verificación",
    "qr.maintenance.types.inspection": "Inspección",
    "qr.maintenance.types.cleaning": "Limpieza",
    "qr.maintenance.types.preventive": "Preventivo",
    "qr.maintenance.types.corrective": "Correctivo",

    // QR Maintenance Form Modal
    "qr.form.validation.required_fields":
      "Por favor completa los campos obligatorios",
    "qr.form.error.create_task": "Error al crear la tarea",
    "qr.form.equipment.info": "Información del Equipo (ID: {id})",
    "qr.form.section.scheduling": "Programación",
    "qr.form.section.responsibility": "Responsabilidad",
    "qr.form.section.details": "Detalles del Mantenimiento",
    "qr.form.section.external_service": "Servicio Externo",
    "qr.form.section.validation": "✅ Validación y Seguimiento",
    "qr.form.field.scheduled_date": "Fecha Programada *",
    "qr.form.field.responsible_person": "Persona Responsable *",
    "qr.form.field.priority": "Prioridad",
    "qr.form.field.description": "Descripción *",
    "qr.form.field.actual_duration": "Duración Real (min)",
    "qr.form.field.actual_cost": "Costo Real",
    "qr.form.field.work_performed": "Trabajo a Realizar",
    "qr.form.field.work_performed_placeholder":
      "Describe en detalle el trabajo que se realizará...",
    "qr.form.field.findings": "Hallazgos Esperados/Observaciones",
    "qr.form.field.findings_placeholder":
      "Anota cualquier hallazgo, observación o problema identificado...",
    "qr.form.field.recommendations": "Recomendaciones",
    "qr.form.field.recommendations_placeholder":
      "Incluye recomendaciones para futuros mantenimientos o mejoras...",
    "qr.form.field.external_provider": "Proveedor Externo",
    "qr.form.field.parts_needed": "Partes/Materiales Necesarios",
    "qr.form.field.notes": "Notas Adicionales",
    "qr.form.field.next_maintenance_date": "Fecha Próximo Mantenimiento",
    "qr.form.field.next_maintenance_helper":
      "Opcional: Programa automáticamente el próximo mantenimiento",
    "qr.form.switch.requires_external_service": "Requiere Servicio Externo",
    "qr.form.switch.requires_validation": "Requiere Validación Posterior",
    "qr.form.priority.low": "Baja",
    "qr.form.priority.medium": "Media",
    "qr.form.priority.high": "Alta",
    "qr.form.priority.critical": "Crítica",
    "qr.form.button.cancel": "Cancelar",
    "qr.form.button.create": "Crear Tarea",
    "qr.form.button.creating": "Creando...",

    // modulo de Usuarios
    "users.title": "Usuarios",
    "users.add": "Agregar Usuario",
    "users.edit": "Editar Usuario",
    "users.name": "Nombre",
    "users.email": "Email",
    "users.created_at": "Creado en",
    "users.actions": "Acciones",
    "users.password": "Contraseña",
    "users.confirm_password": "Confirmar Contraseña",
    "users.password_required": "Se requiere contraseña",
    "users.passwords_must_match": "Las contraseñas deben coincidir",
    "users.errors.name_required": "El nombre es obligatorio",
    "users.errors.email_required": "El correo electrónico es obligatorio",
    "users.errors.email_invalid": "El correo electrónico no es válido",
    "users.errors.password_required": "La contraseña es obligatoria",
    "users.errors.password_min_length":
      "La contraseña debe tener al menos 6 caracteres",
    "users.errors.password_confirmation_required":
      "La confirmación de contraseña es obligatoria",
    "users.errors.password_mismatch": "Las contraseñas no coinciden",
    "users.password_optional": "Contraseña (opcional)",
    "users.password_confirmation_optional":
      "Confirmación de contraseña (opcional)",
    "users.id": "ID",
    "users.created": "Creado",
    "users.message": "Deja las contraseñas en blanco si no quieres cambiarlas",
    "users.active": "Activo",
    "users.inactive": "Inactivo",
    "users.status": "Estado",
  },
  en: {
    //Title Main
    "title.main": "Equipment Tracking",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Welcome",
    "dashboard.stats": "Statistics",
    "dashboard.equipment": "Equipment",
    "dashboard.maintenance": "Maintenance",
    "dashboard.notifications": "Notifications",
    "dashboard.maintenance.state": "Maintenance by State",
    "dashboard.equipment.state": "Equipment by State",
    "dashboard.equipment.priority.category":
      "Maintenance by Priority and Category",
    "dashboard.general.summary": "General Summary",
    "dashboard.distribution": "Maintenance Distribution", //-----
    "dashboard.categories": "Maintenance Categories",
    "dashboard.stats.equipment": "Equipment Status",
    "dashboard.stats.maintenance": "Maintenance Status",
    "dashboard.priorities": "Priority",
    "dashboard.stats.maintenance.category": "Maintenance by Category",
    "dashboard.maintenance.month": "Maintenance Trends by Month",
    "dashboard.maintenance.efficiency": "Maintenance Efficiency",
    "dashboard.maintenance.prediction": "Maintenance Prediction",
    "dashboard.sections.all_maintenances": "All Maintenance",
    "dashboard.sections.overdue": "Overdue Maintenance",
    //---------------------------------------------------------------
    "dashboard.stats.equipment.total": "Total Equipment",
    "dashboard.stats.equipment.active": "Active Equipment",
    "dashboard.stats.equipment.inactive": "Inactive Equipment",
    "dashboard.stats.maintenance.total": "Total Maintenance",
    "dashboard.stats.maintenance.scheduled": "Scheduled",
    "dashboard.stats.maintenance.in_progress": "In Progress",
    "dashboard.stats.maintenance.completed": "Completed",
    "dashboard.stats.maintenance.cancelled": "Cancelled",
    "dashboard.stats.maintenance.overdue": "Overdue",

    "dashboard.sections.upcoming": "Upcoming Maintenance",
    "dashboard.sections.in_progress": "In Progress",
    "dashboard.sections.recent_completed": "Recently Completed",
    "dashboard.sections.attention_required": "Attention Required",
    "dashboard.sections.cancelled": "Cancelled Maintenance",

    "dashboard.table.headers.equipment": "Equipment",
    "dashboard.table.headers.date": "Date",
    "dashboard.table.headers.type": "Type",
    "dashboard.table.headers.status": "Status",
    "dashboard.table.headers.priority": "Priority",
    "dashboard.table.headers.category": "Category",
    "dashboard.table.headers.performed_date": "Performed Date",

    "dashboard.modal.title": "Data Analysis Panel",
    "dashboard.modal.tabs.detailed_tables": "Detailed Tables",
    "dashboard.modal.tabs.detailed_tables_System": "Detailed System Tables",
    "dashboard.modal.tabs.bar_charts": "Bar Charts",
    "dashboard.modal.tabs.pie_charts": "Pie Charts",
    "dashboard.modal.tabs.trend_analysis": "Trend Analysis",

    "dashboard.messages.no_data.scheduled": "No scheduled maintenance",
    "dashboard.messages.no_data.in_progress": "No maintenance in progress",
    "dashboard.messages.no_data.completed": "No recently completed maintenance",
    "dashboard.messages.no_data.attention":
      "No maintenance requiring immediate attention",
    "dashboard.messages.no_data.cancelled": "No recently cancelled maintenance",

    "dashboard.overdue": "OVERDUE",
    "dashboard.completed_late": "Completed late",
    "dashboard.no_date": "No date",
    "dashboard.unspecified": "Unspecified",
    "dashboard.invalid_date": "Invalid date",

    "dashboard.buttons.close_panel": "Close Panel",
    "dashboard.buttons.close": "close",
    "dashboard.buttons.actions": "actions",

    // Equipment
    "equipment.title": "Equipment",
    "equipment.total": "Total",
    "equipment.active": "Active",
    "equipment.inactive": "Inactive",
    "equipment.add": "Add Equipment",
    "equipment.edit": "Edit Equipment",
    "equipment.delete": "Delete Equipment",
    "equipment.name": "Instrument",
    "equipment.code": "Internal Code",
    "equipment.type": "Type",
    "equipment.location": "Location",
    "equipment.status": "Status",
    "equipment.brand": "Brand",
    "equipment.model": "Model",
    "equipment.serial": "Serial Number",
    "equipment.system_number": "System No.",
    "equipment.ext_calibration_periodicity": "External Calibration Periodicity",
    "equipment.internal_check_periodicity": "Internal Check Periodicity",
    "equipment.last_ext_calibration": "Last External Calibration",
    "equipment.next_ext_calibration": "Next External Calibration",
    "equipment.category": "Category",
    "equipment.responsible": "Responsible",
    "equipment.description": "Description",
    "equipment.history.duration": "Duration",

    // Equipment History
    "equipment.history.title": "Maintenance History",
    "equipment.history.internal_code": "Internal Code",
    "equipment.history.statistics": "Maintenance Statistics",
    "equipment.history.total": "Total",
    "equipment.history.completed": "Completed",
    "equipment.history.pending": "Pending",
    "equipment.history.preventive": "Preventive",
    "equipment.history.corrective": "Corrective",
    "equipment.history.predictive": "Predictive",
    "equipment.history.filters": "Search Filters",
    "equipment.history.search": "Search",
    "equipment.history.search_placeholder":
      "Search by type, responsible, description...",
    "equipment.history.hide_filters": "Hide Filters",
    "equipment.history.more_filters": "More Filters",
    "equipment.history.all_states": "All",
    "equipment.history.category": "Category",
    "equipment.history.all_categories": "All",
    "equipment.history.priorities": "Priorities",
    "equipment.history.all_priorities": "All",
    "equipment.history.from": "From",
    "equipment.history.to": "To",
    "equipment.history.type_names.mantenimiento_preventivo":
      "Preventive Maintenance",
    "equipment.history.type_names.mantenimiento_correctivo":
      "Corrective Maintenance",
    "equipment.history.type_names.mantenimiento_preventivo_rutinario":
      "Routine Preventive Maintenance",
    "equipment.history.type_names.mantenimiento_preventivo_profundo":
      "Deep Preventive Maintenance",
    "equipment.history.type_names.validacion": "Validation",
    "equipment.history.type_names.calibracion": "Calibration",
    "equipment.history.type_names.calibracion_preventiva":
      "Preventive Calibration",
    "equipment.history.type_names.limpieza_especializada":
      "Specialized Cleaning",
    "equipment.history.type_names.reparacion": "Repair",
    "equipment.history.type_names.inspeccion": "Inspection",
    "equipment.history.type_names.routine_preventive_maintenance":
      "Routine Preventive Maintenance",
    "equipment.history.type_names.deep_preventive_maintenance":
      "Deep Preventive Maintenance",
    "equipment.history.type_names.corrective_maintenance":
      "Corrective Maintenance",
    "equipment.history.type_names.preventive_maintenance":
      "Preventive Maintenance",
    "equipment.history.type_names.specialized_cleaning": "Specialized Cleaning",
    "equipment.history.type_names.preventive_calibration":
      "Preventive Calibration",
    "equipment.history.type_names.validation": "Validation",
    "equipment.history.type_names.calibration": "Calibration",
    "equipment.history.type_names.repair": "Repair",
    "equipment.history.type_names.inspection": "Inspection",
    "equipment.history.no_records": "No maintenance records found",
    "equipment.history.adjust_filters":
      "Try adjusting the filters to find more results",
    "equipment.details": "Details",
    "equipment.last_external_calibration": "Last External Calibration",
    "equipment.next_external_calibration": "Next External Calibration",
    "equipment.history": "History",

    // Maintenance
    "maintenance.title": "Maintenance",
    "maintenance.completed": "Completed",
    "maintenance.pending": "Pending",
    "maintenance.overdue": "Overdue",
    "maintenance.schedule": "Schedule",
    "maintenance.history": "History",
    "maintenance.type": "Maintenance Type",
    "maintenance.date": "Date",
    "maintenance.description": "Description",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.export": "Export",
    "common.import": "Import",
    "common.actions": "Actions",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.warning": "Warning",
    "common.info": "Information",
    "common.confirm": "Confirm",
    "common.close": "Close",
    "common.showing": "Showing",
    "common.to": "to",
    "common.of": "of",
    "common.entries": "entries",
    "common.details": "Details",
    "common.history.loading": "Loading history...",
    "common.history.no_data": "No maintenance history",
    "common.history.date": "Date",
    "common.history.result": "Result",
    "common.history.user": "User",
    "common.automatic_date_from_history":
      "Date automatically updated from maintenance history",
    "common.calculated_date_from_calibration":
      "Date automatically calculated based on last calibration",
    "common.qr_management":
      "QR Management - View tasks, change statuses, and create maintenance",
    "common.pagination.showing": "Showing",
    "common.pagination.to": "to",
    "common.pagination.of": "of",
    "common.pagination.entries": "entries",
    "common.update": "Update",

    // Charts and Graphics
    "dashboard.charts.title": "Monthly Maintenance Analysis",
    "dashboard.charts.preventive": "Preventive",
    "dashboard.charts.corrective": "Corrective",
    "dashboard.charts.predictive": "Predictive",
    "dashboard.charts.table.month": "Month",
    "dashboard.charts.table.scheduled": "Scheduled",
    "dashboard.charts.table.completed": "Completed",
    "dashboard.charts.table.completed_ontime": "On Time",
    "dashboard.charts.table.percentage": "Efficiency",
    "dashboard.charts.table.ontime_percentage": "Punctuality",
    "dashboard.charts.tooltip.percentage": "Efficiency",
    "dashboard.charts.months.jan": "Jan",
    "dashboard.charts.months.feb": "Feb",
    "dashboard.charts.months.mar": "Mar",
    "dashboard.charts.months.apr": "Apr",
    "dashboard.charts.months.may": "May",
    "dashboard.charts.months.jun": "Jun",
    "dashboard.charts.months.jul": "Jul",
    "dashboard.charts.months.aug": "Aug",
    "dashboard.charts.months.sep": "Sep",
    "dashboard.charts.months.oct": "Oct",
    "dashboard.charts.months.nov": "Nov",
    "dashboard.charts.months.dec": "Dec",

    // Status translations from database
    "db.status.completed": "Completed",
    "db.status.in_progress": "In Progress",
    "db.status.scheduled": "Scheduled",
    "db.status.cancelled": "Cancelled",
    "db.status.postponed": "Postponed",

    // Database Actions
    "db.action.preventive_maintenance": "Preventive Maintenance",
    "db.action.corrective_maintenance": "Corrective Maintenance",
    "db.action.calibration": "Calibration",
    "db.action.verification": "Verification",
    "db.action.inspection": "Inspection",
    "db.action.cleaning": "Cleaning",
    "db.action.repair": "Repair",

    // Priority translations from database
    "db.priority.critical": "Critical",
    "db.priority.high": "High",
    "db.priority.medium": "Medium",
    "db.priority.low": "Low",

    // Category translations from database
    "db.category.preventive": "Preventive",
    "db.category.corrective": "Corrective",
    "db.category.predictive": "Predictive",
    "common.stats.scheduled": "Scheduled",
    "common.stats.in_progress": "In Progress",
    "common.stats.completed": "Completed",
    "common.stats.cancelled": "Cancelled",
    "common.stats.postponed": "Postponed",
    "common.priorities.low": "Low",
    "common.priorities.medium": "Medium",
    "common.priorities.high": "High",
    "common.priorities.critical": "Critical",
    "common.scheduled_date": "Scheduled Date",
    "common.done": "Done",
    "common.work": "Work",
    "common.findings": "Findings",
    "common.real": "Real",

    // Work performed translations
    "work.completed_via_qr": "Completed via QR",
    "work.work_performed_successfully": "Work performed successfully",
    "work.maintenance_completed": "Maintenance completed",
    "work.calibration_performed": "Calibration performed",
    "work.equipment_repaired": "Equipment repaired",
    "work.preventive_maintenance_done": "Preventive maintenance done",
    "work.corrective_maintenance_done": "Corrective maintenance done",
    "work.cleaning_completed": "Cleaning completed",
    "work.inspection_completed": "Inspection completed",
    "work.validation_completed": "Validation completed",

    // Findings translations
    "findings.work_performed_successfully": "Work performed successfully",
    "findings.equipment_in_good_condition": "Equipment in good condition",
    "findings.no_issues_found": "No issues found",
    "findings.minor_adjustments_needed": "Minor adjustments needed",
    "findings.calibration_within_tolerance": "Calibration within tolerance",
    "findings.replacement_parts_needed": "Replacement parts needed",
    "findings.further_inspection_required": "Further inspection required",
    "findings.equipment_functioning_properly": "Equipment functioning properly",

    // Excel Export
    "excel.export.title": "Export History to Excel",
    "excel.export.description":
      "📊 Select the date range to export the equipment maintenance history.",
    "excel.export.quick_ranges": "Quick ranges",
    "excel.export.quick_ranges.7_days": "Last 7 days",
    "excel.export.quick_ranges.30_days": "Last 30 days",
    "excel.export.quick_ranges.3_months": "Last 3 months",
    "excel.export.quick_ranges.1_year": "Last year",
    "excel.export.start_date": "Start date",
    "excel.export.end_date": "End date",
    "excel.export.validation.start_date_required": "Start date is required",
    "excel.export.validation.end_date_required": "End date is required",
    "excel.export.validation.end_date_after_start":
      "End date must be after start date",
    "excel.export.report_content": "Report content",
    "excel.export.report_description":
      "The Excel file will include: equipment information, maintenance history, calibration dates, responsible persons and observations within the selected range.",
    "excel.export.generating": "Generating...",
    "excel.export.download": "Download Excel",

    // Excel Import
    "excel.import.title": "Import Equipment from Excel",
    "excel.import.description":
      "📊 Bulk equipment upload using Excel files (.xlsx, .xls)",
    "excel.import.info":
      "You can import equipment in bulk using an Excel file. Download the template to see the required format.",
    "excel.import.download_template": "Download Template",
    "excel.import.select_file": "Select an Excel file",
    "excel.import.drag_drop": "or drag and drop here",
    "excel.import.file_requirements": "Only .xlsx or .xls files (max 10MB)",
    "excel.import.drop_file": "Drop the file here to upload",
    "excel.import.analyzing": "Analyzing...",
    "excel.import.preview": "Preview",
    "excel.import.stats.total": "Total",
    "excel.import.stats.new": "New",
    "excel.import.stats.update": "Update",
    "excel.import.stats.errors": "Errors",
    "excel.import.tabs.preview": "Preview",
    "excel.import.tabs.errors": "Errors",
    "excel.import.table.instrument": "Instrument",
    "excel.import.table.code": "Code",
    "excel.import.table.brand": "Brand",
    "excel.import.table.model": "Model",
    "excel.import.table.status": "Status",
    "excel.import.no_data": "No data to display",
    "excel.import.row": "Row",
    "excel.import.no_errors": "No errors found",
    "excel.import.importing": "Importing equipment...",
    "excel.import.importing_wait": "Please wait while we process the data",
    "excel.import.progress": "% completed",
    "excel.import.completed": "Import Completed!",
    "excel.import.completed_message":
      "Equipment has been imported successfully",
    "excel.import.equipment_created": "Equipment created:",
    "excel.import.equipment_updated": "Equipment updated:",
    "excel.import.back": "Back",
    "excel.import.import_equipment": "Import Equipment",
    "excel.import.validation.invalid_file":
      "Please select a valid Excel file (.xlsx or .xls)",
    "excel.import.validation.file_too_large":
      "File is too large. Maximum 10MB allowed.",

    // Maintenance Form
    "maintenance.form.required_fields": "Please complete the required fields",
    "maintenance.form.save_error": "Error saving maintenance: ",
    "maintenance.form.equipment_info": "Equipment Information (ID: {id})",
    "maintenance.form.scheduling": "Scheduling",
    "maintenance.form.scheduled_date": "Scheduled Date *",
    "maintenance.form.performed_date": "Performed Date",
    "maintenance.form.responsibility": "Responsibility",
    "maintenance.form.responsible_person": "Responsible Person *",
    "maintenance.form.priority": "Priority",
    "maintenance.form.priority.low": "Low",
    "maintenance.form.priority.medium": "Medium",
    "maintenance.form.priority.high": "High",
    "maintenance.form.priority.critical": "Critical",
    "maintenance.form.details": "Maintenance Details",
    "maintenance.form.description": "Description *",
    "maintenance.form.actual_duration": "Actual Duration (min)",
    "maintenance.form.actual_cost": "Actual Cost",
    "maintenance.form.status": "Status",
    "maintenance.form.status.scheduled": "Scheduled",
    "maintenance.form.status.in_progress": "In Progress",
    "maintenance.form.status.completed": "Completed",
    "maintenance.form.status.cancelled": "Cancelled",
    "maintenance.form.status.postponed": "Postponed",
    "maintenance.form.external_service": "Requires External Service",
    "maintenance.form.external_provider": "External Provider",
    "maintenance.form.parts_needed": "Parts/Materials Needed",
    "maintenance.form.additional_notes": "Additional Notes",
    "maintenance.form.saving": "Saving...",
    "maintenance.form.save_maintenance": "Save Maintenance",

    // Maintenance Types Modal
    "maintenance.types.title": "Maintenance Types",
    "maintenance.types.select_description":
      "Select the type of maintenance you want to perform",
    "maintenance.types.categories.preventive": "Preventive",
    "maintenance.types.categories.corrective": "Corrective",
    "maintenance.types.categories.predictive": "Predictive",
    "maintenance.types.categories.others": "Others",
    "maintenance.types.maintenance_prefix": "Maintenance",

    // Maintenance Type Names
    "maintenance.types.preventive_routine.name":
      "Routine Preventive Maintenance",
    "maintenance.types.preventive_routine.description":
      "General equipment inspection and cleaning",
    "maintenance.types.preventive_deep.name": "Deep Preventive Maintenance",
    "maintenance.types.preventive_deep.description":
      "Complete review of internal components",
    "maintenance.types.corrective_repair.name": "Repair",
    "maintenance.types.corrective_repair.description":
      "Repair of failures or breakdowns",
    "maintenance.types.cleaning.name": "Cleaning",
    "maintenance.types.cleaning.description":
      "Deep cleaning with specific protocols",
    "maintenance.types.calibration.name": "Calibration",
    "maintenance.types.calibration.description":
      "Precision adjustment and verification",
    "maintenance.types.validation.name": "Validation",
    "maintenance.types.validation.description":
      "Regulatory compliance verification",
    "maintenance.types.inspection.name": "Inspection",
    "maintenance.types.inspection.description":
      "Visual and functional equipment review",

    // Notifications
    "notifications.title": "Notification Settings",
    "notifications.stats.title": "Notification Statistics",
    "notifications.export.excel": "Export Excel",
    "notifications.history": "History",
    "notifications.test": "Test",
    "notifications.process_now": "Process Now",
    "notifications.breadcrumb": "Notifications",

    // Notification Stats
    "notifications.stats.total_settings": "Total Settings",
    "notifications.stats.active_settings": "Active Settings",
    "notifications.stats.pending": "Pending",
    "notifications.stats.sent_today": "Sent Today",
    "notifications.stats.failed": "Failed",

    // Notification Types Labels
    "notifications.types.calibration_due": "Calibration Due",
    "notifications.types.maintenance_reminder": "Maintenance Reminder",
    "notifications.types.maintenance_completed": "Maintenance Completed",
    "notifications.types.maintenance_overdue": "Maintenance Overdue",

    // Notification Types Descriptions
    "notifications.descriptions.calibration_due":
      "Notification when an external calibration is about to expire",
    "notifications.descriptions.maintenance_reminder":
      "Reminder for scheduled maintenance",
    "notifications.descriptions.maintenance_completed":
      "Notification when maintenance is completed",
    "notifications.descriptions.maintenance_overdue":
      "Notification when maintenance is overdue",

    // Notification Settings
    "notifications.settings.title": "Notification Settings",
    "notifications.settings.configure": "Configure",
    "notifications.settings.active": "Active",
    "notifications.settings.inactive": "Inactive",
    "notifications.settings.days_before": "days before",
    "notifications.settings.recipients": "recipients",

    // Edit Dialog
    "notifications.edit.title": "Edit Setting",
    "notifications.edit.description": "Configure",
    "notifications.edit.active_notification": "Active notification",
    "notifications.edit.days_before_label": "Days in advance",
    "notifications.edit.days_before_help":
      "Days before the event to send the notification",
    "notifications.edit.email_addresses": "Email addresses",
    "notifications.edit.add_email": "+ Add",
    "notifications.edit.email_placeholder": "email@example.com",
    "notifications.edit.no_emails": "No email addresses configured",
    "notifications.edit.cancel": "Cancel",
    "notifications.edit.save": "Save",

    // Error Messages
    "notifications.export.error":
      "Error generating Excel file. Please try again.",
    "notifications.export.error_console": "Export error:",

    // Excel Export Modal
    "notifications.excel.title": "Export History to Excel",
    "notifications.excel.description":
      "Select the date range to export the notification history.",
    "notifications.excel.quick_ranges": "Quick ranges",
    "notifications.excel.last_7_days": "Last 7 days",
    "notifications.excel.last_30_days": "Last 30 days",
    "notifications.excel.last_3_months": "Last 3 months",
    "notifications.excel.last_year": "Last year",
    "notifications.excel.start_date": "Start date",
    "notifications.excel.end_date": "End date",
    "notifications.excel.report_content": "Report content",
    "notifications.excel.report_description":
      "The Excel file will include: notification information, types, statuses, recipients, related equipment, sending dates and errors in the selected range.",
    "notifications.excel.cancel": "Cancel",
    "notifications.excel.download": "Download Excel",
    "notifications.excel.generating": "Generating...",

    // Excel Export Validation
    "notifications.excel.validation.start_required": "Start date is required",
    "notifications.excel.validation.end_required": "End date is required",
    "notifications.excel.validation.end_after_start":
      "End date must be after start date",
    "notifications.excel.validation.max_range":
      "Date range cannot be more than 1 year for performance reasons",
    "notifications.excel.validation.large_range_warning":
      "Large date range detected. Export may take longer.",

    // Notification History
    "notifications.history.title": "Notification History",
    "notifications.history.breadcrumb": "Notification History",
    "notifications.history.filters.title": "Search Filters",
    "notifications.history.filters.hide": "Hide Filters",
    "notifications.history.filters.show": "More Filters",
    "notifications.history.search.placeholder": "Search by subject, type...",
    "notifications.history.search.label": "Search",
    "notifications.history.status.label": "Status",
    "notifications.history.status.all": "All",
    "notifications.history.status.pending": "Pending",
    "notifications.history.status.sent": "Sent",
    "notifications.history.status.failed": "Failed",
    "notifications.history.type.label": "Notification Type",
    "notifications.history.type.all": "All",
    "notifications.history.type.calibration_due": "Calibration Due",
    "notifications.history.type.maintenance_reminder": "Reminder",
    "notifications.history.type.maintenance_completed": "Completed",
    "notifications.history.type.maintenance_overdue": "Overdue",
    "notifications.history.type.test": "Test",
    "notifications.history.date_from": "From",
    "notifications.history.date_to": "To",
    "notifications.history.count": "Notifications",
    "notifications.history.no_data.title": "No notifications found",
    "notifications.history.no_data.subtitle":
      "Try adjusting the filters to see more results",

    // Table Headers
    "notifications.history.table.date": "Date",
    "notifications.history.table.type": "Type",
    "notifications.history.table.equipment": "Equipment",
    "notifications.history.table.subject": "Subject",
    "notifications.history.table.recipients": "Recipients",
    "notifications.history.table.status": "Status",
    "notifications.history.table.actions": "Actions",
    "notifications.history.table.sent": "Sent:",
    "notifications.history.table.recipients_count": "recipient(s)",
    "notifications.history.table.not_available": "N/A",

    // Pagination
    "notifications.history.pagination.showing": "Showing",
    "notifications.history.pagination.to": "to",
    "notifications.history.pagination.of": "of",
    "notifications.history.pagination.entries": "entries",

    // Detail Dialog
    "notifications.history.detail.title": "Notification Details",
    "notifications.history.detail.description":
      "Complete information of the selected notification",
    "notifications.history.detail.type": "Type",
    "notifications.history.detail.status": "Status",
    "notifications.history.detail.subject": "Subject",
    "notifications.history.detail.recipients": "Recipients",
    "notifications.history.detail.message": "Message",
    "notifications.history.detail.error": "Error",
    "notifications.history.detail.created_at": "Creation Date",
    "notifications.history.detail.sent_at": "Sent Date",
    "notifications.history.detail.close": "Close",
    "notifications.history.detail.resend": "Resend",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.equipment": "Equipment",
    "nav.notifications": "Notifications",
    "nav.maintenance": "Maintenance",
    "nav.reports": "Reports",
    "nav.settings": "Settings",
    "nav.profile": "Profile",
    "nav.logout": "Logout",
    "nav.users": "Users",

    // Status
    "status.active": "Active",
    "status.inactive": "Inactive",
    "status.pending": "Pending",
    "status.completed": "Completed",
    "status.overdue": "Overdue",

    // Language
    "language.spanish": "Spanish",
    "language.english": "English",
    "language.switch": "Switch language",

    // QR Modal
    "qr.modal.title": "QR Code",
    "qr.modal.subtitle": "Equipment Management System",
    "qr.modal.qr_subtitle": "QR Code for Maintenance",
    "qr.modal.scan_title": "📱 Scan to Manage Maintenance",
    "qr.modal.access_description":
      "QR Code for mobile access to maintenance system",
    "qr.modal.equipment_info": "📋 Equipment Information",
    "qr.modal.equipment.instrument": "Instrument:",
    "qr.modal.equipment.internal_code": "Internal Code:",
    "qr.modal.equipment.brand": "Brand:",
    "qr.modal.equipment.model": "Model:",
    "qr.modal.equipment.serial_number": "Serial Number:",
    "qr.modal.instructions.title": "📱 Usage Instructions:",
    "qr.modal.instructions.scan": "Scan the QR code with your mobile device",
    "qr.modal.instructions.access":
      "Access the maintenance management interface",
    "qr.modal.instructions.view": "View scheduled and in-progress tasks",
    "qr.modal.instructions.update": "Update task statuses",
    "qr.modal.instructions.create": "Create new maintenance tasks",
    "qr.modal.footer.generated": "Generated on:",
    "qr.modal.footer.system": "Laboratory Equipment Management System",
    "qr.modal.buttons.manage_tasks": "Manage Tasks",
    "qr.modal.buttons.download": "Download PNG",
    "qr.modal.buttons.print": "Print",
    "qr.modal.buttons.cancel": "Cancel",
    "qr.modal.equipment_details": "Equipment Details",
    "qr.modal.usage_instructions": "Usage Instructions",
    "qr.modal.status_flow": "Scheduled → In Progress → Completed",

    // QR Maintenance Page
    "qr.maintenance.page_title": "Maintenance - {equipment} | Equipment System",
    "qr.maintenance.system_title": "🔧 Equipment Management System",
    "qr.maintenance.system_subtitle": "Laboratory Maintenance and Calibration",
    "qr.maintenance.equipment.active": "Active Equipment",
    "qr.maintenance.equipment.inactive": "Inactive Equipment",
    "qr.maintenance.tasks.title": "📋 Maintenance Tasks",
    "qr.maintenance.tasks.count": "{count} registered tasks",
    "qr.maintenance.tasks.empty.title": "No scheduled tasks",
    "qr.maintenance.tasks.empty.description":
      "Create a new task to get started",
    "qr.maintenance.status.scheduled": "Scheduled",
    "qr.maintenance.status.in_progress": "In Progress",
    "qr.maintenance.status.completed": "Completed",
    "qr.maintenance.status.cancelled": "Cancelled",
    "qr.maintenance.form.status_label": "Status",
    "qr.maintenance.form.notes_label": "Observations/Notes",
    "qr.maintenance.form.notes_placeholder":
      "Write here your observations about the status change...",
    "qr.maintenance.actions.save": "Save",
    "qr.maintenance.actions.cancel": "Cancel",
    "qr.maintenance.actions.start": "Start",
    "qr.maintenance.actions.complete": "Complete",
    "qr.maintenance.actions.edit": "Edit Status",
    "qr.maintenance.actions.view_details": "View Details",
    "qr.maintenance.error.update_task": "Error updating task",
    "qr.maintenance.error.create_task": "Error creating task",
    "qr.maintenance.optimistic_update": "Optimistic local state update",
    "qr.maintenance.completed_effect":
      "If marked as completed, add visual effect",
    "qr.maintenance.task_cancelled": "Task cancelled",
    "qr.maintenance.completed_via_qr": "Completed via QR",
    "qr.maintenance.work_performed": "Work performed successfully",
    "qr.maintenance.cancelled_via_qr": "Cancelled via QR",

    // QR Maintenance Types
    "qr.maintenance.types.preventive_routine": "Routine Preventive Maintenance",
    "qr.maintenance.types.preventive_deep": "Deep Preventive Maintenance",
    "qr.maintenance.types.corrective_repair": "Corrective Maintenance",
    "qr.maintenance.types.specialized_cleaning": "Specialized Cleaning",
    "qr.maintenance.types.calibration": "Calibration",
    "qr.maintenance.types.validation": "Validation",
    "qr.maintenance.types.repair": "Repair",
    "qr.maintenance.types.verification": "Verification",
    "qr.maintenance.types.inspection": "Inspection",
    "qr.maintenance.types.cleaning": "Cleaning",
    "qr.maintenance.types.preventive": "Preventive",
    "qr.maintenance.types.corrective": "Corrective",

    // QR Maintenance Form Modal
    "qr.form.validation.required_fields": "Please complete the required fields",
    "qr.form.error.create_task": "Error creating task",
    "qr.form.equipment.info": "Equipment Information (ID: {id})",
    "qr.form.section.scheduling": "Scheduling",
    "qr.form.section.responsibility": "Responsibility",
    "qr.form.section.details": "Maintenance Details",
    "qr.form.section.external_service": "External Service",
    "qr.form.section.validation": "✅ Validation and Follow-up",
    "qr.form.field.scheduled_date": "Scheduled Date *",
    "qr.form.field.responsible_person": "Responsible Person *",
    "qr.form.field.priority": "Priority",
    "qr.form.field.description": "Description *",
    "qr.form.field.actual_duration": "Actual Duration (min)",
    "qr.form.field.actual_cost": "Actual Cost",
    "qr.form.field.work_performed": "Work to be Performed",
    "qr.form.field.work_performed_placeholder":
      "Describe in detail the work to be performed...",
    "qr.form.field.findings": "Expected Findings/Observations",
    "qr.form.field.findings_placeholder":
      "Note any findings, observations or identified problems...",
    "qr.form.field.recommendations": "Recommendations",
    "qr.form.field.recommendations_placeholder":
      "Include recommendations for future maintenance or improvements...",
    "qr.form.field.external_provider": "External Provider",
    "qr.form.field.parts_needed": "Parts/Materials Needed",
    "qr.form.field.notes": "Additional Notes",
    "qr.form.field.next_maintenance_date": "Next Maintenance Date",
    "qr.form.field.next_maintenance_helper":
      "Optional: Automatically schedule the next maintenance",
    "qr.form.switch.requires_external_service": "Requires External Service",
    "qr.form.switch.requires_validation": "Requires Subsequent Validation",
    "qr.form.priority.low": "Low",
    "qr.form.priority.medium": "Medium",
    "qr.form.priority.high": "High",
    "qr.form.priority.critical": "Critical",
    "qr.form.button.cancel": "Cancel",
    "qr.form.button.create": "Create Task",
    "qr.form.button.creating": "Creating...",

    // modulo de Usuarios
    "users.title": "Users",
    "users.add": "Add User",
    "users.edit": "Edit User",
    "users.name": "Name",
    "users.email": "Email",
    "users.created_at": "Created At",
    "users.actions": "Actions",
    "users.password": "Password",
    "users.confirm_password": "Confirm Password",
    "users.password_required": "Password is required",
    "users.passwords_must_match": "Passwords must match",
    "users.errors.name_required": "Name is required",
    "users.errors.email_required": "Email is required",
    "users.errors.email_invalid": "Invalid email address",
    "users.errors.password_required": "Password is required",
    "users.errors.password_min_length":
      "Password must be at least 8 characters long",
    "users.errors.password_confirmation_required":
      "Password confirmation is required",
    "users.errors.password_mismatch": "Passwords do not match",
    "users.password_optional": "Password (optional)",
    "users.password_confirmation_optional": "Confirm Password (optional)",
    "users.id": "ID",
    "users.created": "Created",
    "users.message": "Leave passwords blank if you don't want to change them",
     "users.active": "Active",
    "users.inactive": "Inactive",
    "users.status": "status",
  },
} as const;

export function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}

interface TranslationProviderProps {
  children: ReactNode;
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

export function TranslationProvider({
  children,
  language,
  setLanguage,
  toggleLanguage,
}: TranslationProviderProps) {
  const t = (key: string): string => {
    const translation =
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ];
    return translation || key;
  };
  return (
    <TranslationContext.Provider
      value={{ language, t, setLanguage, toggleLanguage }}
    >
      {children}
    </TranslationContext.Provider>
  );
}
