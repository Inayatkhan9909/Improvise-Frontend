import React, { useState } from "react";
import { useCourseAuth } from "../hooks/useCourseAuth";
import {
  Snackbar,
  Alert,
} from '@mui/material';

export const CancelUserCourseBooking = ({
  courseId,
  courseTitle,
  onClose
}: any) => {
  const {cancelBookedCourse,loading}= useCourseAuth();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      const response = await cancelBookedCourse(courseId); 
      if (response.status === 200) {
        setSuccessMessage("Course successfully deleted!");
        setTimeout(() => {
          onClose(); 
        }, 1000);
      } else {
        setErrorMessage("Failed to cancel the course.");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Confirm  cancel coursebooking
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to cancel the course booking <strong>{courseTitle}</strong>?
        </p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className={`${
              loading ? "bg-red-400" : "bg-red-500 hover:bg-red-600"
            } text-white py-2 px-6 rounded-md`}
            disabled={loading}
          >
            {loading ? "Deleting..." : "confirm"}
          </button>
        </div>
      </div>
            <Snackbar
              open={!!successMessage}
              autoHideDuration={6000}
              onClose={() => setSuccessMessage(null)}
            >
              <Alert
                onClose={() => setSuccessMessage(null)}
                severity="success"
                sx={{ width: '100%' }}
              >
                {successMessage}
              </Alert>
            </Snackbar>
            <Snackbar
              open={!!errorMessage}
              autoHideDuration={6000}
              onClose={() => setErrorMessage(null)}
            >
              <Alert
                onClose={() => setErrorMessage(null)}
                severity="error"
                sx={{ width: '100%' }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>
    </div>
  );
};
