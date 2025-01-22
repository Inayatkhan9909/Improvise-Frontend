import { useState } from 'react';
import axios from 'axios';
import { auth } from '../../lib/firebase/firebaseConfig';
const ApiUrl = process.env.REACT_APP_BACKEND_API_URL;

interface ClassData {
    title: string,
    description: string,
    date: string,
    timing: string,
    duration: string,
    maxStudents: string,
    category: string,
    level: string,
    thumbnail: string,
}

export const useClassAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createclass = async (classData: ClassData) => {
        setLoading(true);
        setError(null);
        try {
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.post(`${ApiUrl}/classes/createclass`, classData, {
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


    const updateClass = async (classId: string, updatedData: ClassData) => {
        try {
            if (!classId || typeof updatedData !== 'object') {
                throw new Error('Invalid input data for updating class.');
            }
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.post(`${ApiUrl}/classes/update-class`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },

            });
            return response;
        } catch (error: any) {
            console.error('Error delete class:', error);
            return {
                status: error?.response?.status || 500,
                message: error?.message || 'Failed to delete class.',
            };
        }
    };
    const deleteClass = async (classId: string) => {
        try {
            if (!classId ) {
                throw new Error('Invalid input data for delete class.');
            }
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.delete(`http://localhost:4000/classes/delete-class/${classId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
            return response;
        } catch (error: any) {
            console.error('Error delete class:', error);
            return {
                status: error?.response?.status || 500,
                message: error?.message || 'Failed to update class.',
            };
        }
    };




    const bookClass = async (classId: any) => {
        try {
            setLoading(true);
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.put(
                `${ApiUrl}/classes/bookclass`,
                classId,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setLoading(false);
            return response;

        } catch (error: any) {
            setLoading(false);
            console.error('Error book class:', error);
            return {
                status: error?.response?.status || 500,
                data: error?.response?.data || 'Failed to book class.',
            };
        }
    }
    const cancelBookedClass = async (classId: any) => {
        try {
            setLoading(true);
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.delete(`${ApiUrl}/classes/cancel-user-classbooking/${classId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLoading(false);
            return response;
        } catch (error: any) {
            setLoading(false);
            console.error('Error updating class:', error);
            return {
                status: error?.response?.status || 500,
                message: error?.message || 'Failed to update class.',
            };
        }
    }

    return { createclass, updateClass, deleteClass, bookClass, cancelBookedClass, loading, error };
};

