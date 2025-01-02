import React, { useState, useContext } from 'react';
import { useAuth } from '../auth/hooks/useAuth'; // Access global user data
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';

const Navbar: React.FC = () => {
    const { logout } = useAuth();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="border-blue-300 border-2  shadow-md">
            <nav className="flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div
                    className="text-3xl font-bold cursor-pointer text-yellow-400"
                    onClick={() => navigate('/')}
                >
                    Improvise
                </div>

                {/* Desktop Links */}
                <ul className="hidden md:flex gap-6 text-lg">
                    <li className="cursor-pointer hover:text-yellow-400" onClick={() => navigate('/')}>
                        Home
                    </li>
                    <li className="cursor-pointer hover:text-yellow-400" onClick={() => navigate('/about')}>
                        About Us
                    </li>
                    <li className="cursor-pointer hover:text-yellow-400" onClick={() => navigate('/classes')}>
                        Find Class
                    </li>
                    {user ? (
                        <>
                            <li
                                className="cursor-pointer hover:text-yellow-400"
                                onClick={() => navigate('/profile')}
                            >
                                Profile
                            </li>
                            <li
                                className="cursor-pointer hover:text-yellow-400"
                                onClick={handleLogout}
                            >
                                Logout
                            </li>
                        </>
                    ) : (
                        <>
                            <li
                                className="cursor-pointer hover:text-yellow-400"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </li>
                            <li
                                className="cursor-pointer hover:text-yellow-400 bg-blue-400 rounded-full p-2"
                                onClick={() => navigate('/signup')}
                            >
                                Join us
                            </li>
                        </>
                    )}
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        className=" focus:outline-none"
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-blue-400 text-white shadow-lg">
                    <ul className="flex flex-col gap-4 p-4">
                        <li className="cursor-pointer hover:text-yellow-400" onClick={() => navigate('/')}>
                            Home
                        </li>
                        <li className="cursor-pointer hover:text-yellow-400" onClick={() => navigate('/about')}>
                            About Us
                        </li>
                        <li className="cursor-pointer hover:text-yellow-400" onClick={() => navigate('/classes')}>
                            Find Class
                        </li>
                        {user ? (
                            <>
                                <li
                                    className="cursor-pointer hover:text-yellow-400"
                                    onClick={() => navigate('/profile')}
                                >
                                    Profile
                                </li>
                                <li
                                    className="cursor-pointer hover:text-yellow-400"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </>
                        ) : (
                            <>
                                <li
                                    className="cursor-pointer hover:text-yellow-400"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </li>
                                <li
                                    className="cursor-pointer hover:text-yellow-400 "
                                    onClick={() => navigate('/signup')}
                                >
                                    Join Us
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
