import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/user/userContext";
import { AddInstructorDetails } from "../../instructor/components/AddInstructorDetails";
import { InstructorDetails } from "../../instructor/components/InstructorDetails";
import axios from "axios";
export const InstructorDashboard = () => {
  const navigate = useNavigate();
  const {setUser, user, loading } = useContext(UserContext);
  const [isApproved, setIsApproved] = useState(false);
  const [detailsAvaliable, setDetailsAvaliable] = useState(true);
  const [instructorId, setInstructorId] = useState(null);
  const [resetData,setResetData]= useState(false);

  useEffect(() => {
    setInstructorId(user?._id)
    if (!user?.roleDetails?.instructor?.bio || !user?.roleDetails?.instructor?.resume || !user?.roleDetails?.instructor?.qualifications
      || !user?.roleDetails?.instructor?.skills
    ) {
      setDetailsAvaliable(false)
    }
    if (user?.roleDetails?.instructor?.approvedByAdmin) {
      setIsApproved(true);
    }
  }, [user,resetData]);
  const handleFormSubmit = async (details: any) => {
    try {

      const response = await axios.post("http://localhost:4000/instructor/addinstructordetails", details, {
        headers: { Authorization: `Bearer ${instructorId}` },
      });

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

  }
  if (loading) {
    return <div>loading</div>
  }

  return (
    <div className="flex">
      <main className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-6">Instructor Dashboard</h1>
        {!isApproved ? (
          detailsAvaliable ? <InstructorDetails onEdit={handleEdit} /> : <AddInstructorDetails onSubmit={handleFormSubmit} />
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
