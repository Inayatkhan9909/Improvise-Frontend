import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../../lib/firebase/firebaseConfig';
import { UserBookedClassDetails } from './UserBookedClassDetails';
import { useClassAuth } from '../hooks/useClassAuth';

export const UserBookedClasses = () => {
    const { fetchUserClasses, loading } = useClassAuth();
    const [authLoading, setAuthLoading] = useState(true);
    const [classes, setClasses] = useState<any>([]);
    const [error, setError] = useState("");
    const [selectedClass, setSelectedClass] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const classesPerPage = 3;

    const fetchClasses = async (token: string) => {

        try {
            const response = await fetchUserClasses(token);
            if (response.status === 201) {
                setClasses(response.data.classes);
            }
        } catch (err) {
            console.error("Error fetching classes:", err);
            setError("Failed to load classes. Please try again later.");
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

    const indexOfLastClass = currentPage * classesPerPage;
    const indexOfFirstClass = indexOfLastClass - classesPerPage;
    const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);

    const nextPage = () => {
        if (currentPage < Math.ceil(classes.length / classesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <div className="text-center py-6">Loading classes...</div>;
    if (error) return <div className="text-center text-red-500 py-6">{error}</div>;
    if (authLoading || loading) return <div className="text-center py-6">Loading classes...</div>;

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">My Classes</h1>

            {classes.length === 0 ? (
                <div className="text-center text-gray-500">You haven't created any classes yet.</div>
            ) : (
                <div>
                    <div className="flex flex-col space-y-4">
                        {currentClasses.map((classItem: any) => (
                            <div
                                key={classItem._id}
                                className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={classItem.thumbnail}
                                        alt={classItem.title}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div >
                                        <h2 className="text-lg font-bold text-gray-800">{classItem.title}</h2>
                                        <p className="text-gray-600 text-sm">Category: {classItem.category}</p>
                                        <p className="text-gray-600 text-sm">Date: {new Date(classItem.date).toLocaleDateString()}</p>
                                        <p className="text-gray-600 text-sm">Timing: {classItem.timing}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedClass(classItem)}
                                    className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition"
                                >
                                    View
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Pagination controls */}
                    <div className="flex justify-center items-center space-x-4 mt-6">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
                        >
                            Back
                        </button>
                        <span className="text-gray-800">
                            Page {currentPage} of {Math.ceil(classes.length / classesPerPage)}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === Math.ceil(classes.length / classesPerPage)}
                            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for viewing details */}
            {selectedClass && (

                <UserBookedClassDetails
                    classDetails={selectedClass}
                    onClose={() => setSelectedClass(null)}
                />
            )}
        </div>
    );
};

