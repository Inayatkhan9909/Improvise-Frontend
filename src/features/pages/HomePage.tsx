import React from 'react'

export const HomePage = () => {
  return (
    <>
    {/* Find Class */}
    <section className='w-5/6 m-auto p-4 '>
         <div className='text-2xl'>
          <span>Find </span>
          <span className='text-orange-400'>Class</span>
         </div>
         <div>
          <input type="text" placeholder='Search' />
         </div>
    </section>
    </>
  )
}
