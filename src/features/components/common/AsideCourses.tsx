import axios from "axios";
import React, { useEffect, useState } from "react";
import { BookCourse } from "../../courses/components/BookCourse";
import { SlArrowRight,SlArrowLeft } from "react-icons/sl";

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  price: number;
  date: string;
}

export const AsideCourses = () => {
  const [bookClassModal, setBookClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/courses/getallcourses");
      setCourses(response?.data?.courses || []);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleBookClass = (course: Course) => {
    setSelectedClass(course);
    setBookClassModal(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? courses.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length);
  };


  return (
   
    <div className="relative w-full h-screen flex items-center justify-center">
      {courses.length > 0 ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        ></div>
      ) : (
        <div className="absolute inset-0 bg-gray-200"></div>
      )}

      <div className="relative z-10 bg-white/90 shadow-lg rounded-lg  p-6">
      {courses.length > 0 && courses[currentIndex] ? (
      <>
      <img src={courses[currentIndex].thumbnail} alt="thumbnail" />
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">{courses[currentIndex]?.title}</h2>
        <p className="text-gray-600 text-center">{courses[currentIndex]?.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm bg-blue-100 text-blue-600 py-1 px-3 rounded-full">
            {courses[currentIndex]?.category}
          </span>
          <span className="text-lg font-semibold text-gray-800">
            ${courses[currentIndex]?.price}
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-2 text-center">
          <span className="text-sm text-gray-600">
            Launch Date: {new Date(courses[currentIndex]?.date).toLocaleDateString()}
          </span>
          <span className="text-sm text-gray-600">
            Time Remaining: {Math.max(0, new Date(courses[currentIndex]?.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)} days
          </span>
        </div>
        <button
          onClick={() => handleBookClass(courses[currentIndex])}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg mt-4"
        >
          Enroll
        </button>
        </>
  ) : (
    <p>Loading course data...</p>
  )}
      </div>
      

      <button
        onClick={handlePrev}
        className="absolute left-0 top-2/3 transform -translate-y-1/2  bg-gray-200  p-3 rounded-full shadow-lg z-20"
      >
        <SlArrowLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-2/3 transform -translate-y-1/2 p-3 bg-gray-200 rounded-full shadow-lg z-20"
      >
        <SlArrowRight size={20} />
      </button>

      {bookClassModal && (
        <BookCourse
          crs={selectedClass}
          onClose={() => setBookClassModal(false)}
        />
      )}
    </div>

  );
};
