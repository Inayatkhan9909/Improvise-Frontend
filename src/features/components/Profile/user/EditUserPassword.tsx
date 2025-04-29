import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useProfileAuth } from '../hooks/useProfileAuth';


export const EditUserPassword = ({ onClose }: any) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { editUserPassword, loading } = useProfileAuth();

    const handleSubmit = async () => {
        setError(null);
        setSuccess(null);

        // Validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        }

        if (oldPassword === newPassword) {
            setError('New password cannot be the same as old password.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            const response = await editUserPassword(oldPassword, newPassword);
            if (response.status === 201) {
                setSuccess('Password updated successfully!');
                setTimeout(() => {
                    onClose();
                }, 1000);
            } else {
                setError(response?.data?.message || 'Failed to update password.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    const toggleVisibility = (type: string) => {
        if (type === 'old') setShowOldPassword(!showOldPassword);
        else if (type === 'new') setShowNewPassword(!showNewPassword);
        else if (type === 'confirm') setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-lg w-96 max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Change Password</h2>
                <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                    <RxCross2 size={20} />
                </button>
            </div>
            <div className="flex flex-col gap-3">
                <div className="relative">
                    <input
                        type={showOldPassword ? 'text' : 'password'}
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span
                        onClick={() => toggleVisibility('old')}
                        className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    >
                        {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>
                <div className="relative">
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span
                        onClick={() => toggleVisibility('new')}
                        className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    >
                        {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span
                        onClick={() => toggleVisibility('confirm')}
                        className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    >
                        {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <button
                    onClick={handleSubmit}
                    className={`w-full py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Submit'}
                </button>
            </div>
        </div>
    );
};
