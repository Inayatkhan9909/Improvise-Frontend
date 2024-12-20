import { createContext,useContext, useState } from 'react';
import { signup } from '../services/authService';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import axios from 'axios';
import { UserContext } from '../Context/userContext';


export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {setUser} = useContext(UserContext)
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
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            if (!userCredential.user.emailVerified) {
                setLoading(false);
                throw new Error('Please verify your email before logging in.');
            }

            const token = await userCredential.user.getIdToken();
            const response = await axios.post('http://localhost:4000/user/login', { token });
            setLoading(false);
           setUser(response.data);
            return response.data;
        } catch (err: any) {
            setError(err.message || 'Login failed');
            setLoading(false);
            throw err;
        }
    };

    return { register, login, loading, error };
};






