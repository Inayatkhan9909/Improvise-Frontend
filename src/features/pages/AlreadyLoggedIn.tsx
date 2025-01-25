import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../auth/hooks/useAuth';

export const AlredyLoggedIn = () => {
  const currentPath= useParams();
  const {logout} = useAuth(); 
  const navigate = useNavigate();
  const handleLogout = async() => {
    await logout();
    console.log('currentPath', currentPath);
    navigate(`/${currentPath.currentPath}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Alredy Loggedin</h1>
        <p className="text-gray-700 mb-6">
          You are already logged in, please logout to access this page.
        </p>
  <div className='flex  items-center justify-between gap-4'>
  <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
        >
          logout
        </button>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Back to Home
        </button>
  </div>
      </div>
    </div>
  );
};


