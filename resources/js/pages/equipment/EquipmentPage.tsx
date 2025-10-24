import { Button as ShadcnButton } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import ExcelImportModal from '@/pages/equipment/ExcelImportModal';
import QrModal from '@/pages/Qr/QrModal';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import AddIcon from '@mui/icons-material/Add';
import BuildIcon from '@mui/icons-material/Build';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { FileSpreadsheet, Upload } from 'lucide-react';
import React from 'react';
import MaintenanceFormModal from '../maintenance/MaintenanceFormModal';
import MaintenanceTypesModal from '../maintenance/MaintenanceTypesModal';
import CreateEquipmentModal from './CreateEquipmentModal';
import EditEquipmentModal from './EditEquipmentModal';
import ExcelExportModal from './ExcelExportModal';

type Equipment = {
    id: number;
    instrument: string;
    int_code: string;
    brand: string;
    model: string;
    serial_number: string;
    system_number: string;
    ext_calibration_periodicity: string;
    internal_check_periodicity: string;
    last_ext_calibration: string;
    next_ext_calibration: string;
    active: boolean;
    pending_maintenance_count?: number;
    in_progress_maintenance_count?: number;
    pending_maintenances?: any[];
    qr_token?: string;
};

type MaintenanceHistory = {
    date: string;
    action: string;
    result: string;
    users: string;
    findings?: string;
    work_performed?: string;
};

