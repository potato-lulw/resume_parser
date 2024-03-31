import React, { useState } from 'react';
import { FaXmark } from "react-icons/fa6";

const UploadedJob = ({ job }) => {
    const [showApplicants, setShowApplicants] = useState(false);
    const [applicants, setApplicants] = useState([]);

    const fetchApplicants = async () => {
        try {
            const jobID = job._id;
            const response = await fetch(`http://localhost:4000/api/applicants/${jobID}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setApplicants(data);
            setShowApplicants(true);
        } catch (error) {
            console.error('Error fetching applicants:', error);
        }
    };

    const calculateDaysLeft = (endDate) => {
        const currentDate = new Date();
        const differenceInTime = new Date(endDate) - currentDate;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
        return differenceInDays >= 0 ? differenceInDays : 'Expired';
    };

    return (
        <div className="bg-secondary shadow-md rounded-md p-6 my-4 w-full flex justify-between items-center">
            <div>
                <div className='flex gap-2 items-baseline'>
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
                <button className='px-4 py-2 rounded-md bg-tertiary text-secondary hover:text-primary transition' onClick={fetchApplicants}>See Applicants</button>
                <button className='px-4 py-2 rounded-md bg-tertiary text-secondary hover:text-primary transition'>Delete</button>
            </div>
            {showApplicants && (
                <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-primary p-8 rounded-md max-h-[80vh] overflow-auto'>
                    <div className='flex justify-between items-center'>

                        <h3 className="text-lg font-bold mb-2">Applicants</h3>
                        <FaXmark className="font-bold text-xl text-red-400 cursor-pointer" onClick={() => setShowApplicants(false)} />
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="border border-gray-400 px-4 py-2">Name</th>
                                <th className="border border-gray-400 px-4 py-2">Email</th>
                                <th className="border border-gray-400 px-4 py-2">Phone No</th>
                                <th className="border border-gray-400 px-4 py-2">Skills</th>
                                <th className="border border-gray-400 px-4 py-2">Experience</th>
                                <th className="border border-gray-400 px-4 py-2">File Name</th>
                                <th className="border border-gray-400 px-4 py-2">Date Applied</th>
                            </tr>
                        </thead>
                        <tbody className='text-secondary'>
                            {applicants.map((applicant, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <div className="max-h-[100px] overflow-auto overflow-x-hidden">{applicant.name}</div>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <div className="max-h-[100px] overflow-auto overflow-x-hidden">{applicant.email}</div>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <div className="max-h-[100px] overflow-auto overflow-x-hidden">{applicant.phoneNo}</div>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <div className="max-h-[100px] overflow-auto overflow-x-hidden">{applicant.skills.join(', ')}</div>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <div className="max-h-[100px] overflow-auto overflow-x-hidden">{applicant.experience}</div>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <div className="max-h-[100px] overflow-auto overflow-x-hidden">{applicant.fileName}</div>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <div className="max-h-[100px] overflow-auto overflow-x-hidden">
                                            {new Date(applicant.dataApplied).toLocaleDateString()}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>


                    </table>
                </div>
            )}

        </div>
    );
};

export default UploadedJob;
