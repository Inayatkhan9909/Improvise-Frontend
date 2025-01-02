import React, { useContext, useEffect } from 'react';
import { UserContext } from '../Context/userContext';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthRoutes = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/unauthorized');
        }
    }, [user, navigate]); // Dependency array includes user and navigate

    return !user ? <Outlet /> : null; // Render Outlet if user is not present
}

export default AuthRoutes;
