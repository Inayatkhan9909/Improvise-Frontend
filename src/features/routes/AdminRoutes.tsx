import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/user/userContext'
import { Outlet, useNavigate } from 'react-router-dom';

const AdminRoutes = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.isAdmin) {
            navigate('/unauthorized');
        }
    }, [user, navigate]);

    return user && user?.isAdmin ? <Outlet /> : null;


}

export default AdminRoutes