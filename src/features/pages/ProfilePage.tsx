import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Context/user/userContext';
import { InstructorDashboard } from '../components/Profile/InstructorDashboard';
import { AdminDashboard } from '../components/Profile/AdminDashboard';
import { UserDashboard } from '../components/Profile/user/UserDashboard';
import { UserBookedClasses } from '../classes/components/UserBookedClasses';
import { UserBookedCourses } from '../courses/components/UserBookedCourses';

export const ProfilePage = () => {
    const { user } = useContext(UserContext);
    const [activeComponent, setActiveComponent] = useState<string>('');

    useEffect(() => {
        const savedPanel = localStorage.getItem('activeComponent');
        if (savedPanel) {
            setActiveComponent(savedPanel);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('activeComponent', activeComponent);
    }, [activeComponent]);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Dashboard':
                return <UserDashboard />;
            case 'MyClasses':
                return <UserBookedClasses />;
            case 'MyCourses':
                return <UserBookedCourses />;
            case 'InstructorPanel':
                return <InstructorDashboard />;
            case 'AdminPanel':
                return <AdminDashboard />;
            default:
                return <UserDashboard />;
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
            {/* Sidebar */}
            <aside className="bg-blue-600 text-white rounded-lg flex flex-col items-center p-2 shadow-lg md:col-span-1 max-h-fit">
                {/* Profile Picture */}
                <div className="w-20 h-20 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-yellow-400 mb-4">
                    {user?.profilePic ? (
                        <img
                            src={user.profilePic}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-400 text-lg">
                            No Image
                        </div>
                    )}
                </div>

                {/* User Name */}
                <h1 className="text-lg  font-semibold text-center">{user?.name || 'User Name'}</h1>

                {/* Sidebar Buttons */}
                <div className="flex flex-col gap-3 mt-4 w-full md:w-fit">
                    <button
                        className={`py-2 px-2 text-sm md:text-lg text-center rounded-md ${activeComponent === 'Dashboard' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-yellow-400'}`}
                        onClick={() => setActiveComponent('Dashboard')}
                    >
                        Dashboard
                    </button>
                    {
                        user?.role.includes('student') && <button
                            className={`py-2 px-2 text-sm md:text-lg text-center rounded-md ${activeComponent === 'MyClasses' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-yellow-400'}`}
                            onClick={() => setActiveComponent('MyClasses')}
                        >
                            My Classes
                        </button>
                    }
                    {
                        user?.role.includes('student') && <button
                            className={`py-2 px-2 text-sm md:text-lg text-center rounded-md ${activeComponent === 'MyCourses' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-yellow-400'}`}
                            onClick={() => setActiveComponent('MyCourses')}
                        >
                            My Courses
                        </button>
                    }

                    {user?.role.includes('instructor') && (
                        <button
                            className={`py-2 px-2 text-sm md:text-lg text-center rounded-md ${activeComponent === 'InstructorPanel' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-yellow-400'}`}
                            onClick={() => setActiveComponent('InstructorPanel')}
                        >
                            Instructor
                        </button>
                    )}
                    {user?.isAdmin && (
                        <button
                            className={`py-2 px-2 text-sm md:text-lg text-center rounded-md ${activeComponent === 'AdminPanel' ? 'bg-yellow-400 text-blue-800' : 'hover:bg-yellow-400'}`}
                            onClick={() => setActiveComponent('AdminPanel')}
                        >
                            Admin
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <div className="md:col-span-3 bg-white p-4 rounded-lg shadow-lg">
                {renderComponent()}
            </div>
        </div>
    );
};
