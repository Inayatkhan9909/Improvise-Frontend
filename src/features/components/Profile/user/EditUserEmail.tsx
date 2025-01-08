import React from 'react'
import { RxCross2 } from 'react-icons/rx';

export const EditUserEmail = ({ onClose }: any) => {
    return (
        <div className='bg-white flex flex-col gap-2 justify-items-center p-2'>
            <div className='w-full flex justify-between'>
                <h1>Edit Email</h1>
                <button onClick={onClose}
                className=''
                >
                    <RxCross2 />
                </button>
            </div>
            <div className='flex flex-col'>
            <input type="email" placeholder='email' />
            <input type="email" placeholder='email' />
            <button>
                Submit
            </button>
            </div>
        </div>
    )
}
