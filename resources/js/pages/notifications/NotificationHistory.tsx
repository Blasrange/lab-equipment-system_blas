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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useTranslation } from '@/contexts/translation-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import {
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Clock,
    Eye,
    Filter,
    Mail,
    RotateCcw,
    Search,
    XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface EmailNotification {
    id: number;
    equipment_id: number;
    maintenance_record_id?: number;
    notification_type: string;
    subject: string;
    message: string;
    recipients: string[];
    status: 'pending' | 'sent' | 'failed';
    sent_at?: string;
    error_message?: string;
    created_at: string;
    equipment?: {
        id: number;
        instrument: string;
        int_code: string;
    };
    maintenanceRecord?: {
        id: number;
        maintenance_type_name: string;
    };
}

interface PaginatedData {
    data: EmailNotification[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

interface Filters {
    search?: string;
    status?: string;
    notification_type?: string;
    date_from?: string;
    date_to?: string;
}

interface Props {
    notifications: PaginatedData;
    filters: Filters;
}

const StatusIcons = {
    pending: Clock,
    sent: CheckCircle,
    failed: XCircle,
};

const StatusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    sent: 'bg-green-100 text-green-800 border-green-200',
    failed: 'bg-red-100 text-red-800 border-red-200',
};

export default function NotificationHistory({ notifications, filters }: Props) {
    const { t } = useTranslation();

    const NotificationTypeLabels = {
        calibration_due: t('notifications.types.calibration_due'),
        maintenance_reminder: t('notifications.types.maintenance_reminder'),
        maintenance_completed: t('notifications.types.maintenance_completed'),
        maintenance_overdue: t('notifications.types.maintenance_overdue'),
        test: t('notifications.history.type.test'),
    };

    const NotificationStatusLabels = {
        pending: t('notifications.history.status.pending'),
        sent: t('notifications.history.status.sent'),
        failed: t('notifications.history.status.failed'),
    };

    const NotificationTypeColors = {
        calibration_due: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        maintenance_reminder: 'bg-blue-100 text-blue-800 border-blue-200',
        maintenance_completed: 'bg-green-100 text-green-800 border-green-200',
        maintenance_overdue: 'bg-red-100 text-red-800 border-red-200',
        test: 'bg-purple-100 text-purple-800 border-purple-200',
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('notifications.breadcrumb'),
            href: '/notifications',
        },
        {
            title: t('notifications.history.breadcrumb'),
            href: '/notifications/history',
        },
    ];
    const [selectedNotification, setSelectedNotification] =
        useState<EmailNotification | null>(null);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [page, setPage] = useState(notifications.current_page || 1);
    const [rowsPerPage, setRowsPerPage] = useState(notifications.per_page || 5);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Sincronizar estado local con props
    useEffect(() => {
        setPage(notifications.current_page);
        setRowsPerPage(notifications.per_page);
    }, [notifications.current_page, notifications.per_page]);

    // Marcar que ya no es carga inicial después del primer render
    useEffect(() => {
        setIsInitialLoad(false);
    }, []);

    const { data, setData, get, processing } = useForm<Filters>({
        search: (filters as any).search || '',
        status: filters.status || 'all',
        notification_type: filters.notification_type || 'all',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });

    const { post } = useForm();

