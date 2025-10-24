import { useTranslation } from '@/contexts/translation-context';
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

interface Equipment {
    id: number;
    instrument: string;
    model: string;
    brand: string;
    serial_number: string;
}

interface MaintenanceType {
    id: string;
    name: string;
    description: string;
    color: string;
    category: string;
}

interface MaintenanceForm {
    scheduled_date: string;
    responsible_person: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    actual_duration: number;
    actual_cost: number;
    notes: string;
    requires_external_service: boolean;
    external_provider: string;
    parts_needed: string;
    work_performed: string;
    findings: string;
    recommendations: string;
    requires_validation: boolean;
    next_maintenance_date: string;
}

interface QrMaintenanceFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    equipment: Equipment;
    maintenanceType: MaintenanceType;
}

const QrMaintenanceFormModal: React.FC<QrMaintenanceFormModalProps> = ({
    open,
    onClose,
    onSubmit,
    equipment,
    maintenanceType,
}) => {
    const { t } = useTranslation();

    // Helper function to interpolate text
    const interpolate = (template: string, values: Record<string, any>) => {
        return template.replace(/\{(\w+)\}/g, (match, key) => {
            return values[key] !== undefined ? values[key] : match;
        });
    };

    const [form, setForm] = useState<MaintenanceForm>({
        scheduled_date: new Date().toISOString().split('T')[0],
        responsible_person: '',
        description: '',
        priority: 'medium',
        actual_duration: 0,
        actual_cost: 0,
        notes: '',
        requires_external_service: false,
        external_provider: '',
        parts_needed: '',
        work_performed: '',
        findings: '',
        recommendations: '',
        requires_validation: false,
        next_maintenance_date: '',
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

    const handleSubmit = async () => {
        if (!form.responsible_person || !form.description) {
            setError(t('qr.form.validation.required_fields'));
            return;
        }

        setLoading(true);
        setError(null);

        const submitData = {
            maintenance_type_name: maintenanceType.name,
            maintenance_category: maintenanceType.category,
            ...form,
        };

        try {
            await onSubmit(submitData);
        } catch (err: any) {
            setError(err.message || t('qr.form.error.create_task'));
        } finally {
            setLoading(false);
        }
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

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    maxHeight: '95vh',
                    height: 'auto',
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

            <DialogContent
                sx={{
                    p: 3,
                    backgroundColor: '#fafafa',
                    overflowY: 'auto',
                    maxHeight: 'calc(95vh - 180px)',
                }}
            >
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
                        {interpolate(t('qr.form.equipment.info'), {
                            id: equipment.id,
                        })}
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
                                {t('qr.form.section.scheduling')}
                            </Typography>
                        </Box>

                        <TextField
                            label={t('qr.form.field.scheduled_date')}
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
                                {t('qr.form.section.responsibility')}
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
                                label={t('qr.form.field.responsible_person')}
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
                                    {t('qr.form.field.priority')}
                                </InputLabel>
                                <Select
                                    value={form.priority}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'priority',
                                            e.target.value,
                                        )
                                    }
                                    label={t('qr.form.field.priority')}
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
                                            {t('qr.form.priority.low')}
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
                                            {t('qr.form.priority.medium')}
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
                                            {t('qr.form.priority.high')}
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
                                            {t('qr.form.priority.critical')}
                                        </Box>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>

                {/* Descripción y Campos de Trabajo */}
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
                            {t('qr.form.section.details')}
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
                            label={t('qr.form.field.description')}
                            value={form.description}
                            onChange={(e) =>
                                handleInputChange('description', e.target.value)
                            }
                            multiline
                            rows={3}
                            fullWidth
                            sx={{ ...roundedFieldStyle, gridColumn: 'span 2' }}
                        />

                        <TextField
                            label={t('qr.form.field.actual_duration')}
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
                            label={t('qr.form.field.actual_cost')}
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

                        {/* Nuevos campos detallados */}
                        <TextField
                            label={t('qr.form.field.work_performed')}
                            value={form.work_performed}
                            onChange={(e) =>
                                handleInputChange(
                                    'work_performed',
                                    e.target.value,
                                )
                            }
                            multiline
                            rows={2}
                            fullWidth
                            sx={{ ...roundedFieldStyle, gridColumn: 'span 2' }}
                            placeholder={t(
                                'qr.form.field.work_performed_placeholder',
                            )}
                        />

                        <TextField
                            label={t('qr.form.field.findings')}
                            value={form.findings}
                            onChange={(e) =>
                                handleInputChange('findings', e.target.value)
                            }
                            multiline
                            rows={2}
                            fullWidth
                            sx={{ ...roundedFieldStyle, gridColumn: 'span 2' }}
                            placeholder={t(
                                'qr.form.field.findings_placeholder',
                            )}
                        />

                        <TextField
                            label={t('qr.form.field.recommendations')}
                            value={form.recommendations}
                            onChange={(e) =>
                                handleInputChange(
                                    'recommendations',
                                    e.target.value,
                                )
                            }
                            multiline
                            rows={2}
                            fullWidth
                            sx={{ ...roundedFieldStyle, gridColumn: 'span 2' }}
                            placeholder={t(
                                'qr.form.field.recommendations_placeholder',
                            )}
                        />
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
                        label={t('qr.form.switch.requires_external_service')}
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
                                label={t('qr.form.field.external_provider')}
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
                                label={t('qr.form.field.parts_needed')}
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
                        label={t('qr.form.field.notes')}
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

                {/* Validación y Próximo Mantenimiento */}
                <Box
                    sx={{
                        mt: 3,
                        backgroundColor: 'white',
                        p: 2.5,
                        borderRadius: 2,
                        border: '1px solid #e0e0e0',
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 2, color: '#333' }}
                    >
                        {t('qr.form.section.validation')}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.requires_validation}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'requires_validation',
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
                            label={t('qr.form.switch.requires_validation')}
                        />

                        <TextField
                            label={t('qr.form.field.next_maintenance_date')}
                            type="date"
                            value={form.next_maintenance_date}
                            onChange={(e) =>
                                handleInputChange(
                                    'next_maintenance_date',
                                    e.target.value,
                                )
                            }
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            sx={roundedFieldStyle}
                            helperText={t(
                                'qr.form.field.next_maintenance_helper',
                            )}
                        />
                    </Box>
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
                    {t('qr.form.button.cancel')}
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        textTransform: 'none',
                        backgroundColor: maintenanceType.color,
                        '&:hover': {
                            backgroundColor: maintenanceType.color,
                            filter: 'brightness(0.9)',
                        },
                        '&:disabled': {
                            backgroundColor: '#ccc',
                        },
                    }}
                >
                    {loading
                        ? t('qr.form.button.creating')
                        : t('qr.form.button.create')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QrMaintenanceFormModal;
