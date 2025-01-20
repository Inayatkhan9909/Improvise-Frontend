import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ClassContext } from "../../Context/class/ClassContext";


export const AllCourses = () => {
  const {courses, setCourses} = useContext(ClassContext);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/courses/getallcourses");
      const fetchedCourses = response?.data?.courses || [];
      setCourses(fetchedCourses);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);



  return (
    <div className="w-full p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">All Courses</h1>


      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course:any) => (
          <div key={course._id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold text-blue-700 mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm bg-blue-100 text-blue-600 py-1 px-3 rounded-full">
                {course.category}
              </span>
              <span className="text-lg font-semibold text-gray-800">${course.price}</span>
            </div>
            <button
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
            >
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
