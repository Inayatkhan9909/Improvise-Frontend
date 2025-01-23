import { useState } from 'react';
import axios from 'axios';
import { auth } from '../../lib/firebase/firebaseConfig';
const ApiUrl = process.env.REACT_APP_BACKEND_API_URL;

export const useCourseAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   
    const createCourse = async (courseData: {
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
            const response = await axios.post(`${ApiUrl}/courses/create-course`, courseData, {
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


    const updateCourse = async (classId: string, updatedData: any) => {
        try {
            if (!classId || typeof updatedData !== 'object') {
                throw new Error('Invalid input data for updating class.');
            }
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.get(`${ApiUrl}/instructor/get-instructor-courses`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response;
        } catch (error: any) {
            console.error('Error updating class:', error);
            return {
                status: error?.response?.status || 500,
                message: error?.message || 'Failed to update class.',
            };
        }
    };

    const deleteCourse = async (courseId: string) => {
        try {
            if (!courseId ) {
                throw new Error('Invalid input data for delete class.');
            }
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.delete(`${ApiUrl}/delete-course/${courseId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            return response;
        } catch (error: any) {
            console.error('Error delete course:', error);
            return {
                status: error?.response?.status || 500,
                message: error?.message || 'Failed to update course',
            };
        }
    };

    const fetchInstructorCourses = async (token:string)=>{
        try {     
            setLoading(true);
            const response = await axios.get(`${ApiUrl}/instructor/get-instructor-courses`, {
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

    const fetchUserCourses = async (token:string)=>{
        try {     
            setLoading(true);
            const response = await axios.get(`${ApiUrl}/courses/get-userbooked-courses`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLoading(false);
            return response;
            
        } catch (error:any) {
            setLoading(false);
            console.error('Error fetching courses:', error);
            return {
                status: error?.response?.status || 500,
                data: error?.response?.data || 'Failed to fetching courses',
            };
        }
    }

    const bookCourse = async (courseId: any) => {
        try {
            setLoading(true);
            const token = await auth.currentUser?.getIdToken(true);
          const response =  await axios.put(
              `${ApiUrl}/courses/bookcourse`,
              courseId,
              { headers: { Authorization: `Bearer ${token}` } }
            );
     
            setLoading(false);
            return response;

        } catch (error: any) {
            setLoading(false);
            console.error('Error book course:', error);
            return {
                status: error?.response?.status || 500,
                data: error?.response?.data || 'Failed to book course.',
            };
        }
    }

    const cancelBookedCourse = async (courseId: any) => {
        try {
            setLoading(true);
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.delete(`${ApiUrl}/courses/cancel-user-coursebooking/${courseId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setLoading(false);
            return response;
        } catch (error: any) {
            setLoading(false);
            console.error('Error updating course:', error);
            return {
                status: error?.response?.status || 500,
                message: error?.message || 'Failed to update course',
            };
        }
    }
    return { createCourse, updateCourse,fetchInstructorCourses,bookCourse,
        cancelBookedCourse,deleteCourse,fetchUserCourses, loading, error };
};

