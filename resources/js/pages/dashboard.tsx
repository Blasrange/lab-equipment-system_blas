import { useTranslation } from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ErrorIcon from '@mui/icons-material/Error';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

type DashboardStats = {
    equipment: {
        total: number;
        active: number;
        inactive: number;
    };
    maintenance: {
        total: number;
        completed: number;
        pending: number;
        overdue: number;
    };
    category: {
        preventive: number;
        corrective: number;
        predictive: number;
    };
    priority: {
        high: number;
        critical: number;
    };
};

type MonthlyData = {
    month: string;
    monthName: string;
    year: string;
    scheduled: number;
    completed: number;
    completedOnTime: number;
    efficiency: number;
    onTimeEfficiency: number;
};

type CategoryMonthlyData = {
    preventive: MonthlyData[];
    corrective: MonthlyData[];
    predictive: MonthlyData[];
};

type MaintenanceRecord = {
    id: number;
    scheduled_date: string;
    performed_date?: string;
    maintenance_type_name: string;
    maintenance_category: string;
    status: string;
    priority: string;
    equipment: {
        id: number;
        instrument: string;
        int_code: string;
    };
};

type Props = {
    stats: DashboardStats;
    recentMaintenances: MaintenanceRecord[];
    upcomingMaintenances: MaintenanceRecord[];
    inProgressMaintenances: MaintenanceRecord[];
    completedMaintenances: MaintenanceRecord[];
    monthlyData: MonthlyData[];
    categoryMonthlyData: CategoryMonthlyData;
};

