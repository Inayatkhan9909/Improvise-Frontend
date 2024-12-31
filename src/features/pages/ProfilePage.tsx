import React, { useContext } from 'react'
import { UserContext } from '../auth/Context/userContext';
export const ProfilePage = () => {
    const { user } = useContext(UserContext);
    return (
        <>
            <aside>
                <div>
                    {user?.profile && <img src={user.profilePic} alt="Profile" />}
                </div>
                <h1>{user?.name}</h1>
                <h2>{user?.role}</h2>
            </aside>
        </>

    )
}
