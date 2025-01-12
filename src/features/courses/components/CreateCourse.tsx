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
import { useCourseAuth } from '../hooks/useCourseAuth';
import { getFilePreview, uploadFile } from '../../lib/appwrite/uploadImage';

const CreateCourse = () => {
    const { createCourse, loading } = useCourseAuth();
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        timing: '',
        duration: '',
        price: '',
        maxStudents: '',
        category: '',
        level: '',
        thumbnail: '',
    });
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        date: '',
        timing: '',
        duration: '',
        maxStudents: '',
        price:'',
        category: '',
        level: '',
        thumbnailFile: '',
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const sanitizeInput = (value: string) => value.replace(/<[^>]*>?/gm, '');

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
        }
    };

    const uploadThumbnail = async (): Promise<string | null> => {
        if (!thumbnailFile) {
            setErrorMessage('No file selected for upload.');
            return null;
        }
        try {
            const uploadedFile = await uploadFile(thumbnailFile);
            if (!uploadedFile || !uploadedFile.$id) {
                throw new Error('Failed to retrieve file ID after upload.');
            }
            const thumbnailUrl = getFilePreview(uploadedFile.$id);
            return thumbnailUrl || null;
        } catch (error) {
            console.error('Image upload failed:', error);
            setErrorMessage('Image upload failed. Please try again.');
            return null;
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: sanitizeInput(value) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const thumbnailUrl = await uploadThumbnail();
            if (!thumbnailUrl) {
                setErrorMessage('Thumbnail upload failed. Please check the file.');
                return;
            }

            const updatedFormData = { ...formData, thumbnail: thumbnailUrl };
            const response = await createCourse(updatedFormData);

            if (response?.status === 201) {
                setSuccessMessage('Course created successfully!');
                setErrorMessage(null);
            } else {
                setErrorMessage(response?.data?.message || 'Course creation failed.');
                setSuccessMessage(null);
            }
        } catch (error: any) {
            console.error('Error creating course:', error);
            setErrorMessage(error.message || 'Course creation failed.');
            setSuccessMessage(null);
        }
    };

    const validateForm = () => {
        const tempErrors = { ...errors };
        tempErrors.title = formData.title ? '' : 'Title is required';
        tempErrors.description = formData.description ? '' : 'Description is required';
        tempErrors.date = formData.date ? '' : 'Date is required';
        tempErrors.timing = formData.timing ? '' : 'Timing is required';
        tempErrors.duration = formData.duration ? '' : 'Duration is required';
        tempErrors.price = formData.price ? '' : 'Price is required';
        tempErrors.maxStudents = formData.maxStudents ? '' : 'Max students is required';
        tempErrors.category = formData.category ? '' : 'Category is required';
        tempErrors.level = formData.level ? '' : 'Level is required';
        tempErrors.thumbnailFile = thumbnailFile ? '' : 'Thumbnail is required';
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
            <Typography variant="h5" gutterBottom>
                Create Course
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Course Title"
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
                <Grid2 size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        label="Date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        error={!!errors.date}
                        helperText={errors.date}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        label="Timing"
                        name="timing"
                        type="time"
                        value={formData.timing}
                        onChange={handleChange}
                        error={!!errors.timing}
                        helperText={errors.timing}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        label="Duration (days)"
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
                        label="Price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        error={!!errors.price}
                        helperText={errors.price}
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
                        {['Music', 'Arts', 'Sports', 'Technology', 'Language'].map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
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
                        {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                            <MenuItem key={lvl} value={lvl}>
                                {lvl}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                    <TextField
                        fullWidth
                        label="Thumbnail Image"
                        name="thumbnailFile"
                        type="file"
                        onChange={handleChangeFile}
                        error={!!errors.thumbnailFile}
                        helperText={errors.thumbnailFile}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid2>
                <Grid2 size={{ xs: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Course'}
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

export default CreateCourse;
