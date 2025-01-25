import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
    const navigate = useNavigate();


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Page Not Found</h1>
                <p className="text-gray-700 mb-6">
                    You are trying to access a page that does not exist.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    Back to Home
                </button>

            </div>
        </div>
    );
};


