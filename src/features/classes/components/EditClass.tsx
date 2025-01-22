import React, { useState, useEffect } from 'react';
import {
    Grid2,
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';
import { useClassAuth } from '../hooks/useClassAuth';
import { getFilePreview, uploadFile } from '../../lib/appwrite/uploadImage';

export const EditClass = ({ classDetails, onClose }: any) => {
         
    const { updateClass, loading } = useClassAuth();
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        classId:'',
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
        timing: '',
        duration: '',
        maxStudents: '',
        category: '',
        level: '',
        thumbnailFile: '',
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (classDetails) {
            setFormData({
                classId:classDetails._id || '',
                title: classDetails.title || '',
                description: classDetails.description || '',
                date: classDetails.date || '',
                timing: classDetails.timing || '',
                duration: classDetails.duration || '',
                maxStudents: classDetails.maxStudents || '',
                category: classDetails.category || '',
                level: classDetails.level || '',
                thumbnail: classDetails.thumbnail || '',
            });
        }
    }, [classDetails]);

    const sanitizeInput = (value: string) => value.replace(/<[^>]*>?/gm, '');

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setThumbnailFile(file);
    };

    const uploadImage = async (): Promise<string | null> => {
        if (!thumbnailFile) return formData.thumbnail; // Use the existing thumbnail if no new file is uploaded
        try {
            const uploadedFile = await uploadFile(thumbnailFile);
            if (!uploadedFile || !uploadedFile.$id) {
                throw new Error('Failed to retrieve file ID after upload.');
            }
            const profilePictureUrl = getFilePreview(uploadedFile.$id);
            if (!profilePictureUrl) {
                return null;
            }
            return profilePictureUrl;
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

        if (!validate()) return;

        try {
            const thumbnailUrl = await uploadImage();
            if (!thumbnailUrl) return;

            const updatedFormData = { ...formData, thumbnail: thumbnailUrl };

            const response = await updateClass(classDetails._id, updatedFormData);
            if (response?.status === 200) {
                setSuccessMessage('Class updated successfully!');
                onClose();
            } else {
                setErrorMessage('Class update failed.');
            }
        } catch (err: any) {
            console.error('UpdateClass error', err);
            setErrorMessage(err.message || 'Class update failed.');
        }
    };

    const validate = () => {
        const tempErrors = { ...errors };
        tempErrors.title = formData.title ? '' : 'Title is required';
        tempErrors.description = formData.description ? '' : 'Description is required';
        tempErrors.date = formData.date ? '' : 'Date is required';
        tempErrors.timing = formData.timing ? '' : 'Timing is required';
        tempErrors.duration = formData.duration ? '' : 'Duration is required';
        tempErrors.maxStudents = formData.maxStudents ? '' : 'Max students is required';
        tempErrors.category = formData.category ? '' : 'Category is required';
        tempErrors.level = formData.level ? '' : 'Level is required';
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === '');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                    bgcolor: 'white',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Edit Class
                </Typography>

                {/* Form Fields */}
                <Grid2 container columnSpacing={2}>
                    <Grid2 size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Class Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            error={!!errors.title}
                            helperText={errors.title}
                            margin="normal"
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
                            margin="normal"
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
                            margin="normal"
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
                            margin="normal"
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
                            margin="normal"
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
                            margin="normal"
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
                            margin="normal"
                        >
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
                            margin="normal"
                        >
                            <MenuItem value="Beginner">Beginner</MenuItem>
                            <MenuItem value="Intermediate">Intermediate</MenuItem>
                            <MenuItem value="Advanced">Advanced</MenuItem>
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
                            margin="normal"
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 6 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button variant="contained" color="primary" type="submit" disabled={loading}>
                                {loading ? 'Updating...' : 'Update Class'}
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={onClose}>
                                Cancel
                            </Button>
                        </Box>
                    </Grid2>


                </Grid2>

            </Box>
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
        </div>
    );
};

