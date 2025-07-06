<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Company;
use Illuminate\Support\Facades\Validator;

class CompanyController extends BaseApiController
{
    // Platform admin: list companies
    public function index(): JsonResponse
    {
        $companies = Company::paginate(20);
        return $this->sendResponse($companies);
    }

    // Platform admin: create company
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'domain' => 'nullable|string|max:255',
            'contact_email' => 'nullable|email',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation error', $validator->errors()->toArray(), 422);
        }

        $company = Company::create($validator->validated());
        // Make current user company admin
        $request->user()->companies()->attach($company->id, ['role' => 'admin']);

        return $this->sendResponse($company, 'Company created', 201);
    }

    // Company admin: show company detail
    public function show(Company $company): JsonResponse
    {
        $company->load('users');
        return $this->sendResponse($company);
    }
}
