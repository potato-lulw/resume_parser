import React from 'react'
import { useUserContext } from '../context/userContext'
import SearchBar from './search-bar';

const UserGreeting = () => {
    const {name} = useUserContext();
  return (
    <div className='mt-40 text-center w-full flex flex-col items-center'>
        <h1 className='font-bold text-5xl mb-4 text-secondary'>Hello, <span className='bg-gradient-to-r from-gray-750 to-gray-450 text-transparent inline-block toleft bg-clip-text' >{name}</span></h1>
        <p className='text-secondary'>We analyze your resume and let you apply to available jobs</p>
        <SearchBar/>
    </div>
  )
}

export default UserGreeting