import React, { useState } from 'react';
import { FaClipboardCheck, FaInfo } from "react-icons/fa";
import ResumeForm from './resume-form';
import { GiCancel } from 'react-icons/gi';
import { useCurrJob } from '../context/currJobContext';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const {setCurrJob} = useCurrJob();
    const navigate = useNavigate();

    const handleApplyClick = () => {
        setCurrJob(job._id);
        setTimeout(() => {
            
            navigate("/resume-form")
        }, 1000);

    }
    return (
        <div className='bg-secondary w-full rounded-md p-8 my-3 '>
            <div className='flex gap-2 items-center my-2'>
                <h1 className='text-5xl font-semibold'>{job.jobTitle}</h1>
                <h2 className='text-3xl font-medium text-secondary self-end'> . {job.companyName}</h2>
            </div>
            <div className='h-0.5 bg-primary'></div>
            <div className='flex flex-col text-secondary p-4 text-xl'>
                <div className='flex gap-4'>
                    <p>Total applicants: <span className='font-bold'>300</span></p>
                    -
                    <p>Experience: <span className='font-bold'>{job.yearsOfExperience}</span> years</p>
                    -
                    <p>Salary: <span className='font-bold'>{job.salary}</span> lpa</p>
                </div>
                <div className='flex'>
                    Required Skills:
                    {job.requiredSkill.map((skill, index, array) => (
                        <span key={index} className='font-bold'>
                            {skill}{index < array.length - 1 ? ',' : '.'}&nbsp;
                        </span>
                    ))}
                </div>

            </div>
            <div className='flex gap-2'>
                <button className='group bg-primary flex gap-2 px-4 py-2 rounded-lg items-center justify-center text-secondary hover:text-primary transition'>
                    <FaInfo className='group-hover:translate-y-[-2px] transition' /> See Details
                </button>
                <button className='group bg-primary flex gap-2 px-4 py-2 rounded-lg items-center justify-center text-secondary hover:text-primary transition' onClick={handleApplyClick}>
                    <FaClipboardCheck className='group-hover:translate-y-[-2px] transition' /> Easy Apply
                </button>
            </div>

            
        </div>
        
    );
}

export default Job;


{/* <button className='absolute top-3 right-3' onClick={() => setCurrJob("")}><GiCancel className='text-secondary hover:text-primary'/></button> */}
                