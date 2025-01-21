import React, { useState } from "react";
import { useClassAuth } from "../hooks/useClassAuth";

export const CancelUserClassBooking = ({
  classId,
  classTitle,
  onClose
}: any) => {
  const {cancelBookedClass,loading}= useClassAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await cancelBookedClass(classId);
    
      if (response.status === 200) {
        setMessage("Class successfully deleted!");
        setTimeout(() => {
          setMessage(""); 
          onClose(); 
        }, 2000);
      } else {
        setMessage("Failed to delete the class.");
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Confirm  cancel classbooking
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to cancel the class booking <strong>{classTitle}</strong>?
        </p>
        {message && (
          <p className="text-center text-sm mb-4 text-gray-700">{message}</p>
        )}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className={`${
              isDeleting ? "bg-red-400" : "bg-red-500 hover:bg-red-600"
            } text-white py-2 px-6 rounded-md`}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};
