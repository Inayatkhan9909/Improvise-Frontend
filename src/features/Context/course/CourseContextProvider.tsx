import React, { useState } from "react";
import { CourseContext } from "./CourseContext";


export const CourseContextProvider = ({ children }: any) => {
    const [courses, setCourses] = useState([]);
    const [instructorCourses, setInstructorCourses] = useState([]);

    return (
        <CourseContext.Provider value={{ courses, setCourses, instructorCourses, setInstructorCourses }}>
            {children}
        </CourseContext.Provider>
    )
};
