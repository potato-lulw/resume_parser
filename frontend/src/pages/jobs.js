import React, { useState, useEffect } from 'react';
import Job from '../components/job';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/jobs');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className='flex justify-center mt-5 flex-col w-[80vw] self-center'>
            <h1 className='text-3xl font-bold text-left'>Currently available jobs</h1>
            {jobs.map((job, index) => (
                <Job key={index} job={job} />
            ))}
        </div>
    );
}

export default Jobs;