import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PdfViewer from './pdf-viewer';
import { pdfjs } from 'react-pdf';
import { useCurrJob } from '../context/currJobContext';
import { useNavigate } from 'react-router-dom';
import { FaXmark } from "react-icons/fa6";



pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const ResumeForm = () => {

    const [droppedFiles, setDroppedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resumeData, setResumeData] = useState(null);
    const { currJob, setCurrJob } = useCurrJob();
    const [jobDetails, setJobDetails] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState('0');

    const [newSkill, setNewSkill] = useState('');

    const navigate = useNavigate();

    const handleAddSkill = (e) => {
        if (e.key === 'Enter' && newSkill.trim() !== '') {
            setSkills(prevSkills => [...prevSkills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillIndex) => {
        setSkills(prevSkills => prevSkills.filter((_, index) => index !== skillIndex));
    };

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (currJob) {
                // console.log(`Fetching job details for ID: ${currJob}`); // Log the request URL
                try {
                    const response = await fetch(`http://localhost:4000/api/jobs?id=${currJob}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setJobDetails(data[0]);
                    console.log(data);
                } catch (error) {
                    console.error('Error fetching job details:', error);
                }
            }
        };
    
        fetchJobDetails();
    }, [currJob]);
    

   


    const onDrop = useCallback(async (acceptedFiles) => {
        setDroppedFiles(acceptedFiles);
        // console.log(acceptedFiles);

        const backendEndpoint = "http://localhost:4000/api/upload";
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        setLoading(true);
        try {
            const response = await fetch(backendEndpoint, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log("File upload successful");

                const data = await response.json();

                setResumeData(data);
                // console.log(data.extracedData);
                setName(data.extractedData.name || '');
                setEmail(data.extractedData.email || '');
                setPhoneNumber(data.extractedData.mobile_number || '');
                setSkills(data.extractedData.skills || []);
                setExperience(data.extractedData.total_experience || '0');
            } else {
                console.log("Error uploading file");
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }, []);
    // console.log(skills)

    const { getRootProps, getInputProps, isDragActive } = useDropzone({

        onDrop,
        multiple: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure skills is a plain array of strings
        const plainSkills = skills.map(skill => skill.trim()).filter(skill => skill !== '');

        // Construct data object with the required fields
        const data = {
            name: name,
            email: email,
            phoneNo: phoneNumber,
            skills: plainSkills,
            experience: experience,
            fileName: droppedFiles[0].name,
            jobID: currJob
        };

        try {
            const response = await fetch('http://localhost:4000/api/applicants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Successfully added applicant");
            } else {
                console.error('Could not add Applicant');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        navigate("/jobs");
        setCurrJob(null);

    };

    return (
        <div className='w-full flex justify-center'>
            {
                jobDetails !== null ? (
                    <form className='flex flex-col w-[80%] justify-center my-10' >
                        <h1 className='text-4xl font-medium my-2 text-secondary'>Applying to <span className='text-primary font-bold'>{jobDetails.companyName}</span> as a <span className='text-primary font-bold'>{jobDetails.jobTitle}</span></h1>
                        <label htmlFor="drop-box" className='text-3xl font-bold my-2 text-secondary'>Drop your resume!</label>
                        <div {...getRootProps()} className={` h-[100px] bg-secondary rounded-lg text-secondary  flex justify-center items-center cursor-pointer border-dashed border-2 border-gray-500 {isDragActive ? 'active' : ''
                    } `}>
                            <input {...getInputProps()} id='drop-box' />
                            {droppedFiles.length > 0 ? (
                                <div>
                                    {droppedFiles.map((file) => (
                                        <div key={file.name}>{file.name}</div>
                                    ))}

                                </div>

                            ) : isDragActive ? (
                                <p>Drop the files here ...</p>
                            ) : (
                                <div className='text-secondary text-center p-8'>Drop files (.pdf, .doc, .docx)</div>
                            )}
                        </div>

                        {
                            resumeData && (
                                <div className='text-secondary text-center p-8'>

                                    <h1 className='text-4xl font-medium my-2 text-secondary'>Your resume has been successfully uploaded!</h1>
                                    {/* <h1 className='text-4xl font-medium my-2 text-secondary'>Here is your resume:</h1> */}
                                    {/* <h1 className='text-4xl font-medium my-2 text-secondary'>{resumeData}</h1> */}
                                </div>
                            )
                        }
                        <div className='flex justify-center gap-4'>
                            <div>

                                {droppedFiles && <PdfViewer pdfFile={droppedFiles[0]} />}
                            </div>

                            <div className='text-secondary flex justify-center items-center'>
                                {loading && (<p>Please wait...</p>)}
                                {resumeData && (
                                    <div>
                                        <h3 className='font-bold text-2xl'>Information extracted from your Resume</h3>
                                        <div className='flex  my-2 justify-end items-center'>
                                            <label className='w-48'>Name: </label>
                                            <input className='px-4 py-2 rounded-md w-full bg-secondary' type="text" value={name} onChange={e => setName(e.target.value)} />
                                        </div>
                                        <div className='flex  my-2 justify-end items-center'>
                                            <label className='w-48'>Email: </label>
                                            <input className='px-4 py-2 rounded-md w-full bg-secondary' type="text" value={email} onChange={e => setEmail(e.target.value)} />
                                        </div>
                                        <div className='flex my-2 justify-end items-center '>
                                            <label className='w-48'>Phone Number: </label>
                                            <input className='px-4 py-2 rounded-md w-full bg-secondary' type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                                        </div>
                                        <div className='flex my-2 justify-end items-center'>
                                            <label className='w-48'>Skills: </label>
                                            <div className="w-full">
                                                <ul className="flex flex-wrap gap-1 ">
                                                    {skills.map((skill, index) => (
                                                        <li key={index} className="flex items-center bg-secondary px-2 py-1 rounded-md">
                                                            <span>{skill}</span>
                                                            <button type="button" onClick={() => handleRemoveSkill(index)} className="ml-2 text-red-500">
                                                                <FaXmark />
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <input className='px-4 py-2 rounded-md w-full mt-2 bg-secondary' type="text" value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyPress={e => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault(); 
                                                        handleAddSkill(e); 
                                                    }
                                                }} placeholder="Type and press Enter to add a new skill" />
                                            </div>
                                        </div>
                                        <div className='flex  my-2 justify-end items-center'>
                                            <label className='w-48'>Experience: </label>
                                            <input className='px-4 py-2 rounded-md w-full bg-secondary' type="text" value={experience} onChange={e => setExperience(e.target.value)} />
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                        {
                            loading ? (
                                <button
                                    type="submit"
                                    className="mt-4 inline-block bg-primary border-2 border-dark hover:bg-secondary text-secondary transition font-bold py-2 px-4 rounded hover:shadow-[5px_5px_0px_0px_#66FCF1]" disabled
                                >
                                    Please wait...
                                </button>
                            ) :
                                (
                                    <button
                                        type="submit"
                                        className="mt-4 inline-block bg-primary border-2 border-dark hover:bg-secondary text-secondary transition font-bold py-2 px-4 rounded hover:shadow-[5px_5px_0px_0px_#66FCF1]"
                                        onClick={handleSubmit}
                                    >
                                        Upload
                                    </button>
                                )
                        }

                    </form>
                ) : (
                    <p>Loading job details...</p>
                )
            }

        </div>

    );
};

export default ResumeForm;