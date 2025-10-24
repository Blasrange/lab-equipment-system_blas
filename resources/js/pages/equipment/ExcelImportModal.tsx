import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/contexts/translation-context';
import CloseIcon from '@mui/icons-material/Close';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';
import {
    AlertCircle,
    Check,
    Download,
    FileText,
    Info,
    Upload,
} from 'lucide-react';
import React, { useRef, useState } from 'react';

interface ExcelImportModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onImportComplete: () => void;
}

interface PreviewData {
    [key: string]: any;
}

interface ImportStats {
    total: number;
    valid: number;
    duplicates: number;
    errors: number;
    will_create: number;
    will_update: number;
}

interface ImportError {
    row: number;
    attribute: string;
    errors: string[];
    values: { [key: string]: any };
}

const ExcelImportModal: React.FC<ExcelImportModalProps> = ({
    open,
    onOpenChange,
    onImportComplete,
}) => {
    const { t } = useTranslation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [previewData, setPreviewData] = useState<PreviewData[]>([]);
    const [importStats, setImportStats] = useState<ImportStats | null>(null);
    const [errors, setErrors] = useState<ImportError[]>([]);
    const [step, setStep] = useState<
        'upload' | 'preview' | 'importing' | 'complete'
    >('upload');
    const [importProgress, setImportProgress] = useState(0);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        // Validar tipo de archivo
        const allowedTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
        ];

        if (
            !allowedTypes.includes(file.type) &&
            !file.name.endsWith('.xlsx') &&
            !file.name.endsWith('.xls')
        ) {
            alert(t('excel.import.validation.invalid_file'));
            return;
        }

        // Validar tamaño (10MB máximo)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            alert(t('excel.import.validation.file_too_large'));
            return;
        }

        setSelectedFile(file);
        setPreviewData([]);
        setImportStats(null);
        setErrors([]);
        setStep('upload');
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    };

    const handleDownloadTemplate = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/equipment/download-template', {
                responseType: 'blob',
            });

            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `plantilla_equipos_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al descargar la plantilla:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePreview = async () => {
        if (!selectedFile) return;

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.post(
                '/equipment/preview-import',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (response.data.success) {
                setPreviewData(response.data.preview_data);
                setImportStats(response.data.stats);
                setErrors(response.data.errors);
                setStep('preview');
            } else {
                setErrors(response.data.errors || []);
                setStep('preview');
            }
        } catch (error: any) {
            console.error('Error en la vista previa:', error);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
                setStep('preview');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleImport = async () => {
        if (!selectedFile) return;

        try {
            setIsLoading(true);
            setStep('importing');
            setImportProgress(0);

            const formData = new FormData();
            formData.append('file', selectedFile);

            // Simular progreso
            const progressInterval = setInterval(() => {
                setImportProgress((prev) => Math.min(prev + 10, 90));
            }, 200);

            const response = await axios.post('/equipment/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            clearInterval(progressInterval);
            setImportProgress(100);

            setTimeout(() => {
                if (response.data.success) {
                    setStep('complete');
                    onImportComplete();
                } else {
                    setErrors(response.data.errors || []);
                    setStep('preview');
                }
            }, 500);
        } catch (error: any) {
            console.error('Error en la importación:', error);
            setStep('preview');
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const resetModal = () => {
        setSelectedFile(null);
        setPreviewData([]);
        setImportStats(null);
        setErrors([]);
        setStep('upload');
        setImportProgress(0);
        setIsDragOver(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClose = () => {
        resetModal();
        onOpenChange(false);
    };

    const renderUploadStep = () => (
        <div className="space-y-6">
            <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>{t('excel.import.info')}</AlertDescription>
            </Alert>

            <div className="flex gap-4">
                <Button
                    variant="outline"
                    onClick={handleDownloadTemplate}
                    disabled={isLoading}
                    className="flex-1"
                >
                    <Download className="mr-2 h-4 w-4" />
                    {t('excel.import.download_template')}
                </Button>
            </div>

            <div
                className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                    isDragOver
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <FileText
                    className={`mx-auto h-12 w-12 ${
                        isDragOver ? 'text-blue-500' : 'text-gray-400'
                    }`}
                />
                <div className="mt-4">
                    <Label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-sm font-medium text-gray-900">
                            {t('excel.import.select_file')}
                        </span>
                        <span className="block text-sm text-gray-500">
                            {t('excel.import.drag_drop')}
                        </span>
                    </Label>
                    <input
                        ref={fileInputRef}
                        id="file-upload"
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                    {t('excel.import.file_requirements')}
                </p>
                {isDragOver && (
                    <div className="mt-2 text-sm font-medium text-blue-600">
                        {t('excel.import.drop_file')}
                    </div>
                )}
            </div>

            {selectedFile && (
                <div className="rounded-lg bg-gray-50 p-4">
                    <div className="flex items-center">
                        <FileText className="mr-3 h-5 w-5 text-blue-500" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">
                                {selectedFile.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)}{' '}
                                MB
                            </p>
                        </div>
                        <Button
                            size="sm"
                            onClick={handlePreview}
                            disabled={isLoading}
                        >
                            {isLoading
                                ? t('excel.import.analyzing')
                                : t('excel.import.preview')}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );

    const renderPreviewStep = () => (
        <div className="space-y-6">
            {importStats && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-blue-50 p-3 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {importStats.total}
                        </div>
                        <div className="text-sm text-blue-800">
                            {t('excel.import.stats.total')}
                        </div>
                    </div>
                    <div className="rounded-lg bg-green-50 p-3 text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {importStats.will_create}
                        </div>
                        <div className="text-sm text-green-800">
                            {t('excel.import.stats.new')}
                        </div>
                    </div>
                    <div className="rounded-lg bg-yellow-50 p-3 text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                            {importStats.will_update}
                        </div>
                        <div className="text-sm text-yellow-800">
                            {t('excel.import.stats.update')}
                        </div>
                    </div>
                    <div className="rounded-lg bg-red-50 p-3 text-center">
                        <div className="text-2xl font-bold text-red-600">
                            {importStats.errors}
                        </div>
                        <div className="text-sm text-red-800">
                            {t('excel.import.stats.errors')}
                        </div>
                    </div>
                </div>
            )}

            <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="preview">
                        {t('excel.import.tabs.preview')} ({previewData.length})
                    </TabsTrigger>
                    <TabsTrigger value="errors">
                        {t('excel.import.tabs.errors')} ({errors.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="space-y-4">
                    {previewData.length > 0 ? (
                        <div className="overflow-hidden rounded-lg border">
                            <div className="max-h-96 overflow-auto">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 bg-gray-50">
                                        <tr>
                                            <th className="px-3 py-2 text-left">
                                                {t(
                                                    'excel.import.table.instrument',
                                                )}
                                            </th>
                                            <th className="px-3 py-2 text-left">
                                                {t('excel.import.table.code')}
                                            </th>
                                            <th className="px-3 py-2 text-left">
                                                {t('excel.import.table.brand')}
                                            </th>
                                            <th className="px-3 py-2 text-left">
                                                {t('excel.import.table.model')}
                                            </th>
                                            <th className="px-3 py-2 text-left">
                                                {t('excel.import.table.status')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previewData.map((row, index) => (
                                            <tr
                                                key={index}
                                                className="border-t"
                                            >
                                                <td className="px-3 py-2">
                                                    {row.instrumento}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {row.codigo_interno}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {row.marca}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {row.modelo}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <Badge
                                                        variant={
                                                            row.activo_true_false
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {row.activo_true_false
                                                            ? t('status.active')
                                                            : t(
                                                                  'status.inactive',
                                                              )}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="py-8 text-center text-gray-500">
                            {t('excel.import.no_data')}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="errors" className="space-y-4">
                    {errors.length > 0 ? (
                        <div className="space-y-3">
                            {errors.map((error, index) => (
                                <Alert key={index} variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>
                                            {t('excel.import.row')} {error.row}:
                                        </strong>{' '}
                                        {error.errors.join(', ')}
                                    </AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center text-gray-500">
                            <Check className="mx-auto mb-2 h-12 w-12 text-green-500" />
                            {t('excel.import.no_errors')}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );

    const renderImportingStep = () => (
        <div className="space-y-6 text-center">
            <Upload className="mx-auto h-16 w-16 text-blue-500" />
            <div>
                <h3 className="text-lg font-medium">
                    {t('excel.import.importing')}
                </h3>
                <p className="text-sm text-gray-500">
                    {t('excel.import.importing_wait')}
                </p>
            </div>
            <div className="space-y-2">
                <Progress value={importProgress} className="w-full" />
                <p className="text-sm text-gray-500">
                    {importProgress}
                    {t('excel.import.progress')}
                </p>
            </div>
        </div>
    );

    const renderCompleteStep = () => (
        <div className="space-y-6 text-center">
            <Check className="mx-auto h-16 w-16 text-green-500" />
            <div>
                <h3 className="text-lg font-medium text-green-700">
                    {t('excel.import.completed')}
                </h3>
                <p className="text-sm text-gray-500">
                    {t('excel.import.completed_message')}
                </p>
            </div>
            {importStats && (
                <div className="rounded-lg bg-green-50 p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium">
                                {t('excel.import.equipment_created')}
                            </span>{' '}
                            {importStats.will_create}
                        </div>
                        <div>
                            <span className="font-medium">
                                {t('excel.import.equipment_updated')}
                            </span>{' '}
                            {importStats.will_update}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-xl font-bold">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg">
                            <UploadFileIcon
                                sx={{ color: 'white', fontSize: 24 }}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span>{t('excel.import.title')}</span>
                            <PrecisionManufacturingIcon
                                sx={{ color: '#f97316', fontSize: 28 }}
                            />
                        </div>
                    </DialogTitle>
                    <DialogDescription className="ml-13 text-gray-600">
                        {t('excel.import.description')}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6">
                    {step === 'upload' && renderUploadStep()}
                    {step === 'preview' && renderPreviewStep()}
                    {step === 'importing' && renderImportingStep()}
                    {step === 'complete' && renderCompleteStep()}
                </div>

                <DialogFooter>
                    {step === 'upload' && (
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="rounded-full border-2 border-blue-600 px-6 py-2 text-sm font-semibold tracking-wide text-blue-600 uppercase transition-colors hover:bg-blue-50"
                        >
                            <CloseIcon sx={{ fontSize: 16, marginRight: 1 }} />
                            {t('common.cancel')}
                        </Button>
                    )}

                    {step === 'preview' && (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => setStep('upload')}
                                className="rounded-full border-2 border-blue-600 px-6 py-2 text-sm font-semibold tracking-wide text-blue-600 uppercase transition-colors hover:bg-blue-50"
                            >
                                <CloseIcon
                                    sx={{ fontSize: 16, marginRight: 1 }}
                                />
                                {t('excel.import.back')}
                            </Button>
                            <Button
                                onClick={handleImport}
                                disabled={isLoading || errors.length > 0}
                                className="min-h-[40px] rounded-2xl bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-2 text-base font-bold text-white transition-all hover:from-orange-700 hover:to-orange-800"
                            >
                                <UploadFileIcon
                                    sx={{ color: 'white', fontSize: 24 }}
                                />
                                {t('excel.import.import_equipment')}
                            </Button>
                        </>
                    )}

                    {step === 'complete' && (
                        <Button
                            onClick={handleClose}
                            className="min-h-[40px] rounded-2xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-2 text-base font-bold text-white transition-all hover:from-green-700 hover:to-green-800"
                        >
                            {t('common.close')}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ExcelImportModal;
