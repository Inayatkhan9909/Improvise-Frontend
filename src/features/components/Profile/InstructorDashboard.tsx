import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/user/userContext";
import { AddInstructorDetails } from "../../instructor/components/AddInstructorDetails";
import { InstructorDetails } from "../../instructor/components/InstructorDetails";
import axios from "axios";
import { auth } from "../../lib/firebase/firebaseConfig";
import CreateClass from "../../classes/components/CreateClasses";
import CreateClassPage from "../../instructor/pages/CreateClassPage";

export const InstructorDashboard = () => {
  const navigate = useNavigate();
  const { setUser, user, loading } = useContext(UserContext);
  const [isApproved, setIsApproved] = useState(false);
  const [detailsAvailable, setDetailsAvailable] = useState(true);
  const [instructorId, setInstructorId] = useState(null);
  const [resetData, setResetData] = useState(false);
  const [activeSection, setActiveSection] = useState("details");

  useEffect(() => {
    setInstructorId(user?._id);

    if (
      !user?.roleDetails?.instructor?.bio ||
      !user?.roleDetails?.instructor?.resume ||
      !user?.roleDetails?.instructor?.qualifications ||
      !user?.roleDetails?.instructor?.skills
    ) {
      setDetailsAvailable(false);
    }
    if (user?.roleDetails?.instructor?.approvedByAdmin) {
      setIsApproved(true);
    }
  }, [user, resetData]);

  const handleFormSubmit = async (details: any) => {
    try {
      const token = await auth.currentUser?.getIdToken(true);
      const response = await axios.post(
        "http://localhost:4000/instructor/addinstructordetails",
        details,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        alert("Details submitted successfully! Waiting for admin approval.");
        setUser(response?.data?.isUser);
        setResetData(true);
      } else {
        alert("Error submitting details. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = () => {
    // Logic for handling edits
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-gray-100 p-4 md:h-screen sticky top-0">
        <nav className="space-y-4">
          <button
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeSection === "details" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-600 hover:text-white`}
            onClick={() => setActiveSection("details")}
          >
            Instructor Details
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeSection === "add-class" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-600 hover:text-white`}
            onClick={() => setActiveSection("add-class")}
          >
            Add Class
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeSection === "my-classes" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-600 hover:text-white`}
            onClick={() => setActiveSection("my-classes")}
          >
            My Classes
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeSection === "add-course" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-600 hover:text-white`}
            onClick={() => setActiveSection("add-course")}
          >
            Add Course
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded-lg ${
              activeSection === "my-courses" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-600 hover:text-white`}
            onClick={() => setActiveSection("my-courses")}
          >
            My Courses
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-6">Instructor Dashboard</h1>

        {activeSection === "details" && (
         
            detailsAvailable ? (
              <InstructorDetails onEdit={handleEdit} />
            ) : (
              <AddInstructorDetails onSubmit={handleFormSubmit} />
            )
          ) }

        {activeSection === "add-class" && (
          <div>
            {
              isApproved ? <CreateClassPage/> : <div>You are not approved to add classes</div>
            }
          </div>
        )}

        {activeSection === "my-classes" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">My Classes</h2>
            {/* My classes list with edit/delete functionality */}
          </div>
        )}

        {activeSection === "add-course" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Add Course</h2>
            {/* Add course form component here */}
          </div>
        )}

        {activeSection === "my-courses" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">My Courses</h2>
            {/* My courses list with edit/delete functionality */}
          </div>
        )}
      </main>
    </div>
  );
};
