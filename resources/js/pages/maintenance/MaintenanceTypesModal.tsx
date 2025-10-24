import { useTranslation } from '@/contexts/translation-context';
import {
    Build as BuildIcon,
    CheckCircle as CheckCircleIcon,
    CleaningServices as CleaningServicesIcon,
    Close as CloseIcon,
    Schedule as ScheduleIcon,
    Settings as SettingsIcon,
    Warning as WarningIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from '@mui/material';
import React from 'react';

interface MaintenanceTypesModalProps {
    open: boolean;
    onClose: () => void;
    onSelectMaintenanceType: (type: MaintenanceType) => void;
    equipment: {
        id: number;
        instrument: string;
        model: string;
    };
}

interface MaintenanceType {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    category: 'preventive' | 'corrective' | 'predictive';
}

const MaintenanceTypesModal: React.FC<MaintenanceTypesModalProps> = ({
    open,
    onClose,
    onSelectMaintenanceType,
    equipment,
}) => {
    const { t } = useTranslation();

    const maintenanceTypes: MaintenanceType[] = [
        {
            id: 'preventive-routine',
            name: t('maintenance.types.preventive_routine.name'),
            description: t('maintenance.types.preventive_routine.description'),
            icon: <ScheduleIcon />,
            color: '#4CAF50',
            category: 'preventive',
        },
        {
            id: 'preventive-deep',
            name: t('maintenance.types.preventive_deep.name'),
            description: t('maintenance.types.preventive_deep.description'),
            icon: <BuildIcon />,
            color: '#2196F3',
            category: 'preventive',
        },
        {
            id: 'corrective-repair',
            name: t('maintenance.types.corrective_repair.name'),
            description: t('maintenance.types.corrective_repair.description'),
            icon: <WarningIcon />,
            color: '#FF9800',
            category: 'corrective',
        },
        {
            id: 'cleaning',
            name: t('maintenance.types.cleaning.name'),
            description: t('maintenance.types.cleaning.description'),
            icon: <CleaningServicesIcon />,
            color: '#9C27B0',
            category: 'preventive',
        },
        {
            id: 'calibration',
            name: t('maintenance.types.calibration.name'),
            description: t('maintenance.types.calibration.description'),
            icon: <SettingsIcon />,
            color: '#607D8B',
            category: 'preventive',
        },
        {
            id: 'validation',
            name: t('maintenance.types.validation.name'),
            description: t('maintenance.types.validation.description'),
            icon: <CheckCircleIcon />,
            color: '#795548',
            category: 'predictive',
        },
    ];
    const handleSelectType = (type: MaintenanceType) => {
        onSelectMaintenanceType(type);
        onClose();
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'preventive':
                return '#E8F5E8';
            case 'corrective':
                return '#FFF3E0';
            case 'predictive':
                return '#E3F2FD';
            default:
                return '#F5F5F5';
        }
    };

    const getCategoryTitle = (category: string) => {
        switch (category) {
            case 'preventive':
                return t('maintenance.types.categories.preventive');
            case 'corrective':
                return t('maintenance.types.categories.corrective');
            case 'predictive':
                return t('maintenance.types.categories.predictive');
            default:
                return t('maintenance.types.categories.others');
        }
    };

    const groupedTypes = maintenanceTypes.reduce(
        (acc, type) => {
            if (!acc[type.category]) {
                acc[type.category] = [];
            }
            acc[type.category].push(type);
            return acc;
        },
        {} as Record<string, MaintenanceType[]>,
    );

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
                },
            }}
        >
            <DialogTitle
                sx={{
                    background:
                        'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)', // Azul del sistema
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '12px 12px 0 0',
                    py: 2.5,
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
                            {t('maintenance.types.title')}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {equipment.instrument} - {equipment.model}
                        </Typography>
                    </Box>
                </Box>
                <IconButton onClick={onClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3, backgroundColor: '#fafafa' }}>
                <Typography
                    variant="body1"
                    sx={{ mb: 3, color: '#666', textAlign: 'center' }}
                >
                    {t('maintenance.types.select_description')}
                </Typography>

                {Object.entries(groupedTypes).map(([category, types]) => (
                    <Box key={category} sx={{ mb: 3 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                color: '#333',
                                fontWeight: 600,
                                px: 2,
                                py: 1,
                                backgroundColor: getCategoryColor(category),
                                borderRadius: 2,
                                borderLeft: `4px solid ${types[0]?.color || '#ccc'}`,
                            }}
                        >
                            {t('maintenance.types.maintenance_prefix')}{' '}
                            {getCategoryTitle(category)}
                        </Typography>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns:
                                    'repeat(auto-fit, minmax(280px, 1fr))',
                                gap: 2,
                            }}
                        >
                            {types.map((type) => (
                                <Box key={type.id}>
                                    <Card
                                        sx={{
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            borderRadius: 2,
                                            border: '2px solid transparent',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow:
                                                    '0 8px 25px rgba(0,0,0,0.15)',
                                                border: `2px solid ${type.color}`,
                                            },
                                        }}
                                        onClick={() => handleSelectType(type)}
                                    >
                                        <CardContent sx={{ p: 2.5 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 2,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        p: 1.5,
                                                        borderRadius: 2,
                                                        backgroundColor: `${type.color}15`,
                                                        color: type.color,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                    }}
                                                >
                                                    {type.icon}
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: '#333',
                                                            mb: 0.5,
                                                        }}
                                                    >
                                                        {type.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#666',
                                                            lineHeight: 1.4,
                                                        }}
                                                    >
                                                        {type.description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
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
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default MaintenanceTypesModal;
