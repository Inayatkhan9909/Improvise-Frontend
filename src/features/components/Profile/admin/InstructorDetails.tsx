import React from "react";
import axios from "axios";

interface InstructorDetailsProps {
  instructor: any;
  onClose: () => void;
}

const InstructorDetails: React.FC<InstructorDetailsProps> = ({ instructor, onClose }) => {
  const handleApproval = async (approve: boolean) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/admin/${approve ? "approve" : "reject"}-instructor`,
        { instructorId: instructor._id }
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

  return (
    <div>
      <div className="flex items-center space-x-6 mb-6">
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

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Bio</h3>
        <p className="text-gray-700">{instructor.roleDetails.instructor.bio || "N/A"}</p>
      </div>

      {!instructor.roleDetails.instructor.approvedByAdmin && (
        <div className="flex space-x-4">
          <button
            onClick={() => handleApproval(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Approve
          </button>
          <button
            onClick={() => handleApproval(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default InstructorDetails;
