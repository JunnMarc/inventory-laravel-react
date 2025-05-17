<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Error | {{ config('app.name') }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="text-center px-4">
        <div class="mb-8">
            <h1 class="text-6xl font-bold text-red-500 mb-4">500</h1>
            <p class="text-2xl text-gray-700 mb-2">Oops! Something went wrong</p>
            <p class="text-gray-500 mb-8">Our servers are having some trouble processing your request.</p>
            
            @if(app()->environment('production'))
                <!-- Production error message -->
                <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mb-8">
                    <p class="text-gray-600">
                        We've been notified of this issue and are working to fix it.
                        Please try again later or contact support if the problem persists.
                    </p>
                </div>
            @else
                <!-- Development error details -->
                <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mb-8 text-left">
                    <p class="font-mono text-sm text-red-600 whitespace-pre-wrap">
                        {{ $exception->getMessage() }}
                    </p>
                </div>
            @endif

            <a href="{{ url('/') }}" class="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                Return Home
            </a>
        </div>
        
        <div class="text-gray-400 text-sm">
            Error Code: 500 | Server Time: {{ now()->format('Y-m-d H:i:s') }}
        </div>
    </div>
</body>
</html> 