import React, { useState } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import { useUserContext } from '../context/userContext';

const AddJobForm = () => {
   
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [requiredSkill, setRequiredSkill] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [endDate, setEndDate] = useState('');
    const {name} = useUserContext();
    const uploadDate = Date.now();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const skills = requiredSkill.split(',').map(skill => skill.trim());

        // console.log({ jobTitle, companyName, requiredSkill, yearsOfExperience, jobDescription, endDate });
        const jobData = {
            jobTitle,
            companyName,
            requiredSkill: skills,
            salary,
            yearsOfExperience,
            jobDescription,
            uploadedBy: name,
            uploadDate,
            endDate
        };

        try {
            const response = await fetch('http://localhost:4000/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            
            setJobTitle('');
            setCompanyName('');
            setRequiredSkill('');
            setYearsOfExperience('');
            setJobDescription('');
            setSalary('');
            setEndDate('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='w-full max-w-md mx-auto mt-3 text-secondary'>
            <h1 className='text-4xl font-bold text-center text-primary mb-2'>Add a new job</h1>
            <form className='bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block  text-sm font-bold mb-2' htmlFor='jobTitle'>
                        Job Title
                    </label>
                    <input className='shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-primary' id='jobTitle' type='text' placeholder='Eg. Senior Software Engineer' value={jobTitle} required onChange={(e) => setJobTitle(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label className='block  text-sm font-bold mb-2' htmlFor='companyName'>
                        Company Name
                    </label>
                    <input className='shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-primary' id='companyName' type='text' placeholder='Your Company Name' value={companyName} required onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label className='block  text-sm font-bold mb-2' htmlFor='requiredSkill'>
                        Required Skill
                    </label>
                    <input className='shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-primary' id='requiredSkill' type='text' placeholder='Skills' value={requiredSkill} required onChange={(e) => setRequiredSkill(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label className='block  text-sm font-bold mb-2' htmlFor='requiredSkill'>
                        Salary (lpa)
                    </label>
                    <input className='shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-primary' id='requiredSkill' required type='text' placeholder='Eg. 5-7 lpa' value={salary} onChange={(e) => setSalary(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label className='block  text-sm font-bold mb-2' htmlFor='yearsOfExperience'>
                        Experience (years)
                    </label>
                    <input className='shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-primary' id='yearsOfExperience' required type='number' placeholder='Years of Experience' value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label className='block  text-sm font-bold mb-2'  htmlFor='jobDescription'>
                        Job Description
                    </label>
                    <textarea className='shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-primary' required id='jobDescription' placeholder='Job Description' value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}></textarea>
                </div>
                <div className='mb-4'>
                    <label className='block  text-sm font-bold mb-2' htmlFor='endDate'>
                        End Date
                    </label>
                    <input className='shadow appearance-none  rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-primary' id='endDate' required type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className='flex items-center justify-between'>
                    <button className='group w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center gap-2' >
                        Add Job <FaAngleRight viewBox='0 0 100% 4' className='self-center group-hover:translate-x-2 transition'/>
                    </button>
                    
                </div>
            </form>
        </div>
    );
}

export default AddJobForm;