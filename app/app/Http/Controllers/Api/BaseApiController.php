<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class BaseApiController extends Controller
{
    /**
     * Success response method
     *
     * @param mixed $data
     * @param string $message
     * @param int $code
     * @return JsonResponse
     */
    protected function sendResponse($data, string $message = '', int $code = 200): JsonResponse
    {
        $response = [
            'success' => true,
            'data' => $data,
        ];

        if (!empty($message)) {
            $response['message'] = $message;
        }

        return response()->json($response, $code);
    }

    /**
     * Error response method
     *
     * @param string $error
     * @param array $errorMessages
     * @param int $code
     * @return JsonResponse
     */
    protected function sendError(string $error, array $errorMessages = [], int $code = 404): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if (!empty($errorMessages)) {
            $response['errors'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

    /**
     * Get preferred language from request
     *
     * @return string
     */
    protected function getPreferredLanguage(): string
    {
        $acceptedLanguages = ['ja', 'vi', 'en'];
        $language = request()->header('Accept-Language', 'ja');

        // Check if requested language is supported
        if (in_array($language, $acceptedLanguages)) {
            return $language;
        }

        // Default to Japanese
        return 'ja';
    }
}
