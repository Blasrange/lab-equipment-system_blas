import { useTranslation } from '@/contexts/translation-context';
import { router } from '@inertiajs/react';
import {
    Assignment as AssignmentIcon,
    Build as BuildIcon,
    Close as CloseIcon,
    Person as PersonIcon,
    Save as SaveIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface MaintenanceFormModalProps {
    open: boolean;
    onClose: () => void;
    equipment: {
        id: number;
        instrument: string;
        model: string;
        brand: string;
        serial_number: string;
    };
    maintenanceType: {
        id: string;
        name: string;
        description: string;
        color: string;
        category: string;
    };
}

interface MaintenanceForm {
    scheduled_date: string;
    performed_date: string;
    responsible_person: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    actual_duration: number;
    actual_cost: number;
    notes: string;
    requires_external_service: boolean;
    external_provider: string;
    parts_needed: string;
    status:
        | 'scheduled'
        | 'in_progress'
        | 'completed'
        | 'cancelled'
        | 'postponed';
}

const MaintenanceFormModal: React.FC<MaintenanceFormModalProps> = ({
    open,
    onClose,
    equipment,
    maintenanceType,
}) => {
    const { t } = useTranslation();
    const [form, setForm] = useState<MaintenanceForm>({
        scheduled_date: new Date().toISOString().split('T')[0],
        performed_date: '',
        responsible_person: '',
        description: '',
        priority: 'medium',
        actual_duration: 0,
        actual_cost: 0,
        notes: '',
        requires_external_service: false,
        external_provider: '',
        parts_needed: '',
        status: 'scheduled',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const roundedFieldStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            fontSize: '14px',
            '& fieldset': {
                borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
                borderColor: '#1976d2',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
                borderWidth: '2px',
            },
        },
        '& .MuiInputLabel-root': {
            fontSize: '14px',
            '&.Mui-focused': {
                color: '#1976d2',
            },
        },
    };

    const handleInputChange = (field: keyof MaintenanceForm, value: any) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        if (!form.responsible_person || !form.description) {
            setError(t('maintenance.form.required_fields'));
            return;
        }

        setLoading(true);
        setError(null);

        const submitData = {
            equipment_id: equipment.id,
            maintenance_type_name: maintenanceType.name,
            maintenance_category: maintenanceType.category,
            ...form,
        };

        router.post('/maintenance', submitData, {
            onSuccess: () => {
                setLoading(false);
                onClose();
            },
            onError: (errors) => {
                setLoading(false);
                setError(
                    t('maintenance.form.save_error') +
                        Object.values(errors).join(', '),
                );
                console.error(errors);
            },
            onFinish: () => {
                setLoading(false);
            },
        });
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
            case 'postponed':
                return '#9C27B0';
            default:
                return '#9E9E9E';
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    maxHeight: '90vh',
                },
            }}
        >
            <DialogTitle
                sx={{
                    background: `linear-gradient(135deg, ${maintenanceType.color}15 0%, ${maintenanceType.color}25 100%)`,
                    color: maintenanceType.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '12px 12px 0 0',
                    py: 2.5,
                    borderBottom: `3px solid ${maintenanceType.color}`,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <BuildIcon sx={{ fontSize: 28 }} />
                    <Box>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: 600 }}
                        >
                            {maintenanceType.name}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            {equipment.instrument} - {equipment.model}
                        </Typography>
                    </Box>
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{ color: maintenanceType.color }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3, backgroundColor: '#fafafa' }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Información del Equipo */}
                <Box
                    sx={{
                        mb: 3,
                        p: 2,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 1, color: '#333' }}
                    >
                        {t('maintenance.form.equipment_info').replace(
                            '{id}',
                            equipment.id.toString(),
                        )}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Chip
                            label={equipment.instrument}
                            variant="outlined"
                            size="small"
                            color="primary"
                        />
                        <Chip
                            label={`${equipment.brand} ${equipment.model}`}
                            variant="outlined"
                            size="small"
                        />
                        <Chip
                            label={`S/N: ${equipment.serial_number}`}
                            variant="outlined"
                            size="small"
                        />
                        <Chip
                            label={maintenanceType.category.toUpperCase()}
                            sx={{
                                backgroundColor: `${maintenanceType.color}15`,
                                color: maintenanceType.color,
                                fontWeight: 600,
                            }}
                            size="small"
                        />
                    </Box>
                </Box>

                {/* Formulario Principal */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 3,
                    }}
                >
                    {/* Fechas */}
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            p: 2.5,
                            borderRadius: 2,
                            border: '1px solid #e0e0e0',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 2,
                            }}
                        >
                            <ScheduleIcon
                                sx={{ color: '#666', fontSize: 20 }}
                            />
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600, color: '#333' }}
                            >
                                {t('maintenance.form.scheduling')}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <TextField
                                label={t('maintenance.form.scheduled_date')}
                                type="date"
                                value={form.scheduled_date}
                                onChange={(e) =>
                                    handleInputChange(
                                        'scheduled_date',
                                        e.target.value,
                                    )
                                }
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                sx={roundedFieldStyle}
                            />

                            <TextField
                                label={t('maintenance.form.performed_date')}
                                type="date"
                                value={form.performed_date}
                                onChange={(e) =>
                                    handleInputChange(
                                        'performed_date',
                                        e.target.value,
                                    )
                                }
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                sx={roundedFieldStyle}
                            />
                        </Box>
                    </Box>

                    {/* Responsable y Prioridad */}
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            p: 2.5,
                            borderRadius: 2,
                            border: '1px solid #e0e0e0',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 2,
                            }}
                        >
                            <PersonIcon sx={{ color: '#666', fontSize: 20 }} />
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600, color: '#333' }}
                            >
                                {t('maintenance.form.responsibility')}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <TextField
                                label={t('maintenance.form.responsible_person')}
                                value={form.responsible_person}
                                onChange={(e) =>
                                    handleInputChange(
                                        'responsible_person',
                                        e.target.value,
                                    )
                                }
                                fullWidth
                                sx={roundedFieldStyle}
                            />

                            <FormControl fullWidth sx={roundedFieldStyle}>
                                <InputLabel>
                                    {t('maintenance.form.priority')}
                                </InputLabel>
                                <Select
                                    value={form.priority}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'priority',
                                            e.target.value,
                                        )
                                    }
                                    label={t('maintenance.form.priority')}
                                >
                                    <MenuItem value="low">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: '50%',
                                                    backgroundColor:
                                                        getPriorityColor('low'),
                                                }}
                                            />
                                            {t('maintenance.form.priority.low')}
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="medium">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: '50%',
                                                    backgroundColor:
                                                        getPriorityColor(
                                                            'medium',
                                                        ),
                                                }}
                                            />
                                            {t(
                                                'maintenance.form.priority.medium',
                                            )}
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="high">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: '50%',
                                                    backgroundColor:
                                                        getPriorityColor(
                                                            'high',
                                                        ),
                                                }}
                                            />
                                            {t(
                                                'maintenance.form.priority.high',
                                            )}
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="critical">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: '50%',
                                                    backgroundColor:
                                                        getPriorityColor(
                                                            'critical',
                                                        ),
                                                }}
                                            />
                                            {t(
                                                'maintenance.form.priority.critical',
                                            )}
                                        </Box>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>

                {/* Descripción y Detalles */}
                <Box
                    sx={{
                        mt: 3,
                        backgroundColor: 'white',
                        p: 2.5,
                        borderRadius: 2,
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 2,
                        }}
                    >
                        <AssignmentIcon sx={{ color: '#666', fontSize: 20 }} />
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, color: '#333' }}
                        >
                            {t('maintenance.form.details')}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: 2,
                        }}
                    >
                        <TextField
                            label={t('maintenance.form.description')}
                            value={form.description}
                            onChange={(e) =>
                                handleInputChange('description', e.target.value)
                            }
                            multiline
                            rows={3}
                            fullWidth
                            sx={{ ...roundedFieldStyle, gridColumn: 'span 2' }}
                        />

                        {/* Campo removido - no existe en la migración */}

                        <TextField
                            label={t('maintenance.form.actual_duration')}
                            type="number"
                            value={form.actual_duration}
                            onChange={(e) =>
                                handleInputChange(
                                    'actual_duration',
                                    parseInt(e.target.value) || 0,
                                )
                            }
                            fullWidth
                            sx={roundedFieldStyle}
                        />

                        <TextField
                            label={t('maintenance.form.actual_cost')}
                            type="number"
                            value={form.actual_cost}
                            onChange={(e) =>
                                handleInputChange(
                                    'actual_cost',
                                    parseFloat(e.target.value) || 0,
                                )
                            }
                            fullWidth
                            sx={roundedFieldStyle}
                        />

                        <FormControl fullWidth sx={roundedFieldStyle}>
                            <InputLabel>
                                {t('maintenance.form.status')}
                            </InputLabel>
                            <Select
                                value={form.status}
                                onChange={(e) =>
                                    handleInputChange('status', e.target.value)
                                }
                                label={t('maintenance.form.status')}
                            >
                                <MenuItem value="scheduled">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor:
                                                    getStatusColor('scheduled'),
                                            }}
                                        />
                                        {t('maintenance.form.status.scheduled')}
                                    </Box>
                                </MenuItem>
                                <MenuItem value="in_progress">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor:
                                                    getStatusColor(
                                                        'in_progress',
                                                    ),
                                            }}
                                        />
                                        {t(
                                            'maintenance.form.status.in_progress',
                                        )}
                                    </Box>
                                </MenuItem>
                                <MenuItem value="completed">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor:
                                                    getStatusColor('completed'),
                                            }}
                                        />
                                        {t('maintenance.form.status.completed')}
                                    </Box>
                                </MenuItem>
                                <MenuItem value="cancelled">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor:
                                                    getStatusColor('cancelled'),
                                            }}
                                        />
                                        {t('maintenance.form.status.cancelled')}
                                    </Box>
                                </MenuItem>
                                <MenuItem value="postponed">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor:
                                                    getStatusColor('postponed'),
                                            }}
                                        />
                                        {t('maintenance.form.status.postponed')}
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                {/* Servicio Externo */}
                <Box
                    sx={{
                        mt: 3,
                        backgroundColor: 'white',
                        p: 2.5,
                        borderRadius: 2,
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <FormControlLabel
                        control={
                            <Switch
                                checked={form.requires_external_service}
                                onChange={(e) =>
                                    handleInputChange(
                                        'requires_external_service',
                                        e.target.checked,
                                    )
                                }
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: maintenanceType.color,
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':
                                        {
                                            backgroundColor:
                                                maintenanceType.color,
                                        },
                                }}
                            />
                        }
                        label={t('maintenance.form.external_service')}
                    />

                    {form.requires_external_service && (
                        <Box
                            sx={{
                                mt: 2,
                                display: 'grid',
                                gridTemplateColumns:
                                    'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: 2,
                            }}
                        >
                            <TextField
                                label={t('maintenance.form.external_provider')}
                                value={form.external_provider}
                                onChange={(e) =>
                                    handleInputChange(
                                        'external_provider',
                                        e.target.value,
                                    )
                                }
                                fullWidth
                                sx={roundedFieldStyle}
                            />
                            <TextField
                                label={t('maintenance.form.parts_needed')}
                                value={form.parts_needed}
                                onChange={(e) =>
                                    handleInputChange(
                                        'parts_needed',
                                        e.target.value,
                                    )
                                }
                                fullWidth
                                sx={roundedFieldStyle}
                            />
                        </Box>
                    )}
                </Box>

                {/* Notas */}
                <Box sx={{ mt: 3 }}>
                    <TextField
                        label={t('maintenance.form.additional_notes')}
                        value={form.notes}
                        onChange={(e) =>
                            handleInputChange('notes', e.target.value)
                        }
                        multiline
                        rows={3}
                        fullWidth
                        sx={{
                            ...roundedFieldStyle,
                            backgroundColor: 'white',
                        }}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, backgroundColor: '#fafafa' }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    startIcon={<CloseIcon />}
                    sx={{
                        borderRadius: '25px',
                        px: 5,
                        py: 1.2,
                        textTransform: 'uppercase',
                        borderColor: '#1976D2',
                        color: '#1976D2',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        letterSpacing: '0.5px',
                        '&:hover': {
                            borderColor: '#1976D2',
                            backgroundColor: 'rgba(25, 118, 210, 0.04)',
                        },
                    }}
                >
                    {t('common.cancel')}
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        backgroundColor: '#1976D2', // Azul del sistema
                        fontWeight: 600,
                        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.25)',
                        '&:hover': {
                            backgroundColor: '#1565C0',
                            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.35)',
                            transform: 'translateY(-1px)',
                        },
                        '&:disabled': {
                            backgroundColor: '#ccc',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    {loading
                        ? t('maintenance.form.saving')
                        : t('maintenance.form.save_maintenance')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MaintenanceFormModal;
