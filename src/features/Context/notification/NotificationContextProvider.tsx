import React, { useEffect, useState } from "react";
import {NotificationContext} from './notificationContext'

export const NotificationContextProvider = ({ children }: any) => {
    const [notification, setNotification] = useState([]);

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}