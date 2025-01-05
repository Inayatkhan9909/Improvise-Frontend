import React, { useContext } from "react";
import { UserContext } from "../../Context/user/userContext";
import { FaEdit } from "react-icons/fa";

export const InstructorDetails = ({ onEdit }: { onEdit: () => void }) => {
  const { user } = useContext(UserContext);
  const instructor = user?.roleDetails?.instructor;

  if (!instructor) {
    return (
      <div className="text-center text-gray-500">
        Instructor details not available.
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 relative">
      {/* Edit Icon */}
      <button
        onClick={onEdit}
        className="absolute top-4 right-4 text-blue-600 hover:text-blue-800"
        aria-label="Edit Details"
      >
        <FaEdit size={20} />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Details</h2>

      {/* Details */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Bio</h3>
          <p className="text-gray-600">{instructor.bio || "Not provided"}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700">Qualifications</h3>
          <p className="text-gray-600">
            {instructor.qualifications || "Not provided"}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
          <p className="text-gray-600">
            {instructor.skills?.join(", ") || "Not provided"}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700">Resume</h3>
          {instructor.resume ? (
            <a
              href={instructor.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              View Resume
            </a>
          ) : (
            <p className="text-gray-600">Not uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
};
