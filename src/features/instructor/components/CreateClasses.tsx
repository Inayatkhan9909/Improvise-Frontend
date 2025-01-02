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
} from '@mui/material';

import { classAuth } from '../hooks/classAuth';
import { useNavigate } from 'react-router-dom';

const CreateClass = () => {
    const { register, loading } = classAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        timing: '', 
        duration: '',
        maxStudents: '',
        category: '',
        level: '',
        thumbnail: '',
    });
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        date: '',
        timing: '', // Changed from price to time
        duration: '',
        maxStudents: '',
        category: '',
        level: '',
        thumbnail: '',
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
            console.log("CreateClass response " + response);
            if (response?.status === 201) {
                setSuccessMessage('Class created successfully!');
                setErrorMessage(null);
                setTimeout(() => navigate('/classes'), 1000); 
            } else {
                console.log("Response in CreateClass " + response);
                setErrorMessage(response?.data?.message || "Class creation failed");
                setSuccessMessage(null);
            }
        } catch (err: any) {
            console.log("CreateClass error " + err);
            setErrorMessage(err.message || 'Class creation failed.');
            setSuccessMessage(null);
        }
    };

    const validate = () => {
        let tempErrors = { ...errors };
        tempErrors.title = formData.title ? '' : 'Title is required';
        tempErrors.description = formData.description ? '' : 'Description is required';
        tempErrors.date = formData.date ? '' : 'Date is required';
        tempErrors.timing = formData.timing ? '' : 'Timing is required'; // Validation for time
        tempErrors.duration = formData.duration ? '' : 'Duration is required';
        tempErrors.maxStudents = formData.maxStudents ? '' : 'Max students is required';
        tempErrors.category = formData.category ? '' : 'Category is required';
        tempErrors.level = formData.level ? '' : 'Level is required';
        tempErrors.thumbnail = formData.thumbnail ? '' : 'Thumbnail is required';
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === '');
    };

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
                Create Class
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Class Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        error={!!errors.date}
                        helperText={errors.date}
                        MuiInputLabel-shrink={true}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Timing"
                        name="timing"
                        type="time" 
                        value={formData.timing}
                        onChange={handleChange}
                        error={!!errors.timing}
                        helperText={errors.timing}
                        InputLabelProps={{
                            shrink: true, 
                        }}
                    />
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        label="Duration (in minutes)"
                        name="duration"
                        type="number"
                        value={formData.duration}
                        onChange={handleChange}
                        error={!!errors.duration}
                        helperText={errors.duration}
                    />
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        label="Max Students"
                        name="maxStudents"
                        type="number"
                        value={formData.maxStudents}
                        onChange={handleChange}
                        error={!!errors.maxStudents}
                        helperText={errors.maxStudents}
                    />
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        select
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        error={!!errors.category}
                        helperText={errors.category}
                    >
                        <MenuItem value="">
                            <em>Select Category</em>
                        </MenuItem>
                        <MenuItem value="Music">Music</MenuItem>
                        <MenuItem value="Arts">Arts</MenuItem>
                        <MenuItem value="Sports">Sports</MenuItem>
                        <MenuItem value="Technology">Technology</MenuItem>
                        <MenuItem value="Language">Language</MenuItem>
                    </TextField>
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        select
                        label="Level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        error={!!errors.level}
                        helperText={errors.level}
                    >
                        <MenuItem value="">
                            <em>Select Level</em>
                        </MenuItem>
                        <MenuItem value="Beginner">Beginner</MenuItem>
                        <MenuItem value="Intermediate">Intermediate</MenuItem>
                        <MenuItem value="Advanced">Advanced</MenuItem>
                    </TextField>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Thumbnail URL"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        error={!!errors.thumbnail}
                        helperText={errors.thumbnail}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Class'}
                    </Button>
                </Grid2>

                <Grid2 size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2">
                        Class created successfully?{' '}
                        <Button onClick={() => navigate('/classes')} size="small">
                            View Classes
                        </Button>
                    </Typography>
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

export default CreateClass;