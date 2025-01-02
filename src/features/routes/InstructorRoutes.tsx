import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/userContext';
import { Outlet, useNavigate } from 'react-router-dom';

const InstructorRoutes = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
 
    useEffect(() => {
        if (!user?.role.includes('instructor')) {
            navigate('/unauthorized');
        }
    }, [user, navigate]);

    return user && user?.role.includes('instructor') ? <Outlet /> : null;
}

export default InstructorRoutes