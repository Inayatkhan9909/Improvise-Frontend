import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BookCourse } from "../../courses/components/BookCourse";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { ClassContext } from "../../Context/class/ClassContext";
const ApiUrl = process.env.REACT_APP_BACKEND_API_URL;
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
  const { courses, setCourses } = useContext(ClassContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${ApiUrl}/courses/getallcourses`
      );
      setCourses(response?.data?.courses || []);
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
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? courses.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length);
  };

  return (
    <div className="relative flex  justify-center w-full px-4 py-4 sm:py-8 sm:px-6 ">
      {courses.length > 0 ? (
        <div className="absolute inset-0 bg-gray-100"></div>
      ) : (
        <div className="absolute inset-0 bg-gray-200"></div>
      )}

      <div className="relative w-full max-w-full bg-white/90 shadow-lg rounded-lg px-2 sm:p-6">
        {courses.length > 0 && courses[currentIndex] ? (
          <>
            <img
              src={courses[currentIndex].thumbnail}
              alt="thumbnail"
              className="w-full h-60 sm:h-96 rounded-lg object-contain "
            />
            <h2 className="mt-2 text-lg font-bold text-blue-700 sm:text-xl">
              {courses[currentIndex]?.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              {courses[currentIndex]?.description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs bg-blue-100 text-blue-600 py-1 px-2 rounded-full sm:text-sm">
                {courses[currentIndex]?.category}
              </span>
              <span className="text-sm font-semibold text-gray-800 sm:text-lg">
                ${courses[currentIndex]?.price}
              </span>
            </div>
            <div className="mt-4 text-sm text-center text-gray-600 sm:text-base">
              <span>
                Launch Date:{" "}
                {new Date(courses[currentIndex]?.date).toLocaleDateString()}
              </span>
              <br />
              <span>
                Time Remaining:{" "}
                {Math.max(
                  0,
                  Math.floor(
                    (new Date(courses[currentIndex]?.date).getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24)
                  )
                )}{" "}
                days
              </span>
            </div>
            <button
              onClick={() => handleBookClass(courses[currentIndex])}
              className="w-full py-2 mt-4 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 sm:text-base"
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
        className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full shadow-lg sm:p-3"
      >
        <SlArrowLeft size={16} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full shadow-lg sm:p-3"
      >
        <SlArrowRight size={16} />
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