export default function Dashboard({
    stats,
    recentMaintenances,
    upcomingMaintenances,
    inProgressMaintenances,
    completedMaintenances,
    monthlyData,
    categoryMonthlyData,
}: Props) {
    const { t, language } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard.title'),
            href: dashboard.url(),
        },
    ];
    // Estado para el modal de acciones
    const [openModal, setOpenModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return t('dashboard.no_date');

        try {
            const [year, month, day] = dateString.split('-');
            const date = new Date(
                parseInt(year),
                parseInt(month) - 1,
                parseInt(day),
            );

            if (isNaN(date.getTime())) return t('dashboard.invalid_date');

            // Usar el idioma correcto para el formateo de fechas
            const locale = language === 'es' ? 'es-ES' : 'en-US';

            return date.toLocaleDateString(locale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return t('dashboard.invalid_date');
        }
    };

    const shortenMaintenanceType = (type: string) => {
        if (!type) return t('dashboard.unspecified');

        // Mapeo más dinámico de tipos de mantenimiento
        const typeMap: { [key: string]: string } = {
            'Mantenimiento Preventivo Rutinario': t(
                'maintenance.types.categories.preventive',
            ),
            'Mantenimiento Correctivo': t(
                'maintenance.types.categories.corrective',
            ),
            'Mantenimiento Predictivo': t(
                'maintenance.types.categories.predictive',
            ),
            Calibración: t('maintenance.types.calibration.name'),
            'Calibración Preventiva': t('maintenance.types.calibration.name'),
            Inspección: t('maintenance.types.inspection.name'),
            Limpieza: t('maintenance.types.cleaning.name'),
            'Limpieza Especializada': t('maintenance.types.cleaning.name'),
            Reparación: t('maintenance.types.corrective_repair.name'),
            Validación: t('maintenance.types.validation.name'),
            // Soporte para tipos en inglés también
            'Routine Preventive Maintenance': t(
                'maintenance.types.categories.preventive',
            ),
            'Corrective Maintenance': t(
                'maintenance.types.categories.corrective',
            ),
            'Predictive Maintenance': t(
                'maintenance.types.categories.predictive',
            ),
            Calibration: t('maintenance.types.calibration.name'),
            Cleaning: t('maintenance.types.cleaning.name'),
            Inspection: t('maintenance.types.inspection.name'),
            Repair: t('maintenance.types.corrective_repair.name'),
            Validation: t('maintenance.types.validation.name'),
        };

        // Buscar traducción exacta primero
        if (typeMap[type]) {
            return typeMap[type];
        }

        // Mapeo adicional para tipos parciales que puedan no coincidir exactamente
        const partialMatches: { [key: string]: string } = {
            'Mantenimiento Preventivo': t(
                'maintenance.types.categories.preventive',
            ),
            Preventivo: t('maintenance.types.categories.preventive'),
            Correctivo: t('maintenance.types.categories.corrective'),
            Predictivo: t('maintenance.types.categories.predictive'),
        };

        // Buscar coincidencias parciales
        for (const [partial, translation] of Object.entries(partialMatches)) {
            if (type.includes(partial)) {
                return translation;
            }
        }

        // Si es muy largo, usar estrategia más inteligente de truncado
        if (type.length > 20) {
            // Mantener palabras completas cuando sea posible
            const words = type.split(' ');
            if (words.length > 1) {
                // Si tiene múltiples palabras, tomar las primeras que quepan
                let result = words[0];
                for (let i = 1; i < words.length; i++) {
                    if ((result + ' ' + words[i]).length <= 18) {
                        result += ' ' + words[i];
                    } else {
                        break;
                    }
                }
                return result.length < type.length ? result + '...' : result;
            }
            // Si es una sola palabra muy larga, truncar
            return type.substring(0, 17) + '...';
        }

        return type;
    };

    // Funciones de traducción para valores de la base de datos
    const translateStatus = (status: string) => {
        return t(`db.status.${status}`) || status;
    };

    const translatePriority = (priority: string) => {
        return t(`db.priority.${priority}`) || priority;
    };

    const translateCategory = (category: string) => {
        return t(`db.category.${category}`) || category;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'success';
            case 'in_progress':
                return 'warning';
            case 'scheduled':
                return 'info';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical':
                return 'error';
            case 'high':
                return 'warning';
            case 'medium':
                return 'info';
            case 'low':
                return 'success';
            default:
                return 'default';
        }
    };

    const isMaintenanceOverdue = (scheduledDate: string, status: string) => {
        if (status === 'completed' || status === 'cancelled') return false;

        try {
            const [year, month, day] = scheduledDate.split('-');
            const scheduled = new Date(
                parseInt(year),
                parseInt(month) - 1,
                parseInt(day),
            );
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return scheduled < today;
        } catch (error) {
            return false;
        }
    };

    const wasCompletedLate = (
        scheduledDate: string,
        performedDate?: string,
        status?: string,
    ) => {
        if (status !== 'completed' || !performedDate) return false;

        try {
            const [schYear, schMonth, schDay] = scheduledDate.split('-');
            const scheduled = new Date(
                parseInt(schYear),
                parseInt(schMonth) - 1,
                parseInt(schDay),
            );

            const [perfYear, perfMonth, perfDay] = performedDate.split('-');
            const performed = new Date(
                parseInt(perfYear),
                parseInt(perfMonth) - 1,
                parseInt(perfDay),
            );

            return performed > scheduled;
        } catch (error) {
            return false;
        }
    };

    // Obtener mantenimientos vencidos
    const overdueMaintenances = recentMaintenances.filter(
        (maintenance) =>
            isMaintenanceOverdue(
                maintenance.scheduled_date,
                maintenance.status,
            ) &&
            maintenance.status !== 'completed' &&
            maintenance.status !== 'cancelled',
    );

    // Obtener mantenimientos cancelados
    const cancelledMaintenances = recentMaintenances.filter(
        (maintenance) => maintenance.status === 'cancelled',
    );

    // Obtener mantenimientos críticos/altos
    const criticalMaintenances = recentMaintenances.filter(
        (maintenance) =>
            (maintenance.priority === 'critical' ||
                maintenance.priority === 'high') &&
            maintenance.status !== 'completed' &&
            maintenance.status !== 'cancelled',
    );

    // Estilos consistentes para las tablas
    const tableContainerStyle = {
        maxHeight: 400,
        minHeight: 400, // Altura mínima consistente
        '& .MuiTable-root': {
            minWidth: 500, // Ancho mínimo consistente
        },
    };

    const tableHeaderStyle = (color: string) => ({
        fontWeight: 600,
        backgroundColor: color,
        color: 'white',
        padding: '8px 12px',
        fontSize: '0.875rem',
    });

    const tableCellStyle = {
        padding: '8px 12px',
        fontSize: '0.875rem',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.title')} />
            <div className="flex w-full flex-col items-center px-2 py-4 md:px-8 md:py-8">
                {/* Título del Dashboard */}
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
                            <DashboardIcon
                                sx={{ color: 'white', fontSize: 28 }}
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
                            {t('dashboard.title')}
                        </Typography>
                    </Box>
                </div>

                {/* Estadísticas de Mantenimientos por Estado */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        width: '100%',
                        color: 'text.primary',
                    }}
                >
                    {t('dashboard.maintenance.state')}
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(5, 1fr)',
                        },
                        gap: 2,
                        mb: 4,
                        width: '100%',
                    }}
                >
                    {/* Tarjetas de estadísticas... */}
                    <Card
                        elevation={3}
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow:
                                    '0 8px 25px rgba(33, 150, 243, 0.15)',
                            },
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={1}
                                mb={1}
                            >
                                <ScheduleIcon color="info" />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {t('dashboard.stats.maintenance.scheduled')}
                                </Typography>
                            </Box>
                            <Typography
                                variant="h5"
                                color="info.main"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {upcomingMaintenances.length}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        elevation={3}
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(255, 152, 0, 0.15)',
                            },
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={1}
                                mb={1}
                            >
                                <BuildIcon color="warning" />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {t(
                                        'dashboard.stats.maintenance.in_progress',
                                    )}
                                </Typography>
                            </Box>
                            <Typography
                                variant="h5"
                                color="warning.main"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {inProgressMaintenances.length}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        elevation={3}
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)',
                            },
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={1}
                                mb={1}
                            >
                                <AssignmentIcon color="success" />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {t('dashboard.stats.maintenance.completed')}
                                </Typography>
                            </Box>
                            <Typography
                                variant="h5"
                                color="success.main"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {stats.maintenance.completed}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        elevation={3}
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(244, 67, 54, 0.15)',
                            },
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={1}
                                mb={1}
                            >
                                <ErrorIcon color="error" />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {t('dashboard.stats.maintenance.cancelled')}
                                </Typography>
                            </Box>
                            <Typography
                                variant="h5"
                                color="error.main"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {
                                    recentMaintenances.filter(
                                        (m) => m.status === 'cancelled',
                                    ).length
                                }
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        elevation={3}
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(244, 67, 54, 0.15)',
                            },
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={1}
                                mb={1}
                            >
                                <WarningIcon color="error" />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {t('dashboard.stats.maintenance.overdue')}
                                </Typography>
                            </Box>
                            <Typography
                                variant="h5"
                                color="error.main"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {stats.maintenance.overdue}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Estadísticas Generales */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        width: '100%',
                        color: 'text.primary',
                    }}
                >
                    {t('dashboard.general.summary')}
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: 2,
                        mb: 4,
                        width: '100%',
                    }}
                >
                    {/* Tarjetas de estadísticas generales... */}
                    <Card
                        elevation={3}
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow:
                                    '0 8px 25px rgba(59, 130, 246, 0.15)',
                            },
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={1}
                                mb={1}
                            >
                                <PrecisionManufacturingIcon color="primary" />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {t('dashboard.stats.equipment.total')}
                                </Typography>
                            </Box>
                            <Typography
                                variant="h5"
                                color="primary.main"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {stats.equipment.total}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        elevation={3}
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)',
                            },
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={1}
                                mb={1}
                            >
                                <TrendingUpIcon color="success" />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {t('dashboard.stats.equipment.active')}
                                </Typography>
                            </Box>
                            <Typography
                                variant="h5"
                                color="success.main"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {stats.equipment.active}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        elevation={3}
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(244, 67, 54, 0.15)',
                            },
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={1}
                                mb={1}
                            >
                                <ErrorIcon color="error" />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {t('dashboard.stats.equipment.inactive')}
                                </Typography>
                            </Box>
                            <Typography
                                variant="h5"
                                color="error.main"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {stats.equipment.inactive}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        elevation={3}
                        sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow:
                                    '0 8px 25px rgba(59, 130, 246, 0.15)',
                            },
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={1}
                                mb={1}
                            >
                                <AssignmentIcon color="primary" />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {t('dashboard.stats.maintenance.total')}
                                </Typography>
                            </Box>
                            <Typography
                                variant="h5"
                                color="primary.main"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {stats.maintenance.total}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Sección de Gráficos y Tablas */}
                <Box sx={{ width: '100%', mb: 4 }}>
                    {/* Título de la sección */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            mb: 3,
                            textAlign: 'center',
                            color: 'text.primary',
                        }}
                    >
                        📊 {t('dashboard.charts.title')}
                    </Typography>

                    {/* Primera fila de gráficos */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                md: 'repeat(3, 1fr)',
                            },
                            gap: 3,
                            mb: 4,
                        }}
                    >
                        {/* MANTENIMIENTO PREVENTIVO */}
                        <Card elevation={3} sx={{ borderRadius: 3, p: 2 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    mb: 2,
                                    backgroundColor: '#2e7d32',
                                    color: 'white',
                                    p: 1,
                                    borderRadius: 1,
                                }}
                            >
                                {t('dashboard.charts.preventive')}
                            </Typography>

                            {/* Tabla de datos */}
                            <Box sx={{ mb: 2 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    {t(
                                                        'dashboard.charts.table.month',
                                                    )}
                                                </strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>
                                                    {t(
                                                        'dashboard.charts.table.scheduled',
                                                    )}
                                                </strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>
                                                    {t(
                                                        'dashboard.charts.table.completed',
                                                    )}
                                                </strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>
                                                    {t(
                                                        'dashboard.charts.table.percentage',
                                                    )}
                                                </strong>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {categoryMonthlyData.preventive.map(
                                            (month) => (
                                                <TableRow key={month.month}>
                                                    <TableCell>
                                                        {t(
                                                            `dashboard.charts.months.${month.month.toLowerCase()}`,
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {month.scheduled}
                                                    </TableCell>
                                                    <TableCell>
                                                        {month.completed}
                                                        {month.completedOnTime !==
                                                            month.completed && (
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                                display="block"
                                                            ></Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <strong>
                                                            {month.efficiency}%
                                                        </strong>
                                                        {month.onTimeEfficiency !==
                                                            month.efficiency && (
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                                display="block"
                                                            ></Typography>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                            </Box>

                            {/* Gráfico */}
                            <Box sx={{ height: 250 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={categoryMonthlyData.preventive.map(
                                            (month, index) => ({
                                                name: t(
                                                    `dashboard.charts.months.${month.month.toLowerCase()}`,
                                                ),
                                                value: month.efficiency,
                                                color: [
                                                    '#2e7d32',
                                                    '#388e3c',
                                                    '#43a047',
                                                    '#66bb6a',
                                                    '#81c784',
                                                    '#a5d6a7',
                                                ][index % 6],
                                            }),
                                        )}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]} />
                                        <Tooltip
                                            formatter={(value) => [
                                                `${value}%`,
                                                t(
                                                    'dashboard.charts.tooltip.percentage',
                                                ),
                                            ]}
                                        />
                                        <Bar dataKey="value">
                                            {categoryMonthlyData.preventive.map(
                                                (month, index) => (
                                                    <Cell
                                                        key={`preventive-cell-${index}`}
                                                        fill={
                                                            [
                                                                '#2e7d32',
                                                                '#388e3c',
                                                                '#43a047',
                                                                '#66bb6a',
                                                                '#81c784',
                                                                '#a5d6a7',
                                                            ][index % 6]
                                                        }
                                                    />
                                                ),
                                            )}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Card>

                        {/* MANTENIMIENTO CORRECTIVO */}
                        <Card elevation={3} sx={{ borderRadius: 3, p: 2 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    mb: 2,
                                    backgroundColor: '#1976d2',
                                    color: 'white',
                                    p: 1,
                                    borderRadius: 1,
                                }}
                            >
                                {t('dashboard.charts.corrective')}
                            </Typography>

                            {/* Tabla de datos */}
                            <Box sx={{ mb: 2 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    {t(
                                                        'dashboard.charts.table.month',
                                                    )}
                                                </strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>
                                                    {t(
                                                        'dashboard.charts.table.scheduled',
                                                    )}
                                                </strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>
                                                    {t(
                                                        'dashboard.charts.table.completed',
                                                    )}
                                                </strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>
                                                    {t(
                                                        'dashboard.charts.table.percentage',
                                                    )}
                                                </strong>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {categoryMonthlyData.corrective.map(
                                            (month) => (
                                                <TableRow key={month.month}>
                                                    <TableCell>
                                                        {t(
                                                            `dashboard.charts.months.${month.month.toLowerCase()}`,
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {month.scheduled}
                                                    </TableCell>
                                                    <TableCell>
                                                        {month.completed}
                                                        {month.completedOnTime !==
                                                            month.completed && (
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                                display="block"
                                                            ></Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <strong>
                                                            {month.efficiency}%
                                                        </strong>
                                                        {month.onTimeEfficiency !==
                                                            month.efficiency && (
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                                display="block"
                                                            ></Typography>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                            </Box>

                            {/* Gráfico */}
                            <Box sx={{ height: 250 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={categoryMonthlyData.corrective.map(
                                            (month, index) => ({
                                                name: t(
                                                    `dashboard.charts.months.${month.month.toLowerCase()}`,
                                                ),
                                                value: month.efficiency,
                                                color: [
                                                    '#1976d2',
                                                    '#1e88e5',
                                                    '#42a5f5',
                                                    '#64b5f6',
                                                    '#90caf9',
                                                    '#bbdefb',
                                                ][index % 6],
                                            }),
                                        )}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]} />
                                        <Tooltip
                                            formatter={(value) => [
                                                `${value}%`,
                                                t(
                                                    'dashboard.charts.tooltip.percentage',
                                                ),
                                            ]}
                                        />
                                        <Bar dataKey="value">
                                            {categoryMonthlyData.corrective.map(
                                                (month, index) => (
                                                    <Cell
                                                        key={`corrective-cell-${index}`}
                                                        fill={
                                                            [
                                                                '#1976d2',
                                                                '#1e88e5',
                                                                '#42a5f5',
                                                                '#64b5f6',
                                                                '#90caf9',
                                                                '#bbdefb',
                                                            ][index % 6]
                                                        }
                                                    />
                                                ),
                                            )}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Card>

                        {/* MANTENIMIENTO PREDICTIVO */}
                        <Card elevation={3} sx={{ borderRadius: 3, p: 2 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    mb: 2,
                                    backgroundColor: '#ed6c02',
                                    color: 'white',
                                    p: 1,
                                    borderRadius: 1,
                                }}
                            >
                                {t('dashboard.charts.predictive')}
                            </Typography>

                            {/* Tabla de datos */}
                            <Box sx={{ mb: 2 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    {t(
                                                        'dashboard.charts.table.month',
                                                    )}
                                                </strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>
                                                    {t(
                                                        'dashboard.charts.table.scheduled',
                                                    )}
                                                </strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>
                                                    {t(
                                                        'dashboard.charts.table.completed',
                                                    )}
                                                </strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>
                                                    {t(
                                                        'dashboard.charts.table.percentage',
                                                    )}
                                                </strong>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {categoryMonthlyData.predictive.map(
                                            (month) => (
                                                <TableRow key={month.month}>
                                                    <TableCell>
                                                        {t(
                                                            `dashboard.charts.months.${month.month.toLowerCase()}`,
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {month.scheduled}
                                                    </TableCell>
                                                    <TableCell>
                                                        {month.completed}
                                                        {month.completedOnTime !==
                                                            month.completed && (
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                                display="block"
                                                            ></Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <strong>
                                                            {month.efficiency}%
                                                        </strong>
                                                        {month.onTimeEfficiency !==
                                                            month.efficiency && (
                                                            <Typography
                                                                variant="caption"
                                                                color="text.secondary"
                                                                display="block"
                                                            ></Typography>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                            </Box>

                            {/* Gráfico */}
                            <Box sx={{ height: 250 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={categoryMonthlyData.predictive.map(
                                            (month, index) => ({
                                                name: t(
                                                    `dashboard.charts.months.${month.month.toLowerCase()}`,
                                                ),
                                                value: month.efficiency,
                                                color: [
                                                    '#ed6c02',
                                                    '#f57c00',
                                                    '#ff9800',
                                                    '#ffb74d',
                                                    '#ffcc80',
                                                    '#ffe0b2',
                                                ][index % 6],
                                            }),
                                        )}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]} />
                                        <Tooltip
                                            formatter={(value) => [
                                                `${value}%`,
                                                t(
                                                    'dashboard.charts.tooltip.percentage',
                                                ),
                                            ]}
                                        />
                                        <Bar dataKey="value">
                                            {categoryMonthlyData.predictive.map(
                                                (month, index) => (
                                                    <Cell
                                                        key={`predictive-cell-${index}`}
                                                        fill={
                                                            [
                                                                '#ed6c02',
                                                                '#f57c00',
                                                                '#ff9800',
                                                                '#ffb74d',
                                                                '#ffcc80',
                                                                '#ffe0b2',
                                                            ][index % 6]
                                                        }
                                                    />
                                                ),
                                            )}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Card>
                    </Box>
                </Box>

                {/* Botón Flotante de Acciones */}
                <Fab
                    color="primary"
                    aria-label={t('dashboard.buttons.actions')}
                    onClick={handleOpenModal}
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        background:
                            'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        '&:hover': {
                            background:
                                'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                            transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease-in-out',
                        boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
                    }}
                >
                    <AnalyticsIcon />
                </Fab>

                {/* Modal de Acciones */}
                <Dialog
                    open={openModal}
                    onClose={handleCloseModal}
                    maxWidth="xl"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 3,
                            minHeight: '80vh',
                            maxHeight: '90vh',
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background:
                                'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={2}>
                            <AnalyticsIcon />
                            <Typography variant="h6" component="div">
                                {t('dashboard.modal.title')}
                            </Typography>
                        </Box>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleCloseModal}
                            aria-label={t('dashboard.buttons.close')}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent sx={{ p: 0 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={selectedTab}
                                onChange={handleTabChange}
                                aria-label={t('dashboard.modal.title')}
                                variant="fullWidth"
                            >
                                <Tab
                                    icon={<AssignmentIcon />}
                                    label={t(
                                        'dashboard.modal.tabs.detailed_tables',
                                    )}
                                    sx={{ fontWeight: 600 }}
                                />
                            </Tabs>
                        </Box>

                        <Box sx={{ p: 3, overflow: 'auto' }}>
                            {selectedTab === 0 && (
                                <Box>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        sx={{ fontWeight: 'bold', mb: 3 }}
                                    >
                                        📊{' '}
                                        {t(
                                            'dashboard.modal.tabs.detailed_tables_System',
                                        )}
                                    </Typography>

                                    {/* Primera fila de tablas */}
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: {
                                                xs: '1fr',
                                                lg: 'repeat(2, 1fr)',
                                            },
                                            gap: 3,
                                            mb: 3,
                                        }}
                                    >
                                        {/* Tabla de Mantenimientos Programados */}
                                        <Card
                                            elevation={3}
                                            sx={{
                                                borderRadius: 3,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%',
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: 'info.main',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <ScheduleIcon />{' '}
                                                    {t(
                                                        'dashboard.sections.upcoming',
                                                    )}{' '}
                                                    (
                                                    {
                                                        upcomingMaintenances.length
                                                    }
                                                    )
                                                </Typography>
                                                <TableContainer
                                                    component={Paper}
                                                    elevation={0}
                                                    sx={tableContainerStyle}
                                                >
                                                    <Table
                                                        size="small"
                                                        stickyHeader
                                                    >
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'info.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.equipment',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'info.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.date',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'info.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.type',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'info.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.priority',
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {upcomingMaintenances.map(
                                                                (
                                                                    maintenance,
                                                                ) => (
                                                                    <TableRow
                                                                        key={
                                                                            maintenance.id
                                                                        }
                                                                        sx={{
                                                                            '&:hover':
                                                                                {
                                                                                    backgroundColor:
                                                                                        'rgba(33, 150, 243, 0.08)',
                                                                                },
                                                                        }}
                                                                    >
                                                                        <TableCell
                                                                            sx={
                                                                                tableCellStyle
                                                                            }
                                                                        >
                                                                            <Typography
                                                                                variant="body2"
                                                                                sx={{
                                                                                    fontWeight: 500,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    maintenance
                                                                                        .equipment
                                                                                        .instrument
                                                                                }
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="caption"
                                                                                color="text.secondary"
                                                                            >
                                                                                {
                                                                                    maintenance
                                                                                        .equipment
                                                                                        .int_code
                                                                                }
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={
                                                                                tableCellStyle
                                                                            }
                                                                        >
                                                                            <Typography variant="body2">
                                                                                {formatDate(
                                                                                    maintenance.scheduled_date,
                                                                                )}
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={
                                                                                tableCellStyle
                                                                            }
                                                                        >
                                                                            <Chip
                                                                                label={shortenMaintenanceType(
                                                                                    maintenance.maintenance_type_name,
                                                                                )}
                                                                                size="small"
                                                                                variant="outlined"
                                                                                color="info"
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={
                                                                                tableCellStyle
                                                                            }
                                                                        >
                                                                            <Chip
                                                                                label={translatePriority(
                                                                                    maintenance.priority,
                                                                                )}
                                                                                size="small"
                                                                                color={
                                                                                    getPriorityColor(
                                                                                        maintenance.priority,
                                                                                    ) as any
                                                                                }
                                                                            />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ),
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>

                                        {/* Tabla de Mantenimientos en Proceso */}
                                        <Card
                                            elevation={3}
                                            sx={{
                                                borderRadius: 3,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%',
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: 'warning.main',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <BuildIcon />{' '}
                                                    {t(
                                                        'dashboard.sections.in_progress',
                                                    )}{' '}
                                                    (
                                                    {
                                                        inProgressMaintenances.length
                                                    }
                                                    )
                                                </Typography>
                                                <TableContainer
                                                    component={Paper}
                                                    elevation={0}
                                                    sx={tableContainerStyle}
                                                >
                                                    <Table
                                                        size="small"
                                                        stickyHeader
                                                    >
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'warning.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.equipment',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'warning.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.type',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'warning.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.category',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'warning.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.priority',
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {inProgressMaintenances.map(
                                                                (
                                                                    maintenance,
                                                                ) => (
                                                                    <TableRow
                                                                        key={
                                                                            maintenance.id
                                                                        }
                                                                        sx={{
                                                                            '&:hover':
                                                                                {
                                                                                    backgroundColor:
                                                                                        'rgba(255, 152, 0, 0.08)',
                                                                                },
                                                                        }}
                                                                    >
                                                                        <TableCell
                                                                            sx={
                                                                                tableCellStyle
                                                                            }
                                                                        >
                                                                            <Typography
                                                                                variant="body2"
                                                                                sx={{
                                                                                    fontWeight: 500,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    maintenance
                                                                                        .equipment
                                                                                        .instrument
                                                                                }
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="caption"
                                                                                color="text.secondary"
                                                                            >
                                                                                {
                                                                                    maintenance
                                                                                        .equipment
                                                                                        .int_code
                                                                                }
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={
                                                                                tableCellStyle
                                                                            }
                                                                        >
                                                                            <Chip
                                                                                label={shortenMaintenanceType(
                                                                                    maintenance.maintenance_type_name,
                                                                                )}
                                                                                size="small"
                                                                                variant="outlined"
                                                                                color="warning"
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={
                                                                                tableCellStyle
                                                                            }
                                                                        >
                                                                            <Typography variant="body2">
                                                                                {translateCategory(
                                                                                    maintenance.maintenance_category,
                                                                                )}
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={
                                                                                tableCellStyle
                                                                            }
                                                                        >
                                                                            <Chip
                                                                                label={translatePriority(
                                                                                    maintenance.priority,
                                                                                )}
                                                                                size="small"
                                                                                color={
                                                                                    getPriorityColor(
                                                                                        maintenance.priority,
                                                                                    ) as any
                                                                                }
                                                                            />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ),
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Box>

                                    {/* Segunda fila de tablas */}
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: {
                                                xs: '1fr',
                                                lg: 'repeat(2, 1fr)',
                                            },
                                            gap: 3,
                                            mb: 3,
                                        }}
                                    >
                                        {/* Tabla de Mantenimientos Completados */}
                                        <Card
                                            elevation={3}
                                            sx={{
                                                borderRadius: 3,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%',
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: 'success.main',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <AssignmentIcon />{' '}
                                                    {t(
                                                        'dashboard.sections.recent_completed',
                                                    )}{' '}
                                                    (
                                                    {
                                                        completedMaintenances.length
                                                    }
                                                    )
                                                </Typography>
                                                <TableContainer
                                                    component={Paper}
                                                    elevation={0}
                                                    sx={tableContainerStyle}
                                                >
                                                    <Table
                                                        size="small"
                                                        stickyHeader
                                                    >
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'success.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.equipment',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'success.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.type',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'success.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.performed_date',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'success.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.status',
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {completedMaintenances.map(
                                                                (
                                                                    maintenance,
                                                                ) => (
                                                                    <TableRow
                                                                        key={
                                                                            maintenance.id
                                                                        }
                                                                        sx={{
                                                                            '&:hover':
                                                                                {
                                                                                    backgroundColor:
                                                                                        'rgba(76, 175, 80, 0.08)',
                                                                                },
                                                                        }}
                                                                    >
                                                                        <TableCell
                                                                            sx={
                                                                                tableCellStyle
                                                                            }
                                                                        >
                                                                            <Typography
                                                                                variant="body2"
                                                                                sx={{
                                                                                    fontWeight: 500,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    maintenance
                                                                                        .equipment
                                                                                        .instrument
                                                                                }
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="caption"
                                                                                color="text.secondary"
                                                                            >
                                                                                {
                                                                                    maintenance
                                                                                        .equipment
                                                                                        .int_code
                                                                                }
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={
                                                                                tableCellStyle
                                                                            }
                                                                        >
                                                                            <Chip
                                                                                label={shortenMaintenanceType(
                                                                                    maintenance.maintenance_type_name,
                                                                                )}
                                                                                size="small"
                                                                                variant="outlined"
                                                                                color="success"
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={
                                                                                tableCellStyle
                                                                            }
                                                                        >
                                                                            <Typography variant="body2">
                                                                                {maintenance.performed_date
                                                                                    ? formatDate(
                                                                                          maintenance.performed_date,
                                                                                      )
                                                                                    : 'Sin fecha'}
                                                                            </Typography>
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={
                                                                                tableCellStyle
                                                                            }
                                                                        >
                                                                            <Chip
                                                                                label={translateStatus(
                                                                                    maintenance.status,
                                                                                )}
                                                                                size="small"
                                                                                color="success"
                                                                            />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ),
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>

                                        {/* Tabla de Mantenimientos Críticos */}
                                        <Card
                                            elevation={3}
                                            sx={{
                                                borderRadius: 3,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%',
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: 'error.main',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <WarningIcon />{' '}
                                                    {t(
                                                        'dashboard.sections.attention_required',
                                                    )}{' '}
                                                    (
                                                    {
                                                        criticalMaintenances.length
                                                    }
                                                    )
                                                </Typography>
                                                <TableContainer
                                                    component={Paper}
                                                    elevation={0}
                                                    sx={tableContainerStyle}
                                                >
                                                    <Table
                                                        size="small"
                                                        stickyHeader
                                                    >
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'error.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.equipment',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'error.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.status',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'error.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.priority',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'error.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.date',
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {criticalMaintenances
                                                                .slice(0, 10)
                                                                .map(
                                                                    (
                                                                        maintenance,
                                                                    ) => (
                                                                        <TableRow
                                                                            key={
                                                                                maintenance.id
                                                                            }
                                                                            sx={{
                                                                                '&:hover':
                                                                                    {
                                                                                        backgroundColor:
                                                                                            'rgba(244, 67, 54, 0.08)',
                                                                                    },
                                                                                backgroundColor:
                                                                                    'rgba(244, 67, 54, 0.04)',
                                                                            }}
                                                                        >
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    sx={{
                                                                                        fontWeight: 500,
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        maintenance
                                                                                            .equipment
                                                                                            .instrument
                                                                                    }
                                                                                </Typography>
                                                                                <Typography
                                                                                    variant="caption"
                                                                                    color="text.secondary"
                                                                                >
                                                                                    {
                                                                                        maintenance
                                                                                            .equipment
                                                                                            .int_code
                                                                                    }
                                                                                </Typography>
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Chip
                                                                                    label={translateStatus(
                                                                                        maintenance.status,
                                                                                    )}
                                                                                    size="small"
                                                                                    color={
                                                                                        getStatusColor(
                                                                                            maintenance.status,
                                                                                        ) as any
                                                                                    }
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Chip
                                                                                    label={translatePriority(
                                                                                        maintenance.priority,
                                                                                    )}
                                                                                    size="small"
                                                                                    color={
                                                                                        getPriorityColor(
                                                                                            maintenance.priority,
                                                                                        ) as any
                                                                                    }
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    color="error.main"
                                                                                >
                                                                                    {formatDate(
                                                                                        maintenance.scheduled_date,
                                                                                    )}
                                                                                </Typography>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ),
                                                                )}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Box>

                                    {/* Tercera fila de tablas */}
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: {
                                                xs: '1fr',
                                                lg: 'repeat(2, 1fr)',
                                            },
                                            gap: 3,
                                            mb: 3,
                                        }}
                                    >
                                        {/* Tabla de Mantenimientos Vencidos */}
                                        <Card
                                            elevation={3}
                                            sx={{
                                                borderRadius: 3,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%',
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: 'error.main',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <ErrorIcon />{' '}
                                                    {t(
                                                        'dashboard.sections.overdue',
                                                    )}{' '}
                                                    (
                                                    {overdueMaintenances.length}
                                                    )
                                                </Typography>
                                                <TableContainer
                                                    component={Paper}
                                                    elevation={0}
                                                    sx={tableContainerStyle}
                                                >
                                                    <Table
                                                        size="small"
                                                        stickyHeader
                                                    >
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'error.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.equipment',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'error.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.type',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'error.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.date',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'error.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.priority',
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {overdueMaintenances
                                                                .slice(0, 10)
                                                                .map(
                                                                    (
                                                                        maintenance,
                                                                    ) => (
                                                                        <TableRow
                                                                            key={
                                                                                maintenance.id
                                                                            }
                                                                            sx={{
                                                                                '&:hover':
                                                                                    {
                                                                                        backgroundColor:
                                                                                            'rgba(244, 67, 54, 0.08)',
                                                                                    },
                                                                                backgroundColor:
                                                                                    'rgba(244, 67, 54, 0.04)',
                                                                            }}
                                                                        >
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    sx={{
                                                                                        fontWeight: 500,
                                                                                        color: 'error.main',
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        maintenance
                                                                                            .equipment
                                                                                            .instrument
                                                                                    }
                                                                                </Typography>
                                                                                <Typography
                                                                                    variant="caption"
                                                                                    color="error.main"
                                                                                >
                                                                                    {
                                                                                        maintenance
                                                                                            .equipment
                                                                                            .int_code
                                                                                    }
                                                                                </Typography>
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Chip
                                                                                    label={shortenMaintenanceType(
                                                                                        maintenance.maintenance_type_name,
                                                                                    )}
                                                                                    size="small"
                                                                                    variant="outlined"
                                                                                    color="error"
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    color="error.main"
                                                                                    sx={{
                                                                                        fontWeight: 600,
                                                                                    }}
                                                                                >
                                                                                    {formatDate(
                                                                                        maintenance.scheduled_date,
                                                                                    )}{' '}
                                                                                    (
                                                                                    {t(
                                                                                        'dashboard.overdue',
                                                                                    )}

                                                                                    )
                                                                                </Typography>
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Chip
                                                                                    label={
                                                                                        maintenance.priority
                                                                                    }
                                                                                    size="small"
                                                                                    color={
                                                                                        getPriorityColor(
                                                                                            maintenance.priority,
                                                                                        ) as any
                                                                                    }
                                                                                />
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ),
                                                                )}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>

                                        {/* Tabla de Mantenimientos Cancelados */}
                                        <Card
                                            elevation={3}
                                            sx={{
                                                borderRadius: 3,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%',
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: 'error.main',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <ErrorIcon />{' '}
                                                    {t(
                                                        'dashboard.sections.cancelled',
                                                    )}{' '}
                                                    (
                                                    {
                                                        cancelledMaintenances.length
                                                    }
                                                    )
                                                </Typography>
                                                <TableContainer
                                                    component={Paper}
                                                    elevation={0}
                                                    sx={tableContainerStyle}
                                                >
                                                    <Table
                                                        size="small"
                                                        stickyHeader
                                                    >
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'error.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.equipment',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'error.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.type',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'error.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.category',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'error.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.date',
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {cancelledMaintenances
                                                                .slice(0, 10)
                                                                .map(
                                                                    (
                                                                        maintenance,
                                                                    ) => (
                                                                        <TableRow
                                                                            key={
                                                                                maintenance.id
                                                                            }
                                                                            sx={{
                                                                                '&:hover':
                                                                                    {
                                                                                        backgroundColor:
                                                                                            'rgba(244, 67, 54, 0.08)',
                                                                                    },
                                                                            }}
                                                                        >
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    sx={{
                                                                                        fontWeight: 500,
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        maintenance
                                                                                            .equipment
                                                                                            .instrument
                                                                                    }
                                                                                </Typography>
                                                                                <Typography
                                                                                    variant="caption"
                                                                                    color="text.secondary"
                                                                                >
                                                                                    {
                                                                                        maintenance
                                                                                            .equipment
                                                                                            .int_code
                                                                                    }
                                                                                </Typography>
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Chip
                                                                                    label={shortenMaintenanceType(
                                                                                        maintenance.maintenance_type_name,
                                                                                    )}
                                                                                    size="small"
                                                                                    variant="outlined"
                                                                                    color="error"
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Typography variant="body2">
                                                                                    {
                                                                                        maintenance.maintenance_category
                                                                                    }
                                                                                </Typography>
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Typography variant="body2">
                                                                                    {formatDate(
                                                                                        maintenance.scheduled_date,
                                                                                    )}
                                                                                </Typography>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ),
                                                                )}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Box>

                                    {/* Tabla de Todos los Mantenimientos Recientes (ancho completo) */}
                                    <Box sx={{ mb: 3 }}>
                                        <Card
                                            elevation={3}
                                            sx={{ borderRadius: 3 }}
                                        >
                                            <CardContent>
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: 'primary.main',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    <AssignmentIcon />{' '}
                                                    {t(
                                                        'dashboard.sections.all_maintenances',
                                                    )}{' '}
                                                    ({recentMaintenances.length}
                                                    )
                                                </Typography>
                                                <TableContainer
                                                    component={Paper}
                                                    elevation={0}
                                                    sx={{ maxHeight: 400 }}
                                                >
                                                    <Table
                                                        size="small"
                                                        stickyHeader
                                                    >
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'primary.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.equipment',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'primary.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.type',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'primary.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.status',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'primary.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.priority',
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={tableHeaderStyle(
                                                                        'primary.light',
                                                                    )}
                                                                >
                                                                    {t(
                                                                        'dashboard.table.headers.date',
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {recentMaintenances
                                                                .slice(0, 15)
                                                                .map(
                                                                    (
                                                                        maintenance,
                                                                    ) => (
                                                                        <TableRow
                                                                            key={
                                                                                maintenance.id
                                                                            }
                                                                            sx={{
                                                                                '&:hover':
                                                                                    {
                                                                                        backgroundColor:
                                                                                            'rgba(33, 150, 243, 0.08)',
                                                                                    },
                                                                            }}
                                                                        >
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    sx={{
                                                                                        fontWeight: 500,
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        maintenance
                                                                                            .equipment
                                                                                            .instrument
                                                                                    }
                                                                                </Typography>
                                                                                <Typography
                                                                                    variant="caption"
                                                                                    color="text.secondary"
                                                                                >
                                                                                    {
                                                                                        maintenance
                                                                                            .equipment
                                                                                            .int_code
                                                                                    }
                                                                                </Typography>
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Chip
                                                                                    label={shortenMaintenanceType(
                                                                                        maintenance.maintenance_type_name,
                                                                                    )}
                                                                                    size="small"
                                                                                    variant="outlined"
                                                                                    color="primary"
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Chip
                                                                                    label={translateStatus(
                                                                                        maintenance.status,
                                                                                    )}
                                                                                    size="small"
                                                                                    color={
                                                                                        getStatusColor(
                                                                                            maintenance.status,
                                                                                        ) as any
                                                                                    }
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Chip
                                                                                    label={translatePriority(
                                                                                        maintenance.priority,
                                                                                    )}
                                                                                    size="small"
                                                                                    color={
                                                                                        getPriorityColor(
                                                                                            maintenance.priority,
                                                                                        ) as any
                                                                                    }
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={
                                                                                    tableCellStyle
                                                                                }
                                                                            >
                                                                                <Typography variant="body2">
                                                                                    {formatDate(
                                                                                        maintenance.scheduled_date,
                                                                                    )}
                                                                                </Typography>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ),
                                                                )}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ p: 2, backgroundColor: 'grey.50' }}>
                        <Button
                            onClick={handleCloseModal}
                            variant="contained"
                            startIcon={<ExitToAppIcon />}
                            sx={{
                                background:
                                    'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                '&:hover': {
                                    background:
                                        'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                                },
                            }}
                        >
                            {t('dashboard.buttons.close_panel')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </AppLayout>
    );
}
