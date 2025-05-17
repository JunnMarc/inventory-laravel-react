import React from 'react';

interface ErrorProps {
    status: number;
    message: string;
}

export default function Error({ status, message }: ErrorProps) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-red-500 mb-4">{status}</h1>
                    <p className="text-2xl text-gray-700 mb-2">Oops! Something went wrong</p>
                    <p className="text-gray-500 mb-8">Our servers are having some trouble processing your request.</p>
                    
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mb-8">
                        <p className="text-gray-600">
                            {message}
                        </p>
                    </div>

                    <button 
                        onClick={() => window.location.href = '/'}
                        className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Return Home
                    </button>
                </div>
                
                <div className="text-gray-400 text-sm">
                    Error Code: {status} | Server Time: {new Date().toLocaleString()}
                </div>
            </div>
        </div>
    );
} 