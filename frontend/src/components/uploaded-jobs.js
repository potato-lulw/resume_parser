import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext';
import UploadedJob from './uploaded-job';

const UploadedJobs = () => {
    const {name} = useUserContext();
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchUploadedJobs = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/jobs/${name}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setJobs(data); // Assuming you have a state to store the jobs
            } catch (error) {
                console.error('Error fetching uploaded jobs:', error);
            }
        };
    
        fetchUploadedJobs();
    }, [name]);

    console.log(jobs)
  return (
    <div className='flex justify-center mt-5 flex-col w-[80vw] self-center'>
        {jobs.map((job, index) => (
            <UploadedJob key={index} job={job}/>
        ) )}
    </div>
  )
}

export default UploadedJobs