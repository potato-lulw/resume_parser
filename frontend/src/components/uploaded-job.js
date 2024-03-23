import React from 'react'

const UploadedJob = ({ job }) => {

    const calculateDaysLeft = (endDate) => {
        const currentDate = new Date();
        const differenceInTime = new Date(endDate) - currentDate;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
        return differenceInDays >= 0 ? differenceInDays : 'Expired';
    };
    return (
        <div className="bg-secondary shadow-md rounded-md p-6 my-4 w-full flex justify-between items-center">
            <div >

                <div className='flex gap-2 items-baseline '>

                    <h2 className="text-3xl font-bold mb-2">{job.jobTitle} . </h2>
                    <p className="text-lg font-medium mb-2">{job.companyName}</p>
                </div>
                <div className='text-secondary'>

                    <div className='flex items-baseline'>
                        Required Skills: 
                        {job.requiredSkill.map((skill, index, array) => (
                            <span key={index} className='font-bold text-sm ml-1'>
                                {skill}{index < array.length - 1 ? ',' : ''}
                            </span>
                        ))}
                    </div>

                    <div className='flex gap-4'>

                        <p className="text-sm mb-2">Experience: <span className='font-bold'>{job.yearsOfExperience}</span> years</p>
                        <p className="text-sm mb-2">Salary: <span className='font-bold'>{job.salary}</span> lpa</p>
                    </div>
                    {/* <p className="text-sm mb-2">Uploaded By: {job.uploadedBy}</p> */}
                    {job.uploadDate && (
                        <p className="text-sm mb-2">Uploaded At: {new Date(job.uploadDate).toLocaleDateString()}</p>
                    )}
                    {job.endDate && (
                        <>
                            <p className="text-sm mb-2">End Date: {new Date(job.endDate).toLocaleDateString()}</p>
                            <p className="text-primary mb-2">Days Left: {calculateDaysLeft(job.endDate)}</p>
                        </>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <button className='px-4 py-2 rounded-md bg-tertiary text-secondary hover:text-primary transition'>See Applicants</button>
                <button className='px-4 py-2 rounded-md bg-tertiary text-secondary hover:text-primary transition'>Delete</button>
            </div>
        </div>

    )
}

export default UploadedJob