<?php

namespace App\Providers;

use Inertia\Inertia;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => function () {
                return [
                    'user' => Auth::user(),
                    'permissions' => Auth::check()
                        ? Auth::user()->getAllPermissions()->pluck('name')
                        : [],
                ];
            },
        ]);
    }
}
