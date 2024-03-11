import React from 'react'
import { FaClipboardCheck } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";

const Job = () => {
    return (
        <div className='bg-secondary w-full rounded-md p-8 my-3'>
            <div className='flex gap-2 items-center my-2'>

                <h1 className='text-5xl font-semibold'>Job Title</h1>
                <h2 className='text-3xl font-medium text-secondary self-end'> . Company name</h2>
            </div>
            <div className='h-0.5 bg-primary'></div>
            <div className='flex flex-col text-secondary p-4 text-xl'>
                <div className=' flex gap-4'>
                    <p>Total applicants: <span className='font-bold'>300</span></p>
                    -
                    <p>Experience: <span className='font-bold'>X</span> years</p>
                    -
                    <p>Salary: <span className='font-bold'>5-7</span> lpa</p>
                </div>

                <div className='flex'>Required Skills: </div>
            </div>
            <div className='flex gap-2'>

                <button className='group bg-primary flex gap-2 px-4 py-2 rounded-lg items-center justify-center text-secondary hover:text-primary transition'>
                    <FaInfo className='group-hover:translate-y-[-2px] transition' /> See Details
                </button>
                <button className='group bg-primary flex gap-2 px-4 py-2 rounded-lg items-center justify-center text-secondary hover:text-primary transition'>
                    <FaClipboardCheck className='group-hover:translate-y-[-2px] transition' /> Easy Apply
                </button>
            </div>
        </div>
    )
}

export default Job