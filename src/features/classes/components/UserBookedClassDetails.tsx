import React, { useState } from "react";
import { CancelUserClassBooking } from "./CancelUserClassBooking";
import { RxCross2 } from 'react-icons/rx';

export const UserBookedClassDetails = ({
  classDetails,
  onClose,
}: any) => {
  const [CancelBookingModal, setCancelBookingModal] = useState(false);

  if (!classDetails) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90%]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          >
            <RxCross2 />
          </button>

          <img
            src={classDetails.thumbnail}
            alt={classDetails.title}
            className="w-full h-48 object-cover rounded-md my-4"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {classDetails.title}
            </h2>
            <p className="text-sm bg-blue-100 text-blue-600 py-1 px-3 rounded-full">
              {classDetails.category}
            </p>
          </div>
          <p>
            <span className="font-medium">Description:</span>{" "}
            {classDetails.description}
          </p>
          <div className="text-gray-700 space-y-2 grid grid-cols-2">
            <p>
              <span className="font-medium">Level:</span> {classDetails.level}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(classDetails.date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Timing:</span>{" "}
              {classDetails.timing}
            </p>
            <p>
              <span className="font-medium">Duration:</span>{" "}
              {classDetails.duration} hours
            </p>
            <p>
              <span className="font-medium">Max Students:</span>{" "}
              {classDetails.maxStudents}
            </p>
            <p>
              <span className="font-medium">Enrolled Students:</span>{" "}
              {classDetails.enrolledStudents.length}
            </p>
          </div>

          {classDetails.enrolledStudents.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Enrolled Students:
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {classDetails.enrolledStudents.map((student: any, index: number) => (
                  <li key={index} className="text-gray-600">
                    {student.name || "Student Name"} ({student.email || "Email"})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex justify-between">

            <button
              onClick={() => setCancelBookingModal(true)}
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </div>


      {/* Delete Confirmation Modal */}
      {CancelBookingModal && (
        <CancelUserClassBooking
          classId={classDetails._id}
          classTitle={classDetails.title}
          onClose={() => setCancelBookingModal(false)}
        />
      )}
    </>
  );
};
