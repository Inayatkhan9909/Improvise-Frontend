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
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("activeSection") || "details"
  );

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

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

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

  const renderContent = () => {
    switch (activeSection) {
      case "details":
        return detailsAvailable ? (
          <InstructorDetails onEdit={() => {}} />
        ) : (
          <AddInstructorDetails onSubmit={handleFormSubmit} />
        );
      case "add-class":
        return isApproved ? (
          <CreateClassPage />
        ) : (
          <div>You are not approved to add classes.</div>
        );
      case "my-classes":
        return isApproved ? (
          <InstructorClasses />
        ) : (
          <div>You are not approved to view classes.</div>
        );
      case "add-course":
        return <CreateCourse />;
      case "my-courses":
        return <InstructorCourses />;
      default:
        return <div>Invalid Section</div>;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex flex-wrap justify-start md:justify-center gap-2 p-4 bg-gray-100 shadow-md">
        {[
          { label: "Instructor Details", key: "details" },
          { label: "Add Class", key: "add-class" },
          { label: "My Classes", key: "my-classes" },
          { label: "Add Course", key: "add-course" },
          { label: "My Courses", key: "my-courses" },
        ].map(({ label, key }) => (
          <button
            key={key}
            className={`py-2 px-4 rounded-lg text-sm ${
              activeSection === key
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => setActiveSection(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-4">{renderContent()}</main>
    </div>
  );
};
