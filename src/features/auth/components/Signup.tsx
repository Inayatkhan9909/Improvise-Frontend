import React, { useState } from 'react';
import {
    Box,
    Button,
    Grid2,
    MenuItem,
    TextField,
    Typography,
    Snackbar,
    Alert,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const { register, loading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        contact: '',
        role: '',
        dob: '',
        gender: '',
        profilePic: null as File | null,
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        name: '',
        contact: '',
        role: '',
        dob: '',
        gender: '',
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const sanitizeInput = (value: string) => {
        return value.replace(/<[^>]*>?/gm, ''); 
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prevData) => ({ ...prevData, [name]: sanitizeInput(value) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const response = await register(formData);
            console.log("signup.tsx response " + response);
            if (response?.status === 201) {
                setSuccessMessage('Registration successful!');
                setErrorMessage(null);
                setTimeout(() => navigate('/login'), 1000); 
            } else {
                console.log("res in signup "+response)
                console.log("else signup "+response?.data?.message)
                
                setErrorMessage(response?.data?.message || "Registration failed");
                setSuccessMessage(null);
            }
        } catch (err: any) {
            console.log("Signup err "+err)
            setErrorMessage(err.message || 'Registration failed.');
            setSuccessMessage(null);
        }
    };

    const validate = () => {
        let tempErrors = { ...errors };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^\d{10}$/;
        const dobDate = new Date(formData.dob);
        const age = new Date().getFullYear() - dobDate.getFullYear();

        tempErrors.email = formData.email ? (emailRegex.test(formData.email) ? '' : 'Invalid email format') : 'Email is required';
        tempErrors.password = formData.password ? '' : 'Password is required';
        tempErrors.name = formData.name ? '' : 'Name is required';
        tempErrors.contact = formData.contact ? (contactRegex.test(formData.contact) ? '' : 'Contact must be 10 digits') : 'Contact is required';
        tempErrors.role = formData.role ? '' : 'Role is required';
        tempErrors.dob = formData.dob ? (age >= 5 ? '' : 'Must be at least 5 years old') : 'Date of Birth is required';
        tempErrors.gender = formData.gender ? '' : 'Gender is required';
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === '');
    };

    const handleGoogleSignIn = ()=>{

    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 600,
                mx: 'auto',
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Sign Up
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid2>

                <Grid2 size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        label="Contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        error={!!errors.contact}
                        helperText={errors.contact}
                    />
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        select
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        error={!!errors.role}
                        helperText={errors.role}
                    >
                        <MenuItem value="">
                            <em>Select Role</em>
                        </MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="instructor">Instructor</MenuItem>
                    </TextField>
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        error={!!errors.dob}
                        helperText={errors.dob}
                        InputLabelProps={{
                            shrink: true, 
                        }}
                    />
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        select
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        error={!!errors.gender}
                        helperText={errors.gender}
                    >
                        <MenuItem value="">
                            <em>Select Gender</em>
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </TextField>
                </Grid2>

                <Grid2 size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Sign Up'}
                    </Button>
                </Grid2>

                <Grid2 size={{xs:12}} sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2">
                        Already registered?{' '}
                        <Button onClick={() => navigate('/login')} size="small">
                            Sign In
                        </Button>
                    </Typography>
                </Grid2>
                <Grid2 size={{xs:12}} sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleGoogleSignIn}
                        fullWidth
                    >
                        Sign Up with Google
                    </Button>
                </Grid2>
            
                
            </Grid2>
            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage(null)}
            >
                <Alert
                    onClose={() => setSuccessMessage(null)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={!!errorMessage}
                autoHideDuration={6000}
                onClose={() => setErrorMessage(null)}
            >
                <Alert
                    onClose={() => setErrorMessage(null)}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Signup;
