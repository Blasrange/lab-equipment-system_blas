import { useTranslation } from '@/hooks/use-translation';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
    Box,
    Button,
    FormControlLabel,
    IconButton,
    Modal,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import * as React from 'react';

interface EditEquipmentModalProps {
    open: boolean;
    onClose: () => void;
    onUpdate: (data: any) => void;
    equipment: any;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 900,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '24px',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto',
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '16px',
};

const roundedFieldStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px', // Bordes más redondeados
        height: '40px', // Altura fija más delgada
        '& input': {
            padding: '8px 14px', // Padding reducido
        },
        '& fieldset': {
            borderColor: '#ccc',
        },
        '&:hover fieldset': {
            borderColor: '#aaa',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
        },
    },
    '& .MuiInputLabel-root': {
        transform: 'translate(14px, 10px) scale(1)', // Ajustar posición del label
        '&.Mui-focused, &.MuiFormLabel-filled': {
            transform: 'translate(14px, -9px) scale(0.75)',
        },
    },
};

// Estilo específico para campos de fecha
const dateFieldStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px', // Bordes más redondeados
        height: '40px', // Altura fija más delgada
        '& input': {
            padding: '8px 14px', // Padding reducido
            fontSize: '0.875rem', // Tamaño de fuente ligeramente más pequeño
        },
        '& fieldset': {
            borderColor: '#ccc',
        },
        '&:hover fieldset': {
            borderColor: '#aaa',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
        },
    },
    '& .MuiInputLabel-root': {
        transform: 'translate(14px, -9px) scale(0.75)', // Label siempre arriba y más pequeño
        transformOrigin: 'top left',
        '&.Mui-focused': {
            transform: 'translate(14px, -9px) scale(0.75)',
            color: '#1976d2',
        },
    },
};

export default function EditEquipmentModal({
    open,
    onClose,
    onUpdate,
    equipment,
}: EditEquipmentModalProps) {
    const { t } = useTranslation();

    // Función para convertir fecha del backend al formato YYYY-MM-DD
    const formatDateForInput = (dateString: string | null): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        return date.toISOString().split('T')[0];
    };

    const [form, setForm] = React.useState({
        instrument: equipment?.instrument || '',
        int_code: equipment?.int_code || '',
        brand: equipment?.brand || '',
        model: equipment?.model || '',
        serial_number: equipment?.serial_number || '',
        system_number: equipment?.system_number || '',
        ext_calibration_periodicity:
            equipment?.ext_calibration_periodicity || '',
        internal_check_periodicity: equipment?.internal_check_periodicity || '',
        last_ext_calibration: formatDateForInput(
            equipment?.last_ext_calibration,
        ),
        next_ext_calibration: formatDateForInput(
            equipment?.next_ext_calibration,
        ),
        active: equipment?.active ?? true,
    });

    React.useEffect(() => {
        setForm({
            instrument: equipment?.instrument || '',
            int_code: equipment?.int_code || '',
            brand: equipment?.brand || '',
            model: equipment?.model || '',
            serial_number: equipment?.serial_number || '',
            system_number: equipment?.system_number || '',
            ext_calibration_periodicity:
                equipment?.ext_calibration_periodicity || '',
            internal_check_periodicity:
                equipment?.internal_check_periodicity || '',
            last_ext_calibration: formatDateForInput(
                equipment?.last_ext_calibration,
            ),
            next_ext_calibration: formatDateForInput(
                equipment?.next_ext_calibration,
            ),
            active: equipment?.active ?? true,
        });
    }, [equipment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(form);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                {/* Encabezado con icono y botón de cerrar */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        {/* Icono de editar */}
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                backgroundColor: '#1976d2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <EditIcon sx={{ color: 'white', fontSize: 18 }} />
                        </Box>
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{ fontWeight: 'bold', color: '#1976d2' }}
                        >
                            {t('equipment.edit')}
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                        aria-label={t('common.close')}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <form onSubmit={handleSubmit}>
                    <div style={gridStyle}>
                        <TextField
                            fullWidth
                            margin="dense"
                            label={t('equipment.name')}
                            name="instrument"
                            value={form.instrument}
                            onChange={handleChange}
                            sx={roundedFieldStyle}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            label={t('equipment.code')}
                            name="int_code"
                            value={form.int_code}
                            onChange={handleChange}
                            sx={roundedFieldStyle}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            label={t('equipment.brand')}
                            name="brand"
                            value={form.brand}
                            onChange={handleChange}
                            sx={roundedFieldStyle}
                        />
                    </div>
                    <div style={gridStyle}>
                        <TextField
                            fullWidth
                            margin="dense"
                            label={t('equipment.model')}
                            name="model"
                            value={form.model}
                            onChange={handleChange}
                            sx={roundedFieldStyle}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            label={t('equipment.serial')}
                            name="serial_number"
                            value={form.serial_number}
                            onChange={handleChange}
                            sx={roundedFieldStyle}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            label={t('equipment.system_number')}
                            name="system_number"
                            value={form.system_number}
                            onChange={handleChange}
                            sx={roundedFieldStyle}
                        />
                    </div>
                    <div style={gridStyle}>
                        <TextField
                            fullWidth
                            margin="dense"
                            label={t('equipment.ext_calibration_periodicity')}
                            name="ext_calibration_periodicity"
                            value={form.ext_calibration_periodicity}
                            onChange={handleChange}
                            sx={roundedFieldStyle}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            label={t('equipment.internal_check_periodicity')}
                            name="internal_check_periodicity"
                            value={form.internal_check_periodicity}
                            onChange={handleChange}
                            sx={roundedFieldStyle}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.active}
                                    onChange={(_, checked) =>
                                        setForm({
                                            ...form,
                                            active: checked,
                                        })
                                    }
                                    color="primary"
                                />
                            }
                            label={
                                form.active
                                    ? t('status.active')
                                    : t('status.inactive')
                            }
                            sx={{ mt: 2, ml: 2 }}
                        />
                    </div>
                    <div
                        style={{
                            ...gridStyle,
                            gridTemplateColumns: 'repeat(2, 1fr)',
                        }}
                    >
                        <TextField
                            fullWidth
                            margin="dense"
                            label={t('equipment.last_ext_calibration')}
                            name="last_ext_calibration"
                            type="date"
                            value={form.last_ext_calibration}
                            onChange={handleChange}
                            sx={dateFieldStyle}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            label={t('equipment.next_ext_calibration')}
                            name="next_ext_calibration"
                            type="date"
                            value={form.next_ext_calibration}
                            onChange={handleChange}
                            sx={dateFieldStyle}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    {/* Botones de acción con iconos */}
                    <Box display="flex" gap={2} mt={3}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleCancel}
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
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                borderRadius: '20px',
                                height: '40px', // Misma altura que los campos
                                minHeight: '40px', // Asegurar altura mínima
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                            startIcon={<SaveIcon />}
                        >
                            {t('common.update')}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}
