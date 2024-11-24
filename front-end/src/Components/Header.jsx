import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Header = () => {
  return (
    <div className="relative flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 overflow-hidden">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-16 m-auto">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight text-center md:text-left">
          Book Appointment <br /> with Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light text-center md:text-left">
          <img className="w-28 mx-auto md:mx-0" src={assets.group_profiles} alt="Group profiles" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm mx-auto md:mx-0 hover:scale-105 transition-all duration-300"
        >
          Book Appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 relative flex justify-center md:justify-end">
        <img
          className="w-full max-w-xs md:max-w-md lg:max-w-lg pl-0 md:pl-5 rounded-lg"
          src={assets.header_img}
          alt="Header visual"
        />
      </div>
    </div>
  );
};

export default Header;
