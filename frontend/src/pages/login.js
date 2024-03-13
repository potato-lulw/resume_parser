import React from 'react';
import { FaArrowRight } from "react-icons/fa";

const Login = () => {
    return (
        <div className='flex md:flex-row flex-col items-center md:justify-between mt-10 px-20 align-middle min-h-[80vh] gap-16 md:gap-0 justify-center'  >
            <div className='flex flex-col w-full max-w-md mb-8 px-10'>
                <form className='flex flex-col'>
                    <h1 className='text-3xl font-bold mb-3'>Recruiter?</h1>

                    <input type="text" id='recName' placeholder='Name' className='rounded-sm bg-secondary px-4 py-2 mb-2' />
                    <input type="password" id='recName' placeholder='Password' className='rounded-sm bg-secondary px-4 py-2 mb-2' />
                    
                    <button className='group px-3 py-2 border border-gray-550 rounded-md flex justify-center'><FaArrowRight className='group-hover:translate-x-2 transition'/></button>
                </form>
            </div>
            <div className='col-span-1 md:h-[80vh] md:w-1 h-1 w-[80vw] place-self-center bg-secondary rounded-sm'></div>
            <div className='flex flex-col w-full max-w-md mb-8 px-10'>
                <form className='flex flex-col'>
                    <h1 className='text-3xl font-bold mb-3'>Seeking Job?</h1>

                    <input type="text" id='jobSeekerName' placeholder='Name' className='rounded-sm bg-secondary px-4 py-2 mb-2' />
                    <input type="password" id='jobSeekerPassword' placeholder='Password' className='rounded-sm bg-secondary px-4 py-2 mb-2' />
                    
                    <button className='group px-3 py-2 border border-gray-550 rounded-md flex justify-center'><FaArrowRight className='group-hover:translate-x-2 transition'/></button>
                </form>
            </div>
        </div>
    );
}

export default Login;