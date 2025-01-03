import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Snackbar,
    Alert,
    IconButton,
    InputAdornment,
    Divider,
} from '@mui/material';
import { Visibility, VisibilityOff, Google } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const tempErrors = {
            email: formData.email ? (emailRegex.test(formData.email) ? '' : 'Invalid email format') : 'Email is required',
            password: formData.password ? '' : 'Password is required',
        };
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await login(formData.email, formData.password);
            if (response) {
                navigate('/profile');
            }
        } catch (err: any) {
            setErrorMessage(err.message);
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleGoogleLogin = async () => {
        try {

            console.log('Logging in with Google...');
            navigate('/dashboard');
        } catch (err: any) {
            setErrorMessage(err.message);
        }
    };

    const handleSignupRedirect = () => {
        navigate('/signup'); // Redirect to the signup page
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 400,
                mx: 'auto',
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
                sx={{ mt: 2 }}
            >
                {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Button
                onClick={handleForgotPassword}
                variant="text"
                color="secondary"
                fullWidth
                sx={{ mt: 1 }}
            >
                Forgot Password?
            </Button>
            <Divider sx={{ my: 2 }}>or</Divider>
            <Button
                onClick={handleGoogleLogin}
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<Google />}
            >
                Login with Google
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <Button variant="text" onClick={handleSignupRedirect} color="primary">
                    Sign up
                </Button>
            </Typography>
            {errorMessage && (
                <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
                    <Alert onClose={() => setErrorMessage(null)} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
};

export default Login;
