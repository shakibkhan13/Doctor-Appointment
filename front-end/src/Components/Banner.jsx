import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row bg-primary rounded-lg px-4 sm:px-6 md:px-10 lg:px-14 my-12 md:my-20 mx-4 md:mx-10">
      <div className="flex-1 py-6 sm:py-10 md:py-14 lg:py-20 text-center md:text-left">
        <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white leading-tight">
          <p>Book Appointment</p>
          <p className="mt-2 md:mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate('/login');
            scrollBy(0, 0);
          }}
          className="bg-white text-sm sm:text-base text-gray-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full mt-6 hover:scale-105 transition-transform"
        >
          Create Account
        </button>
      </div>

      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[330px] xl:w-[400px] object-contain"
          src={assets.appointment_img}
          alt="Appointment"
        />
      </div>
    </div>
  );
};

export default Banner;
