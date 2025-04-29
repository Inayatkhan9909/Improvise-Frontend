import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Snackbar,
  Alert,
} from '@mui/material';
import { useClassAuth } from '../hooks/useClassAuth';


export const BookClass = ({ cls, onClose }: any) => {
  const { bookClass, loading } = useClassAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleConfirm = async () => {
    try {
      const response = await bookClass({ classId: cls._id });
      if(response.status === 201){
        setSuccessMessage("Class booked successfully!");
        setTimeout(() => {
          onClose();
        }, 1000);
      }
      else{
        setErrorMessage(response?.data?.message || "Class booking failed!")
      }

    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to book class. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-xl font-bold mb-4">Book Class</h3>
        <p className="mb-2">Title: {cls.title}</p>
        <p className="mb-2">Instructor: {cls.instructorname}</p>
        <p className="mb-4">Date: {dayjs(cls.date).format("DD MMM YYYY")}</p>
        <p className="mb-2">Timing: {cls.timing}</p>
        <div className="flex gap-4">
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
