<?php

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        $middleware->alias([
            'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
            'abilities' => Laravel\Sanctum\Http\Middleware\CheckAbilities::class,
            'ability' => Laravel\Sanctum\Http\Middleware\CheckForAnyAbility::class,
        ]);

        $middleware->validateCsrfTokens(except: [
            '/*'
        ]);

        //
    })->withSchedule(function (Schedule $schedule) {
        $schedule->command("app:expire-pending-borrow-requests")->daily();
        $schedule->command("app:mark-overdue-borrow-requests")->daily();
        $schedule->command("app:send-book-due-reminder")->daily();
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
