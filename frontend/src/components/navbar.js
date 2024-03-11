import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-tertiary w-auto self-center flex justify-center h-[3rem] align-middle rounded-full px-2 '>
      <ul className='flex gap-4 min-h-full align-middle justify-center text-[1.1em] font-medium'>
        <li className='self-center bg-secondary px-3 py-1 rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
          <NavLink to="/" className="text-secondary hover:text-primary transition" >Home</NavLink>
        </li>
        <li className='self-center bg-secondary px-3 py-1 rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
          <NavLink to="/jobs" className="text-secondary hover:text-primary transition" >Jobs</NavLink>
        </li>
        <li className='self-center bg-secondary px-3 py-1 rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
          <NavLink to="/analyze" className="text-secondary hover:text-primary transition" >Analyze</NavLink>
        </li>
        <li className='self-center bg-secondary px-3 py-1 rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
          <NavLink to="/about" className="text-secondary hover:text-primary transition" >About</NavLink>
        </li>
        <li className='self-center bg-secondary px-3 py-1 rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
          <NavLink to="/login" className="text-secondary hover:text-primary transition" >Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
