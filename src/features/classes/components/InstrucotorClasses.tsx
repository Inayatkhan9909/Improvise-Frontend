import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../../lib/firebase/firebaseConfig';
import { InstructorClassDetails } from './InstructorClassDetails';
import { useClassAuth } from '../hooks/useClassAuth';
import { ClassContext } from '../../Context/class/ClassContext';
import { Snackbar, Alert } from '@mui/material';

export const InstructorClasses = () => {
    const { instructorClasses, setInstructorClasses } = useContext(ClassContext);
    const { fetchInstructorClasses, deleteInstructorClasses, loading } = useClassAuth();
    const [authLoading, setAuthLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedClass, setSelectedClass] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const classesPerPage = 3;
    const fetchClasses = async (token: string) => {
        try {
            const response = await fetchInstructorClasses(token);
            if (response.status === 200) {
                setInstructorClasses(response.data.classes);
            }
            else {
                setError("Failed to load classes. Please try again later.");
            }

        } catch (err) {
            console.error("Error fetching classes:", err);
            setError("Failed to load classes. Please try again later.");
        }
    };

    const handleDelete = async (classId: any) => {
        try {
            const response = await deleteInstructorClasses(classId);
            if (response.status === 200) {
                setSelectedClass("Class deleted successfully!");
                setSelectedClass(null);
            }
            else{
                setErrorMessage(response.data.message)
            }
        } catch (err) {
            console.error("Error deleting class:", err);
            setErrorMessage("Failed to delete class. Please try again.");
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken(true);
                    await fetchClasses(token);
                } catch (err) {
                    console.error("Error fetching token:", err);
                    setError("Failed to authenticate. Please try again later.");
                }
            } else {
                setError("No user logged in. Please log in again.");
            }
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleEdit = (classId: any) => {
        console.log("Edit class:", classId);
    };

    const indexOfLastClass = currentPage * classesPerPage;
    const indexOfFirstClass = indexOfLastClass - classesPerPage;
    const currentClasses = instructorClasses.slice(indexOfFirstClass, indexOfLastClass);

    const nextPage = () => {
        if (currentPage < Math.ceil(instructorClasses.length / classesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    if (authLoading || loading) return <div className="text-center py-6">Loading classes...</div>;
    if (error) return <div className="text-center text-red-500 py-6">{error}</div>;

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">My Classes</h1>

            {instructorClasses.length === 0 ? (
                <div className="text-center text-gray-500">You haven't created any classes yet.</div>
            ) : (
                <div>
                    <div className="flex flex-col space-y-4">
                        {currentClasses.map((classItem: any) => (
                            <div
                                key={classItem._id}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
                            >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4 w-full">
                                    <img
                                        src={classItem.thumbnail}
                                        alt={classItem.title}
                                        className="w-full sm:w-20 sm:h-20 h-36 object-cover rounded-lg mb-2 sm:mb-0"
                                    />
                                    <div className="w-full">
                                        <h2 className="text-lg font-bold text-gray-800">{classItem.title}</h2>
                                        <p className="text-gray-600 text-sm">Category: {classItem.category}</p>
                                        <p className="text-gray-600 text-sm">Date: {new Date(classItem.date).toLocaleDateString()}</p>
                                        <p className="text-gray-600 text-sm">Timing: {classItem.timing}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedClass(classItem)}
                                    className="mt-2 sm:mt-0 bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
                                >
                                    View
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center space-x-4 mt-6">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
                        >
                            Back
                        </button>
                        <span className="text-gray-800">
                            Page {currentPage} of {Math.ceil(instructorClasses.length / classesPerPage)}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === Math.ceil(instructorClasses.length / classesPerPage)}
                            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {selectedClass && (
                <InstructorClassDetails
                    classDetails={selectedClass}
                    onClose={() => setSelectedClass(null)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

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
