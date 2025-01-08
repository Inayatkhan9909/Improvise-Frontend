import React from 'react'
import { RxCross2 } from 'react-icons/rx';

export const EditUserPassword = ({ onClose }: any) => {
    return (
        <div className='bg-white p-2'>

            <div className='flex justify-between'>
                <h1>Change Password</h1>
                <button onClick={onClose}>
                    <RxCross2 />
                </button>
            </div>
            <div className='flex flex-col gap-2'>
                <input type="password" placeholder='Enter password' />
                <input type="password" placeholder='Enter password' />
            </div>

        </div>
    )
}
