<h1>Prueba simple</h1>
<p>Equipo: Test</p>
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
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
            font-weight: 600;
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
            font-size: 18px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
        }
        .info-item {
            background: white;
            padding: 10px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }
        .info-label {
            font-weight: 600;
            color: #475569;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .info-value {
            color: #1e293b;
            font-size: 14px;
        }
        .message-content {
            background: #fefefe;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            line-height: 1.8;
        }
        .maintenance-info {
            background: #f0f9ff;
            border-left: 4px solid #0ea5e9;
            padding: 15px;
            margin: 15px 0;
            border-radius: 0 6px 6px 0;
        }
        .footer {
            background: #f1f5f9;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer p {
            margin: 0;
            color: #64748b;
            font-size: 14px;
        }
        .alert {
            padding: 15px;
            margin: 15px 0;
            border-radius: 6px;
            border-left: 4px solid;
        }
        .alert-warning {
            background: #fefce8;
            border-color: #facc15;
            color: #a16207;
        }
        .alert-info {
            background: #eff6ff;
            border-color: #3b82f6;
            color: #1e40af;
        }
        @media (max-width: 600px) {
            .info-grid {
                grid-template-columns: 1fr;
            }
            .container {
                margin: 10px;
                border-radius: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🔧 Sistema de Gestión de Equipos</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Notificación de Mantenimiento</p>
        </div>

        <!-- Content -->
        <div class="content">
            <h2 style="color: #1e293b; margin-bottom: 20px;">{{ $notificationSubject }}</h2>
            
            <!-- Message Content -->
            <div class="message-content">
                {!! nl2br(e($message)) !!}
            </div>

            <!-- Equipment Information -->
            <div class="equipment-info">
                <h3>📋 Información del Equipo</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Instrumento</div>
                        <div class="info-value">{{ $equipment->instrument }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Código Interno</div>
                        <div class="info-value">{{ $equipment->int_code }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Marca</div>
                        <div class="info-value">{{ $equipment->brand }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Modelo</div>
                        <div class="info-value">{{ $equipment->model }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Serie</div>
                        <div class="info-value">{{ $equipment->serial_number }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">N° Sistema</div>
                        <div class="info-value">{{ $equipment->system_number }}</div>
                    </div>
                </div>
                
                <!-- Calibration Info -->
                <div class="info-grid" style="margin-top: 15px;">
                    <div class="info-item">
                        <div class="info-label">Última Calibración Externa</div>
                        <div class="info-value">
                            {{ $equipment->last_ext_calibration ? \Carbon\Carbon::parse($equipment->last_ext_calibration)->format('d/m/Y') : 'No registrada' }}
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Próxima Calibración Externa</div>
                        <div class="info-value">
                            {{ $equipment->next_ext_calibration ? \Carbon\Carbon::parse($equipment->next_ext_calibration)->format('d/m/Y') : 'No programada' }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Maintenance Record Info (if available) -->
            @if($maintenanceRecord)
            <div class="maintenance-info">
                <h4 style="margin: 0 0 10px 0; color: #0c4a6e;">🔧 Información del Mantenimiento</h4>
                <p><strong>Tipo:</strong> {{ $maintenanceRecord->maintenance_type_name }}</p>
                <p><strong>Estado:</strong> {{ ucfirst($maintenanceRecord->status) }}</p>
                <p><strong>Prioridad:</strong> {{ ucfirst($maintenanceRecord->priority) }}</p>
                @if($maintenanceRecord->scheduled_date)
                <p><strong>Fecha Programada:</strong> {{ \Carbon\Carbon::parse($maintenanceRecord->scheduled_date)->format('d/m/Y H:i') }}</p>
                @endif
            </div>
            @endif

            <!-- Call to Action -->
            <div class="alert alert-info">
                <strong>💡 Información importante:</strong><br>
                Este es un correo automático del Sistema de Gestión de Equipos. 
                Para más detalles, ingrese al sistema o contacte al administrador.
            </div>

            <!-- QR Access Info -->
            @if($equipment->qr_token)
            <div class="alert alert-warning">
                <strong>📱 Acceso Rápido:</strong><br>
                Este equipo tiene un código QR para acceso directo a las tareas de mantenimiento. 
                Escanee el código QR ubicado en el equipo para reportar mantenimientos.
            </div>
            @endif
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Sistema de Gestión de Equipos de Laboratorio</strong></p>
            <p>Generado automáticamente el {{ now()->format('d/m/Y H:i:s') }}</p>
            <p style="margin-top: 10px; font-size: 12px;">
                Este correo fue enviado automáticamente, por favor no responder directamente a este mensaje.
            </p>
        </div>
    </div>
</body>
</html>