import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Footer = () => {
  return (
    <footer className=" px-6 sm:px-10 lg:px-14 py-10 md:py-16">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 mb-10">
        {/* Logo and Description */}
        <div className="flex flex-col">
          <img src={assets.logo} alt="Med-Connect Logo" className="w-32 mb-4" />
          <p className="text-sm leading-relaxed line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ad esse laboriosam cumque eius placeat quisquam, impedit, deserunt dignissimos. Soluta facere maiores officia repellendus odio aut quam, explicabo saepe expedita.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li className="hover:text-gray-500 cursor-pointer transition">Home</li>
            <li className="hover:text-gray-500 cursor-pointer transition">About Us</li>
            <li className="hover:text-gray-500 cursor-pointer transition">Contact Us</li>
            <li className="hover:text-gray-500 cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2">
            <li className="hover:text-gray-500 cursor-pointer transition">+880 01909 125813</li>
            <li className="hover:text-gray-500 cursor-pointer transition">MedConnect13@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <hr className="border-gray-600 mb-6" />
      <p className="text-center text-sm">
        © 2024 Med-Connect - All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
