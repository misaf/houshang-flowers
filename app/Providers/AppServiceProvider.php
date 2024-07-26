<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Password;

final class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        URL::forceScheme('https');

        $this->app['request']->server->set('HTTPS', 'on');

        Blade::directive('dateTime', fn(string $expression) => "<?php echo \Carbon\Carbon::parse({$expression})->format('Y-m-d'); ?>");
    }

    /**
     * Configure Eloquent strict mode.
     */
    private function configureEloquentStrictMode(): void
    {
        Model::shouldBeStrict($this->app->environment('production'));
    }

    /**
     * Configure password defaults.
     */
    private function configurePasswordDefaults(): void
    {
        Password::defaults(fn() => Password::min(8)->mixedCase());
    }

    /**
     * Log missing translation key.
     *
     * @param string $key
     */
    private function logMissingTranslationKey(string $key): void
    {
        Log::info("Missing translation key [{$key}] detected.");
    }

    /**
     * Register database query logger.
     */
    private function registerDatabaseQueryLogger(): void
    {
        DB::listen(fn($query) => Log::info($query->sql, $query->bindings));
    }

    /**
     * Register missing translation handler.
     */
    private function registerMissingTranslationHandler(): void
    {
        Lang::handleMissingKeysUsing(fn(string $key, array $replacements, string $locale) => $this->logMissingTranslationKey($key));
    }
}
