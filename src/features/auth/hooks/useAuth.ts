import { useContext, useState } from 'react';
import { signup } from '../services/authService';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase/firebaseConfig';
import axios from 'axios';
import { UserContext } from '../../Context/user/userContext';
const ApiUrl = process.env.REACT_APP_BACKEND_API_URL;

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setUser } = useContext(UserContext)
    const register = async (userData: {
        email: string;
        password: string;
        name: string;
        contact: string;
        role: string;
        dob: string;
        gender: string;
    }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await signup(userData);
            setLoading(false);
            return response;
        } catch (err: any) {
            console.log(err)
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
            const response = await axios.post(`${ApiUrl}/auth/login`, { token });
            setLoading(false);
            setUser(response.data.user);
            return response;
        } catch (err: any) {
            setError(err.message || 'Login failed');
            setLoading(false);
            throw err;
        }
    };

    const logout = async () => {
        setLoading(true);
        localStorage.setItem('activeComponent', 'Dashboard');
        localStorage.setItem("activeSection", 'details');
        setUser(null);
        setLoading(false);
    };

    return { register, login, logout, loading, error };
};






