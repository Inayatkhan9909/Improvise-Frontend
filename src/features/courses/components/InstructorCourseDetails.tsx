import React, { useState } from "react";
import { EditCourse } from "./EditCourse";
import { DeleteCourse } from "./DeleteCourse";

export const InstructorCourseDetails = ({ courseDetails, onClose }: any) => {

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    if (!courseDetails) return null;
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90%]">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                    >
                        &times;
                    </button>

                    <img
                        src={courseDetails.thumbnail}
                        alt={courseDetails.title}
                        className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{courseDetails.title}</h2>
                    <div className="text-gray-700 space-y-2 grid grid-cols-2">
                        <p><span className="font-medium">Description:</span> {courseDetails.description}</p>
                        <p><span className="font-medium">Category:</span> {courseDetails.category}</p>
                        <p><span className="font-medium">Level:</span> {courseDetails.level}</p>
                        <p><span className="font-medium">Date:</span> {new Date(courseDetails.date).toLocaleDateString()}</p>
                        <p><span className="font-medium">Timing:</span> {courseDetails.timing}</p>
                        <p><span className="font-medium">Duration:</span> {courseDetails.duration} hours</p>
                        <p><span className="font-medium">Max Students:</span> {courseDetails.maxStudents}</p>
                        <p><span className="font-medium">Enrolled Students:</span> {courseDetails?.studentsEnrolled?.length || 0}</p>
                    </div>

                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={() => setEditModalOpen(true)}
                            className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 transition"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setDeleteModalOpen(true)}
                            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {/* Edit Modal */}
            {isEditModalOpen && (
                <EditCourse
                    courseDetails={courseDetails}
                    onClose={() => setEditModalOpen(false)}
                />
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <DeleteCourse
                    courseId={courseDetails._id}
                    courseTitle={courseDetails.title}
                    onClose={() => setDeleteModalOpen(false)}
                />
            )}

        </>
    );
};
