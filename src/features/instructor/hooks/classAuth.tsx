import { useContext, useState } from 'react';

import axios from 'axios';
import { UserContext } from '../../Context/userContext';

export const classAuth = () => {

        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const { user } = useContext(UserContext)
        const register = async (userData: {
            title: string,
            description: string,
            date: string,
            timing: string,
            duration: string,
            maxStudents: string,
            category: string,
            level: string,
            thumbnail: string,
        }) => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.post("");
                setLoading(false);
                return response;
            } catch (err: any) {
                console.log(err)
                setError(err.response || 'Registration failed');
                setLoading(false);
                return error;
            }
        };
    

        return { register, loading, error };
    };
    
