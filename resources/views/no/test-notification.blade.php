<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificación de Mantenimiento</title>
</head>
<body>
    <h1>{{ $notificationSubject }}</h1>
    
    <p><strong>Equipo:</strong> {{ $equipment->instrument }}</p>
    <p><strong>Código:</strong> {{ $equipment->int_code }}</p>
    <p><strong>Marca:</strong> {{ $equipment->brand }}</p>
    <p><strong>Modelo:</strong> {{ $equipment->model }}</p>
    
    @if($maintenanceRecord)
        <h3>Detalles del Mantenimiento</h3>
        <p><strong>Tipo:</strong> {{ $maintenanceRecord->maintenance_type_name }}</p>
        <p><strong>Estado:</strong> {{ $maintenanceRecord->status }}</p>
    @endif
    
    <p>Este es un email de prueba para verificar el sistema de notificaciones.</p>
</body>
</html>