import React, { useState } from "react";
import { ClassContext } from "./ClassContext";


export const ClassContextProvider = ({ children }: any) => {
    const [classes, setClasses] = useState([]);
    const [instructorClasses, setInstructorClasses] = useState([]);
    const [courses, setCourses] = useState([]);
    return (
        <ClassContext.Provider value={{ classes, setClasses, courses, setCourses, instructorClasses, setInstructorClasses }}>
            {children}
        </ClassContext.Provider>
    )
};
