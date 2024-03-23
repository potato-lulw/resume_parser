import React, { useEffect } from 'react'
import { useUserContext } from '../context/userContext'
import UploadedJobs from '../components/uploaded-jobs';
import { useNavigate } from 'react-router-dom';
import UserGreeting from '../components/user-greeting';

const Home = () => {
  
  
  const { userType } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userType === '') {
      navigate('/login');
    }
  }, [userType, navigate]);
  return (
    <>
    
    {userType === 'ja' && (<div className='flex justify-center w-full'><UserGreeting/></div>)}
    {userType === 'hr' && (<div className='flex justify-center'><UploadedJobs/></div>)}
    </>
    
  )
}

export default Home