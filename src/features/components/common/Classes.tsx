import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { BookClass } from "../../classes/components/BookClass";
import { ClassContext } from "../../Context/class/ClassContext";
const ApiUrl = process.env.REACT_APP_BACKEND_API_URL;

export const Classes = () => {
  const {classes, setClasses} = useContext(ClassContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookClassModal, setBookClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const itemsPerPage = 4;

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${ApiUrl}/classes/getallclasses`
      );
      setClasses(response?.data?.classes || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const totalPages = Math.ceil(classes.length / itemsPerPage);

  const currentClasses = classes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBookClass = (cls:any) => {
    setSelectedClass(cls);
    setBookClassModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }


  return (
    <>
      <div className="w-full flex flex-col gap-6 p-6 bg-gray-50">
        {currentClasses.map((cls:any) => (
          <div
            key={cls._id}
            className="border border-gray-300 rounded-lg shadow-lg flex flex-col lg:flex-row gap-4 p-4 bg-white"
          >
            <div className="lg:w-2/6 w-full">
              <img
                src={cls.thumbnail}
                alt="Thumbnail"
                className="w-full max-h-96 object-contain rounded-lg"
              />
            </div>

            <div className="lg:w-4/6 w-full flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">{cls.title}</h3>
                <span className="text-sm bg-blue-100 text-blue-600 py-1 px-3 rounded-full">
                  Category: {cls.category}
                </span>
              </div>

              <p className="text-gray-600 text-sm">{cls.description}</p>

              <div className="flex justify-between items-center text-gray-700">
                <p className="text-sm">Instructor: {cls.instructorname || "N/A"}</p>
                <p className="text-sm">Level: {cls.level}</p>
              </div>

              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Date</p>
                  <span className="text-sm bg-green-100 text-green-600 py-1 px-3 rounded-lg">
                    {dayjs(cls.date).format("DD MMM YYYY")}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Time</p>
                  <span className="text-sm bg-yellow-100 text-yellow-600 py-1 px-3 rounded-lg">
                    {cls.timing}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Duration</p>
                  <span className="text-sm bg-purple-100 text-purple-600 py-1 px-3 rounded-lg">
                    {cls.duration} minutes
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleBookClass(cls)}
                className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg self-start"
              >
                Book
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`py-2 px-4 rounded-lg font-semibold ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 rounded-lg font-semibold ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {bookClassModal && (
        <BookClass
          cls={selectedClass}
          onClose={() => setBookClassModal(false)}
        />
      )}
    </>
  );
};