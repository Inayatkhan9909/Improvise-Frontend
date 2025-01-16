import React from "react";

interface CourseDetailsProps {
  course: {
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    date: string;
    maxStudents: number;
    modules: { title: string; content: string; duration: number }[];
    price: number;
    duration: number;
    level: "Beginner" | "Intermediate" | "Advanced";
    rating: { average: number; reviews: { studentId: string; review: string; rating: number }[] };
  };
  onClose: () => void;
  onEnroll: () => void;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onClose, onEnroll }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 p-6 rounded-lg shadow-lg">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 float-right">✕</button>
        <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
        <img src={course.thumbnail} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <p className="text-gray-700 mb-4">{course.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-blue-600 bg-blue-100 py-1 px-3 rounded-full">{course.category}</span>
          <span className="font-bold text-gray-800">${course.price}</span>
        </div>
        <div className="text-gray-600 mb-4">
          <p><strong>Launch Date:</strong> {new Date(course.date).toLocaleDateString()}</p>
          <p><strong>Level:</strong> {course.level}</p>
          <p><strong>Max Students:</strong> {course.maxStudents}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Modules:</h3>
          <ul className="list-disc pl-5">
            {course.modules.map((module, index) => (
              <li key={index}>
                <strong>{module.title}</strong>: {module.content} ({module.duration} mins)
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onEnroll}
          className="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
        >
          Enroll
        </button>
      </div>
    </div>
  );
};
