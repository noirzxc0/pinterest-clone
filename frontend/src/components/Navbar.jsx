import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import { FaChevronDown } from 'react-icons/fa'
import { BsPinterest } from 'react-icons/bs'

const isActiveStyle = "bg-black w-[5rem] p-3 text-white rounded-full font-medium"
const isNotActiveStyle = "w-[5rem] p-3 rounded-full font-medium"

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="bg-white items-center flex gap-2 md:gap-5 w-full py-4">
        <div className='flex items-center justify-center gap-3'>
          <div>
            <Link
            to="/"
            >
              <BsPinterest className='w-6 h-6 mx-3 text-red-600' />
            </Link>
          </div>
          <div className=''>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            >
              Home
            </NavLink>
          </div>
          <Link to='/create-pin'>
            <button className='p-3 font-semibold flex items-center gap-2'>Create <span><FaChevronDown /></span></button>
          </Link>
        </div>
        
        <div className="flex justify-start items-center w-full px-2 rounded-full py-[0.4rem] bg-gray-100 border-none outline-none focus-within:shadow-sm">
          <IoMdSearch fontSize={21} className="ml-1 text-gray-500" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="p-2 w-full re bg-gray-100 outline-none rounded-full py-[0.4rem]"
          />
        </div>
        <div className="flex gap-1 ml-2">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block w-6 h-6">
            <img src={user.image} alt="user-pic" className="rounded-full " />
          </Link>
          <div>
            <button className='rounded-full p-1 hover:bg-slate-100 ml-2'>
              <FaChevronDown />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;