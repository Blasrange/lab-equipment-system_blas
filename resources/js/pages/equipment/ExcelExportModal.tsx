import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/contexts/translation-context';
import CloseIcon from '@mui/icons-material/Close';
import { Calendar, Download, FileSpreadsheet } from 'lucide-react';
import React, { useState } from 'react';

interface ExcelExportModalProps {
    open: boolean;
    onClose: () => void;
    onExport: (startDate: string, endDate: string) => void;
    loading?: boolean;
}

const ExcelExportModal: React.FC<ExcelExportModalProps> = ({
    open,
    onClose,
    onExport,
    loading = false,
}) => {
    const { t } = useTranslation();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState<{
        startDate?: string;
        endDate?: string;
    }>({});

    // Función para obtener fecha hace 30 días
    const getDefaultStartDate = () => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return date.toISOString().split('T')[0];
    };

    // Función para obtener fecha actual
    const getDefaultEndDate = () => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    };

    // Inicializar fechas por defecto cuando se abre el modal
    React.useEffect(() => {
        if (open && !startDate && !endDate) {
            setStartDate(getDefaultStartDate());
            setEndDate(getDefaultEndDate());
        }
    }, [open]);

    const validateDates = () => {
        const newErrors: { startDate?: string; endDate?: string } = {};

        if (!startDate) {
            newErrors.startDate = t(
                'excel.export.validation.start_date_required',
            );
        }

        if (!endDate) {
            newErrors.endDate = t('excel.export.validation.end_date_required');
        }

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            newErrors.endDate = t(
                'excel.export.validation.end_date_after_start',
            );
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleExport = () => {
        if (validateDates()) {
            onExport(startDate, endDate);
        }
    };

    const handleClose = () => {
        setStartDate('');
        setEndDate('');
        setErrors({});
        onClose();
    };

    const setQuickRange = (days: number) => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days);

        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(end.toISOString().split('T')[0]);
        setErrors({});
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-700 shadow-lg">
                            <FileSpreadsheet className="h-5 w-5 text-white" />
                        </div>
                        {t('excel.export.title')}
                    </DialogTitle>
                    <DialogDescription className="ml-13 text-gray-600">
                        {t('excel.export.description')}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Rangos rápidos */}
                    <div>
                        <Label className="text-sm font-medium text-gray-700">
                            {t('excel.export.quick_ranges')}
                        </Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setQuickRange(7)}
                                className="text-xs"
                            >
                                {t('excel.export.quick_ranges.7_days')}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setQuickRange(30)}
                                className="text-xs"
                            >
                                {t('excel.export.quick_ranges.30_days')}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setQuickRange(90)}
                                className="text-xs"
                            >
                                {t('excel.export.quick_ranges.3_months')}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setQuickRange(365)}
                                className="text-xs"
                            >
                                {t('excel.export.quick_ranges.1_year')}
                            </Button>
                        </div>
                    </div>

                    {/* Campos de fecha */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="startDate"
                                className="text-sm font-medium text-gray-700"
                            >
                                {t('excel.export.start_date')}
                            </Label>
                            <div className="relative">
                                <Input
                                    id="startDate"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            startDate: undefined,
                                        }));
                                    }}
                                    className={`pl-10 ${errors.startDate ? 'border-red-500' : ''}`}
                                />
                                <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            </div>
                            {errors.startDate && (
                                <p className="text-sm text-red-600">
                                    {errors.startDate}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="endDate"
                                className="text-sm font-medium text-gray-700"
                            >
                                {t('excel.export.end_date')}
                            </Label>
                            <div className="relative">
                                <Input
                                    id="endDate"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                        setErrors((prev) => ({
                                            ...prev,
                                            endDate: undefined,
                                        }));
                                    }}
                                    className={`pl-10 ${errors.endDate ? 'border-red-500' : ''}`}
                                />
                                <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            </div>
                            {errors.endDate && (
                                <p className="text-sm text-red-600">
                                    {errors.endDate}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Información adicional */}
                    <div className="rounded-lg bg-blue-50 p-4">
                        <div className="flex items-start">
                            <FileSpreadsheet className="mt-0.5 mr-3 h-5 w-5 text-blue-600" />
                            <div>
                                <h4 className="text-sm font-medium text-blue-900">
                                    {t('excel.export.report_content')}
                                </h4>
                                <p className="mt-1 text-sm text-blue-700">
                                    {t('excel.export.report_description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-full border-2 border-blue-600 px-6 py-2 text-sm font-semibold tracking-wide text-blue-600 uppercase transition-colors hover:bg-blue-50"
                    >
                        <CloseIcon sx={{ fontSize: 16 }} />
                        {t('common.cancel')}
                    </Button>
                    <Button
                        type="button"
                        onClick={handleExport}
                        disabled={loading}
                        className="flex min-h-[40px] items-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-2 text-base font-bold text-white transition-all hover:from-green-700 hover:to-green-800"
                    >
                        {loading ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                {t('excel.export.generating')}
                            </>
                        ) : (
                            <>
                                <Download className="h-4 w-4" />
                                {t('excel.export.download')}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ExcelExportModal;
