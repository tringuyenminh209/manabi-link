<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends BaseApiController
{
    /**
     * Register a new user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20',
            'date_of_birth' => 'nullable|date',
            'country' => 'nullable|string|max:10',
            'location' => 'nullable|string|max:100',
            'address' => 'nullable|string|max:500',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:learner,teacher',
            'language_preference' => 'nullable|in:ja,vi,en',
            'subscribe_newsletter' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'date_of_birth' => $request->date_of_birth,
            'country' => $request->country,
            'location' => $request->location,
            'address' => $request->address,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'language_preference' => $request->language_preference ?? 'ja',
            'ekyc_status' => 'not_verified',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        $data = [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'language_preference' => $user->language_preference,
                'ekyc_status' => $user->ekyc_status,
            ],
            'access_token' => $token,
            'token_type' => 'Bearer',
        ];

        return $this->sendResponse($data, 'User registered successfully', 201);
    }

    /**
     * Login user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->sendError('Invalid credentials', [], 401);
        }

        // Revoke existing tokens (optional - for single session)
        // $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        $data = [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'language_preference' => $user->language_preference,
                'ekyc_status' => $user->ekyc_status,
                'avatar_path' => $user->avatar_path,
            ],
            'access_token' => $token,
            'token_type' => 'Bearer',
        ];

        return $this->sendResponse($data, 'User logged in successfully');
    }

    /**
     * Get authenticated user details
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'language_preference' => $user->language_preference,
            'ekyc_status' => $user->ekyc_status,
            'avatar_path' => $user->avatar_path,
            'bio' => $user->bio,
            'created_at' => $user->created_at,
        ];

        return $this->sendResponse($data);
    }

    /**
     * Logout user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->sendResponse([], 'User logged out successfully');
    }

    /**
     * Logout from all devices
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logoutAll(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return $this->sendResponse([], 'User logged out from all devices successfully');
    }

    /**
     * Update user profile
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'bio' => 'sometimes|string|max:1000',
            'language_preference' => 'sometimes|in:ja,vi,en',
            'avatar' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error', $validator->errors()->toArray(), 422);
        }

        // Handle avatar upload if provided
        if ($request->hasFile('avatar')) {
            // TODO: Implement file upload logic
            // For now, just store the filename
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar_path = $avatarPath;
        }

        $user->update($request->only(['name', 'bio', 'language_preference']));

        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'language_preference' => $user->language_preference,
            'ekyc_status' => $user->ekyc_status,
            'avatar_path' => $user->avatar_path,
            'bio' => $user->bio,
        ];

        return $this->sendResponse($data, 'Profile updated successfully');
    }
}
