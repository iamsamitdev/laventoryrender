<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Middleware\Authenticate as FrameworkAuthenticate;
use App\Http\Middleware\Authenticate as CustomAuthenticate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // 🔁 Bind middleware Authenticate ของ Laravel ให้ใช้ของเราแทน
        $this->app->bind(FrameworkAuthenticate::class, CustomAuthenticate::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
