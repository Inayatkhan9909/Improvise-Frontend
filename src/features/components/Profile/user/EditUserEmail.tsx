import axios from 'axios';
import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

export const EditUserEmail = ({ onClose }: any) => {
    const [oldEmail, setOldEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError(null);
        setSuccess(null);

        if (!oldEmail || !newEmail) {
            setError('Both old and new email fields are required.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(newEmail)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {

            const response = await axios.put('http://localhost:4000/auth/edituseremail', {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldEmail, newEmail }),
            });


            if (response.status === 201) {
                setSuccess('Email updated successfully! Please verify the new email.');
            } else {
                setError(response?.data.message || 'Failed to update email.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white flex flex-col gap-4 p-4 rounded-md shadow-lg w-96 max-w-lg mx-auto">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Edit Email</h2>
                <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                    <RxCross2 size={20} />
                </button>
            </div>
            <div className="flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Old Email"
                    value={oldEmail}
                    onChange={(e) => setOldEmail(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    placeholder="New Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
