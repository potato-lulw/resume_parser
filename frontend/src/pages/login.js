import React from 'react';
import { FaArrowRight } from "react-icons/fa";

const Login = () => {
    return (
        <div className='grid grid-cols-5 gap-4 mt-8 max-h-screen px-20 place-items-center'>
            <div className='col-span-2 max-h-[100vh] align-middle justify-center '>
            <form className='flex flex-col'>
                    <h1 className='text-3xl font-bold mb-3'>Recruiter?</h1>

                    <input type="text" id='recName' placeholder='Name' className='rounded-sm bg-secondary px-4 py-2 mb-2' />
                    <input type="password" id='recName' placeholder='Password' className='rounded-sm bg-secondary px-4 py-2 mb-2' />
                    
                    <button className='group px-3 py-2 border border-gray-550 rounded-md flex justify-center'><FaArrowRight className='group-hover:translate-x-2 transition'/></button>
                </form>
            </div>
            <div className='col-span-1 h-[80vh] w-1 place-self-center bg-secondary rounded-sm'></div>
            <div className='col-span-2 max-h-[100vh] align-middle justify-center '>
                <form className='flex flex-col'>
                    <h1 className='text-3xl font-bold mb-3'>Seeking Job?</h1>

                    <input type="text" id='recName' placeholder='Name' className='rounded-sm bg-secondary px-4 py-2 mb-2' />
                    <input type="password" id='recName' placeholder='Password' className='rounded-sm bg-secondary px-4 py-2 mb-2' />
                    <button className='group px-3 py-2 border border-gray-550 rounded-md flex justify-center'><FaArrowRight className='group-hover:translate-x-2 transition'/></button>
                </form>
            </div>
        </div>
    );
}

export default Login;