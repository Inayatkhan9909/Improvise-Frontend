import React, {  useState } from "react";
import { ClassContext } from "./ClassContext";


export const ClassContextProvider = ({ children }: any) => {
    const [classes,setClasses]=useState(null)
    return (
        <ClassContext.Provider value={{ classes,setClasses }}>
            {children}
        </ClassContext.Provider>
    )
};
