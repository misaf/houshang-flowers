<?php

declare(strict_types=1);

namespace App\Console;

use DateTimeZone;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

final class Kernel extends ConsoleKernel
{
    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }

    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('ban:delete-expired')->everyMinute();
        $schedule->command('auth:clear-resets')->everyFifteenMinutes();
        $schedule->command('cache:prune-stale-tags')->hourly();

        $schedule->command('telescope:prune --hours=2')
            ->daily()
            ->appendOutputTo(storage_path('logs/schedule-telescope.log'))
            ->withoutOverlapping(3)
            ->evenInMaintenanceMode();
    }

    /**
     * Get the timezone that should be used by default for scheduled events.
     */
    protected function scheduleTimezone(): DateTimeZone|string|null
    {
        return 'Asia/Tehran';
    }
}
