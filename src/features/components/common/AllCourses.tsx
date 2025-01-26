import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CourseContext } from "../../Context/course/CourseContext";
import { BookCourse } from "../../courses/components/BookCourse";

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

export const AllCourses = () => {
  const { courses, setCourses } = useContext(CourseContext);
  const [bookClassModal, setBookClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Course | null>(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/courses/getallcourses`);
      const fetchedCourses = response?.data?.courses || [];
      setCourses(fetchedCourses);
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

  if (!courses) {
    return <div className="text-center py-6">Loading classes...</div>;
  }

  return (
    <div className="w-full p-6 bg-gradient-to-b from-gray-100 to-blue-50">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        Explore Our Courses
      </h1>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {courses.map((course: any) => (
          <div
            key={course._id}
            className="bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {course.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {course.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm bg-blue-100 text-blue-600 py-1 px-3 rounded-full">
                  {course.category}
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ${course.price}
                </span>
              </div>
              <button
                onClick={() => handleBookClass(course)}
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {bookClassModal && (
        <BookCourse
          crs={selectedClass}
          onClose={() => setBookClassModal(false)}
        />
      )}
    </div>
  );
};
