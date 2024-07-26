<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

final class RouteServiceProvider extends ServiceProvider
{
    use \Mcamara\LaravelLocalization\Traits\LoadsTranslatedCachedRoutes;

    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        Route::whereNumber('id');
        Route::pattern('locale', '[a-zA-Z]{2}');

        $this->configureRateLimiting();
        $this->configureRoutes();
    }

    /**
     * Configure rate limiting for the API.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('web', fn(Request $request) => Limit::perMinute(180)->by($request->user()?->id ?: $request->ip()));
    }

    /**
     * Configure application routes.
     */
    private function configureRoutes(): void
    {
        $this->routes(function (): void {
            $this->configureWebRoutes();
        });
    }

    /**
     * Configure web routes.
     */
    private function configureWebRoutes(): void
    {
        Route::middleware([
            'web',
            'localeSessionRedirect',
            'localizationRedirect',
            'localeViewPath',
            'localize',
        ])
            ->prefix(LaravelLocalization::setLocale())
            ->group(base_path('routes/web.php'));
    }
}
