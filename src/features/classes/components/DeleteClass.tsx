import React from "react";

export const DeleteClass= ({ classTitle, onClose, onConfirm }: any) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Confirm Delete
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Are you sure you want to delete the class <strong>{classTitle}</strong>?
      </p>
      <div className="flex justify-between">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);


