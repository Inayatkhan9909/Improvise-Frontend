import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface Instructor {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  contact: number;
  roleDetails: {
    instructor: {
      bio?: string;
      qualifications?: string;
      resume?: string;
      skills?: string[];
      approvedByAdmin: boolean;
      classesCreated?: {
        classId: string;
        title: string;
        date: string;
        timing: string;
        maxStudents: number;
        category: string;
        level: string;
        thumbnail: string;
      }[];
    };
  };
}

const InstructorDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const instructor: Instructor = location.state.instructor || [];

  const handleApproval = async (approve: boolean) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/admin/${approve ? "approve" : "reject"}-instructor`,
        { instructorId: instructor._id }
      );

      if (response.status === 200) {
        alert(`Instructor has been ${approve ? "approved" : "rejected"}`);
        navigate(-1); // Navigate back to the dashboard
      }
    } catch (error) {
      console.error("Error updating instructor status:", error);
      alert("Failed to update instructor status.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
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

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Qualifications</h3>
        <p className="text-gray-700">{instructor.roleDetails.instructor.qualifications || "N/A"}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <ul className="list-disc pl-6 text-gray-700">
          {instructor.roleDetails.instructor.skills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          )) || "N/A"}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Classes Created</h3>
        {instructor.roleDetails.instructor.classesCreated?.length ? (
          <ul className="list-disc pl-6 text-gray-700">
            {instructor.roleDetails.instructor.classesCreated.map((cls) => (
              <li key={cls.classId}>
                {cls.title} - {cls.date} at {cls.timing}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No classes created yet.</p>
        )}
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

export default InstructorDetailsPage;
