import React, { useState } from 'react';


const ExtractedDataForm = ({ data }) => {
  const [name, setName] = useState(data.extractedData.name || '');
  const [email, setEmail] = useState(data.extractedData.email || '');
  const [phoneNumber, setPhoneNumber] = useState(data.extractedData.mobile_number || '');
  const [skills, setSkills] = useState(data.extractedData.skills || []);
  const [experience, setExperience] = useState(data.extractedData.total_experience || '0');


  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim() !== '') {
      setSkills(prevSkills => [...prevSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillIndex) => {
    setSkills(prevSkills => prevSkills.filter((_, index) => index !== skillIndex));
  };

  return (
    <form>
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
                  
                  <FaXmark/>
                </button>
              </li>
            ))}
          </ul>
          <input className='px-4 py-2 rounded-md w-full mt-2 bg-secondary' type="text" value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyPress={handleAddSkill} placeholder="Type and press Enter to add a new skill" />
        </div>
      </div>
      <div className='flex  my-2 justify-end items-center'>
        <label className='w-48'>Experience: </label>
        <input className='px-4 py-2 rounded-md w-full bg-secondary' type="text" value={experience} onChange={e => setExperience(e.target.value)} />
      </div>
    </form>
  );
};

export default ExtractedDataForm;
