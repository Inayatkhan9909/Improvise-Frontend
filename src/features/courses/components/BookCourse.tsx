import React, { useState } from "react";
import {
  Snackbar,
  Alert,
} from '@mui/material';
import { useCourseAuth } from "../hooks/useCourseAuth";

export const BookCourse = ({ crs, onClose }: any) => {
  const { bookCourse, loading } = useCourseAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirm = async () => {
    try {
      const response = await bookCourse({ courseId: crs._id })
      if (response.status === 201) {
        setSuccessMessage("Course booked successfully!");
        setTimeout(() => {
          onClose();
        }, 1000);
      }
      else{
        setErrorMessage(response.data.message)
      }

    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to book class. Please try again.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 p-6 rounded-lg shadow-lg">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 float-right">✕</button>
          <h2 className="text-2xl font-bold mb-4">{crs.title}</h2>
          <img src={crs.thumbnail} alt={crs.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          <p className="text-gray-700 mb-4">{crs.description}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-blue-600 bg-blue-100 py-1 px-3 rounded-full">{crs.category}</span>
            <span className="font-bold text-gray-800">Price: ${crs.price}</span>
          </div>
          <div className="text-gray-600 mb-4">
            <p><strong>Launch Date:</strong> {new Date(crs.date).toLocaleDateString()}</p>
            <p><strong>Level:</strong> {crs.level}</p>
            <p><strong>Max Students:</strong> {crs.maxStudents}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Modules:</h3>
            <ul className="list-disc pl-5">
              {crs.modules.map((module: any, index: any) => (
                <li key={index}>
                  <strong>{module.title}</strong>: {module.content} ({module.duration} mins)
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`py-2 px-4 rounded-lg font-semibold ${loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
            >
              {loading ? "Booking..." : "Confirm"}
            </button>
            <button
              onClick={onClose}
              className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
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

    </>
  );
};
