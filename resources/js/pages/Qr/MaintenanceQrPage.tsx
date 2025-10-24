import { useTranslation } from '@/contexts/translation-context';
import { useMaintenanceTranslations } from '@/hooks/use-maintenance-translations';
import { Head } from '@inertiajs/react';
import {
    Add as AddIcon,
    Assignment as AssignmentIcon,
    Block as BlockIcon,
    Check as CheckIcon,
    Close as CloseIcon,
    Edit as EditIcon,
    Engineering as EngineeringIcon,
    Person as PersonIcon,
    QrCode as QrCodeIcon,
    Refresh as RefreshIcon,
    Save as SaveIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Fab,
    FormControl,
    IconButton,
    InputLabel,
    LinearProgress,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MaintenanceTypesModal from '../maintenance/MaintenanceTypesModal';
import QrMaintenanceFormModal from './QrMaintenanceFormModal';

interface Equipment {
    id: number;
    instrument: string;
    int_code: string;
    brand: string;
    model: string;
    serial_number: string;
    system_number: string;
    active: boolean;
    maintenance_records?: MaintenanceRecord[];
    maintenanceRecords?: MaintenanceRecord[];
}

interface MaintenanceRecord {
    id: number;
    maintenance_type_name: string;
    maintenance_category: 'preventive' | 'corrective' | 'predictive';
    scheduled_date: string;
    performed_date?: string;
    responsible_person: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    estimated_duration: number;
    actual_duration?: number;
    estimated_cost?: number;
    actual_cost?: number;
    notes?: string;
    work_performed?: string;
    findings?: string;
    recommendations?: string;
}

interface MaintenanceType {
    id: string;
    name: string;
    description: string;
    color: string;
    category: string;
}

interface MaintenanceQrPageProps {
    equipment: Equipment;
    qrToken: string;
    maintenanceTypes: MaintenanceType[];
}

const MaintenanceQrPage: React.FC<MaintenanceQrPageProps> = ({
    equipment,
    qrToken,
    maintenanceTypes,
}) => {
    const { t, language } = useTranslation();
    const { translateMaintenanceTypeName } = useMaintenanceTranslations();

    // Helper function to interpolate text
    const interpolate = (template: string, values: Record<string, any>) => {
        return template.replace(/\{(\w+)\}/g, (match, key) => {
            return values[key] !== undefined ? values[key] : match;
        });
    };

    const [tasks, setTasks] = useState<MaintenanceRecord[]>(
        equipment.maintenance_records || equipment.maintenanceRecords || [],
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showTypesModal, setShowTypesModal] = useState(false);
    const [selectedMaintenanceType, setSelectedMaintenanceType] =
        useState<MaintenanceType | null>(null);
    const [completedTasks, setCompletedTasks] = useState<Set<number>>(
        new Set(),
    );
    const [editingTask, setEditingTask] = useState<number | null>(null);
    const [newStatus, setNewStatus] = useState<
        'scheduled' | 'in_progress' | 'completed' | 'cancelled'
    >('scheduled');
    const [statusNotes, setStatusNotes] = useState<string>('');

    // Auto-refresh cada 30 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            refreshTasks();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const refreshTasks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/qr-maintenance/${qrToken}`);
            if (response.data.props) {
                const equipment = response.data.props.equipment;
                const newTasks =
                    equipment.maintenance_records ||
                    equipment.maintenanceRecords ||
                    [];
                setTasks(newTasks);
                console.log('Tasks refreshed:', newTasks); // Para debug
            }
        } catch (err) {
            console.error('Error refreshing tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateTaskStatus = async (
        taskId: number,
        status: 'in_progress' | 'completed' | 'cancelled',
        additionalData: any = {},
    ) => {
        setLoading(true);
        setError(null);

        // Optimistic local state update
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId
                    ? { ...task, status, ...additionalData }
                    : task,
            ),
        );

        try {
            const response = await axios.patch(
                `/qr-maintenance/${qrToken}/task/${taskId}`,
                {
                    status,
                    ...additionalData,
                },
            );

            if (response.data.success) {
                // If marked as completed, add visual effect
                if (status === 'completed') {
                    setCompletedTasks((prev) => new Set([...prev, taskId]));
                    setTimeout(() => {
                        setCompletedTasks((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(taskId);
                            return newSet;
                        });
                    }, 2000);
                }

                setSuccess(response.data.message);

                // Actualización inmediata para mejor UX y sincronización con servidor
                await refreshTasks();

                // Auto-hide success message after 3 seconds
                setTimeout(() => {
                    setSuccess(null);
                }, 3000);
            }
        } catch (err: any) {
            // En caso de error, revertir el cambio optimista
            await refreshTasks();

            setError(
                err.response?.data?.message ||
                    t('qr.maintenance.error.update_task'),
            );
            // Auto-hide error message after 5 seconds
            setTimeout(() => {
                setError(null);
            }, 5000);
        } finally {
            setLoading(false);
        }
    };

    const createNewTask = async (taskData: any) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `/qr-maintenance/${qrToken}/create-task`,
                taskData,
            );

            if (response.data.success) {
                setSuccess(response.data.message);
                // Actualización inmediata
                await refreshTasks();
                setShowCreateModal(false);
                setSelectedMaintenanceType(null);

                // Auto-hide success message after 3 seconds
                setTimeout(() => {
                    setSuccess(null);
                }, 3000);
            }
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    t('qr.maintenance.error.create_task'),
            );
            // Auto-hide error message after 5 seconds
            setTimeout(() => {
                setError(null);
            }, 5000);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectMaintenanceType = (type: MaintenanceType) => {
        setSelectedMaintenanceType(type);
        setShowTypesModal(false);
        setShowCreateModal(true);
    };

    const handleEditStatus = (taskId: number, currentStatus: string) => {
        setEditingTask(taskId);
        setNewStatus(
            currentStatus as
                | 'scheduled'
                | 'in_progress'
                | 'completed'
                | 'cancelled',
        );
        setStatusNotes('');
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setNewStatus('scheduled');
        setStatusNotes('');
    };

    const handleSaveStatus = async (taskId: number) => {
        const additionalData: any = {
            notes: statusNotes,
        };

        if (newStatus === 'completed') {
            additionalData.work_performed =
                statusNotes || t('qr.maintenance.completed_via_qr');
            additionalData.findings =
                statusNotes || t('qr.maintenance.work_performed');
            const task = tasks.find((t) => t.id === taskId);
            if (task) {
                additionalData.actual_duration = task.estimated_duration;
            }
        } else if (newStatus === 'cancelled') {
            additionalData.work_performed =
                statusNotes || t('qr.maintenance.cancelled_via_qr');
            additionalData.findings =
                statusNotes || t('qr.maintenance.task_cancelled');
        }

        await updateTaskStatus(
            taskId,
            newStatus as 'in_progress' | 'completed' | 'cancelled',
            additionalData,
        );
        setEditingTask(null);
        setNewStatus('scheduled');
        setStatusNotes('');
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'low':
                return '#4CAF50';
            case 'medium':
                return '#FF9800';
            case 'high':
                return '#FF5722';
            case 'critical':
                return '#F44336';
            default:
                return '#9E9E9E';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return '#2196F3';
            case 'in_progress':
                return '#FF9800';
            case 'completed':
                return '#4CAF50';
            case 'cancelled':
                return '#9E9E9E';
            default:
                return '#9E9E9E';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'scheduled':
                return <ScheduleIcon />;
            case 'in_progress':
                return <EngineeringIcon />;
            case 'completed':
                return <CheckIcon />;
            case 'cancelled':
                return <BlockIcon />;
            default:
                return <AssignmentIcon />;
        }
    };

    const formatDate = (dateString: string) => {
        const locale = language === 'es' ? 'es-CO' : 'en-US';
        return new Date(dateString).toLocaleDateString(locale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'scheduled':
                return t('qr.maintenance.status.scheduled');
            case 'in_progress':
                return t('qr.maintenance.status.in_progress');
            case 'completed':
                return t('qr.maintenance.status.completed');
            case 'cancelled':
                return t('qr.maintenance.status.cancelled');
            default:
                return status;
        }
    };

    return (
        <>
            <Head
                title={interpolate(t('qr.maintenance.page_title'), {
                    equipment: equipment.instrument,
                })}
            />
            <Box
                sx={{
                    minHeight: '100vh',
                    background: '#f8fafc',
                    p: { xs: 2, sm: 3 },
                }}
            >
                {/* System Header */}
                <Paper
                    elevation={2}
                    sx={{
                        textAlign: 'center',
                        mb: 3,
                        p: 3,
                        borderRadius: 3,
                        background:
                            'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)', // Azul del sistema
                        color: 'white',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 1,
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        }}
                    >
                        {t('qr.maintenance.system_title')}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            opacity: 0.9,
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                        }}
                    >
                        {t('qr.maintenance.system_subtitle')}
                    </Typography>
                </Paper>

                {/* Equipment Header */}
                <Paper
                    elevation={6}
                    sx={{
                        mb: 3,
                        borderRadius: 3,
                        background:
                            'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                        border: '1px solid rgba(59, 130, 246, 0.08)',
                    }}
                >
                    <Box sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                mb: 2,
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: '#1976D2', // Azul del sistema
                                    width: 56,
                                    height: 56,
                                    fontSize: '1.5rem',
                                }}
                            >
                                <QrCodeIcon />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: 700, color: '#1a202c' }}
                                >
                                    {equipment.instrument}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: '#4a5568' }}
                                >
                                    {equipment.brand} {equipment.model} -{' '}
                                    {equipment.int_code}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: '#718096' }}
                                >
                                    S/N: {equipment.serial_number}
                                </Typography>
                            </Box>
                            <IconButton
                                onClick={refreshTasks}
                                sx={{
                                    bgcolor: '#f7fafc',
                                    '&:hover': { bgcolor: '#edf2f7' },
                                }}
                            >
                                <RefreshIcon />
                            </IconButton>
                        </Box>

                        <Chip
                            label={
                                equipment.active
                                    ? t('qr.maintenance.equipment.active')
                                    : t('qr.maintenance.equipment.inactive')
                            }
                            color={equipment.active ? 'success' : 'error'}
                            sx={{ fontWeight: 600 }}
                        />
                    </Box>
                </Paper>

                {/* Alerts */}
                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2, borderRadius: 2 }}
                        onClose={() => setError(null)}
                    >
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert
                        severity="success"
                        sx={{ mb: 2, borderRadius: 2 }}
                        onClose={() => setSuccess(null)}
                    >
                        {success}
                    </Alert>
                )}

                {/* Loading */}
                {loading && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

                {/* Tasks List */}
                <Paper
                    elevation={6}
                    sx={{
                        borderRadius: 3,
                        background:
                            'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                        border: '1px solid rgba(59, 130, 246, 0.08)',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            p: 3,
                            background:
                                'linear-gradient(135deg, #1976D2 15%, #1565C0 85%)', // Azul del sistema
                            color: 'white',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {t('qr.maintenance.tasks.title')}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {interpolate(t('qr.maintenance.tasks.count'), {
                                count: tasks.length,
                            })}
                        </Typography>
                    </Box>

                    <Box sx={{ p: 3 }}>
                        {tasks.length === 0 ? (
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    py: 6,
                                    color: '#718096',
                                }}
                            >
                                <AssignmentIcon
                                    sx={{ fontSize: 64, mb: 2, opacity: 0.5 }}
                                />
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    {t('qr.maintenance.tasks.empty.title')}
                                </Typography>
                                <Typography variant="body2">
                                    {t(
                                        'qr.maintenance.tasks.empty.description',
                                    )}
                                </Typography>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns:
                                        'repeat(auto-fit, minmax(320px, 1fr))',
                                    gap: 2,
                                }}
                            >
                                {tasks.map((task) => (
                                    <Box key={task.id}>
                                        <Card
                                            sx={{
                                                borderRadius: 2,
                                                border: `2px solid ${getStatusColor(task.status)}15`,
                                                '&:hover': {
                                                    transform:
                                                        'translateY(-2px)',
                                                    boxShadow:
                                                        '0 8px 25px rgba(0,0,0,0.15)',
                                                },
                                                transition: 'all 0.3s ease',
                                                ...(completedTasks.has(
                                                    task.id,
                                                ) && {
                                                    background:
                                                        'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
                                                    color: 'white',
                                                    transform: 'scale(1.02)',
                                                    boxShadow:
                                                        '0 8px 25px rgba(76, 175, 80, 0.3)',
                                                }),
                                                ...(task.status ===
                                                    'completed' && {
                                                    opacity: 0.8,
                                                    background:
                                                        'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)',
                                                }),
                                            }}
                                        >
                                            <CardContent sx={{ p: 2.5 }}>
                                                {/* Header */}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems:
                                                            'flex-start',
                                                        gap: 2,
                                                        mb: 2,
                                                    }}
                                                >
                                                    <Avatar
                                                        sx={{
                                                            bgcolor: `${getStatusColor(task.status)}15`,
                                                            color: getStatusColor(
                                                                task.status,
                                                            ),
                                                            width: 40,
                                                            height: 40,
                                                        }}
                                                    >
                                                        {getStatusIcon(
                                                            task.status,
                                                        )}
                                                    </Avatar>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{
                                                                fontWeight: 600,
                                                                color: '#1a202c',
                                                                lineHeight: 1.2,
                                                            }}
                                                        >
                                                            {translateMaintenanceTypeName(
                                                                task.maintenance_type_name,
                                                            )}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: '#718096',
                                                            }}
                                                        >
                                                            {formatDate(
                                                                task.scheduled_date,
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                {/* Status and Priority */}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 1,
                                                        mb: 2,
                                                    }}
                                                >
                                                    <Chip
                                                        label={getStatusText(
                                                            task.status,
                                                        )}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: `${getStatusColor(task.status)}15`,
                                                            color: getStatusColor(
                                                                task.status,
                                                            ),
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                    <Chip
                                                        label={task.priority.toUpperCase()}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: `${getPriorityColor(task.priority)}15`,
                                                            color: getPriorityColor(
                                                                task.priority,
                                                            ),
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                </Box>

                                                {/* Description */}
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: '#4a5568',
                                                        mb: 2,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient:
                                                            'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {task.description}
                                                </Typography>

                                                {/* Responsible */}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        mb: 2,
                                                    }}
                                                >
                                                    <PersonIcon
                                                        sx={{
                                                            fontSize: 16,
                                                            color: '#718096',
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#718096',
                                                        }}
                                                    >
                                                        {
                                                            task.responsible_person
                                                        }
                                                    </Typography>
                                                </Box>

                                                {/* Actions */}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 1,
                                                        flexWrap: 'wrap',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {editingTask === task.id ? (
                                                        // Formulario de edición de estado
                                                        <Box
                                                            sx={{
                                                                width: '100%',
                                                                mt: 2,
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    gap: 2,
                                                                    mb: 2,
                                                                    flexWrap:
                                                                        'wrap',
                                                                }}
                                                            >
                                                                <FormControl
                                                                    size="small"
                                                                    sx={{
                                                                        minWidth: 120,
                                                                    }}
                                                                >
                                                                    <InputLabel>
                                                                        {t(
                                                                            'qr.maintenance.form.status_label',
                                                                        )}
                                                                    </InputLabel>
                                                                    <Select
                                                                        value={
                                                                            newStatus
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            setNewStatus(
                                                                                e
                                                                                    .target
                                                                                    .value as
                                                                                    | 'scheduled'
                                                                                    | 'in_progress'
                                                                                    | 'completed',
                                                                            )
                                                                        }
                                                                        label={t(
                                                                            'qr.maintenance.form.status_label',
                                                                        )}
                                                                    >
                                                                        <MenuItem value="scheduled">
                                                                            <Box
                                                                                sx={{
                                                                                    display:
                                                                                        'flex',
                                                                                    alignItems:
                                                                                        'center',
                                                                                    gap: 1,
                                                                                }}
                                                                            >
                                                                                <ScheduleIcon
                                                                                    sx={{
                                                                                        fontSize: 16,
                                                                                        color: '#2196F3',
                                                                                    }}
                                                                                />
                                                                                {t(
                                                                                    'qr.maintenance.status.scheduled',
                                                                                )}
                                                                            </Box>
                                                                        </MenuItem>
                                                                        <MenuItem value="in_progress">
                                                                            <Box
                                                                                sx={{
                                                                                    display:
                                                                                        'flex',
                                                                                    alignItems:
                                                                                        'center',
                                                                                    gap: 1,
                                                                                }}
                                                                            >
                                                                                <EngineeringIcon
                                                                                    sx={{
                                                                                        fontSize: 16,
                                                                                        color: '#FF9800',
                                                                                    }}
                                                                                />
                                                                                {t(
                                                                                    'qr.maintenance.status.in_progress',
                                                                                )}
                                                                            </Box>
                                                                        </MenuItem>
                                                                        <MenuItem value="completed">
                                                                            <Box
                                                                                sx={{
                                                                                    display:
                                                                                        'flex',
                                                                                    alignItems:
                                                                                        'center',
                                                                                    gap: 1,
                                                                                }}
                                                                            >
                                                                                <CheckIcon
                                                                                    sx={{
                                                                                        fontSize: 16,
                                                                                        color: '#4CAF50',
                                                                                    }}
                                                                                />
                                                                                {t(
                                                                                    'qr.maintenance.status.completed',
                                                                                )}
                                                                            </Box>
                                                                        </MenuItem>
                                                                        <MenuItem value="cancelled">
                                                                            <Box
                                                                                sx={{
                                                                                    display:
                                                                                        'flex',
                                                                                    alignItems:
                                                                                        'center',
                                                                                    gap: 1,
                                                                                }}
                                                                            >
                                                                                <BlockIcon
                                                                                    sx={{
                                                                                        fontSize: 16,
                                                                                        color: '#9E9E9E',
                                                                                    }}
                                                                                />
                                                                                {t(
                                                                                    'qr.maintenance.status.cancelled',
                                                                                )}
                                                                            </Box>
                                                                        </MenuItem>
                                                                    </Select>
                                                                </FormControl>

                                                                <Box
                                                                    sx={{
                                                                        display:
                                                                            'flex',
                                                                        gap: 1,
                                                                    }}
                                                                >
                                                                    <Button
                                                                        size="small"
                                                                        variant="contained"
                                                                        startIcon={
                                                                            <SaveIcon />
                                                                        }
                                                                        onClick={() =>
                                                                            handleSaveStatus(
                                                                                task.id,
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            loading
                                                                        }
                                                                        sx={{
                                                                            bgcolor:
                                                                                '#1976D2', // Azul del sistema
                                                                            '&:hover':
                                                                                {
                                                                                    bgcolor:
                                                                                        '#1565C0', // Azul más oscuro al hover
                                                                                },
                                                                        }}
                                                                    >
                                                                        {t(
                                                                            'qr.maintenance.actions.save',
                                                                        )}
                                                                    </Button>
                                                                    <Button
                                                                        size="small"
                                                                        variant="outlined"
                                                                        startIcon={
                                                                            <CloseIcon />
                                                                        }
                                                                        onClick={
                                                                            handleCancelEdit
                                                                        }
                                                                        disabled={
                                                                            loading
                                                                        }
                                                                        sx={{
                                                                            borderRadius:
                                                                                '25px',
                                                                            px: 3,
                                                                            py: 0.8,
                                                                            textTransform:
                                                                                'uppercase',
                                                                            borderColor:
                                                                                '#1976D2',
                                                                            color: '#1976D2',
                                                                            fontWeight: 600,
                                                                            fontSize:
                                                                                '0.75rem',
                                                                            letterSpacing:
                                                                                '0.5px',
                                                                            '&:hover':
                                                                                {
                                                                                    borderColor:
                                                                                        '#1976D2',
                                                                                    backgroundColor:
                                                                                        'rgba(25, 118, 210, 0.04)',
                                                                                },
                                                                        }}
                                                                    >
                                                                        {t(
                                                                            'qr.maintenance.actions.cancel',
                                                                        )}
                                                                    </Button>
                                                                </Box>
                                                            </Box>

                                                            <TextField
                                                                label={t(
                                                                    'qr.maintenance.form.notes_label',
                                                                )}
                                                                multiline
                                                                rows={3}
                                                                fullWidth
                                                                value={
                                                                    statusNotes
                                                                }
                                                                onChange={(e) =>
                                                                    setStatusNotes(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                placeholder={t(
                                                                    'qr.maintenance.form.notes_placeholder',
                                                                )}
                                                                size="small"
                                                                sx={{
                                                                    '& .MuiOutlinedInput-root':
                                                                        {
                                                                            borderRadius: 2,
                                                                        },
                                                                }}
                                                            />
                                                        </Box>
                                                    ) : (
                                                        // Vista normal con botón de editar
                                                        <>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                startIcon={
                                                                    <EditIcon />
                                                                }
                                                                onClick={() =>
                                                                    handleEditStatus(
                                                                        task.id,
                                                                        task.status,
                                                                    )
                                                                }
                                                                disabled={
                                                                    loading
                                                                }
                                                                sx={{
                                                                    borderColor:
                                                                        '#667eea',
                                                                    color: '#667eea',
                                                                    '&:hover': {
                                                                        borderColor:
                                                                            '#5a67d8',
                                                                        bgcolor:
                                                                            '#667eea15',
                                                                    },
                                                                }}
                                                            >
                                                                {t(
                                                                    'qr.maintenance.actions.edit',
                                                                )}
                                                            </Button>

                                                            <Chip
                                                                label={getStatusText(
                                                                    task.status,
                                                                )}
                                                                size="small"
                                                                icon={getStatusIcon(
                                                                    task.status,
                                                                )}
                                                                sx={{
                                                                    bgcolor: `${getStatusColor(task.status)}15`,
                                                                    color: getStatusColor(
                                                                        task.status,
                                                                    ),
                                                                    fontWeight: 600,
                                                                }}
                                                            />
                                                        </>
                                                    )}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Paper>

                {/* Floating Action Button */}
                <Fab
                    color="primary"
                    aria-label="add task"
                    onClick={() => setShowTypesModal(true)}
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        background:
                            'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)', // Azul del sistema
                        '&:hover': {
                            background:
                                'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)', // Azul más oscuro al hover
                            transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    <AddIcon />
                </Fab>

                {/* Modals */}
                <MaintenanceTypesModal
                    open={showTypesModal}
                    onClose={() => setShowTypesModal(false)}
                    onSelectMaintenanceType={handleSelectMaintenanceType}
                    equipment={equipment}
                />

                {selectedMaintenanceType && (
                    <QrMaintenanceFormModal
                        open={showCreateModal}
                        onClose={() => {
                            setShowCreateModal(false);
                            setSelectedMaintenanceType(null);
                        }}
                        equipment={equipment}
                        maintenanceType={selectedMaintenanceType}
                        onSubmit={createNewTask}
                    />
                )}
            </Box>
        </>
    );
};

export default MaintenanceQrPage;
