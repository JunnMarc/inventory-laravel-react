<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Inertia\Inertia;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            // Log the error
            Log::error('500 Error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
        });

        $this->renderable(function (Throwable $e) {
            if ($this->shouldReturnCustomError($e)) {
                if (request()->header('X-Inertia')) {
                    // For Inertia requests, return a JSON response
                    return Inertia::render('Error', [
                        'status' => 500,
                        'message' => $this->getErrorMessage($e)
                    ])->toResponse(request());
                }
                
                // For regular requests, return the view
                return response()->view('errors.500', [
                    'exception' => $e
                ], 500);
            }
        });
    }

    /**
     * Determine if we should return a custom error.
     */
    private function shouldReturnCustomError(Throwable $e): bool
    {
        return app()->environment('production') || 
               $e instanceof HttpException && $e->getStatusCode() === 500;
    }

    /**
     * Get the error message based on environment.
     */
    private function getErrorMessage(Throwable $e): string
    {
        return app()->environment('production')
            ? 'An unexpected error occurred. Our team has been notified.'
            : $e->getMessage();
    }
} 