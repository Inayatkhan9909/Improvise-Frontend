import React, { useState } from "react";
import axios from "axios";
import { auth } from "../../../lib/firebase/firebaseConfig";

interface InstructorDetailsProps {
    instructor: any;
    onClose: () => void;
}

const InstructorDetails: React.FC<InstructorDetailsProps> = ({ instructor, onClose }) => {
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [removeReason, setRemoveReason] = useState("");

    const handleApproval = async (approve: boolean, reason?: string) => {
        try {
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.put(
                `http://localhost:4000/admin/${approve ? "approve" : "reject"}-instructor`,
                { instructorId: instructor._id, reason },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                alert(`Instructor has been ${approve ? "approved" : "rejected"}`);
                onClose();
            }
        } catch (error) {
            console.error("Error updating instructor status:", error);
            alert("Failed to update instructor status.");
        }
    };

    const handleRemoveInstructor = async (reason: string) => {
        try {
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.put(
                `http://localhost:4000/admin/remove-instructor`,
                { instructorId: instructor._id, reason },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                alert("Instructor has been removed successfully.");
                onClose();
            }
        } catch (error) {
            console.error("Error removing instructor:", error);
            alert("Failed to remove instructor.");
        }
    };

    return (
        <div>
            <div className="flex items-center space-x-4 mb-6">
                <img
                    src={instructor.profilePic}
                    alt={instructor.name}
                    className="w-24 h-24 rounded-full object-cover border"
                />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{instructor.name}</h2>
                    <p className="text-gray-600">{instructor.email}</p>
                    <p className="text-gray-500">Contact: {instructor.contact}</p>
                </div>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Bio</h3>
                <p className="text-gray-700">{instructor.roleDetails.instructor.bio || "N/A"}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <ul className="list-disc pl-5 text-gray-700">
                    {instructor.roleDetails.instructor.skills.length > 0
                        ? instructor.roleDetails.instructor.skills.map((skill: string, index: number) => (
                            <li key={index}>{skill}</li>
                        ))
                        : "N/A"}
                </ul>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Qualifications</h3>
                <p className="text-gray-700">{instructor.roleDetails.instructor.qualifications || "N/A"}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Resume</h3>
                {instructor.roleDetails.instructor.resume ? (
                    <a
                        href={instructor.roleDetails.instructor.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        View Resume
                    </a>
                ) : (
                    <p className="text-gray-700">N/A</p>
                )}
            </div>

            {!instructor.roleDetails.instructor.approvedByAdmin ? (
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleApproval(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => setIsRejectModalOpen(true)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                        Reject
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsRemoveModalOpen(true)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                    Remove as Instructor
                </button>
            )}

            {/* Rejection Modal */}
            {isRejectModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-1/3 p-6 rounded-md shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Reason for Rejection</h3>
                        <textarea
                            className="w-full p-2 border rounded-md"
                            rows={6}
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Enter reason here..."
                        />
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={() => setIsRejectModalOpen(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleApproval(false, rejectReason);
                                    setIsRejectModalOpen(false);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Remove Modal */}
            {isRemoveModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-1/3 p-6 rounded-md shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Reason for Removal</h3>
                        <textarea
                            className="w-full p-2 border rounded-md"
                            rows={6}
                            value={removeReason}
                            onChange={(e) => setRemoveReason(e.target.value)}
                            placeholder="Enter reason here..."
                        />
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={() => setIsRemoveModalOpen(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleRemoveInstructor(removeReason);
                                    setIsRemoveModalOpen(false);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstructorDetails;
