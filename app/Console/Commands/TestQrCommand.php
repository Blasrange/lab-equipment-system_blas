<?php

namespace App\Console\Commands;

use App\Models\Equipment;
use Illuminate\Console\Command;

class TestQrCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:qr';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test QR functionality for equipment';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $equipment = Equipment::first();

        if (!$equipment) {
            $this->error('No hay equipos en la base de datos');
            return 1;
        }

        $equipment->generateQrToken();

        $this->info('=== TEST QR FUNCTIONALITY ===');
        $this->info('Equipo: ' . $equipment->instrument);
        $this->info('Código: ' . $equipment->int_code);
        $this->info('Token QR: ' . $equipment->qr_token);
        $this->info('URL QR: ' . $equipment->getQrUrl());
        $this->info('URL QR Generator: http://127.0.0.1:8000/equipment/' . $equipment->id . '/qr');
        $this->info('================================');

        return 0;
    }
}
