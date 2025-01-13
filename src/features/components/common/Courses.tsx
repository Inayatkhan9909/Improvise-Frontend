import axios from "axios";
import React, { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  // Add other fields if necessary
}

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:4000/courses/getallcourses');
      setCourses(response?.data?.courses || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [courses]);

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-lg">
      {courses.length > 0 ? (
        <div className="flex flex-col items-center">
          <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white w-full">
            <h3 className="text-xl font-bold text-gray-800 text-center">{courses[currentIndex]?.title}</h3>
            <p className="text-gray-600 text-sm text-center mt-2">{courses[currentIndex]?.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm bg-blue-100 text-blue-600 py-1 px-3 rounded-full">{courses[currentIndex]?.category}</span>
              <button className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg">
                Enroll
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">No courses available.</div>
      )}
    </div>
  );
};
