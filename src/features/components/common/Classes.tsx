import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/classes/getallclasses"
      );
      setClasses(response?.data?.classes);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50">
      {classes.map((cls: any) => (
        <div
          key={cls._id}
          className="border border-gray-300 rounded-lg shadow-lg flex flex-col lg:flex-row gap-4 p-4 bg-white"
        >
          {/* Image Section */}
          <div className="lg:w-2/6 w-full">
            <img
              src={cls.thumbnail}
              alt="Thumbnail"
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>

          {/* Content Section */}
          <div className="lg:w-4/6 w-full flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">{cls.title}</h3>
              <span className="text-sm bg-blue-100 text-blue-600 py-1 px-3 rounded-full">
                Category: {cls.category}
              </span>
            </div>

            <p className="text-gray-600 text-sm">{cls.description}</p>

            <div className="flex justify-between items-center text-gray-700">
              <p className="text-sm">Instructor: {cls.instructor?.name || "N/A"}</p>
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

            <button className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg self-start">
              Book
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
