import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/contexts/translation-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import {
    Bell,
    Calendar,
    CheckCircle2,
    Clock,
    FileSpreadsheet,
    History,
    Mail,
    Play,
    Save,
    Settings,
    X,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';
import NotificationExcelExportModal from './NotificationExcelExportModal';

interface NotificationSetting {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    days_before: number;
    email_addresses: string[];
    email_template?: string;
    notification_types: string[];
    created_at: string;
    updated_at: string;
}

interface Stats {
    total_settings: number;
    active_settings: number;
    pending_notifications: number;
    sent_today: number;
    failed_notifications: number;
}

interface Props {
    settings: NotificationSetting[];
    stats: Stats;
}

const NotificationTypeIcons = {
    calibration_due: Calendar,
    maintenance_reminder: Clock,
    maintenance_completed: CheckCircle2,
    maintenance_overdue: XCircle,
};

const NotificationTypeColors = {
    calibration_due: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    maintenance_reminder: 'bg-blue-100 text-blue-800 border-blue-200',
    maintenance_completed: 'bg-green-100 text-green-800 border-green-200',
    maintenance_overdue: 'bg-red-100 text-red-800 border-red-200',
};

export default function NotificationSettings({ settings, stats }: Props) {
    const { t } = useTranslation();

    const NotificationTypeLabels = {
        calibration_due: t('notifications.types.calibration_due'),
        maintenance_reminder: t('notifications.types.maintenance_reminder'),
        maintenance_completed: t('notifications.types.maintenance_completed'),
        maintenance_overdue: t('notifications.types.maintenance_overdue'),
    };

    const NotificationTypeDescriptions = {
        calibration_due: t('notifications.descriptions.calibration_due'),
        maintenance_reminder: t(
            'notifications.descriptions.maintenance_reminder',
        ),
        maintenance_completed: t(
            'notifications.descriptions.maintenance_completed',
        ),
        maintenance_overdue: t(
            'notifications.descriptions.maintenance_overdue',
        ),
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('notifications.breadcrumb'),
            href: '/notifications',
        },
    ];
    const [selectedSetting, setSelectedSetting] =
        useState<NotificationSetting | null>(null);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showHistoryDialog, setShowHistoryDialog] = useState(false);
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    // Estados para el modal de exportación a Excel
    const [excelModalOpen, setExcelModalOpen] = useState(false);
    const [excelLoading, setExcelLoading] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        is_active: false,
        days_before: 0,
        email_addresses: [] as string[],
    });

    const { post: postProcess } = useForm();

    const handleEditSetting = (setting: NotificationSetting) => {
        setSelectedSetting(setting);
        setData({
            is_active: setting.is_active,
            days_before: setting.days_before,
            email_addresses: setting.email_addresses || [],
        });
        setShowEditDialog(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSetting) return;

        put(`/notifications/settings/${selectedSetting.id}`, {
            onSuccess: () => {
                setShowEditDialog(false);
                reset();
                setSelectedSetting(null);
            },
        });
    };

    const handleProcessNow = () => {
        postProcess('/notifications/process');
    };

    const handleEmailAddressChange = (index: number, value: string) => {
        const newEmails = [...data.email_addresses];
        newEmails[index] = value;
        setData('email_addresses', newEmails);
    };

    const addEmailAddress = () => {
        setData('email_addresses', [...data.email_addresses, '']);
    };

    const removeEmailAddress = (index: number) => {
        const newEmails = data.email_addresses.filter((_, i) => i !== index);
        setData('email_addresses', newEmails);
    };

    // Función para manejar la exportación a Excel
    const handleExcelExport = async (startDate: string, endDate: string) => {
        setExcelLoading(true);

        try {
            console.log('Iniciando exportación de notificaciones con fechas:', {
                startDate,
                endDate,
            });

            const response = await axios.post(
                '/notifications/export-excel',
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
            link.download = `historial_notificaciones_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            console.log(
                'Exportación de notificaciones completada exitosamente',
            );

            // Cerrar modal
            setExcelModalOpen(false);
        } catch (error: any) {
            console.error('Error detallado al exportar notificaciones:', error);

            let errorMessage = t('notifications.export.error');

            if (error.response) {
                console.error(
                    'Respuesta del servidor:',
                    error.response.status,
                    error.response.data,
                );
                if (error.response.status === 422) {
                    errorMessage = t('notifications.export.validation_error');
                } else if (error.response.status === 500) {
                    errorMessage = t('notifications.export.server_error');
                }
            } else if (error.request) {
                console.error(
                    'No se recibió respuesta del servidor:',
                    error.request,
                );
                errorMessage = t('notifications.export.connection_error');
            }

            alert(errorMessage);
        } finally {
            setExcelLoading(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('notifications.breadcrumb')} />

            <div className="flex w-full flex-col items-center px-2 py-4 md:px-8 md:py-8">
                {/* Header idéntico al dashboard */}
                <div className="mb-6 flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30">
                            <Bell className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-3xl font-bold text-transparent">
                            {t('notifications.title')}
                        </h1>
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            onClick={() => setExcelModalOpen(true)}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-4 py-2 font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:transform hover:from-green-700 hover:to-green-800 hover:shadow-xl"
                        >
                            <FileSpreadsheet className="h-4 w-4" />
                            {t('notifications.export.excel')}
                        </Button>
                        <Link href="/notifications/history">
                            <Button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:transform hover:from-blue-700 hover:to-blue-800 hover:shadow-xl">
                                <History className="h-4 w-4" />
                                {t('notifications.history')}
                            </Button>
                        </Link>
                        {/* <Link href="/notifications/test">
                            <Button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:transform hover:from-blue-700 hover:to-blue-800 hover:shadow-xl">
                                <TestTube className="h-4 w-4" />
                                {t('notifications.test')}
                            </Button>
                        </Link> */}
                        <Button
                            onClick={handleProcessNow}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:transform hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
                        >
                            <Play className="h-4 w-4" />
                            {t('notifications.process_now')}
                        </Button>
                    </div>
                </div>

                {/* Stats Cards IDÉNTICOS al dashboard */}
                <div className="mb-8 w-full">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">
                        📊 {t('notifications.stats.title')}
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                        {/* Total Configuraciones */}
                        <Card className="rounded-xl shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-blue-500/20">
                            <CardContent className="p-4 text-center">
                                <div className="mb-2 flex items-center justify-center gap-2">
                                    <Settings className="h-6 w-6 text-blue-500" />
                                    <span className="text-sm font-medium text-gray-600">
                                        {t(
                                            'notifications.stats.total_settings',
                                        )}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-blue-600">
                                    {stats.total_settings}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Configuraciones Activas */}
                        <Card className="rounded-xl shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-green-500/20">
                            <CardContent className="p-4 text-center">
                                <div className="mb-2 flex items-center justify-center gap-2">
                                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                                    <span className="text-sm font-medium text-gray-600">
                                        {t(
                                            'notifications.stats.active_settings',
                                        )}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats.active_settings}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Pendientes */}
                        <Card className="rounded-xl shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-yellow-500/20">
                            <CardContent className="p-4 text-center">
                                <div className="mb-2 flex items-center justify-center gap-2">
                                    <Clock className="h-6 w-6 text-yellow-500" />
                                    <span className="text-sm font-medium text-gray-600">
                                        {t('notifications.stats.pending')}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {stats.pending_notifications}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Enviadas Hoy */}
                        <Card className="rounded-xl shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-blue-500/20">
                            <CardContent className="p-4 text-center">
                                <div className="mb-2 flex items-center justify-center gap-2">
                                    <Mail className="h-6 w-6 text-blue-500" />
                                    <span className="text-sm font-medium text-gray-600">
                                        {t('notifications.stats.sent_today')}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-blue-600">
                                    {stats.sent_today}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Fallidas */}
                        <Card className="rounded-xl shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-red-500/20">
                            <CardContent className="p-4 text-center">
                                <div className="mb-2 flex items-center justify-center gap-2">
                                    <XCircle className="h-6 w-6 text-red-500" />
                                    <span className="text-sm font-medium text-gray-600">
                                        {t('notifications.stats.failed')}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-red-600">
                                    {stats.failed_notifications}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Cards de Configuraciones con mismo estilo */}
                <div className="w-full space-y-6">
                    <Card className="rounded-xl shadow-lg">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                                <Bell className="mr-3 h-6 w-6 text-blue-600" />
                                {t('notifications.settings.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="space-y-4">
                                {settings.map((setting) => {
                                    const Icon =
                                        NotificationTypeIcons[
                                            setting.name as keyof typeof NotificationTypeIcons
                                        ];
                                    const label =
                                        NotificationTypeLabels[
                                            setting.name as keyof typeof NotificationTypeLabels
                                        ];
                                    const description =
                                        NotificationTypeDescriptions[
                                            setting.name as keyof typeof NotificationTypeDescriptions
                                        ];
                                    const badgeColor =
                                        NotificationTypeColors[
                                            setting.name as keyof typeof NotificationTypeColors
                                        ];

                                    return (
                                        <Card
                                            key={setting.id}
                                            className="rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md"
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        {Icon && (
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                                                                <Icon className="h-5 w-5 text-blue-600" />
                                                            </div>
                                                        )}
                                                        <div className="flex-1">
                                                            <div className="mb-1 flex items-center space-x-2">
                                                                <h3 className="text-base font-semibold text-gray-900">
                                                                    {label}
                                                                </h3>
                                                                <Badge
                                                                    variant="outline"
                                                                    className={`${badgeColor} text-xs`}
                                                                >
                                                                    {
                                                                        setting.name
                                                                    }
                                                                </Badge>
                                                                {setting.is_active ? (
                                                                    <Badge className="border-green-200 bg-green-100 text-xs text-green-800">
                                                                        {t(
                                                                            'notifications.settings.active',
                                                                        )}
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge className="border-gray-200 bg-gray-100 text-xs text-gray-600">
                                                                        {t(
                                                                            'notifications.settings.inactive',
                                                                        )}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="mb-2 text-sm text-gray-600">
                                                                {description}
                                                            </p>
                                                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                                <span className="flex items-center gap-1">
                                                                    <Calendar className="h-3 w-3" />
                                                                    {
                                                                        setting.days_before
                                                                    }{' '}
                                                                    {t(
                                                                        'notifications.settings.days_before',
                                                                    )}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <Mail className="h-3 w-3" />
                                                                    {setting
                                                                        .email_addresses
                                                                        ?.length ||
                                                                        0}{' '}
                                                                    {t(
                                                                        'notifications.settings.recipients',
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        onClick={() =>
                                                            handleEditSetting(
                                                                setting,
                                                            )
                                                        }
                                                        size="sm"
                                                        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:transform hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                                                    >
                                                        <Settings className="h-4 w-4" />
                                                        {t(
                                                            'notifications.settings.configure',
                                                        )}
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Edit Setting Dialog con botones azules */}
                <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                    <DialogContent className="max-w-md rounded-xl">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold">
                                {t('notifications.edit.title')}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedSetting && (
                                    <>
                                        {t('notifications.edit.description')}{' '}
                                        {
                                            NotificationTypeLabels[
                                                selectedSetting.name as keyof typeof NotificationTypeLabels
                                            ]
                                        }
                                    </>
                                )}
                            </DialogDescription>
                        </DialogHeader>

                        {selectedSetting && (
                            <form
                                onSubmit={handleSubmit}
                                className="mt-6 space-y-6"
                            >
                                <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4">
                                    <Switch
                                        checked={data.is_active}
                                        onCheckedChange={(checked) =>
                                            setData('is_active', checked)
                                        }
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                                    />
                                    <Label className="font-medium">
                                        {t(
                                            'notifications.edit.active_notification',
                                        )}
                                    </Label>
                                </div>

                                <div className="space-y-3">
                                    <Label
                                        htmlFor="days_before"
                                        className="text-sm font-medium"
                                    >
                                        {t(
                                            'notifications.edit.days_before_label',
                                        )}
                                    </Label>
                                    <Input
                                        id="days_before"
                                        type="number"
                                        min="0"
                                        max="365"
                                        value={data.days_before}
                                        onChange={(e) =>
                                            setData(
                                                'days_before',
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                        className="rounded-lg"
                                    />
                                    <p className="text-sm text-gray-500">
                                        {t(
                                            'notifications.edit.days_before_help',
                                        )}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm font-medium">
                                            {t(
                                                'notifications.edit.email_addresses',
                                            )}
                                        </Label>
                                        <Button
                                            type="button"
                                            onClick={addEmailAddress}
                                            size="sm"
                                            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:transform hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                                        >
                                            {t('notifications.edit.add_email')}
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        {data.email_addresses.map(
                                            (email, index) => (
                                                <div
                                                    key={index}
                                                    className="flex space-x-3"
                                                >
                                                    <Input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) =>
                                                            handleEmailAddressChange(
                                                                index,
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder={t(
                                                            'notifications.edit.email_placeholder',
                                                        )}
                                                        className="rounded-lg"
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClick={() =>
                                                            removeEmailAddress(
                                                                index,
                                                            )
                                                        }
                                                        size="sm"
                                                        className="rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-3 py-1.5 font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:transform hover:from-red-700 hover:to-red-800 hover:shadow-lg"
                                                    >
                                                        ×
                                                    </Button>
                                                </div>
                                            ),
                                        )}
                                        {data.email_addresses.length === 0 && (
                                            <p className="text-sm text-gray-500">
                                                {t(
                                                    'notifications.edit.no_emails',
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowEditDialog(false)}
                                        className="rounded-xl border-2 border-blue-600 px-6 py-2 font-semibold text-blue-600 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:transform hover:bg-blue-50 hover:shadow-lg"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        {t('notifications.edit.cancel')}
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="min-w-[100px] rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2 font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:transform hover:from-blue-700 hover:to-blue-800 hover:shadow-lg disabled:transform-none disabled:opacity-50"
                                    >
                                        <Save className="mr-2 h-4 w-4" />
                                        {t('notifications.edit.save')}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Excel Export Modal */}
                <NotificationExcelExportModal
                    open={excelModalOpen}
                    onClose={() => setExcelModalOpen(false)}
                    onExport={handleExcelExport}
                    loading={excelLoading}
                />
            </div>
        </AppLayout>
    );
}
