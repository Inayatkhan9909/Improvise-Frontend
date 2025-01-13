import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/user/userContext";
import { AddInstructorDetails } from "../../instructor/components/AddInstructorDetails";
import { InstructorDetails } from "../../instructor/components/InstructorDetails";
import axios from "axios";
import { auth } from "../../lib/firebase/firebaseConfig";
import CreateClassPage from "../../instructor/pages/CreateClassPage";
import { InstructorClasses } from "../../classes/components/InstrucotorClasses";
import CreateCourse from "../../courses/components/CreateCourse";
import { InstructorCourses } from "../../courses/components/InstructorCourses";

export const InstructorDashboard = () => {
  const { setUser, user, loading } = useContext(UserContext);
  const [isApproved, setIsApproved] = useState(false);
  const [detailsAvailable, setDetailsAvailable] = useState(true);
  const [resetData, setResetData] = useState(false);
  const [activeSection, setActiveSection] = useState("details");

  useEffect(() => {

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
      <aside className="w-full md:w-1/4 bg-gray-100 p-4 max-h-fit sticky ">
        <nav className="space-y-4">
          <button
            className={`w-full text-left py-2 px-4 rounded-lg ${activeSection === "details" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
              } hover:bg-blue-600 hover:text-white`}
            onClick={() => setActiveSection("details")}
          >
            Instructor Details
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded-lg ${activeSection === "add-class" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
              } hover:bg-blue-600 hover:text-white`}
            onClick={() => setActiveSection("add-class")}
          >
            Add Class
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded-lg ${activeSection === "my-classes" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
              } hover:bg-blue-600 hover:text-white`}
            onClick={() => setActiveSection("my-classes")}
          >
            My Classes
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded-lg ${activeSection === "add-course" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
              } hover:bg-blue-600 hover:text-white`}
            onClick={() => setActiveSection("add-course")}
          >
            Add Course
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded-lg ${activeSection === "my-courses" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
              } hover:bg-blue-600 hover:text-white`}
            onClick={() => setActiveSection("my-courses")}
          >
            My Courses
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-4">
        <h1 className="text-xl font-bold mb-4">Instructor Dashboard</h1>

        {activeSection === "details" && (

          detailsAvailable ? (
            <InstructorDetails onEdit={handleEdit} />
          ) : (
            <AddInstructorDetails onSubmit={handleFormSubmit} />
          )
        )}

        {activeSection === "add-class" && (
          <div>
            {
              isApproved ? <CreateClassPage /> : <div>You are not approved to add classes</div>
            }
          </div>
        )}

        {activeSection === "my-classes" && (
          <div>
            {
              isApproved ? <InstructorClasses /> : <div>You are not approved to add classes</div>
            }
          </div>
        )}

        {activeSection === "add-course" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Add Course</h2>
            <CreateCourse/>
          </div>
        )}

        {activeSection === "my-courses" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">My Courses</h2>
           <InstructorCourses/>
          </div>
        )}
      </main>
    </div>
  );
};
