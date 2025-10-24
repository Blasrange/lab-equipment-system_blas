import { useTranslation } from '@/contexts/translation-context';
import {
    Close as CloseIcon,
    Download as DownloadIcon,
    Print as PrintIcon,
    QrCode as QrCodeIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Paper,
    Typography,
} from '@mui/material';
import React, { useRef } from 'react';

interface QrModalProps {
    open: boolean;
    onClose: () => void;
    equipment: {
        id: number;
        instrument: string;
        int_code: string;
        brand: string;
        model: string;
        serial_number: string;
    };
    qrImageUrl: string;
    onOpenTaskManagement?: (equipment: any) => void;
}

const QrModal: React.FC<QrModalProps> = ({
    open,
    onClose,
    equipment,
    qrImageUrl,
    onOpenTaskManagement,
}) => {
    const { t, language } = useTranslation();
    const printRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = qrImageUrl;
        link.download = `qr-${equipment.int_code}-${equipment.instrument.replace(/\s+/g, '-')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        const printContent = printRef.current;
        if (!printContent) return;

        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        printWindow.document.write(`
            <html>
                <head>
                    <title>${t('qr.modal.title')} - ${equipment.instrument}</title>
                    <style>
                        body {
                            font-family: 'Roboto', Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                            background: white;
                        }
                        .print-container {
                            max-width: 600px;
                            margin: 0 auto;
                            text-align: center;
                        }
                        .header {
                            margin-bottom: 30px;
                            border-bottom: 2px solid #3b82f6;
                            padding-bottom: 20px;
                        }
                        .title {
                            font-size: 24px;
                            font-weight: bold;
                            color: #1a202c;
                            margin-bottom: 10px;
                        }
                        .subtitle {
                            font-size: 16px;
                            color: #4a5568;
                            margin-bottom: 5px;
                        }
                        .qr-section {
                            margin: 30px 0;
                            padding: 20px;
                            border: 2px dashed #e2e8f0;
                            background: #f8fafc;
                        }
                        .qr-image {
                            max-width: 300px;
                            height: auto;
                            margin: 20px 0;
                        }
                        .equipment-details {
                            margin-top: 30px;
                            text-align: left;
                            background: #f7fafc;
                            padding: 20px;
                            border-radius: 8px;
                        }
                        .detail-row {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 10px;
                            padding: 8px 0;
                            border-bottom: 1px solid #e2e8f0;
                        }
                        .detail-label {
                            font-weight: bold;
                            color: #2d3748;
                        }
                        .detail-value {
                            color: #4a5568;
                        }
                        .instructions {
                            margin-top: 30px;
                            padding: 20px;
                            background: #ebf8ff;
                            border-left: 4px solid #3b82f6;
                            text-align: left;
                        }
                        .footer {
                            margin-top: 40px;
                            padding-top: 20px;
                            border-top: 1px solid #e2e8f0;
                            font-size: 12px;
                            color: #718096;
                        }
                        @media print {
                            body { margin: 0; }
                            .print-container { max-width: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="print-container">
                        <div class="header">
                            <div class="title">🔧 ${t('qr.modal.subtitle')}</div>
                            <div class="subtitle">${t('qr.modal.qr_subtitle')}</div>
                        </div>
                        
                        <div class="qr-section">
                            <h3 style="color: #3b82f6; margin-bottom: 15px;">${t('qr.modal.scan_title')}</h3>
                            <img src="${qrImageUrl}" alt="QR Code" class="qr-image" />
                        </div>
                        
                        <div class="equipment-details">
                            <h4 style="color: #2d3748; margin-bottom: 15px;">${t('qr.modal.equipment_details')}</h4>
                            <div class="detail-row">
                                <span class="detail-label">${t('qr.modal.equipment.instrument')}</span>
                                <span class="detail-value">${equipment.instrument}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">${t('qr.modal.equipment.internal_code')}</span>
                                <span class="detail-value">${equipment.int_code}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">${t('qr.modal.equipment.brand')}</span>
                                <span class="detail-value">${equipment.brand}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">${t('qr.modal.equipment.model')}</span>
                                <span class="detail-value">${equipment.model}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">${t('qr.modal.equipment.serial_number')}</span>
                                <span class="detail-value">${equipment.serial_number}</span>
                            </div>
                        </div>
                        
                        <div class="instructions">
                            <h4 style="color: #2b6cb0; margin-bottom: 10px;">${t('qr.modal.usage_instructions')}</h4>
                            <ol style="margin: 0; padding-left: 20px; color: #4a5568;">
                                <li>${t('qr.modal.instructions.scan')}</li>
                                <li>${t('qr.modal.instructions.access')}</li>
                                <li>${t('qr.modal.instructions.view')}</li>
                                <li>${t('qr.modal.instructions.update')}: ${t('qr.modal.status_flow')}</li>
                                <li>${t('qr.modal.instructions.create')}</li>
                            </ol>
                        </div>
                        
                        <div class="footer">
                            <p>${t('qr.modal.footer.generated')} ${new Date().toLocaleDateString(
                                language === 'es' ? 'es-CO' : 'en-US',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                },
                            )}</p>
                            <p>${t('qr.modal.footer.system')}</p>
                        </div>
                    </div>
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();

        // Esperar a que la imagen se cargue antes de imprimir
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 1000);
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
                    background:
                        'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                },
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                background:
                                    'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <QrCodeIcon sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 'bold', color: '#1a202c' }}
                            >
                                {t('qr.modal.title')} - {equipment.instrument}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: '#718096' }}
                            >
                                {equipment.brand} {equipment.model} -{' '}
                                {equipment.int_code}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ pb: 2 }}>
                <div ref={printRef}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            background:
                                'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                            border: '2px dashed #e2e8f0',
                            borderRadius: 3,
                            mb: 3,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ mb: 2, color: '#3b82f6', fontWeight: 'bold' }}
                        >
                            {t('qr.modal.scan_title')}
                        </Typography>

                        <Box
                            sx={{
                                display: 'inline-block',
                                p: 2,
                                background: 'white',
                                borderRadius: 2,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            }}
                        >
                            <img
                                src={qrImageUrl}
                                alt="QR Code"
                                style={{
                                    maxWidth: '300px',
                                    height: 'auto',
                                    display: 'block',
                                }}
                            />
                        </Box>

                        <Typography
                            variant="body2"
                            sx={{ mt: 2, color: '#718096' }}
                        >
                            {t('qr.modal.access_description')}
                        </Typography>
                    </Paper>

                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{ mb: 2, color: '#2d3748', fontWeight: 'bold' }}
                        >
                            {t('qr.modal.equipment_info')}
                        </Typography>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: 2,
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#4a5568',
                                    }}
                                >
                                    {t('qr.modal.equipment.instrument')}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: '#2d3748', mb: 1 }}
                                >
                                    {equipment.instrument}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#4a5568',
                                    }}
                                >
                                    {t('qr.modal.equipment.internal_code')}
                                </Typography>
                                <Chip
                                    label={equipment.int_code}
                                    size="small"
                                    sx={{
                                        bgcolor: '#3b82f615',
                                        color: '#3b82f6',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#4a5568',
                                    }}
                                >
                                    {t('qr.modal.equipment.brand')}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: '#2d3748', mb: 1 }}
                                >
                                    {equipment.brand}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#4a5568',
                                    }}
                                >
                                    {t('qr.modal.equipment.model')}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: '#2d3748', mb: 1 }}
                                >
                                    {equipment.model}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box
                            sx={{
                                bgcolor: '#ebf8ff',
                                p: 2,
                                borderRadius: 2,
                                borderLeft: '4px solid #3b82f6',
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#2b6cb0',
                                    mb: 1,
                                }}
                            >
                                {t('qr.modal.instructions.title')}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: '#4a5568', lineHeight: 1.6 }}
                            >
                                • {t('qr.modal.instructions.scan')}
                                <br />• {t('qr.modal.instructions.access')}
                                <br />• {t('qr.modal.instructions.view')}
                                <br />• {t('qr.modal.instructions.update')}
                                <br />• {t('qr.modal.instructions.create')}
                            </Typography>
                        </Box>
                    </Paper>
                </div>
            </DialogContent>

            <DialogActions sx={{ p: 3, gap: 1 }}>
                {onOpenTaskManagement && (
                    <Button
                        variant="outlined"
                        startIcon={<QrCodeIcon />}
                        onClick={() => onOpenTaskManagement(equipment)}
                        sx={{
                            borderColor: '#8b5cf6',
                            color: '#8b5cf6',
                            '&:hover': {
                                borderColor: '#7c3aed',
                                backgroundColor: '#8b5cf615',
                            },
                        }}
                    >
                        {t('qr.modal.buttons.manage_tasks')}
                    </Button>
                )}

                <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownload}
                    sx={{
                        borderColor: '#10b981',
                        color: '#10b981',
                        '&:hover': {
                            borderColor: '#059669',
                            backgroundColor: '#10b98115',
                        },
                    }}
                >
                    {t('qr.modal.buttons.download')}
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={handlePrint}
                    sx={{
                        borderColor: '#f59e0b',
                        color: '#f59e0b',
                        '&:hover': {
                            borderColor: '#d97706',
                            backgroundColor: '#f59e0b15',
                        },
                    }}
                >
                    {t('qr.modal.buttons.print')}
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<CloseIcon />}
                    onClick={onClose}
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
                    {t('qr.modal.buttons.cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QrModal;
