import React, { useEffect, useState } from "react";
import { UserContext } from "./userContext";
import axios from "axios";


export const UserContextProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get("http://localhost:4000/auth/getuser", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response?.data?.user);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
