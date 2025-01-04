import React from 'react'
import { Classes } from '../components/common/Classes'

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

      {/* Classes data */}
      <section className='flex '>
    <div className='w-2/3 p-4'>
    <Classes/>
    </div>
      </section>
    </>
  )
}
