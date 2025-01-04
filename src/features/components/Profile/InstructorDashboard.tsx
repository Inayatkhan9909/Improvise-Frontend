import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import InstructorDetails from '../../instructor/components/InstructorDetails'
export const InstructorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    if (user?.roleDetails?.instructor?.approvedByAdmin) {
      setIsApproved(true);
    }
  }, [user]);

  const handleFormSubmit = async (details: any) => {
    try {
      // Handle the submission of form data, including the resume file
      const formData = new FormData();
      formData.append("bio", details.bio);
      formData.append("qualifications", details.qualifications);
      formData.append("skills", details.skills);
      formData.append("resume", details.resume);

      const response = await fetch("/api/instructor-details", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Details submitted successfully! Waiting for admin approval.");
      } else {
        alert("Error submitting details. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex">
      <main className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-6">Instructor Dashboard</h1>
        {!isApproved ? (
          <InstructorDetails onSubmit={handleFormSubmit} />
        ) : (
          <div>
            <button
              onClick={() => navigate("/createclass")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
            >
              Create Class
            </button>
            {/* Classes created section */}
          </div>
        )}
      </main>
    </div>
  );
};