function Row(props: {
    row: Equipment;
    onEdit: (row: Equipment) => void;
    onMaintenance: (row: Equipment) => void;
    onHistory: (row: Equipment) => void;
    onGenerateQr: (row: Equipment) => void;
    qrLoading?: boolean;
    selectedEquipmentId?: number;
}) {
    const { t } = useTranslation();

    // Función para formatear fecha en formato colombiano
    function formatColombiaDate(dateString: string) {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    // Función para traducir acciones de mantenimiento
    function translateMaintenanceAction(action: string) {
        if (!action) return '';

        // Mapeo directo para acciones específicas
        const actionMap: { [key: string]: string } = {
            Reparación: t('maintenance.types.corrective_repair.name'),
            Repair: t('maintenance.types.corrective_repair.name'),
            Limpieza: t('maintenance.types.cleaning.name'),
            Cleaning: t('maintenance.types.cleaning.name'),
            'Limpieza Especializada': t('maintenance.types.cleaning.name'),
            'Specialized Cleaning': t('maintenance.types.cleaning.name'),
            Calibración: t('maintenance.types.calibration.name'),
            Calibration: t('maintenance.types.calibration.name'),
            Validación: t('maintenance.types.validation.name'),
            Validation: t('maintenance.types.validation.name'),
            Inspección: t('maintenance.types.inspection.name'),
            Inspection: t('maintenance.types.inspection.name'),
            'Mantenimiento Preventivo Rutinario': t(
                'maintenance.types.preventive_routine.name',
            ),
            'Routine Preventive Maintenance': t(
                'maintenance.types.preventive_routine.name',
            ),
            'Mantenimiento Preventivo Profundo': t(
                'maintenance.types.preventive_deep.name',
            ),
            'Deep Preventive Maintenance': t(
                'maintenance.types.preventive_deep.name',
            ),
            'Mantenimiento Correctivo': t(
                'maintenance.types.categories.corrective',
            ),
            'Corrective Maintenance': t(
                'maintenance.types.categories.corrective',
            ),
            'Mantenimiento Preventivo': t(
                'maintenance.types.categories.preventive',
            ),
            'Preventive Maintenance': t(
                'maintenance.types.categories.preventive',
            ),
            'Mantenimiento Predictivo': t(
                'maintenance.types.categories.predictive',
            ),
            'Predictive Maintenance': t(
                'maintenance.types.categories.predictive',
            ),
            Mantenimiento: t('maintenance.title'),
            Maintenance: t('maintenance.title'),
        };

        // Buscar traducción exacta primero
        if (actionMap[action]) {
            return actionMap[action];
        }

        // Buscar coincidencias parciales para casos como "Mantenimiento Preventivo X"
        const actionLower = action.toLowerCase();
        if (
            actionLower.includes('preventivo') ||
            actionLower.includes('preventive')
        ) {
            if (
                actionLower.includes('rutinario') ||
                actionLower.includes('routine')
            ) {
                return t('maintenance.types.preventive_routine.name');
            }
            if (
                actionLower.includes('profundo') ||
                actionLower.includes('deep')
            ) {
                return t('maintenance.types.preventive_deep.name');
            }
            return t('maintenance.types.categories.preventive');
        }

        if (
            actionLower.includes('correctivo') ||
            actionLower.includes('corrective')
        ) {
            return t('maintenance.types.categories.corrective');
        }

        if (
            actionLower.includes('predictivo') ||
            actionLower.includes('predictive')
        ) {
            return t('maintenance.types.categories.predictive');
        }

        if (
            actionLower.includes('calibraci') ||
            actionLower.includes('calibrat')
        ) {
            return t('maintenance.types.calibration.name');
        }

        if (actionLower.includes('limpieza') || actionLower.includes('clean')) {
            return t('maintenance.types.cleaning.name');
        }

        if (
            actionLower.includes('reparaci') ||
            actionLower.includes('repair')
        ) {
            return t('maintenance.types.corrective_repair.name');
        }

        if (
            actionLower.includes('validaci') ||
            actionLower.includes('validat')
        ) {
            return t('maintenance.types.validation.name');
        }

        if (
            actionLower.includes('inspecci') ||
            actionLower.includes('inspect')
        ) {
            return t('maintenance.types.inspection.name');
        }

        // Si no hay coincidencia, devolver el texto original
        return action;
    }

    // Función para traducir resultados/estados de mantenimiento
    function translateMaintenanceResult(result: string) {
        if (!result) return '';

        const resultMap: { [key: string]: string } = {
            Completado: t('db.status.completed'),
            Completed: t('db.status.completed'),
            Programado: t('db.status.scheduled'),
            Scheduled: t('db.status.scheduled'),
            'En progreso': t('db.status.in_progress'),
            'En Proceso': t('db.status.in_progress'),
            'In Progress': t('db.status.in_progress'),
            Cancelado: t('db.status.cancelled'),
            Cancelled: t('db.status.cancelled'),
            Pospuesto: t('db.status.postponed'),
            Postponed: t('db.status.postponed'),
        };

        return resultMap[result] || result;
    }
    const {
        row,
        onEdit,
        onMaintenance,
        onHistory,
        onGenerateQr,
        qrLoading,
        selectedEquipmentId,
    } = props;
    const [open, setOpen] = React.useState(false);
    const [history, setHistory] = React.useState<MaintenanceHistory[]>([]);
    const [historyLoading, setHistoryLoading] = React.useState(false);
    const [updatedDates, setUpdatedDates] = React.useState({
        last_ext_calibration: row.last_ext_calibration,
        next_ext_calibration: row.next_ext_calibration,
    });

    // Función para calcular próxima fecha basándose en periodicidad
    const calculateNextDate = (
        lastDate: string,
        periodicity: string,
    ): string => {
        if (!lastDate || !periodicity) {
            return '';
        }

        const date = new Date(lastDate);
        if (isNaN(date.getTime())) {
            return '';
        }

        // Extraer número y unidad de la periodicidad con patrones más amplios
        const periodicityLower = periodicity.toLowerCase();

        // Patrones más específicos y amplios
        let periodicityMatch = periodicityLower.match(
            /(\d+)\s*(mes|meses|month|months)/,
        );
        if (!periodicityMatch) {
            periodicityMatch = periodicityLower.match(
                /(\d+)\s*(año|años|year|years)/,
            );
        }
        if (!periodicityMatch) {
            periodicityMatch = periodicityLower.match(
                /(\d+)\s*(día|dias|day|days)/,
            );
        }
        if (!periodicityMatch) {
            periodicityMatch = periodicityLower.match(
                /(\d+)\s*(semana|semanas|week|weeks)/,
            );
        }

        if (!periodicityMatch) {
            return '';
        }

        const amount = parseInt(periodicityMatch[1]);
        const unit = periodicityMatch[2];

        if (unit.includes('mes') || unit.includes('month')) {
            date.setMonth(date.getMonth() + amount);
        } else if (unit.includes('año') || unit.includes('year')) {
            date.setFullYear(date.getFullYear() + amount);
        } else if (
            unit.includes('día') ||
            unit.includes('dia') ||
            unit.includes('day')
        ) {
            date.setDate(date.getDate() + amount);
        } else if (unit.includes('semana') || unit.includes('week')) {
            date.setDate(date.getDate() + amount * 7);
        }

        const result = date.toISOString().split('T')[0];
        return result;
    };

    // Función para actualizar fechas basándose en el historial
    const updateDatesFromHistory = (historyData: MaintenanceHistory[]) => {
        if (!historyData || historyData.length === 0) {
            return;
        }

        // Buscar calibraciones (ampliada la búsqueda en múltiples campos)
        const calibrations = historyData.filter((h) => {
            // Crear un texto combinado de todos los campos relevantes
            const searchText = [
                h.action || '',
                h.result || '',
                h.work_performed || '',
                h.findings || '',
            ]
                .join(' ')
                .toLowerCase();

            // Términos que indican calibración
            const calibrationTerms = [
                'calibraci',
                'calibration',
                'calibración',
                'validaci',
                'validation',
                'validación',
                'ajuste',
                'verificaci',
                'certific',
                'patron',
                'patrón',
                'standard',
                'trazabilidad',
                'metrolog',
            ];

            // Buscar en el texto combinado
            const isCalibration = calibrationTerms.some((term) =>
                searchText.includes(term),
            );

            // También verificar tipos específicos de mantenimiento
            const isCalibrationMaintenance =
                searchText.includes('mantenimiento preventivo profundo') ||
                searchText.includes('calibración') ||
                searchText.includes('validación');

            const result = isCalibration || isCalibrationMaintenance;

            return result;
        });

        if (calibrations.length > 0) {
            // Ordenar por fecha descendente y tomar la más reciente
            const sortedCalibrations = calibrations.sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
            );

            const lastCalibration = sortedCalibrations[0];

            const nextCalibrationDate = calculateNextDate(
                lastCalibration.date,
                row.ext_calibration_periodicity,
            );

            setUpdatedDates({
                last_ext_calibration: lastCalibration.date,
                next_ext_calibration: nextCalibrationDate,
            });
        } else {
            // Como fallback, buscar cualquier mantenimiento preventivo reciente
            const preventiveMaintenances = historyData.filter((h) => {
                const searchText = [h.action || '', h.result || '']
                    .join(' ')
                    .toLowerCase();
                return (
                    searchText.includes('preventivo') ||
                    searchText.includes('mantenimiento')
                );
            });

            if (preventiveMaintenances.length > 0) {
                const sortedPreventive = preventiveMaintenances.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime(),
                );

                const lastMaintenance = sortedPreventive[0];
                const nextCalibrationDate = calculateNextDate(
                    lastMaintenance.date,
                    row.ext_calibration_periodicity,
                );

                if (nextCalibrationDate) {
                    setUpdatedDates({
                        last_ext_calibration: lastMaintenance.date,
                        next_ext_calibration: nextCalibrationDate,
                    });
                } else {
                    // Mantener fechas originales si no se puede calcular
                    setUpdatedDates({
                        last_ext_calibration: row.last_ext_calibration,
                        next_ext_calibration: row.next_ext_calibration,
                    });
                }
            } else {
                // Mantener fechas originales
                setUpdatedDates({
                    last_ext_calibration: row.last_ext_calibration,
                    next_ext_calibration: row.next_ext_calibration,
                });
            }
        }
    };

    // Cargar historial cuando se abre el desplegable
    React.useEffect(() => {
        if (open && history.length === 0) {
            setHistoryLoading(true);
            fetch(`/api/equipment/${row.id}/maintenance-history`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! status: ${response.status}`,
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    const historyArray = Array.isArray(data) ? data : [];
                    setHistory(historyArray);
                    // Actualizar fechas basándose en el historial
                    updateDatesFromHistory(historyArray);
                })
                .catch((error) => {
                    setHistory([]); // Array vacío en caso de error
                })
                .finally(() => {
                    setHistoryLoading(false);
                });
        }
    }, [open, row.id]);

    // Cargar automáticamente las fechas al montar el componente (sin abrir el desplegable)
    React.useEffect(() => {
        // Intentar obtener las fechas actualizadas inmediatamente
        fetch(`/api/equipment/${row.id}/maintenance-history`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('No se pudo cargar el historial');
            })
            .then((data) => {
                const historyArray = Array.isArray(data) ? data : [];
                if (historyArray.length > 0) {
                    updateDatesFromHistory(historyArray);
                }
            })
            .catch((error) => {
                // No es crítico, las fechas se cargarán cuando se abra el desplegable
            });
    }, [row.id]);

    return (
        <>
            <TableRow
                sx={{
                    '& > *': { borderBottom: 'unset' },
                    '&:hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.05)',
                        transform: 'scale(1.001)',
                        transition: 'all 0.2s ease-in-out',
                    },
                    ...(row.active
                        ? {}
                        : {
                              opacity: 0.6,
                              backgroundColor: '#f5f5f5',
                              '& .MuiTableCell-root': {
                                  color: '#666',
                              },
                          }),
                }}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                    >
                        <Typography variant="body2">
                            {row.instrument}
                        </Typography>
                        {(row.pending_maintenance_count ?? 0) > 0 && (
                            <Tooltip
                                title={`${row.pending_maintenance_count} tarea(s) pendiente(s)`}
                                arrow
                            >
                                <Chip
                                    size="small"
                                    label={row.pending_maintenance_count}
                                    color="warning"
                                    variant="filled"
                                    sx={{
                                        minWidth: 24,
                                        height: 20,
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </Tooltip>
                        )}
                    </Box>
                </TableCell>
                <TableCell align="center">{row.int_code}</TableCell>
                <TableCell align="center">{row.brand}</TableCell>
                <TableCell align="center">{row.model}</TableCell>
                <TableCell align="center">{row.serial_number}</TableCell>
                <TableCell align="center">{row.system_number}</TableCell>
                <TableCell align="center">
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            startIcon={<EditIcon />}
                            sx={{
                                borderRadius: 2,
                                fontWeight: 'bold',
                                textTransform: 'none',
                            }}
                            onClick={() => onEdit(row)}
                        >
                            {t('common.edit')}
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                            startIcon={<BuildIcon />}
                            sx={{
                                borderRadius: 2,
                                fontWeight: 'bold',
                                textTransform: 'none',
                                borderColor: '#9C27B0',
                                color: '#9C27B0',
                                '&:hover': {
                                    borderColor: '#7B1FA2',
                                    backgroundColor: '#9C27B015',
                                },
                            }}
                            onClick={() => onMaintenance(row)}
                        >
                            {t('maintenance.title')}
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            color="info"
                            startIcon={<HistoryIcon />}
                            sx={{
                                borderRadius: 2,
                                fontWeight: 'bold',
                                textTransform: 'none',
                                borderColor: '#2196F3',
                                color: '#2196F3',
                                '&:hover': {
                                    borderColor: '#1976D2',
                                    backgroundColor: '#2196F315',
                                },
                            }}
                            onClick={() => onHistory(row)}
                        >
                            {t('maintenance.history')}
                        </Button>
                        <Tooltip
                            title={t('common.qr_management')}
                            arrow
                            placement="top"
                        >
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={
                                    qrLoading &&
                                    selectedEquipmentId === row.id ? null : (
                                        <QrCodeIcon />
                                    )
                                }
                                disabled={
                                    qrLoading && selectedEquipmentId === row.id
                                }
                                sx={{
                                    borderRadius: 2,
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    borderColor: '#FF5722',
                                    color: '#FF5722',
                                    position: 'relative',
                                    '&:hover': {
                                        borderColor: '#E64A19',
                                        backgroundColor: '#FF572215',
                                        transform: 'translateY(-1px)',
                                    },
                                    '&:disabled': {
                                        borderColor: '#FF572250',
                                        color: '#FF572250',
                                    },
                                    '&::after': {
                                        content: '"NEW"',
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        background:
                                            'linear-gradient(45deg, #FF5722, #E64A19)',
                                        color: 'white',
                                        fontSize: '8px',
                                        fontWeight: 'bold',
                                        padding: '2px 4px',
                                        borderRadius: '6px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                    },
                                    transition: 'all 0.2s ease',
                                }}
                                onClick={() => onGenerateQr(row)}
                            >
                                {qrLoading && selectedEquipmentId === row.id
                                    ? t('common.loading')
                                    : 'QR'}
                            </Button>
                        </Tooltip>
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={8}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box
                            sx={{
                                margin: 0,
                                backgroundColor: 'transparent',
                                p: 0,
                                borderRadius: 0,
                                width: '100%',
                                minWidth: 600,
                                maxWidth: '100%',
                            }}
                        >
                            <Paper
                                elevation={6}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    mb: 4,
                                    mt: 3,
                                    background:
                                        'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                                    border: '1px solid rgba(59, 130, 246, 0.1)',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                    sx={{
                                        fontWeight: 'bold',
                                        background:
                                            'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {t('equipment.details')}
                                </Typography>
                                <Table
                                    aria-label="detalles"
                                    sx={{ width: '100%' }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem',
                                                }}
                                            >
                                                {t(
                                                    'equipment.last_external_calibration',
                                                )}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem',
                                                }}
                                            >
                                                {t(
                                                    'equipment.next_external_calibration',
                                                )}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem',
                                                }}
                                            >
                                                {t(
                                                    'equipment.ext_calibration_periodicity',
                                                )}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem',
                                                }}
                                            >
                                                {t(
                                                    'equipment.internal_check_periodicity',
                                                )}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem',
                                                }}
                                            >
                                                {t('equipment.status')}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center">
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    {formatColombiaDate(
                                                        updatedDates.last_ext_calibration,
                                                    )}
                                                    {updatedDates.last_ext_calibration !==
                                                        row.last_ext_calibration && (
                                                        <Tooltip
                                                            title={t(
                                                                'common.automatic_date_from_history',
                                                            )}
                                                            arrow
                                                        >
                                                            <Chip
                                                                size="small"
                                                                label="AUTO"
                                                                color="success"
                                                                variant="filled"
                                                                sx={{
                                                                    height: 20,
                                                                    fontSize:
                                                                        '0.7rem',
                                                                    fontWeight:
                                                                        'bold',
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    {formatColombiaDate(
                                                        updatedDates.next_ext_calibration,
                                                    )}
                                                    {updatedDates.next_ext_calibration !==
                                                        row.next_ext_calibration && (
                                                        <Tooltip
                                                            title={t(
                                                                'common.calculated_date_from_calibration',
                                                            )}
                                                            arrow
                                                        >
                                                            <Chip
                                                                size="small"
                                                                label="CALC"
                                                                color="info"
                                                                variant="filled"
                                                                sx={{
                                                                    height: 20,
                                                                    fontSize:
                                                                        '0.7rem',
                                                                    fontWeight:
                                                                        'bold',
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                {
                                                    row.ext_calibration_periodicity
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.internal_check_periodicity}
                                            </TableCell>
                                            <TableCell align="center">
                                                <span
                                                    style={{
                                                        padding: '4px 8px',
                                                        borderRadius: '12px',
                                                        backgroundColor:
                                                            row.active
                                                                ? '#4caf50'
                                                                : '#f44336',
                                                        color: 'white',
                                                        fontSize: '0.875rem',
                                                    }}
                                                >
                                                    {row.active
                                                        ? t('equipment.active')
                                                        : t(
                                                              'equipment.inactive',
                                                          )}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                            <Paper
                                elevation={4}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    mb: 2,
                                    background:
                                        'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                                    border: '1px solid rgba(59, 130, 246, 0.08)',
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        mb: 1,
                                        fontWeight: 'bold',
                                        background:
                                            'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {t('equipment.history')}
                                </Typography>
                                {historyLoading ? (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            py: 4,
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {t('common.history.loading')}
                                        </Typography>
                                    </Box>
                                ) : history.length === 0 ? (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            py: 4,
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {t('common.history.no_data')}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Table size="small" aria-label="historial">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        fontSize: '0.95rem',
                                                    }}
                                                >
                                                    {t('common.history.date')}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        fontSize: '0.95rem',
                                                    }}
                                                >
                                                    {t('common.actions')}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        fontSize: '0.95rem',
                                                    }}
                                                >
                                                    {t('common.history.result')}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        fontSize: '0.95rem',
                                                    }}
                                                >
                                                    {t('common.history.user')}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {history.map((h, idx) => (
                                                <TableRow key={idx}>
                                                    <TableCell>
                                                        {formatColombiaDate(
                                                            h.date,
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {translateMaintenanceAction(
                                                            h.action,
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {translateMaintenanceResult(
                                                            h.result,
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {h.users}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </Paper>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

type CollapsibleTableProps = {
    equipments: {
        data: Equipment[];
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
        from: number | null;
        to: number | null;
    };
};
const EquipmentPage: React.FC<CollapsibleTableProps> = ({ equipments }) => {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('equipment.title'),
            href: '/equipment',
        },
    ];

    const [openModal, setOpenModal] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [maintenanceTypesModalOpen, setMaintenanceTypesModalOpen] =
        React.useState(false);
    const [maintenanceFormModalOpen, setMaintenanceFormModalOpen] =
        React.useState(false);
    const [selectedEquipment, setSelectedEquipment] = React.useState<any>(null);
    const [selectedMaintenanceType, setSelectedMaintenanceType] =
        React.useState<any>(null);
    const [qrModalOpen, setQrModalOpen] = React.useState(false);
    const [qrImageUrl, setQrImageUrl] = React.useState<string>('');
    const [qrLoading, setQrLoading] = React.useState(false);
    const [page, setPage] = React.useState(equipments.current_page || 1);
    const [rowsPerPage, setRowsPerPage] = React.useState(
        equipments.per_page || 5,
    );
    // Estados para el modal de exportación a Excel
    const [excelModalOpen, setExcelModalOpen] = React.useState(false);
    const [excelLoading, setExcelLoading] = React.useState(false);
    // Estados para el modal de importación a Excel
    const [importModalOpen, setImportModalOpen] = React.useState(false);

    React.useEffect(() => {
        setPage(equipments.current_page);
        setRowsPerPage(equipments.per_page);
    }, [equipments.current_page, equipments.per_page]);

    const totalRows = equipments.total;
    const totalPages = equipments.last_page;
    const paginatedRows = equipments.data;

    const handleCreate = (data: any) => {
        router.post('/equipment', data, {
            onSuccess: () => {
                setOpenModal(false);
                // Recargar los datos de equipos para mostrar el nuevo equipo
                router.reload({ only: ['equipments'] });
            },
            onError: (errors) => {
                console.error('Error al crear equipo:', errors);
                // El modal permanece abierto para mostrar errores si los hay
            },
        });
    };

    const handleEdit = (equipment: any) => {
        setSelectedEquipment(equipment);
        setEditModalOpen(true);
    };

    const handleMaintenance = (equipment: any) => {
        setSelectedEquipment(equipment);
        setMaintenanceTypesModalOpen(true);
    };

    const handleHistory = (equipment: any) => {
        router.get(`/equipment/${equipment.id}/history`);
    };

    const handleGenerateQr = (equipment: any) => {
        setSelectedEquipment(equipment);
        setQrLoading(true);

        // Generar/obtener la imagen QR
        const qrImageUrl = `/equipment/${equipment.id}/qr`;

        // Simular un pequeño delay para mostrar loading
        setTimeout(() => {
            setQrImageUrl(qrImageUrl);
            setQrLoading(false);
            setQrModalOpen(true);
        }, 500);
    };

    const handleOpenTaskManagement = (equipment: any) => {
        // Cerrar el modal QR
        setQrModalOpen(false);

        // Abrir la interfaz de gestión de tareas
        fetch(`/api/equipment/${equipment.id}/qr-token`)
            .then((response) => response.json())
            .then((data) => {
                if (data.qr_token) {
                    window.open(`/qr-maintenance/${data.qr_token}`, '_blank');
                } else {
                    window.open(
                        `/qr-maintenance/equipment-${equipment.id}`,
                        '_blank',
                    );
                }
            })
            .catch((error) => {
                console.error('Error obteniendo token:', error);
                window.open(
                    `/qr-maintenance/equipment-${equipment.id}`,
                    '_blank',
                );
            });
    };

    // Nueva función para abrir la interfaz de gestión de tareas
    const openTaskManagementInterface = (equipment: any) => {
        // Primero obtener el token QR del equipo
        fetch(`/api/equipment/${equipment.id}/qr-token`)
            .then((response) => response.json())
            .then((data) => {
                if (data.qr_token) {
                    // Abrir la interfaz de gestión con el token correcto
                    window.open(`/qr-maintenance/${data.qr_token}`, '_blank');
                } else {
                    // Fallback: usar la URL básica
                    window.open(`/qr-maintenance/loading`, '_blank');
                }
            })
            .catch((error) => {
                console.error('Error obteniendo token:', error);
                // Fallback: abrir con parámetros de equipo
                window.open(
                    `/qr-maintenance/equipment-${equipment.id}`,
                    '_blank',
                );
            });
    };

    // Función para manejar la exportación a Excel
    const handleExcelExport = async (startDate: string, endDate: string) => {
        setExcelLoading(true);

        try {
            console.log('Iniciando exportación con fechas:', {
                startDate,
                endDate,
            });

            const response = await axios.post(
                '/equipment/export-excel',
                {
                    start_date: startDate,
                    end_date: endDate,
                },
                {
                    responseType: 'blob', // Importante para archivos
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    },
                },
            );

            // Crear blob y descargar archivo
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `historial_equipos_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            console.log('Exportación completada exitosamente');

            // Cerrar modal
            setExcelModalOpen(false);
        } catch (error: any) {
            console.error('Error detallado al exportar:', error);

            let errorMessage =
                'Error al generar el archivo Excel. Por favor, inténtalo de nuevo.';

            if (error.response) {
                console.error(
                    'Respuesta del servidor:',
                    error.response.status,
                    error.response.data,
                );
                if (error.response.status === 422) {
                    errorMessage =
                        'Error de validación: Verifica que las fechas sean válidas.';
                } else if (error.response.status === 500) {
                    errorMessage =
                        'Error interno del servidor. Contacta al administrador.';
                }
            } else if (error.request) {
                console.error(
                    'No se recibió respuesta del servidor:',
                    error.request,
                );
                errorMessage =
                    'No se pudo conectar con el servidor. Verifica tu conexión.';
            }

            alert(errorMessage);
        } finally {
            setExcelLoading(false);
        }
    };

    const handleSelectMaintenanceType = (maintenanceType: any) => {
        setSelectedMaintenanceType(maintenanceType);
        setMaintenanceTypesModalOpen(false);
        setMaintenanceFormModalOpen(true);
    };

    // Función para manejar la importación completada
    const handleImportComplete = () => {
        // Recargar la página para mostrar los nuevos equipos
        router.reload({ only: ['equipments'] });
    };

    const handleUpdate = (data: any) => {
        if (!selectedEquipment) return;
        router.put(`/equipment/${selectedEquipment.id}`, data, {
            onSuccess: () => {
                setEditModalOpen(false);
                setSelectedEquipment(null);
                // Recargar los datos de equipos para mostrar los cambios
                router.reload({ only: ['equipments'] });
            },
            onError: (errors) => {
                console.error('Error al actualizar equipo:', errors);
                // El modal permanece abierto para mostrar errores si los hay
            },
        });
    };

    const handleChangePage = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        router.get(
            '/equipment',
            { page: newPage, per_page: rowsPerPage },
            {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            },
        );
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<{ value: unknown }>,
    ) => {
        const newRowsPerPage = Number(event.target.value);
        setRowsPerPage(newRowsPerPage);
        router.get(
            '/equipment',
            { page: 1, per_page: newRowsPerPage },
            {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('equipment.title')} />
            <div className="flex w-full flex-col items-center px-2 py-4 md:px-8 md:py-8">
                <div className="mb-6 flex w-full items-center justify-between">
                    <Box display="flex" alignItems="center" gap={2}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: '12px',
                                background:
                                    'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                            }}
                        >
                            <PrecisionManufacturingIcon
                                sx={{
                                    color: 'white',
                                    fontSize: 28,
                                }}
                            />
                        </Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                background:
                                    'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            {t('equipment.title')}
                        </Typography>
                    </Box>
                    <div className="flex gap-3">
                        {/* Botón de Exportar a Excel */}
                        <Button
                            variant="contained"
                            startIcon={
                                <Box
                                    component="span"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        '& svg': { width: 20, height: 20 },
                                    }}
                                >
                                    <FileSpreadsheet />
                                </Box>
                            }
                            onClick={() => setExcelModalOpen(true)}
                            sx={{
                                borderRadius: 3,
                                fontWeight: 'bold',
                                textTransform: 'none',
                                background:
                                    'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                                boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
                                px: 2.5,
                                py: 1,
                                height: 40,
                                color: 'white',
                                '&:hover': {
                                    background:
                                        'linear-gradient(135deg, #15803d 0%, #166534 100%)',
                                    boxShadow:
                                        '0 6px 25px rgba(34, 197, 94, 0.4)',
                                    transform: 'translateY(-1px)',
                                },
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            {t('common.export')} Excel
                        </Button>

                        {/* Botón de Importar Excel */}
                        <Button
                            variant="contained"
                            startIcon={
                                <Box
                                    component="span"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        '& svg': { width: 20, height: 20 },
                                    }}
                                >
                                    <Upload />
                                </Box>
                            }
                            onClick={() => setImportModalOpen(true)}
                            sx={{
                                borderRadius: 3,
                                fontWeight: 'bold',
                                textTransform: 'none',
                                background:
                                    'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
                                px: 2.5,
                                py: 1,
                                height: 40,
                                color: 'white',
                                '&:hover': {
                                    background:
                                        'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                                    boxShadow:
                                        '0 6px 25px rgba(245, 158, 11, 0.4)',
                                    transform: 'translateY(-1px)',
                                },
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            {t('common.import')} Excel
                        </Button>

                        {/* Botón de Crear Equipo */}
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenModal(true)}
                            sx={{
                                borderRadius: 3,
                                fontWeight: 'bold',
                                textTransform: 'none',
                                background:
                                    'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                                px: 2.5,
                                py: 1,
                                height: 40,
                                '&:hover': {
                                    background:
                                        'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                                    boxShadow:
                                        '0 6px 25px rgba(59, 130, 246, 0.4)',
                                    transform: 'translateY(-1px)',
                                },
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            {t('equipment.add')}
                        </Button>
                    </div>
                </div>
                <Box sx={{ width: '100%', maxWidth: '100%' }}>
                    <Paper
                        elevation={6}
                        sx={{
                            borderRadius: 4,
                            background:
                                'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            px: 2,
                            py: 1,
                            mb: 2,
                            border: '1px solid rgba(59, 130, 246, 0.1)',
                        }}
                    >
                        <TableContainer className="w-full max-w-full overflow-x-auto">
                            <Table
                                aria-label="collapsible table"
                                className="min-w-[50px]"
                            >
                                <TableHead
                                    sx={{
                                        backgroundColor: '#f5f5f5',
                                        '& .MuiTableCell-root': {
                                            '&:first-of-type': {
                                                borderTopLeftRadius: '16px',
                                            },
                                            '&:last-of-type': {
                                                borderTopRightRadius: '16px',
                                            },
                                        },
                                    }}
                                >
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                width: '60px',
                                                color: '#333',
                                            }}
                                        />
                                        <TableCell
                                            align="center"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                color: '#333',
                                            }}
                                        >
                                            {t('equipment.name')}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                color: '#333',
                                            }}
                                        >
                                            {t('equipment.code')}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                color: '#333',
                                            }}
                                        >
                                            {t('equipment.brand')}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                color: '#333',
                                            }}
                                        >
                                            {t('equipment.model')}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                color: '#333',
                                            }}
                                        >
                                            {t('equipment.serial')}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                color: '#333',
                                            }}
                                        >
                                            {t('equipment.system_number')}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                color: '#333',
                                            }}
                                        >
                                            {t('common.actions')}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedRows.map((row) => (
                                        <Row
                                            key={row.id}
                                            row={row}
                                            onEdit={handleEdit}
                                            onMaintenance={handleMaintenance}
                                            onHistory={handleHistory}
                                            onGenerateQr={handleGenerateQr}
                                            qrLoading={qrLoading}
                                            selectedEquipmentId={
                                                selectedEquipment?.id
                                            }
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
                {/* Paginación estilo MUI DataGrid */}
                {totalRows > rowsPerPage && (
                    <div
                        className="mt-6 flex w-full items-center justify-between px-2"
                        style={{ minHeight: 40 }}
                    >
                        <div className="text-sm text-gray-600">
                            {t('common.pagination.showing')}{' '}
                            {equipments.from ?? 0} {t('common.pagination.to')}{' '}
                            {equipments.to ?? 0} {t('common.pagination.of')}{' '}
                            {totalRows} {t('common.pagination.entries')}
                        </div>
                        <div className="flex items-center gap-2">
                            <ShadcnButton
                                size="sm"
                                variant="outline"
                                onClick={() => handleChangePage(1)}
                                disabled={page === 1}
                                className="rounded-lg border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
                            >
                                {'<<'}
                            </ShadcnButton>
                            <ShadcnButton
                                size="sm"
                                variant="outline"
                                onClick={() => handleChangePage(page - 1)}
                                disabled={page === 1}
                                className="rounded-lg border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
                            >
                                {'<'}
                            </ShadcnButton>
                            <span className="mx-2 min-w-[24px] text-center text-sm font-medium">
                                {page}
                            </span>
                            <ShadcnButton
                                size="sm"
                                variant="outline"
                                onClick={() => handleChangePage(page + 1)}
                                disabled={
                                    page === totalPages || totalPages === 0
                                }
                                className="rounded-lg border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
                            >
                                {'>'}
                            </ShadcnButton>
                            <ShadcnButton
                                size="sm"
                                variant="outline"
                                onClick={() => handleChangePage(totalPages)}
                                disabled={
                                    page === totalPages || totalPages === 0
                                }
                                className="rounded-lg border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
                            >
                                {'>>'}
                            </ShadcnButton>
                            <select
                                value={rowsPerPage}
                                onChange={handleChangeRowsPerPage}
                                className="ml-2 rounded-lg border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            >
                                {[5, 10, 25, 50].map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
                <CreateEquipmentModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    onCreate={handleCreate}
                />
                <EditEquipmentModal
                    open={editModalOpen}
                    onClose={() => {
                        setEditModalOpen(false);
                        setSelectedEquipment(null);
                    }}
                    onUpdate={handleUpdate}
                    equipment={selectedEquipment}
                />
                <MaintenanceTypesModal
                    open={maintenanceTypesModalOpen}
                    onClose={() => {
                        setMaintenanceTypesModalOpen(false);
                        // NO resetear selectedEquipment aquí - se hará cuando se cierre el formulario
                    }}
                    onSelectMaintenanceType={handleSelectMaintenanceType}
                    equipment={
                        selectedEquipment || {
                            id: 0,
                            instrument: '',
                            model: '',
                        }
                    }
                />
                <MaintenanceFormModal
                    open={maintenanceFormModalOpen}
                    onClose={() => {
                        setMaintenanceFormModalOpen(false);
                        setSelectedEquipment(null);
                        setSelectedMaintenanceType(null);
                    }}
                    equipment={
                        selectedEquipment || {
                            id: 0,
                            instrument: '',
                            model: '',
                            brand: '',
                            serial_number: '',
                        }
                    }
                    maintenanceType={
                        selectedMaintenanceType || {
                            id: '',
                            name: '',
                            description: '',
                            color: '#666',
                            category: '',
                        }
                    }
                />

                {/* QR Modal */}
                {selectedEquipment && (
                    <QrModal
                        open={qrModalOpen}
                        onClose={() => {
                            setQrModalOpen(false);
                            setSelectedEquipment(null);
                            setQrImageUrl('');
                        }}
                        equipment={selectedEquipment}
                        qrImageUrl={qrImageUrl}
                        onOpenTaskManagement={handleOpenTaskManagement}
                    />
                )}

                {/* Excel Export Modal */}
                <ExcelExportModal
                    open={excelModalOpen}
                    onClose={() => setExcelModalOpen(false)}
                    onExport={handleExcelExport}
                    loading={excelLoading}
                />

                {/* Excel Import Modal */}
                <ExcelImportModal
                    open={importModalOpen}
                    onOpenChange={setImportModalOpen}
                    onImportComplete={handleImportComplete}
                />
            </div>
        </AppLayout>
    );
};

export default EquipmentPage;
