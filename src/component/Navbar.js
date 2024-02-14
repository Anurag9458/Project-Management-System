import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav className='nav'>
        <p className='p-nav'><Link to="/">PMS</Link></p>
        <p className='p-merck'>MERCK</p>
      </nav>
      <Outlet/>
    </div>
  )
}

export default Navbar;
