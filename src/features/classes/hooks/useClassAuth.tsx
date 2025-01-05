import { useContext, useState } from 'react';

import axios from 'axios';
import { UserContext } from '../../Context/userContext';

export const useClassAuth = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext)
    const createclass = async (classData: {
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
           
            const instructorId = user?._id;
            const response = await axios.post("http://localhost:4000/classes/createclass", classData, {
                headers: { Authorization: `Bearer ${instructorId}` },

            });
            setLoading(false);
            return response;
        } catch (err: any) {
            console.log(err)
            setError(err.response || 'Registration failed');
            setLoading(false);
            return error;
        }
    };
    return { createclass, loading, error };
};

