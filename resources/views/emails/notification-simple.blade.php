<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $notificationSubject }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 30px 20px;
        }
        .equipment-info {
            background: #f8fafc;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .equipment-info h3 {
            color: #1d4ed8;
            margin: 0 0 15px 0;
        }
        .info-item {
            margin-bottom: 10px;
        }
        .maintenance-info {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .maintenance-info h3 {
            color: #92400e;
            margin: 0 0 15px 0;
        }
        .footer {
            background: #f1f5f9;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{ $notificationSubject }}</h1>
        </div>
        
        <div class="content">
            <div class="equipment-info">
                <h3>📋 Información del Equipo</h3>
                <div class="info-item"><strong>Instrumento:</strong> {{ $equipment->instrument }}</div>
                <div class="info-item"><strong>Código Interno:</strong> {{ $equipment->int_code }}</div>
                <div class="info-item"><strong>Marca:</strong> {{ $equipment->brand }}</div>
                <div class="info-item"><strong>Modelo:</strong> {{ $equipment->model }}</div>
                <div class="info-item"><strong>Número de Serie:</strong> {{ $equipment->serial_number }}</div>
                <div class="info-item"><strong>Número de Sistema:</strong> {{ $equipment->system_number }}</div>
                
                @if($equipment->last_ext_calibration)
                <div class="info-item">
                    <strong>Última Calibración Externa:</strong> 
                    {{ \Carbon\Carbon::parse($equipment->last_ext_calibration)->format('d/m/Y') }}
                </div>
                @endif
                
                @if($equipment->next_ext_calibration)
                <div class="info-item">
                    <strong>Próxima Calibración Externa:</strong> 
                    {{ \Carbon\Carbon::parse($equipment->next_ext_calibration)->format('d/m/Y') }}
                </div>
                @endif
            </div>
            
            @if($maintenanceRecord)
            <div class="maintenance-info">
                <h3>🔧 Detalles del Mantenimiento</h3>
                <div class="info-item"><strong>Tipo:</strong> {{ $maintenanceRecord->maintenance_type_name }}</div>
                <div class="info-item"><strong>Estado:</strong> {{ ucfirst($maintenanceRecord->status) }}</div>
                <div class="info-item"><strong>Prioridad:</strong> {{ ucfirst($maintenanceRecord->priority) }}</div>
                
                @if($maintenanceRecord->scheduled_date)
                <div class="info-item">
                    <strong>Fecha Programada:</strong> 
                    {{ \Carbon\Carbon::parse($maintenanceRecord->scheduled_date)->format('d/m/Y') }}
                </div>
                @endif
                
                @if($maintenanceRecord->responsible_person)
                <div class="info-item"><strong>Responsable:</strong> {{ $maintenanceRecord->responsible_person }}</div>
                @endif
                
                @if($maintenanceRecord->description)
                <div class="info-item"><strong>Descripción:</strong> {{ $maintenanceRecord->description }}</div>
                @endif
            </div>
            @endif
            
            <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <strong>💡 Información importante:</strong><br>
                Este es un correo automático del Sistema de Gestión de Equipos de Laboratorio. 
                Para más detalles, ingrese al sistema o contacte al administrador.
            </div>
        </div>
        
        <div class="footer">
            <p>Sistema de Gestión de Equipos de Laboratorio</p>
            <p>Este correo fue enviado automáticamente, por favor no responder.</p>
        </div>
    </div>
</body>
</html>