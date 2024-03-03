import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-secondary w-auto self-center flex justify-center h-[2.75rem] align-middle rounded-full px-2 '>
      <ul className='flex gap-4 min-h-full align-middle justify-center'>
        <li className='self-center bg-tertiary px-3 py-1 rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
          <NavLink to="/" className="text-secondary hover:text-primary transition" >Home</NavLink>
        </li>
        <li className='self-center bg-tertiary px-3 py-1 rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
          <NavLink to="/analyze" className="text-secondary hover:text-primary transition" >Analyze</NavLink>
        </li>
        <li className='self-center bg-tertiary px-3 py-1 rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
          <NavLink to="/about" className="text-secondary hover:text-primary transition" >About</NavLink>
        </li>
        <li className='self-center bg-tertiary px-3 py-1 rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
          <NavLink to="/contact" className="text-secondary hover:text-primary transition" >Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