    const handleFilter = (resetPage = true) => {
        const params: any = {};

        // Solo agregar parámetros con valores significativos
        if (data.search && data.search.trim()) {
            params.search = data.search.trim();
        }
        if (data.status && data.status !== 'all') {
            params.status = data.status;
        }
        if (data.notification_type && data.notification_type !== 'all') {
            params.notification_type = data.notification_type;
        }
        if (data.date_from && data.date_from.trim()) {
            params.date_from = data.date_from;
        }
        if (data.date_to && data.date_to.trim()) {
            params.date_to = data.date_to;
        }

        // Solo agregar página si no es la primera
        if (!resetPage && page > 1) {
            params.page = page.toString();
        }

        // Solo agregar per_page si no es el valor por defecto (5)
        if (rowsPerPage !== 5) {
            params.per_page = rowsPerPage.toString();
        }

        // Si no hay parámetros, ir a la URL base
        if (Object.keys(params).length === 0) {
            get('/notifications/history', {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        } else {
            const queryString = new URLSearchParams(params).toString();
            get(`/notifications/history?${queryString}`, {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        }
    };

    // Auto filtrar cuando cambie la búsqueda (pero no en la carga inicial)
    useEffect(() => {
        if (isInitialLoad) return; // No ejecutar en la carga inicial

        const timeoutId = setTimeout(() => {
            handleFilter(true);
        }, 300); // Debounce de 300ms

        return () => clearTimeout(timeoutId);
    }, [
        data.search,
        data.status,
        data.notification_type,
        data.date_from,
        data.date_to,
        rowsPerPage,
        isInitialLoad,
    ]);

    const clearFilters = () => {
        setData({
            search: '',
            status: 'all',
            notification_type: 'all',
            date_from: '',
            date_to: '',
        });

        // Ir a la URL base limpia, solo agregar per_page si no es el valor por defecto
        if (rowsPerPage !== 5) {
            get(`/notifications/history?per_page=${rowsPerPage}`, {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        } else {
            get('/notifications/history', {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        }
    };

    const handleChangePage = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;

        const params: any = {};

        // Solo agregar parámetros con valores significativos
        if (data.search && data.search.trim()) {
            params.search = data.search.trim();
        }
        if (data.status && data.status !== 'all') {
            params.status = data.status;
        }
        if (data.notification_type && data.notification_type !== 'all') {
            params.notification_type = data.notification_type;
        }
        if (data.date_from && data.date_from.trim()) {
            params.date_from = data.date_from;
        }
        if (data.date_to && data.date_to.trim()) {
            params.date_to = data.date_to;
        }

        // Solo agregar página si no es la primera
        if (newPage > 1) {
            params.page = newPage.toString();
        }

        // Solo agregar per_page si no es el valor por defecto (5)
        if (rowsPerPage !== 5) {
            params.per_page = rowsPerPage.toString();
        }

        // Si no hay parámetros, ir a la URL base
        if (Object.keys(params).length === 0) {
            get('/notifications/history', {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        } else {
            const queryString = new URLSearchParams(params).toString();
            get(`/notifications/history?${queryString}`, {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        }
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const newRowsPerPage = Number(event.target.value);
        setRowsPerPage(newRowsPerPage);

        const params: any = {};
        if (data.search && data.search.trim()) params.search = data.search;
        if (data.status && data.status !== 'all') params.status = data.status;
        if (data.notification_type && data.notification_type !== 'all')
            params.notification_type = data.notification_type;
        if (data.date_from) params.date_from = data.date_from;
        if (data.date_to) params.date_to = data.date_to;

        params.page = '1';
        if (newRowsPerPage !== 5) {
            params.per_page = newRowsPerPage.toString();
        }

        // Si solo tiene page=1 o está vacío, ir a URL limpia
        if (Object.keys(params).length === 1 && params.page === '1') {
            get('/notifications/history', {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        } else if (Object.keys(params).length === 0) {
            get('/notifications/history', {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        } else {
            // Eliminar page=1 para URL más limpia
            if (params.page === '1') {
                delete params.page;
            }

            const queryString = new URLSearchParams(params).toString();
            get(`/notifications/history?${queryString}`, {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        }
    };

    const handleResend = (notification: EmailNotification) => {
        post(`/notifications/${notification.id}/resend`, {
            onSuccess: () => {
                get('/notifications/history', {
                    preserveState: true,
                    preserveUrl: true,
                    replace: true,
                });
            },
        });
    };

    const viewDetails = (notification: EmailNotification) => {
        setSelectedNotification(notification);
        setShowDetailDialog(true);
    };

    // Variables derivadas
    const totalRows = notifications.total;
    const totalPages = notifications.last_page;

    const formatDate = (dateString: string) => {
        const locale = t('language.spanish') === 'Español' ? 'es-ES' : 'en-US';
        return new Date(dateString).toLocaleString(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('notifications.history.title')} />

            <div className="flex w-full flex-col items-center px-2 py-4 md:px-8 md:py-8">
                {/* Header idéntico al dashboard */}
                <div className="mb-6 flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30">
                            <Mail className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-3xl font-bold text-transparent">
                            {t('notifications.history.title')}
                        </h1>
                    </div>
                </div>

                {/* Filters Card con mismo estilo */}
                <Card className="mb-4 w-full rounded-xl shadow-lg">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                                <Filter className="mr-3 h-6 w-6 text-blue-600" />
                                {t('notifications.history.filters.title')}
                            </CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setShowAdvancedFilters(!showAdvancedFilters)
                                }
                                className="flex items-center gap-2 rounded-lg border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50"
                            >
                                {showAdvancedFilters ? (
                                    <>
                                        <ChevronUp className="h-4 w-4" />
                                        {t(
                                            'notifications.history.filters.hide',
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="h-4 w-4" />
                                        {t(
                                            'notifications.history.filters.show',
                                        )}
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        {/* Filtros Principales - Siempre visibles */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <Label className="font-medium">
                                    {t('notifications.history.search.label')}
                                </Label>
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        placeholder={t(
                                            'notifications.history.search.placeholder',
                                        )}
                                        value={data.search || ''}
                                        onChange={(e) =>
                                            setData('search', e.target.value)
                                        }
                                        className="rounded-lg pl-10"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label className="font-medium">
                                    {t('notifications.history.status.label')}
                                </Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) =>
                                        setData('status', value)
                                    }
                                >
                                    <SelectTrigger className="rounded-lg">
                                        <SelectValue
                                            placeholder={t(
                                                'notifications.history.status.all',
                                            )}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            {t(
                                                'notifications.history.status.all',
                                            )}
                                        </SelectItem>
                                        <SelectItem value="pending">
                                            {t(
                                                'notifications.history.status.pending',
                                            )}
                                        </SelectItem>
                                        <SelectItem value="sent">
                                            {t(
                                                'notifications.history.status.sent',
                                            )}
                                        </SelectItem>
                                        <SelectItem value="failed">
                                            {t(
                                                'notifications.history.status.failed',
                                            )}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="font-medium">
                                    {t('notifications.history.type.label')}
                                </Label>
                                <Select
                                    value={data.notification_type}
                                    onValueChange={(value) =>
                                        setData('notification_type', value)
                                    }
                                >
                                    <SelectTrigger className="rounded-lg">
                                        <SelectValue
                                            placeholder={t(
                                                'notifications.history.type.all',
                                            )}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            {t(
                                                'notifications.history.type.all',
                                            )}
                                        </SelectItem>
                                        <SelectItem value="calibration_due">
                                            {t(
                                                'notifications.history.type.calibration_due',
                                            )}
                                        </SelectItem>
                                        <SelectItem value="maintenance_reminder">
                                            {t(
                                                'notifications.history.type.maintenance_reminder',
                                            )}
                                        </SelectItem>
                                        <SelectItem value="maintenance_completed">
                                            {t(
                                                'notifications.history.type.maintenance_completed',
                                            )}
                                        </SelectItem>
                                        <SelectItem value="maintenance_overdue">
                                            {t(
                                                'notifications.history.type.maintenance_overdue',
                                            )}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Filtros Avanzados - Solo visibles cuando se expanden */}
                        {showAdvancedFilters && (
                            <div className="mt-6 grid grid-cols-1 gap-4 border-t pt-6 md:grid-cols-2">
                                <div>
                                    <Label className="font-medium">
                                        {t('notifications.history.date_from')}
                                    </Label>
                                    <Input
                                        type="date"
                                        value={data.date_from}
                                        onChange={(e) =>
                                            setData('date_from', e.target.value)
                                        }
                                        className="rounded-lg"
                                    />
                                </div>
                                <div>
                                    <Label className="font-medium">
                                        {t('notifications.history.date_to')}
                                    </Label>
                                    <Input
                                        type="date"
                                        value={data.date_to}
                                        onChange={(e) =>
                                            setData('date_to', e.target.value)
                                        }
                                        className="rounded-lg"
                                    />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Notifications Table Card */}
                <Card className="w-full rounded-xl shadow-lg">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold text-gray-900">
                                {t('notifications.history.count')} (
                                {notifications.total})
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t(
                                                'notifications.history.table.date',
                                            )}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t(
                                                'notifications.history.table.type',
                                            )}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t(
                                                'notifications.history.table.equipment',
                                            )}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t(
                                                'notifications.history.table.subject',
                                            )}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t(
                                                'notifications.history.table.recipients',
                                            )}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t(
                                                'notifications.history.table.status',
                                            )}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t(
                                                'notifications.history.table.actions',
                                            )}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notifications.data.map((notification) => {
                                        const StatusIcon =
                                            StatusIcons[notification.status];
                                        const statusColor =
                                            StatusColors[notification.status];
                                        const typeLabel =
                                            NotificationTypeLabels[
                                                notification.notification_type as keyof typeof NotificationTypeLabels
                                            ] || notification.notification_type;
                                        const typeColor =
                                            NotificationTypeColors[
                                                notification.notification_type as keyof typeof NotificationTypeColors
                                            ] ||
                                            'bg-gray-100 text-gray-800 border-gray-200';

                                        return (
                                            <tr
                                                key={notification.id}
                                                className="border-b hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="text-sm font-medium">
                                                        {formatDate(
                                                            notification.created_at,
                                                        )}
                                                    </div>
                                                    {notification.sent_at && (
                                                        <div className="text-xs text-gray-500">
                                                            {t(
                                                                'notifications.history.table.sent',
                                                            )}{' '}
                                                            {formatDate(
                                                                notification.sent_at,
                                                            )}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge
                                                        variant="outline"
                                                        className={typeColor}
                                                    >
                                                        {typeLabel}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {notification.equipment ? (
                                                        <div>
                                                            <div className="text-sm font-medium">
                                                                {
                                                                    notification
                                                                        .equipment
                                                                        .instrument
                                                                }
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {
                                                                    notification
                                                                        .equipment
                                                                        .int_code
                                                                }
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray-400">
                                                            {t(
                                                                'notifications.history.table.not_available',
                                                            )}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="max-w-[200px] truncate text-sm font-medium">
                                                        {notification.subject}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="text-sm">
                                                        {
                                                            notification
                                                                .recipients
                                                                .length
                                                        }{' '}
                                                        {t(
                                                            'notifications.history.table.recipients_count',
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col space-y-1">
                                                        <Badge
                                                            variant="outline"
                                                            className={
                                                                statusColor
                                                            }
                                                        >
                                                            <StatusIcon className="mr-1 h-3 w-3" />
                                                            {
                                                                NotificationStatusLabels[
                                                                    notification
                                                                        .status
                                                                ]
                                                            }
                                                        </Badge>
                                                        {notification.error_message && (
                                                            <div className="max-w-[200px] truncate text-xs text-red-600">
                                                                {
                                                                    notification.error_message
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                viewDetails(
                                                                    notification,
                                                                )
                                                            }
                                                            className="rounded-lg border-blue-200 text-blue-600 hover:bg-blue-50"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        {notification.status ===
                                                            'failed' && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleResend(
                                                                        notification,
                                                                    )
                                                                }
                                                                className="rounded-lg border-green-200 text-green-600 hover:bg-green-50"
                                                            >
                                                                <RotateCcw className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            {notifications.data.length === 0 && (
                                <div className="py-12 text-center text-gray-500">
                                    <Mail className="mx-auto h-12 w-12 text-gray-300" />
                                    <p className="mt-2 text-lg font-medium">
                                        {t(
                                            'notifications.history.no_data.title',
                                        )}
                                    </p>
                                    <p className="text-sm">
                                        {t(
                                            'notifications.history.no_data.subtitle',
                                        )}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Paginación estilo MUI DataGrid */}
                        {totalRows > rowsPerPage && (
                            <div
                                className="mt-6 flex w-full items-center justify-between px-2"
                                style={{ minHeight: 40 }}
                            >
                                <div className="text-sm text-gray-600">
                                    {t(
                                        'notifications.history.pagination.showing',
                                    )}{' '}
                                    {notifications.from ?? 0}{' '}
                                    {t('notifications.history.pagination.to')}{' '}
                                    {notifications.to ?? 0}{' '}
                                    {t('notifications.history.pagination.of')}{' '}
                                    {totalRows}{' '}
                                    {t(
                                        'notifications.history.pagination.entries',
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleChangePage(1)}
                                        disabled={page === 1}
                                        className="rounded-lg border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
                                    >
                                        {'<<'}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            handleChangePage(page - 1)
                                        }
                                        disabled={page === 1}
                                        className="rounded-lg border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
                                    >
                                        {'<'}
                                    </Button>
                                    <span className="mx-2 min-w-[24px] text-center text-sm font-medium">
                                        {page}
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            handleChangePage(page + 1)
                                        }
                                        disabled={
                                            page === totalPages ||
                                            totalPages === 0
                                        }
                                        className="rounded-lg border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
                                    >
                                        {'>'}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            handleChangePage(totalPages)
                                        }
                                        disabled={
                                            page === totalPages ||
                                            totalPages === 0
                                        }
                                        className="rounded-lg border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
                                    >
                                        {'>>'}
                                    </Button>
                                    <select
                                        value={rowsPerPage}
                                        onChange={handleChangeRowsPerPage}
                                        className="ml-2 rounded-lg border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    >
                                        {[5, 10, 25, 50].map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Detail Dialog */}
                <Dialog
                    open={showDetailDialog}
                    onOpenChange={setShowDetailDialog}
                >
                    <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto rounded-xl">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold">
                                {t('notifications.history.detail.title')}
                            </DialogTitle>
                            <DialogDescription>
                                {t('notifications.history.detail.description')}
                            </DialogDescription>
                        </DialogHeader>

                        {selectedNotification && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="font-medium">
                                            {t(
                                                'notifications.history.detail.type',
                                            )}
                                        </Label>
                                        <div className="mt-1">
                                            <Badge
                                                variant="outline"
                                                className={
                                                    NotificationTypeColors[
                                                        selectedNotification.notification_type as keyof typeof NotificationTypeColors
                                                    ] ||
                                                    'border-gray-200 bg-gray-100 text-gray-800'
                                                }
                                            >
                                                {NotificationTypeLabels[
                                                    selectedNotification.notification_type as keyof typeof NotificationTypeLabels
                                                ] ||
                                                    selectedNotification.notification_type}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="font-medium">
                                            {t(
                                                'notifications.history.detail.status',
                                            )}
                                        </Label>
                                        <div className="mt-1">
                                            <Badge
                                                variant="outline"
                                                className={
                                                    StatusColors[
                                                        selectedNotification
                                                            .status
                                                    ]
                                                }
                                            >
                                                {
                                                    NotificationStatusLabels[
                                                        selectedNotification
                                                            .status
                                                    ]
                                                }
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label className="font-medium">
                                        {t(
                                            'notifications.history.detail.subject',
                                        )}
                                    </Label>
                                    <div className="mt-1 rounded-lg bg-gray-50 p-3 text-sm font-medium">
                                        {selectedNotification.subject}
                                    </div>
                                </div>

                                <div>
                                    <Label className="font-medium">
                                        {t(
                                            'notifications.history.detail.recipients',
                                        )}
                                    </Label>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {selectedNotification.recipients.map(
                                            (email, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                    className="border-blue-200 text-blue-700"
                                                >
                                                    {email}
                                                </Badge>
                                            ),
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label className="font-medium">
                                        {t(
                                            'notifications.history.detail.message',
                                        )}
                                    </Label>
                                    <div className="mt-1 max-h-40 overflow-y-auto rounded-lg bg-gray-50 p-3 text-sm whitespace-pre-wrap">
                                        {selectedNotification.message}
                                    </div>
                                </div>

                                {selectedNotification.error_message && (
                                    <div>
                                        <Label className="font-medium text-red-600">
                                            {t(
                                                'notifications.history.detail.error',
                                            )}
                                        </Label>
                                        <div className="mt-1 rounded-lg border border-red-200 bg-red-50 p-3 text-sm whitespace-pre-wrap text-red-700">
                                            {selectedNotification.error_message}
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="font-medium">
                                            {t(
                                                'notifications.history.detail.created_at',
                                            )}
                                        </Label>
                                        <div className="mt-1 text-sm font-medium">
                                            {formatDate(
                                                selectedNotification.created_at,
                                            )}
                                        </div>
                                    </div>
                                    {selectedNotification.sent_at && (
                                        <div>
                                            <Label className="font-medium">
                                                {t(
                                                    'notifications.history.detail.sent_at',
                                                )}
                                            </Label>
                                            <div className="mt-1 text-sm font-medium">
                                                {formatDate(
                                                    selectedNotification.sent_at,
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setShowDetailDialog(false)
                                        }
                                        className="rounded-lg border-gray-300"
                                    >
                                        {t(
                                            'notifications.history.detail.close',
                                        )}
                                    </Button>
                                    {selectedNotification.status ===
                                        'failed' && (
                                        <Button
                                            onClick={() => {
                                                handleResend(
                                                    selectedNotification,
                                                );
                                                setShowDetailDialog(false);
                                            }}
                                            className="rounded-lg bg-blue-600 hover:bg-blue-700"
                                        >
                                            <RotateCcw className="mr-2 h-4 w-4" />
                                            {t(
                                                'notifications.history.detail.resend',
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
