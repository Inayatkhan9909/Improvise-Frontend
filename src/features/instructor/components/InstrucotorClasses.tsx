import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../../lib/firebase/firebaseConfig';

export const InstructorClasses = () => {
    const [classes, setClasses] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch classes for the specific instructor
    const fetchClasses = async () => {
        try {
            setLoading(true);
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.get("http://localhost:4000/instructor//get-instructor-classes", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data)
            setClasses(response.data.classes);
        } catch (err) {
            console.error("Error fetching classes:", err);
            setError("Failed to load classes. Please try again later." );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    // Delete class handler
    const handleDelete = async (classId:any) => {
        try {
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.delete(`http://localhost:4000/instructor/classes/${classId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                alert("Class deleted successfully!");
                fetchClasses();
            }
        } catch (err) {
            console.error("Error deleting class:", err);
            alert("Failed to delete class. Please try again.");
        }
    };

    // Edit class handler (placeholder)
    const handleEdit = (classId:any) => {
        // Navigate to the edit page or open a modal (implementation depends on project requirements)
        console.log("Edit class:", classId);
    };

    if (loading) return <div className="text-center py-6">Loading classes...</div>;
    if (error) return <div className="text-center text-red-500 py-6">{error}</div>;

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">My Classes</h1>

            {classes.length === 0 ? (
                <div className="text-center text-gray-500">You haven't created any classes yet.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((classItem:any) => (
                        <div
                            key={classItem._id}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
                        >
                            <img
                                src={classItem.thumbnail}
                                alt={classItem.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-gray-800 truncate">{classItem.title}</h2>
                                <p className="text-gray-600 text-sm mb-2">{classItem.description}</p>
                                <p className="text-gray-800 font-medium">Category: {classItem.category}</p>
                                <p className="text-gray-800 font-medium">Level: {classItem.level}</p>
                                <p className="text-gray-800 font-medium">Date: {new Date(classItem.date).toLocaleDateString()}</p>
                                <p className="text-gray-800 font-medium">Timing: {classItem.timing}</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleEdit(classItem._id)}
                                        className="bg-yellow-400 text-white py-1 px-4 rounded-md hover:bg-yellow-500 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(classItem._id)}
                                        className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
