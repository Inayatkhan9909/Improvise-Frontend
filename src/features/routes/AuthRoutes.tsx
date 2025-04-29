import React, { useContext, useEffect } from 'react';
import { UserContext } from '../Context/user/userContext';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthRoutes = () => {
    const { user } = useContext(UserContext); 
    const navigate = useNavigate();

    useEffect(() => {
        const restrictedPaths = ["/signup", "/login"];
        const currentPath = window.location.pathname;

        if (user && restrictedPaths.includes(currentPath)) {
            navigate(`/alredyloggedin${currentPath}`);
        }
    }, [user, navigate]); 

    return !user ? <Outlet /> : null; 
};


export default AuthRoutes;
