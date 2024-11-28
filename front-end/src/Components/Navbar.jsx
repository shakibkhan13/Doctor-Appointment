import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-28 h-24 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-white bg-primary px-4 py-2 rounded' : 'px-4 py-2'
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive ? 'text-white bg-primary px-4 py-2 rounded' : 'px-4 py-2'
          }
        >
          ALL DOCTORS
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'text-white bg-primary px-4 py-2 rounded' : 'px-4 py-2'
          }
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? 'text-white bg-primary px-4 py-2 rounded' : 'px-4 py-2'
          }
        >
          CONTACT
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            {/* Profile Picture */}
            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="Profile Picture"
            />
            {/* Dropdown Icon */}
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
            />
            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 text-base font-medium text-gray-600 z-20 hidden group-hover:flex flex-col gap-2 bg-stone-100 rounded shadow-lg p-4">
              <p
                onClick={() => navigate('my-profile')}
                className="hover:text-black cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate('my-appointment')}
                className="hover:text-black cursor-pointer"
              >
                My Appointments
              </p>
              <p
                onClick={() => setToken(false)}
                className="hover:text-black cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-transform transform ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b">
          <img className="w-36" src={assets.logo} alt="Logo" />
          <img
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="Close Icon"
          />
        </div>
        <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-white bg-primary px-4 py-2 rounded'
                : 'px-4 py-2'
            }
            onClick={() => setShowMenu(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive
                ? 'text-white bg-primary px-4 py-2 rounded'
                : 'px-4 py-2'
            }
            onClick={() => setShowMenu(false)}
          >
            ALL DOCTORS
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'text-white bg-primary px-4 py-2 rounded'
                : 'px-4 py-2'
            }
            onClick={() => setShowMenu(false)}
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'text-white bg-primary px-4 py-2 rounded'
                : 'px-4 py-2'
            }
            onClick={() => setShowMenu(false)}
          >
            CONTACT
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
