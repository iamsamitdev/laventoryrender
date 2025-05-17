<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class ForceHttps
{
    public function handle(Request $request, Closure $next)
    {
        if (App::environment('production')) {
            // ตรวจสอบ X-Forwarded-Proto หรือ secure connection
            if (!$request->isSecure() && !$request->header('X-Forwarded-Proto') === 'https') {
                return redirect()->secure($request->getRequestUri());
            }
        }

        return $next($request);
    }
}