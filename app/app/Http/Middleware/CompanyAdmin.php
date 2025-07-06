<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Company;

class CompanyAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, $parameterName = 'company'): Response
    {
        $company = $request->route($parameterName);
        if (!$company instanceof Company) {
            // Attempt to resolve by id param
            $companyId = $request->route($parameterName);
            $company = Company::find($companyId);
        }

        $user = $request->user();
        if (!$company || !$user) {
            abort(403, 'Unauthorized');
        }

        $isAdmin = $company->users()->wherePivot('role', 'admin')->where('users.id', $user->id)->exists();
        if (!$isAdmin && $user->role !== 'admin') { // platform admin always allowed
            abort(403, 'Company admin only');
        }

        return $next($request);
    }
}
