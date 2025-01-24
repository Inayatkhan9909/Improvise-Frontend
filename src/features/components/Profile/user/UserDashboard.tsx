import React, { useContext, useState } from "react";
import { UserContext } from "../../../Context/user/userContext";
import { FaEdit, FaEllipsisV } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { EditUserDetails } from "./EditUserDetails";
import { EditUserEmail } from "./EditUserEmail";
import { EditUserPassword } from "./EditUserPassword";
import { EditProfilePic } from "./EditProfilePicDetails";
import { auth } from "../../../lib/firebase/firebaseConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ApiUrl = process.env.REACT_APP_BACKEND_API_URL;

export const UserDashboard = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [showOptions, setShowOptions] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editDetailsModal, setEditDetailsModal] = useState(false);
    const [editEmailModal, setEditEmailModal] = useState(false);
    const [editPasswordModal, setEditPasswordModal] = useState(false);
    const [editProfilePicModal, setEditProfilePicModal] = useState(false);

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <p className="text-gray-500 text-xl">Loading user data...</p>
                </div>
            </div>
        );
    }

    const toggleOptions = () => setShowOptions(!showOptions);
    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => setShowDeleteModal(false);

    const handleDeleteAccount = async() => {

        try {
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.delete(`${ApiUrl}/auth/deleteuser`,{
                    headers: { Authorization: `Bearer ${token}` },
            });
            if(response.status === 201){
                setUser(null);
                navigate("/login")
            }
            else{
                console.log(response.data.message)
            }

        } catch (error) {

        } finally {
            closeDeleteModal();
        }
    };

    const handleeditDetails = () => {
        setShowOptions(false);
        setEditDetailsModal(true);

    }
    const handleEditEmail = () => {
        setShowOptions(false);
        setEditEmailModal(true);
    }
    const handleEditPassword = () => {
        setShowOptions(false);
        setEditPasswordModal(true);
    }

    const handleEditProfilePic = () => {
        setEditProfilePicModal(true);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg relative">
            {/* Header with 3-dot Menu */}
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">User Dashboard</h2>
                <div className="relative">
                    <FaEllipsisV
                        className="text-gray-600 hover:text-gray-800 cursor-pointer text-xl"
                        onClick={toggleOptions}
                        title="More Options"
                    />
                    {showOptions && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-md">
                            <button
                                onClick={handleeditDetails}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Change Details
                            </button>
                            <button
                                onClick={handleEditEmail}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Change email
                            </button>
                            <button
                                onClick={handleEditPassword}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Change Password
                            </button>
                            <button
                                onClick={openDeleteModal}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Delete Account
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center gap-6 mb-8">
                <div className="relative w-32 h-32">
                    <img
                        src={user.profilePic || "/default-profile.png"}
                        alt="Profile Pic"
                        className="w-full h-full object-cover rounded-full shadow-md"
                    />
                    <button
                        className="absolute bottom-0 right-0 bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded-full"
                        title="Edit Profile Picture"
                        onClick={handleEditProfilePic}
                    >
                        <FaEdit className="text-sm" />
                    </button>

                </div>

                <h3 className="text-lg font-semibold text-gray-700">{user.name}</h3>

                <div className="grid grid-cols-1 gap-4 w-full">
                    <div className="flex items-center justify-between">
                        <p className="text-black text-lg">
                            <span className="font-semibold">Email:</span> {user.email}
                        </p>

                    </div>

                    <p className="text-black text-lg">
                        <span className="font-semibold">Role:</span> {user.role}
                    </p>
                    <p className="text-black text-lg">
                        <span className="font-semibold">Date of Birth:</span> {new Date(user.dob).toLocaleDateString()}
                    </p>
                    <p className="text-black text-lg">
                        <span className="font-semibold">Gender:</span> {user.gender}
                    </p>
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Deletion</h3>
                        <p className="text-gray-600 text-sm mb-6">
                            Are you sure you want to delete your account? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-medium rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Edit Details Modal */}
            {editDetailsModal && (
                <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 z-50 text-black">
                    <EditUserDetails onClose={() => setEditDetailsModal(false)} />
                </div>
            )}

            {/* Edit Email Modal */}
            {editEmailModal && (
                <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 z-50 text-black">
                    <EditUserEmail onClose={() => setEditEmailModal(false)} />
                </div>
            )}

            {/* Edit Email Modal */}
            {editPasswordModal && (
                <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 z-50 text-black">
                    <EditUserPassword onClose={() => setEditPasswordModal(false)} />
                </div>
            )}
            {/* Edit ProfilePic Modal */}
            {editProfilePicModal && (
                <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 z-50 text-black">
                    <EditProfilePic onClose={() => setEditProfilePicModal(false)} />
                </div>
            )}


        </div>
    );
};

export default UserDashboard;
