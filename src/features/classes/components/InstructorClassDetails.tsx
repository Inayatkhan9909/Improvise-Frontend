import React, { useState } from "react";
import {EditClass} from "./EditClass";
import {DeleteClass} from "./DeleteClass";

export const InstructorClassDetails = ({
  classDetails,
  onClose,
  onEdit,
  onDelete,
}: any) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  if (!classDetails) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90%]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          >
            &times;
          </button>

          <img
            src={classDetails.thumbnail}
            alt={classDetails.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />

          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            {classDetails.title}
          </h2>

          <div className="text-gray-700 space-y-2 grid grid-cols-2">
            <p>
              <span className="font-medium">Description:</span>{" "}
              {classDetails.description}
            </p>
            <p>
              <span className="font-medium">Category:</span>{" "}
              {classDetails.category}
            </p>
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
              onClick={() => setEditModalOpen(true)}
              className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditClass
          classDetails={classDetails}
          onClose={() => setEditModalOpen(false)}
          onSubmit={(updatedClass: any) => {
            onEdit(updatedClass);
            setEditModalOpen(false);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteClass
        classId={classDetails._id}
        classTitle={classDetails.title}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          onDelete(classDetails._id); 
        }}
        />
      )}
    </>
  );
};
