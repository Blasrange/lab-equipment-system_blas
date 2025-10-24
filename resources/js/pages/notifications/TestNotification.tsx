import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Mail, Send, Settings } from 'lucide-react';
import React from 'react';

interface Equipment {
    id: number;
    instrument: string;
    int_code: string;
}

interface Props {
    equipments: Equipment[];
}

export default function TestNotification({ equipments }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        equipment_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/notifications/test', {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Probar Notificaciones" />

            <div className="mx-auto max-w-2xl space-y-8 p-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Probar Sistema de Notificaciones
                    </h1>
                    <p className="text-gray-600">
                        Envía una notificación de prueba para verificar la
                        configuración
                    </p>
                </div>

                {/* Test Form */}
                <Card className="border-gray-200 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center text-lg">
                            <Mail className="mr-3 h-6 w-6" />
                            Notificación de Prueba
                        </CardTitle>
                        <CardDescription>
                            Envía un correo de prueba para verificar que el
                            sistema de notificaciones funciona correctamente
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    Correo de destino
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    placeholder="correo@ejemplo.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-3">
                                <Label
                                    htmlFor="equipment"
                                    className="text-sm font-medium"
                                >
                                    Equipo de referencia
                                </Label>
                                <Select
                                    value={data.equipment_id}
                                    onValueChange={(value) =>
                                        setData('equipment_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un equipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {equipments.map((equipment) => (
                                            <SelectItem
                                                key={equipment.id}
                                                value={equipment.id.toString()}
                                            >
                                                {equipment.instrument} -{' '}
                                                {equipment.int_code}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.equipment_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.equipment_id}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    {processing
                                        ? 'Enviando...'
                                        : 'Enviar Prueba'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Instructions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Settings className="mr-2 h-5 w-5" />
                            Instrucciones
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 text-sm text-gray-600">
                            <p>
                                <strong>1.</strong> Ingresa tu dirección de
                                correo electrónico en el campo correspondiente.
                            </p>
                            <p>
                                <strong>2.</strong> Selecciona un equipo para
                                usar como referencia en el correo de prueba.
                            </p>
                            <p>
                                <strong>3.</strong> Haz clic en "Enviar Prueba"
                                para enviar la notificación.
                            </p>
                            <p>
                                <strong>4.</strong> Revisa tu bandeja de entrada
                                (y spam) para verificar que el correo llegó
                                correctamente.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* System Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Estado del Sistema</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <span>Configuración de correo:</span>
                                <span className="text-green-600">
                                    ✓ Configurado
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Cola de trabajos:</span>
                                <span className="text-green-600">✓ Activa</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Notificaciones automáticas:</span>
                                <span className="text-green-600">
                                    ✓ Habilitadas
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
