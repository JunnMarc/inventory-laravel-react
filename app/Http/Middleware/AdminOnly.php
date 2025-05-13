<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AdminOnly
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && auth()->user()->role === 'manager') {
            return $next($request);
        }

        // Throw forbidden if not admin yes yes
        throw new NotFoundHttpException;
    }
}
