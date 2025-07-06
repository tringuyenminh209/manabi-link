<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckEkycStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect('login');
        }

        // Chỉ check eKYC cho instructor
        if ($user->role === 'instructor' && $user->ekyc_status !== 'verified') {
            return redirect()->route('profile.ekyc')
                ->with('warning', 'Bạn cần xác thực danh tính để sử dụng chức năng này.');
        }

        return $next($request);
    }
}
