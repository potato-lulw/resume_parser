import React from 'react'
import Job from '../components/job'

const Jobs = () => {
  return (
    <div className='flex justify-center mt-5 flex-col w-[80vw] self-center'>
        <h1 className='text-3xl font-bold text-left'>Currently available jobs</h1>
        <div className=''><Job/></div>
        
    </div>
  )
}

export default Jobs