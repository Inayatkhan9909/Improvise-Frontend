import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../../lib/firebase/firebaseConfig';
import { InstructorCourseDetails } from './InstructorCourseDetails';
import { useCourseAuth } from '../hooks/useCourseAuth';
import { CourseContext } from '../../Context/course/CourseContext';

export const InstructorCourses = () => {
    const {instructorCourses, setInstructorCourses} = useContext(CourseContext);
    const { fetchInstructorCourses, loading } = useCourseAuth();
    const [authLoading, setAuthLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCourses, setSelectedCourses] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 3;

    const fetchCourses = async (token: string) => {
        try {
            const response = await fetchInstructorCourses(token);
            if (response.status === 200) {
                console.log(response)
                setInstructorCourses(response.data.courses);
            }
        } catch (err) {
            console.error("Error fetching courses:", err);
            setError("Failed to load courses. Please try again later.");
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken(true);
                    await fetchCourses(token);
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

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = instructorCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const nextPage = () => {
        if (currentPage < Math.ceil(instructorCourses.length / coursesPerPage)) {
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
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">My Courses</h1>

            {instructorCourses.length === 0 ? (
                <div className="text-center text-gray-500">You haven't created any courses yet.</div>
            ) : (
                <div>
                    <div className="flex flex-col space-y-4">
                        {currentCourses.map((course: any) => (
                            <div
                                key={course._id}
                                className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">{course.title}</h2>
                                        <p className="text-gray-600 text-sm">Category: {course.category}</p>
                                        <p className="text-gray-600 text-sm">
                                            Date: {new Date(course.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedCourses(course)}
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
                            Page {currentPage} of {Math.ceil(instructorCourses.length / coursesPerPage)}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === Math.ceil(instructorCourses.length / coursesPerPage)}
                            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for viewing details */}
            {selectedCourses && (
                <InstructorCourseDetails
                    courseDetails={selectedCourses}
                    onClose={() => setSelectedCourses(null)}
                />
            )}
        </div>
    );
};
