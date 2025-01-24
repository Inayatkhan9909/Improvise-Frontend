import React, { useContext, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { getFilePreview, uploadFile } from '../../../lib/appwrite/uploadImage';
import { UserContext } from '../../../Context/user/userContext';
import { useProfileAuth } from '../hooks/useProfileAuth';

export const EditProfilePic = ({ onClose }: any) => {
    const { user, setUser } = useContext(UserContext)
    const { editUserProfilePic, loading } = useProfileAuth();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setErrorMessage('Please select a file to upload.');
            return;
        }

        try {
            // Upload to Appwrite
            const uploadedFile = await uploadFile(file);
            if (!uploadedFile || !uploadedFile.$id) {
                throw new Error('Failed to retrieve file ID after upload.');
            }

            const profilePictureUrl = getFilePreview(uploadedFile.$id);
            if (!profilePictureUrl) {
                throw new Error('Failed to generate file preview URL.');
            }
            
            const response = await editUserProfilePic(profilePictureUrl);
            if (response.status === 201) {
                setSuccessMessage('Profile picture updated successfully!');
                setUser(response.data.user)
                setTimeout(() => {
                    onClose()
                }, 1000)

            } else {
                setErrorMessage('Failed to update profile picture.');
            }


        } catch (error: any) {
            console.error('Error updating profile picture:', error);
            setErrorMessage(error.message || 'Failed to update profile picture.');
        }
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
                textAlign: 'center',
                background: 'white'
            }}
        >
            <div className='flex justify-between'>
                <Typography variant="h5" gutterBottom>
                    Edit Profile Picture
                </Typography>
                <button onClick={onClose}>
                    <RxCross2 size={30} />
                </button>
            </div>

            {/* Current Profile Picture */}
            {user.profilePic && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2">Current Picture:</Typography>
                    <img
                        src={user.profilePic}
                        alt="Current Profile"
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                </Box>
            )}

            {/* New Picture Preview */}
            {preview && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2">Preview:</Typography>
                    <img
                        src={preview}
                        alt="Preview"
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                </Box>
            )}

            <TextField
                fullWidth
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={handleChangeFile}
                sx={{ mb: 2 }}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
            >
                {loading ? 'Updating...' : 'Update Picture'}
            </Button>

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


