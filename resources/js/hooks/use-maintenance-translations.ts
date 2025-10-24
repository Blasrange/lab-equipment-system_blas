import { useTranslation } from '@/contexts/translation-context';

/**
 * Hook personalizado para traducciones de mantenimiento
 */
export function useMaintenanceTranslations() {
    const { t } = useTranslation();

    /**
     * Traduce el nombre del tipo de mantenimiento
     */
    const translateMaintenanceTypeName = (typeName: string): string => {
        if (!typeName) return '';

        // Crear un mapa de traducción basado en los nombres comunes
        const translationMap: Record<string, string> = {
            // Español a clave de traducción
            'Mantenimiento Preventivo Rutinario': t(
                'qr.maintenance.types.preventive_routine',
            ),
            'Mantenimiento Preventivo Profundo': t(
                'qr.maintenance.types.preventive_deep',
            ),
            'Mantenimiento Correctivo': t(
                'qr.maintenance.types.corrective_repair',
            ),
            'Limpieza Especializada': t(
                'qr.maintenance.types.specialized_cleaning',
            ),
            Calibración: t('qr.maintenance.types.calibration'),
            Validación: t('qr.maintenance.types.validation'),
            Reparación: t('qr.maintenance.types.repair'),
            Verificación: t('qr.maintenance.types.verification'),
            Inspección: t('qr.maintenance.types.inspection'),
            Limpieza: t('qr.maintenance.types.cleaning'),

            // Variaciones en inglés
            'Preventive Routine Maintenance': t(
                'qr.maintenance.types.preventive_routine',
            ),
            'Routine Preventive Maintenance': t(
                'qr.maintenance.types.preventive_routine',
            ),
            'Deep Preventive Maintenance': t(
                'qr.maintenance.types.preventive_deep',
            ),
            'Corrective Maintenance': t(
                'qr.maintenance.types.corrective_repair',
            ),
            'Corrective Repair': t('qr.maintenance.types.corrective_repair'),
            'Specialized Cleaning': t(
                'qr.maintenance.types.specialized_cleaning',
            ),
            Calibration: t('qr.maintenance.types.calibration'),
            Validation: t('qr.maintenance.types.validation'),
            Repair: t('qr.maintenance.types.repair'),
            Verification: t('qr.maintenance.types.verification'),
            Inspection: t('qr.maintenance.types.inspection'),
            Cleaning: t('qr.maintenance.types.cleaning'),

            // Variaciones comunes en minúsculas
            preventivo: t('qr.maintenance.types.preventive'),
            correctivo: t('qr.maintenance.types.corrective'),
            calibracion: t('qr.maintenance.types.calibration'),
            calibración: t('qr.maintenance.types.calibration'),
            validacion: t('qr.maintenance.types.validation'),
            validación: t('qr.maintenance.types.validation'),
            limpieza: t('qr.maintenance.types.cleaning'),
            reparacion: t('qr.maintenance.types.repair'),
            reparación: t('qr.maintenance.types.repair'),
            verificacion: t('qr.maintenance.types.verification'),
            verificación: t('qr.maintenance.types.verification'),
            inspeccion: t('qr.maintenance.types.inspection'),
            inspección: t('qr.maintenance.types.inspection'),
        };

        // Buscar traducción exacta
        if (translationMap[typeName]) {
            return translationMap[typeName];
        }

        // Buscar traducción por coincidencia parcial (case insensitive)
        const lowerTypeName = typeName.toLowerCase();
        for (const [key, value] of Object.entries(translationMap)) {
            if (
                key.toLowerCase().includes(lowerTypeName) ||
                lowerTypeName.includes(key.toLowerCase())
            ) {
                return value;
            }
        }

        // Si no se encuentra traducción, devolver el texto original
        return typeName;
    };

    /**
     * Traduce el resultado o estado de mantenimiento
     */
    const translateMaintenanceResult = (result: string): string => {
        if (!result) return '';

        const resultMap: Record<string, string> = {
            // Estados en español
            Completado: t('db.status.completed'),
            Programado: t('db.status.scheduled'),
            'En Proceso': t('db.status.in_progress'),
            Cancelado: t('db.status.cancelled'),
            Pospuesto: t('db.status.postponed'),

            // Estados en inglés
            Completed: t('db.status.completed'),
            Scheduled: t('db.status.scheduled'),
            'In Progress': t('db.status.in_progress'),
            Cancelled: t('db.status.cancelled'),
            Postponed: t('db.status.postponed'),

            // Variaciones comunes
            completed: t('db.status.completed'),
            scheduled: t('db.status.scheduled'),
            in_progress: t('db.status.in_progress'),
            cancelled: t('db.status.cancelled'),
            postponed: t('db.status.postponed'),
        };

        return resultMap[result] || result;
    };

    /**
     * Traduce acciones de mantenimiento
     */
    const translateMaintenanceAction = (action: string): string => {
        if (!action) return '';

        const actionMap: Record<string, string> = {
            // Acciones en español
            'Mantenimiento Preventivo': t('db.action.preventive_maintenance'),
            'Mantenimiento Correctivo': t('db.action.corrective_maintenance'),
            Calibración: t('db.action.calibration'),
            Verificación: t('db.action.verification'),
            Inspección: t('db.action.inspection'),
            Limpieza: t('db.action.cleaning'),
            Reparación: t('db.action.repair'),

            // Acciones en inglés
            'Preventive Maintenance': t('db.action.preventive_maintenance'),
            'Corrective Maintenance': t('db.action.corrective_maintenance'),
            Calibration: t('db.action.calibration'),
            Verification: t('db.action.verification'),
            Inspection: t('db.action.inspection'),
            Cleaning: t('db.action.cleaning'),
            Repair: t('db.action.repair'),
        };

        return actionMap[action] || action;
    };

    return {
        translateMaintenanceTypeName,
        translateMaintenanceResult,
        translateMaintenanceAction,
    };
}
