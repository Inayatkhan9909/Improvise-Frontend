import React, { useContext } from "react";
import dayjs from "dayjs";
import { ClassContext } from "../../Context/class/ClassContext";
import { CourseContext } from "../../Context/course/CourseContext";

interface SearchProps {
    query: string;
}

export const Search: React.FC<SearchProps> = ({ query }) => {
    const { classes } = useContext(ClassContext);
    const {courses} = useContext(CourseContext);
 
    const filteredClasses = classes.filter((cls: any) =>
        cls.title.toLowerCase().includes(query.toLowerCase())
    );

    const filteredCourses = courses.filter((course: any) =>
        course.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="w-full flex flex-col gap-6 mb-4">
            <div className="text-xl font-bold">Search Results for "{query}"</div>

            {filteredClasses.length === 0 && filteredCourses.length === 0 ? (
                <p className="text-gray-500">No results found</p>
            ) : (
                <>
                    {/* Classes Results */}
                    {filteredClasses.length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold">Classes</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredClasses.map((cls: any) => (
                                    <div
                                        key={cls._id}
                                        className="border border-gray-300 rounded-lg shadow-lg flex flex-col lg:flex-row gap-4 p-4 bg-white"
                                    >
                                        <div className="lg:w-2/6 w-full">
                                            <img
                                                src={cls.thumbnail}
                                                alt="Thumbnail"
                                                className="w-full object-contain rounded-lg"
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
                                                // onClick={() => handleBookClass(cls)}
                                                className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg self-start"
                                            >
                                                Book
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Courses Results */}
                    {filteredCourses.length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold">Courses</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredCourses.map((course: any) => (
                                    <div
                                        key={course._id}
                                        className="border border-gray-300 rounded-lg shadow-lg flex flex-col lg:flex-row gap-4 p-4 bg-white"
                                    >
                                        <div className="lg:w-2/6 w-full">
                                            <img
                                                src={course.thumbnail}
                                                alt="Thumbnail"
                                                className="w-full object-contain rounded-lg"
                                            />
                                        </div>

                                        <div className="lg:w-4/6 w-full flex flex-col gap-3">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                                                <span className="text-sm bg-blue-100 text-blue-600 py-1 px-3 rounded-full">
                                                    Category: {course.category}
                                                </span>
                                            </div>

                                            <p className="text-gray-600 text-sm">{course.description}</p>

                                            <div className="flex justify-between items-center text-gray-700">
                                                <p className="text-sm">Instructor: {course.instructorname || "N/A"}</p>
                                                <p className="text-sm">Level: {course.level}</p>
                                            </div>

                                            <div className="flex gap-4">
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-500">Date</p>
                                                    <span className="text-sm bg-green-100 text-green-600 py-1 px-3 rounded-lg">
                                                        {dayjs(course.date).format("DD MMM YYYY")}
                                                    </span>
                                                </div>

                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500">Duration</p>
                                                <span className="text-sm bg-purple-100 text-purple-600 py-1 px-3 rounded-lg">
                                                    {course.duration} days
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            // onClick={() => handleBookClass(cls)}
                                            className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg self-start"
                                        >
                                            Book
                                        </button>
                                    </div>
     
       
                                ))}
                        </div>
                        </div>
                    )}
        </>
    )
}
        </div >
    );
};
