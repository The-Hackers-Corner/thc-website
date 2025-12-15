<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        $adminEmail = env('ADMIN_EMAIL');

        if (! $user) {
            abort(403);
        }

        if ($user->is_admin) {
            return $next($request);
        }

        if ($adminEmail && $user->email === $adminEmail) {
            return $next($request);
        }

        abort(403);
    }
}
