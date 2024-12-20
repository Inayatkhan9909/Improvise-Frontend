import { useState } from 'react';
import { signup } from '../services/authService';
import { auth } from '../../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (userData: {
        email: string;
        password: string;
        name: string;
        contact: string;
        role: string;
        dob: string;
        gender: string;
        profilePic: File | null;
    }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await signup(userData);
            setLoading(false);
            return response;
        } catch (err: any) {
            setError(err.response || 'Registration failed');
            setLoading(false);
            return error;
        }
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken(); // Fetch Firebase Auth token
            setLoading(false);
            return { token };
        } catch (err: any) {
            setError(err.message || 'Login failed');
            setLoading(false);
            return error;
        }
    };

    return { register, login, loading, error };
};
