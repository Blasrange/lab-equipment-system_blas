<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FixMigrationsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:migrations';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix missing migration records';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $migrations = [
            '0001_01_01_000000_create_users_table',
            '0001_01_01_000001_create_cache_table',
            '0001_01_01_000002_create_jobs_table',
            '2025_08_26_100418_add_two_factor_columns_to_users_table',
            '2025_09_18_233301_create_equipment_table',
            '2025_09_19_120000_create_maintenance_types_table',
            '2025_09_19_130000_create_maintenance_records_table'
        ];

        foreach ($migrations as $migration) {
            $exists = DB::table('migrations')->where('migration', $migration)->exists();

            if (!$exists) {
                DB::table('migrations')->insert([
                    'migration' => $migration,
                    'batch' => 1
                ]);
                $this->info("Agregada migración: $migration");
            } else {
                $this->comment("Ya existe migración: $migration");
            }
        }

        $this->info('✅ Migraciones reparadas correctamente!');

        return 0;
    }
}