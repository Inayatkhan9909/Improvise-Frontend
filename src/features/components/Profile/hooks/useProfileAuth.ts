import axios from "axios";
import { useState } from "react"
import { auth } from "../../../lib/firebase/firebaseConfig";
const ApiUrl = process.env.REACT_APP_BACKEND_API_URL;

export const useProfileAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editUserProfilePic = async (profilePictureUrl: string) => {
        try {
            setLoading(true);
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.put(`${ApiUrl}/auth/edituserprofilepic`, { profilePic: profilePictureUrl },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            return response;
        } catch (error: any) {
            setError(error.message || 'Profile update failed');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const editUserDetails = async (formData:{
        name:string,
        contact:number,
        dob:string,
        gender:string,
    }) => {
        try {
            setLoading(true);
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.put(`${ApiUrl}/auth/edituserdetails`, formData,{
                headers: { Authorization: `Bearer ${token}` },
            });
            return response;
        } catch (error: any) {
            setError(error.message || 'Profile update failed');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const editUserEmail = async (oldEmail:string,newEmail:string) => {
        try {
            setLoading(true);
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.put(`${ApiUrl}/auth/edituseremail`, {
                oldEmail,
                newEmail
            }, {
                headers: {
                    Authorization: `Bearer ${token}` ,
                },
            });
            return response;
        } catch (error: any) {
            setError(error.message || 'Profile update failed');
            throw error;
        } finally {
            setLoading(false);
        }
    }
    const editUserPassword = async (oldPassword:string,newPassword:string) => {
        try {
            setLoading(true);
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.put(`${ApiUrl}/auth/edituserpassword`, {
                oldPassword,
                newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}` ,
                },
            });
            return response;
        } catch (error: any) {
            setError(error.message || 'Password update failed');
            throw error;
        } finally {
            setLoading(false);
        }
    }
    const deleteUser = async () => {
        try {
            setLoading(true);
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.delete(`${ApiUrl}/auth/deleteuser`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response;
        } catch (error: any) {
            setError(error.message || 'Password update failed');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { editUserProfilePic,editUserDetails,editUserEmail,
        editUserPassword,deleteUser, loading, error };
}