import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/user/userContext';
import { MyClasses } from '../components/Profile/MyClasses';
import { InstructorDashboard } from '../components/Profile/InstructorDashboard';
import { AdminDashboard } from '../components/Profile/AdminDashboard';
import { UserDashboard } from '../components/Profile/user/UserDashboard';

export const ProfilePage = () => {
    const { user } = useContext(UserContext);
    const [activeComponent, setActiveComponent] = useState<string>('Dashboard');
    const renderComponent = () => {
        switch (activeComponent) {
            case 'Dashboard':
                return <UserDashboard />
            case 'MyClasses':
                return <MyClasses />
            case 'InstructorPanel':
                return <InstructorDashboard />
            case 'AdminPanel':
                return <AdminDashboard />

            default:
                return <UserDashboard />
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {/* Sidebar */}
            <aside className="bg-blue-600 text-white rounded-lg flex flex-col items-center p-4 shadow-lg">
                {/* Profile Picture */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-400 mb-4">
                    {user?.profilePic ? (
                        <img
                            src={user.profilePic}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-400 text-sm">
                            No Image
                        </div>
                    )}
                </div>

                {/* User Name */}
                <h1 className="text-2xl font-semibold text-center">{user?.name || 'User Name'}</h1>

                {/* Sidebar Buttons */}
                <div className="flex flex-col gap-3 mt-6 w-full">
                    <button
                        className={`py-2 px-4 text-center rounded-md ${activeComponent === 'Dashboard' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-yellow-400'
                            }`}
                        onClick={() => setActiveComponent('Dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`py-2 px-4 text-center rounded-md ${activeComponent === 'MyClasses' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-yellow-400'
                            }`}
                        onClick={() => setActiveComponent('MyClasses')}
                    >
                        My Classes
                    </button>
                    {
                        user?.role.includes('instructor') && <button
                            className={`py-2 px-4 text-center rounded-md ${activeComponent === 'InstructorPanel' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-yellow-400'
                                }`}
                            onClick={() => setActiveComponent('InstructorPanel')}
                        >
                            Instructor Panel
                        </button>
                    }

                    {
                        user?.isAdmin && <button
                            className={`py-2 px-4 text-center rounded-md ${activeComponent === 'AdminPanel' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-yellow-400'
                                }`}
                            onClick={() => setActiveComponent('AdminPanel')}
                        >
                            Admin Panel
                        </button>
                    }

                </div>

                {/* Logout Button */}
                <button
                    className="mt-6 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md w-1/2"
                    onClick={() => console.log('Logout')}
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-lg">
                {renderComponent()}
            </div>
        </div>
    );
};


