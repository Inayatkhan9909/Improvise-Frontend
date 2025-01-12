import { useState } from 'react';
import axios from 'axios';
import { auth } from '../../lib/firebase/firebaseConfig';

export const useClassAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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

            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.post("http://localhost:4000/classes/createclass", classData, {
                headers: { Authorization: `Bearer ${token}` },

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


    const updateClass = async (classId: string, updatedData: any) => {
        try {
            // Validate input
            if (!classId || typeof updatedData !== 'object') {
                throw new Error('Invalid input data for updating class.');
            }
            const response = await axios.put("");


            return response
        } catch (error: any) {
            console.error('Error updating class:', error);
            return {
                status: error?.response?.status || 500,
                message: error?.message || 'Failed to update class.',
            };
        }
    };
    return { createclass, updateClass, loading, error };
};

