import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { toast } from 'react-toastify';




const Navbar = () => {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    toast.success("Logout Successfullty");
    navigate('/login');
   }

  return (
    <div>
      <nav className='nav'>
      {/* <p className='p-merck font-[merck]'>MERCK</p> */}
        <p className='p-nav'><Link to="/">Project Management System</Link></p>
        
        {!localStorage.getItem('token')?<form className="d-flex pt-1">
              <Link className="button-nav" to="/login" role="button">Login</Link>
              <Link className="button-nav" to="/signup" role="button">Signup</Link>
            </form>:<button onClick={handleLogout} className="button-nav" >Logout</button>}
      </nav>
      <Outlet/>
    </div>
  )
}

export default Navbar;
