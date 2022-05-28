<?php

namespace App\Http\Middleware;

use Closure;

class AdminAuth
{

    public function handle($request, Closure $next)
    {
        if (auth()->user()->role === 'admin') {
            return $next($request);
        }
        return response([
            'message' => 'Không được phép truy cập.'
        ], 503);
    }
}
