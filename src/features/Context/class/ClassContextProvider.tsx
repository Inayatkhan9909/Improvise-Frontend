import React, {  useState } from "react";
import { ClassContext } from "./ClassContext";


export const ClassContextProvider = ({ children }: any) => {
    const [classes,setClasses]=useState([]);
    const [courses,setCourses]=useState([]);
    return (
        <ClassContext.Provider value={{ classes,setClasses,courses,setCourses }}>
            {children}
        </ClassContext.Provider>
    )
};
