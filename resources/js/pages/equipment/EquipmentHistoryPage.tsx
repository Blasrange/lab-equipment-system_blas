import { useTranslation } from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import {
    AlertTriangle,
    Calendar,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Clock,
    Filter,
    Play,
    Search,
    Settings,
    Wrench,
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Función auxiliar para convertir el nombre del tipo de mantenimiento a clave de traducción
const getMaintenanceTypeKey = (maintenanceTypeName: string): string => {
    // Convertir a minúsculas y reemplazar espacios por guiones bajos
    return maintenanceTypeName
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[áàäâã]/g, 'a')
        .replace(/[éèëê]/g, 'e')
        .replace(/[íìïî]/g, 'i')
        .replace(/[óòöôõ]/g, 'o')
        .replace(/[úùüû]/g, 'u')
        .replace(/[ñ]/g, 'n');
};

// Función auxiliar para traducir valores de work_performed y findings
const translateWorkOrFindings = (
    text: string,
    type: 'work' | 'findings',
    t: (key: string) => string,
): string => {
    if (!text) return text;

    // Normalizar el texto para crear la clave de traducción
    const normalizedText = text
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');

    const translationKey = `${type}.${normalizedText}`;
    const translation = t(translationKey);

    // Si la traducción existe (no retorna la clave), usarla; sino, usar el texto original
    return translation !== translationKey ? translation : text;
};

// Components shadcn/ui
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Equipment = {
    id: number;
    instrument: string;
    int_code: string;
    brand: string;
    model: string;
    serial_number: string;
    system_number: string;
    active: boolean;
};

type MaintenanceRecord = {
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
    work_performed?: string;
    findings?: string;
    recommendations?: string;
    notes?: string;
};

type Props = {
    equipment: Equipment;
    maintenances: {
        data: MaintenanceRecord[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number | null;
        to: number | null;
    };
    filters: {
        status?: string;
        category?: string;
        priority?: string;
        date_from?: string;
        date_to?: string;
        search?: string;
    };
    stats: {
        total: number;
        completed: number;
        pending: number;
        preventive: number;
        corrective: number;
    };
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'in_progress':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'scheduled':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'cancelled':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'completed':
            return CheckCircle;
        case 'in_progress':
            return Play;
        case 'scheduled':
            return Clock;
        case 'cancelled':
            return AlertTriangle;
        default:
            return Settings;
    }
};

