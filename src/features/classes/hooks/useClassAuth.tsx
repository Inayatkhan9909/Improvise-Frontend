import { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../../lib/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
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
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => { 
        const unsubscribe = onAuthStateChanged(auth, async (user:any) => {
            if (user) {
                const fetchedToken = await user.getIdToken(true);
                console.log("token inuser "+token)
                setToken(fetchedToken);
            } else {
                setToken(null);
            }
            setLoading(false); 
        });

        return () => unsubscribe(); 
    }, []);

    const createclass = async (classData: ClassData) => {
        setLoading(true);
        setError(null);
        try {
           
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
            const response = await axios.delete(`${ApiUrl}/classes/delete-class/${classId}`, {
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

    const fetchInstructorClasses = async (token:string)=>{
        try {     
            setLoading(true);
            console.log(token);
            const response = await axios.get(`${ApiUrl}/instructor/get-instructor-classes`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLoading(false);
            return response;
            
        } catch (error:any) {
            setLoading(false);
            console.error('Error fetching class:', error);
            return {
                status: error?.response?.status || 500,
                data: error?.response?.data || 'Failed to fetching class.',
            };
        }
    }
    const deleteInstructorClasses = async (classId:string)=>{
        setLoading(true);
        try {
            const response = await axios.delete(`http://localhost:4000/instructor/classes/${classId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLoading(false);
            return response
            
        } catch (error:any) {
            setLoading(false);
            console.error('Error delete class:', error);
            return {
                status: error?.response?.status || 500,
                data: error?.response?.data || 'Failed to deleting class.',
            };
        }
    }



    const bookClass = async (classId: any) => {
        try {
            setLoading(true);
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

    return { createclass, updateClass, deleteClass,
        fetchInstructorClasses,deleteInstructorClasses,
         bookClass, cancelBookedClass, loading, error };
};

