import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-secondary w-aut0 self-center flex justify-center h-[2.5rem] align-middle rounded-full px-2'>
        <ul className='flex gap-4 min-h-full align-middle justify-center'>
            <li className='self-center bg-primary px-3 py-1 rounded-full'><Link to="/">Home</Link></li>
            <li className='self-center bg-primary px-3 py-1 rounded-full'><Link to="/">Analyze</Link></li>
            <li className='self-center bg-primary px-3 py-1 rounded-full'><Link to="/">About</Link></li>
            <li className='self-center bg-primary px-3 py-1 rounded-full'><Link to="/">Contact</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar