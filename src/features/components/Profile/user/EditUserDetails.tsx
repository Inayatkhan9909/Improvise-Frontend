import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Snackbar,
    Alert,
    IconButton,
    Grid2,
} from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { UserContext } from '../../../Context/user/userContext';
import { auth } from '../../../lib/firebase/firebaseConfig';
import { useProfileAuth } from '../hooks/useProfileAuth';
const ApiUrl = process.env.REACT_APP_BACKEND_API_URL;

export const EditUserDetails = ({ onClose }: any) => {
    const { user, setUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        contact: user?.contact || '',
        dob: user?.dob || '',
        gender: user?.gender || '',
    });
    const [errors, setErrors] = useState({
        name: '',
        contact: '',
        dob: '',
        gender: '',
    });
    const { editUserDetails, loading } = useProfileAuth();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        console.log('User context data:', user);
        if (user) {
            setFormData({
                name: user.name || '',
                contact: user.contact || '',
                dob: user.dob || '',
                gender: user.gender || '',
            });
        }
    }, [user]);

    const sanitizeInput = (value: string) => value.replace(/<[^>]*>?/gm, '');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: sanitizeInput(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await editUserDetails(formData);
            if (response.status === 201) {
                setSuccessMessage('Profile updated successfully!');
                setErrorMessage(null);
                setUser(response.data.user);
                setTimeout(() => {
                    onClose();
                }, 1000);
            }else{
                setErrorMessage(response?.data?.message || 'Failed to update profile.')
            }
        } catch (err: any) {
            setErrorMessage(err.response?.data?.message || 'Failed to update profile.');
            setSuccessMessage(null);
        }
    };

    const validate = () => {
        const contactRegex = /^\d{10}$/;
        const dobDate = new Date(formData.dob);
        const age = new Date().getFullYear() - dobDate.getFullYear();
        const tempErrors = {
            name: formData.name ? '' : 'Name is required',
            contact: formData.contact
                ? contactRegex.test(formData.contact)
                    ? ''
                    : 'Contact must be 10 digits'
                : 'Contact is required',
            dob: formData.dob
                ? age >= 5
                    ? ''
                    : 'Must be at least 5 years old'
                : 'Date of Birth is required',
            gender: formData.gender ? '' : 'Gender is required',
        };
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === '');
    };

    return (
        <div className="bg-white ">

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
                <div className='w-full flex justify-between'>
                    <Typography variant="h4" gutterBottom>
                        Edit Details
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        className=" text-gray-600 hover:text-gray-800"
                        title="Close"
                    >
                        <RxCross2 />
                    </IconButton>
                </div>

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

                    <Grid2
                        size={{ xs: 12 }}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
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
        </div>
    );
};