const getCategoryColor = (category: string) => {
    switch (category) {
        case 'preventive':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'corrective':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'predictive':
            return 'bg-purple-100 text-purple-800 border-purple-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'critical':
            return 'bg-red-100 text-red-800 border-red-200';
        case 'high':
            return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'medium':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'low':
            return 'bg-green-100 text-green-800 border-green-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export default function EquipmentHistoryPage({
    equipment,
    maintenances,
    filters,
    stats,
}: Props) {
    const { t, language } = useTranslation();

    const [selectedMaintenance, setSelectedMaintenance] =
        useState<MaintenanceRecord | null>(null);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [page, setPage] = useState(maintenances.current_page || 1);
    const [rowsPerPage, setRowsPerPage] = useState(maintenances.per_page || 5);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Sincronizar estado local con props
    useEffect(() => {
        setPage(maintenances.current_page);
        setRowsPerPage(maintenances.per_page);
    }, [maintenances.current_page, maintenances.per_page]);

    // Marcar que ya no es carga inicial después del primer render
    useEffect(() => {
        setIsInitialLoad(false);
    }, []);

    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        status: filters.status || 'all',
        category: filters.category || 'all',
        priority: filters.priority || 'all',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });

    // Variables derivadas
    const totalRows = maintenances.total;
    const totalPages = maintenances.last_page;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('equipment.title'),
            href: '/equipment',
        },
        {
            title: t('equipment.history.title'),
            href: `/equipment/${equipment.id}/history`,
        },
    ];

    const handleFilter = (resetPage = true) => {
        const params: any = {};

        // Solo agregar parámetros con valores significativos
        if (data.search && data.search.trim()) {
            params.search = data.search.trim();
        }
        if (data.status && data.status !== 'all') {
            params.status = data.status;
        }
        if (data.category && data.category !== 'all') {
            params.category = data.category;
        }
        if (data.priority && data.priority !== 'all') {
            params.priority = data.priority;
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
            get(`/equipment/${equipment.id}/history`, {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        } else {
            const queryString = new URLSearchParams(params).toString();
            get(`/equipment/${equipment.id}/history?${queryString}`, {
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
        data.category,
        data.priority,
        data.date_from,
        data.date_to,
        rowsPerPage,
        isInitialLoad,
    ]);

    const clearFilters = () => {
        setData({
            search: '',
            status: 'all',
            category: 'all',
            priority: 'all',
            date_from: '',
            date_to: '',
        });

        // Ir a la URL base limpia, solo agregar per_page si no es el valor por defecto
        if (rowsPerPage !== 5) {
            get(`/equipment/${equipment.id}/history?per_page=${rowsPerPage}`, {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        } else {
            get(`/equipment/${equipment.id}/history`, {
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
        if (data.category && data.category !== 'all') {
            params.category = data.category;
        }
        if (data.priority && data.priority !== 'all') {
            params.priority = data.priority;
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
            get(`/equipment/${equipment.id}/history`, {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        } else {
            const queryString = new URLSearchParams(params).toString();
            get(`/equipment/${equipment.id}/history?${queryString}`, {
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
        if (data.category && data.category !== 'all')
            params.category = data.category;
        if (data.priority && data.priority !== 'all')
            params.priority = data.priority;
        if (data.date_from) params.date_from = data.date_from;
        if (data.date_to) params.date_to = data.date_to;

        params.page = '1';
        if (newRowsPerPage !== 5) {
            params.per_page = newRowsPerPage.toString();
        }

        // Si solo tiene page=1 o está vacío, ir a URL limpia
        if (Object.keys(params).length === 1 && params.page === '1') {
            get(`/equipment/${equipment.id}/history`, {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        } else if (Object.keys(params).length === 0) {
            get(`/equipment/${equipment.id}/history`, {
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
            get(`/equipment/${equipment.id}/history?${queryString}`, {
                preserveState: true,
                preserveUrl: true,
                replace: true,
            });
        }
    };

    const formatDate = (date: string) => {
        const locale = language === 'es' ? 'es-ES' : 'en-US';
        return new Date(date).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatDateTime = (date: string) => {
        const locale = language === 'es' ? 'es-ES' : 'en-US';
        return new Date(date).toLocaleString(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('equipment.history.title')} />

            <div className="flex w-full flex-col items-center px-2 py-4 md:px-8 md:py-8">
                {/* Información del Equipo */}
                <Card className="mb-6 w-full rounded-xl shadow-lg">
                    <CardContent className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30">
                                <Wrench className="h-6 w-6 text-white" />
                            </div>
                            <h1 className="bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-3xl font-bold text-transparent">
                                {equipment.instrument}
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                            <div>
                                <Label className="font-medium text-gray-600">
                                    {t('equipment.history.internal_code')}
                                </Label>
                                <p className="text-lg font-semibold">
                                    {equipment.int_code}
                                </p>
                            </div>
                            <div>
                                <Label className="font-medium text-gray-600">
                                    {t('equipment.brand')}
                                </Label>
                                <p className="text-lg font-semibold">
                                    {equipment.brand}
                                </p>
                            </div>
                            <div>
                                <Label className="font-medium text-gray-600">
                                    {t('equipment.model')}
                                </Label>
                                <p className="text-lg font-semibold">
                                    {equipment.model}
                                </p>
                            </div>
                            <div>
                                <Label className="font-medium text-gray-600">
                                    {t('equipment.status')}
                                </Label>
                                <Badge
                                    className={
                                        equipment.active
                                            ? 'border-green-200 bg-green-100 text-green-800'
                                            : 'border-red-200 bg-red-100 text-red-800'
                                    }
                                >
                                    {equipment.active
                                        ? t('status.active')
                                        : t('status.inactive')}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Estadísticas */}
                <div className="mb-4 w-full">
                    <h2 className="mb-3 text-xl font-bold text-gray-900">
                        📊 {t('equipment.history.statistics')}
                    </h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
                        <Card className="rounded-xl shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-blue-500/20">
                            <CardContent className="p-3 text-center">
                                <p className="text-xl font-bold text-blue-600">
                                    {stats.total}
                                </p>
                                <Label className="text-xs font-medium text-gray-600">
                                    {t('equipment.history.total')}
                                </Label>
                            </CardContent>
                        </Card>
                        <Card className="rounded-xl shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-green-500/20">
                            <CardContent className="p-3 text-center">
                                <p className="text-xl font-bold text-green-600">
                                    {stats.completed}
                                </p>
                                <Label className="text-xs font-medium text-gray-600">
                                    {t('equipment.history.completed')}
                                </Label>
                            </CardContent>
                        </Card>
                        <Card className="rounded-xl shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-yellow-500/20">
                            <CardContent className="p-3 text-center">
                                <p className="text-xl font-bold text-yellow-600">
                                    {stats.pending}
                                </p>
                                <Label className="text-xs font-medium text-gray-600">
                                    {t('equipment.history.pending')}
                                </Label>
                            </CardContent>
                        </Card>
                        <Card className="rounded-xl shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-blue-500/20">
                            <CardContent className="p-3 text-center">
                                <p className="text-xl font-bold text-blue-600">
                                    {stats.preventive}
                                </p>
                                <Label className="text-xs font-medium text-gray-600">
                                    {t('equipment.history.preventive')}
                                </Label>
                            </CardContent>
                        </Card>
                        <Card className="rounded-xl shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-red-500/20">
                            <CardContent className="p-3 text-center">
                                <p className="text-xl font-bold text-red-600">
                                    {stats.corrective}
                                </p>
                                <Label className="text-xs font-medium text-gray-600">
                                    {t('equipment.history.corrective')}
                                </Label>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Filtros */}
                <Card className="mb-4 w-full rounded-xl shadow-lg">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                                <Filter className="mr-3 h-6 w-6 text-blue-600" />
                                {t('equipment.history.filters')}
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
                                        {t('equipment.history.hide_filters')}
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="h-4 w-4" />
                                        {t('equipment.history.more_filters')}
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
                                    {t('equipment.history.search')}
                                </Label>
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        placeholder={t(
                                            'equipment.history.search_placeholder',
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
                                    {t('equipment.status')}
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
                                                'equipment.history.all_states',
                                            )}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            {t('equipment.history.all_states')}
                                        </SelectItem>
                                        <SelectItem value="scheduled">
                                            {t('common.stats.scheduled')}
                                        </SelectItem>
                                        <SelectItem value="in_progress">
                                            {t('common.stats.in_progress')}
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            {t('common.stats.completed')}
                                        </SelectItem>
                                        <SelectItem value="cancelled">
                                            {t('common.stats.cancelled')}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="font-medium">
                                    {t('equipment.history.category')}
                                </Label>
                                <Select
                                    value={data.category}
                                    onValueChange={(value) =>
                                        setData('category', value)
                                    }
                                >
                                    <SelectTrigger className="rounded-lg">
                                        <SelectValue
                                            placeholder={t(
                                                'equipment.history.all_categories',
                                            )}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            {t(
                                                'equipment.history.all_categories',
                                            )}
                                        </SelectItem>
                                        <SelectItem value="preventive">
                                            {t('equipment.history.preventive')}
                                        </SelectItem>
                                        <SelectItem value="corrective">
                                            {t('equipment.history.corrective')}
                                        </SelectItem>
                                        <SelectItem value="predictive">
                                            {t('equipment.history.predictive')}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Filtros Avanzados - Solo visibles cuando se expanden */}
                        {showAdvancedFilters && (
                            <div className="mt-6 grid grid-cols-1 gap-4 border-t pt-6 md:grid-cols-3">
                                <div>
                                    <Label className="font-medium">
                                        {t('equipment.history.priorities')}
                                    </Label>
                                    <Select
                                        value={data.priority}
                                        onValueChange={(value) =>
                                            setData('priority', value)
                                        }
                                    >
                                        <SelectTrigger className="rounded-lg">
                                            <SelectValue
                                                placeholder={t(
                                                    'equipment.history.all_priorities',
                                                )}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                {t(
                                                    'equipment.history.all_priorities',
                                                )}
                                            </SelectItem>
                                            <SelectItem value="low">
                                                {t('common.priorities.low')}
                                            </SelectItem>
                                            <SelectItem value="medium">
                                                {t('common.priorities.medium')}
                                            </SelectItem>
                                            <SelectItem value="high">
                                                {t('common.priorities.high')}
                                            </SelectItem>
                                            <SelectItem value="critical">
                                                {t(
                                                    'common.priorities.critical',
                                                )}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="font-medium">
                                        {t('equipment.history.from')}
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
                                        {t('equipment.history.to')}
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

                {/* Tabla de Mantenimientos */}
                <Card className="w-full rounded-xl shadow-lg">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-bold text-gray-900">
                            {t('equipment.history.title')} ({maintenances.total}
                            )
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t('common.scheduled_date')}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t('equipment.type')}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t('equipment.category')}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t('equipment.status')}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t('equipment.history.priorities')}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t('equipment.responsible')}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t('equipment.description')}
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            {t('equipment.history.duration')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {maintenances.data.map(
                                        (maintenance, index) => {
                                            const StatusIcon = getStatusIcon(
                                                maintenance.status,
                                            );
                                            return (
                                                <tr
                                                    key={maintenance.id}
                                                    className="border-b hover:bg-gray-50"
                                                >
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center">
                                                            <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                                                            <div>
                                                                <div className="text-sm font-medium">
                                                                    {formatDate(
                                                                        maintenance.scheduled_date,
                                                                    )}
                                                                </div>
                                                                {maintenance.performed_date && (
                                                                    <div className="text-xs text-gray-500">
                                                                        {t(
                                                                            'common.done',
                                                                        )}
                                                                        :{' '}
                                                                        {formatDate(
                                                                            maintenance.performed_date,
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="text-sm font-medium">
                                                            {t(
                                                                `equipment.history.type_names.${getMaintenanceTypeKey(
                                                                    maintenance.maintenance_type_name,
                                                                )}`,
                                                            ) ||
                                                                maintenance.maintenance_type_name}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Badge
                                                            variant="outline"
                                                            className={getCategoryColor(
                                                                maintenance.maintenance_category,
                                                            )}
                                                        >
                                                            {t(
                                                                `equipment.history.${maintenance.maintenance_category}`,
                                                            )}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Badge
                                                            variant="outline"
                                                            className={getStatusColor(
                                                                maintenance.status,
                                                            )}
                                                        >
                                                            <StatusIcon className="mr-1 h-3 w-3" />
                                                            {t(
                                                                `common.stats.${maintenance.status}`,
                                                            )}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Badge
                                                            variant="outline"
                                                            className={getPriorityColor(
                                                                maintenance.priority,
                                                            )}
                                                        >
                                                            {t(
                                                                `common.priorities.${maintenance.priority}`,
                                                            )}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="text-sm font-medium">
                                                            {
                                                                maintenance.responsible_person
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="max-w-[250px]">
                                                            <div className="line-clamp-2 text-sm font-medium">
                                                                {
                                                                    maintenance.description
                                                                }
                                                            </div>
                                                            {maintenance.work_performed && (
                                                                <div className="truncate text-xs text-gray-500">
                                                                    {t(
                                                                        'common.work',
                                                                    )}
                                                                    :{' '}
                                                                    {translateWorkOrFindings(
                                                                        maintenance.work_performed,
                                                                        'work',
                                                                        t,
                                                                    )}
                                                                </div>
                                                            )}
                                                            {maintenance.findings && (
                                                                <div className="truncate text-xs text-gray-500">
                                                                    {t(
                                                                        'common.findings',
                                                                    )}
                                                                    :{' '}
                                                                    {translateWorkOrFindings(
                                                                        maintenance.findings,
                                                                        'findings',
                                                                        t,
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div>
                                                            <div className="text-sm font-medium">
                                                                Est:{' '}
                                                                {
                                                                    maintenance.estimated_duration
                                                                }
                                                                h
                                                            </div>
                                                            {maintenance.actual_duration && (
                                                                <div className="text-xs text-gray-500">
                                                                    {t(
                                                                        'common.real',
                                                                    )}
                                                                    :{' '}
                                                                    {
                                                                        maintenance.actual_duration
                                                                    }
                                                                    h
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            </table>

                            {maintenances.data.length === 0 && (
                                <div className="py-12 text-center text-gray-500">
                                    <Settings className="mx-auto h-12 w-12 text-gray-300" />
                                    <p className="mt-2 text-lg font-medium">
                                        {t('equipment.history.no_records')}
                                    </p>
                                    <p className="text-sm">
                                        {t('equipment.history.adjust_filters')}
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
                                    {t('common.showing')}{' '}
                                    {maintenances.from ?? 0} {t('common.to')}{' '}
                                    {maintenances.to ?? 0} {t('common.of')}{' '}
                                    {totalRows} {t('common.entries')}
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
            </div>
        </AppLayout>
    );
}
