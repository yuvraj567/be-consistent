import React from 'react'
import { NavLink } from "react-router-dom";
import {useState} from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {

  const [toggle,setToggle] = useState(false);

  function clickHandler()
  {
    setToggle(!toggle)
  }
  return (

    <nav className='sm:px-16 px-2 w-full flex items-center py-1 fixed top-0 z-20 bg-black '>

      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>

          <Link to="/" className='flex items-center gap-2'>
              <img src="logo.png" alt="logo"className=' sm:h-14 h-12 object-contain' />
              <p className='text-white sm:text-3xl text-[20px] font-bold py-1 cursor-pointer flex'>Be|Consistent</p>
          </Link>

          <div className='list-none hidden md:flex flex-row gap-6'>

            <NavLink className={({ isActive }) => (isActive ? 'border rounded-md font-semibold' : '')} to="/"><div className="  hover:text-white text-[20px]  p-2  cursor-pointer">Home</div></NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'border rounded-md  font-semibold' : '')} to="/about"><div className="  hover:text-white text-[20px] p-2  cursor-pointer">About</div></NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'border rounded-md  font-semibold' : '')} to="/contact"><div className="  hover:text-white text-[20px] p-2  cursor-pointer">Contact</div></NavLink>
            
          </div>

          <div className='md:hidden flex flex-1 justify-end items-center'>
            
              <img src={` ${(toggle)? "close.svg" : "menu.svg"}`} alt='menu' className='w-[28px] h-[28px] object-contain' onClick={clickHandler} />

              <div className={`${(!toggle) ?'hidden' :"flex"}  p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>

                  <div  className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                    <NavLink className={({ isActive }) => (isActive ? "text-white" : "text-secondary")} to="/"><div className="  font-poppins font-medium cursor-pointer text-[16px] ">Home</div></NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "text-white" : "text-secondary")} to="/about"><div className="  font-poppins font-medium cursor-pointer text-[16px] ">About</div></NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "text-white" : "text-secondary")} to="/contact"><div className="  font-poppins font-medium cursor-pointer text-[16px] ">Contact</div></NavLink>
                  </div>

              </div>

          </div>

      </div>
    </nav>

  )
}

export default Navbar
