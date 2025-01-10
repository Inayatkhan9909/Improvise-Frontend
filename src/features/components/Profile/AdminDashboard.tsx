import axios from "axios";
import React, { useEffect, useState } from "react";
import { auth } from "../../lib/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import InstructorDetails from "./admin/InstructorDetails";

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showApproved, setShowApproved] = useState(true);
  const [requests, setRequests] = useState<any[]>([]);
  const [approvedInstructors, setApprovedInstructors] = useState<any[]>([]);
  const [selectedInstructor, setSelectedInstructor] = useState<any | null>(null);
  const [instructorDetailsModal, setInstructorDetailsModal] = useState(false);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const token = await auth.currentUser?.getIdToken(true);
        const response = await axios.get("http://localhost:4000/admin/getallinstructors", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const instructors = response.data;
          setApprovedInstructors(
            instructors.filter((instructor: any) => instructor.roleDetails.instructor?.approvedByAdmin)
          );
          setRequests(
            instructors.filter((instructor: any) => !instructor.roleDetails.instructor?.approvedByAdmin)
          );
        } else {
          console.error("Instructors not found");
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []);

  const openInstructorDetails = (instructor: any) => {
    setSelectedInstructor(instructor);
    setInstructorDetailsModal(true);
  };

  const closeInstructorDetails = () => {
    setSelectedInstructor(null);
    setInstructorDetailsModal(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <div className="space-x-4">
          <button
            onClick={() => setShowApproved(true)}
            className={`px-4 py-2 rounded-md ${showApproved
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Approved Instructors
          </button>
          <button
            onClick={() => setShowApproved(false)}
            className={`px-4 py-2 rounded-md ${!showApproved
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Approval Requests
          </button>
        </div>
      </div>

      {showApproved ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {approvedInstructors.map((instructor) => (
            <div key={instructor._id} className="border rounded-lg p-4 shadow">
              <h3 className="text-lg font-semibold">{instructor.name}</h3>
              <p className="text-sm text-gray-600">{instructor.email}</p>
              <button
                onClick={() => openInstructorDetails(instructor)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <div key={request._id} className="border rounded-lg p-4 shadow">
              <h3 className="text-lg font-semibold">{request.name}</h3>
              <p className="text-sm text-gray-600">{request.email}</p>
              <p className="text-sm text-gray-500">Role: {request.role}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => openInstructorDetails(request)}
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {instructorDetailsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black">
          <div className="relative bg-white p-6 rounded-lg max-w-4xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black font-semibold"
              onClick={closeInstructorDetails}
            >
              ✕
            </button>
            <InstructorDetails instructor={selectedInstructor} onClose={closeInstructorDetails} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
