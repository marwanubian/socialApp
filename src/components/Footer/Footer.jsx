import React from 'react';
import { FaHeart, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-6">
          <a href="/about" className="text-gray-500 hover:text-blue-600 text-sm transition-colors hover:underline">
            About
          </a>
          <a href="/privacy" className="text-gray-500 hover:text-blue-600 text-sm transition-colors hover:underline">
            Privacy
          </a>
          <a href="/terms" className="text-gray-500 hover:text-blue-600 text-sm transition-colors hover:underline">
            Terms
          </a>
          <a href="/help" className="text-gray-500 hover:text-blue-600 text-sm transition-colors hover:underline">
            Help Center
          </a>
          <a href="/contact" className="text-gray-500 hover:text-blue-600 text-sm transition-colors hover:underline">
            Contact
          </a>
        </div>
        
        <div className="flex gap-4">
          <a href="https://facebook.com" aria-label="Facebook" className="text-gray-500 hover:text-blue-600 transition-colors">
            <FaFacebook className="text-xl" />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="text-gray-500 hover:text-blue-500 transition-colors">
            <FaTwitter className="text-xl" />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="text-gray-500 hover:text-pink-600 transition-colors">
            <FaInstagram className="text-xl" />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-500 hover:text-blue-700 transition-colors">
            <FaLinkedin className="text-xl" />
          </a>
        </div>
        
        <p className="text-gray-400 text-xs text-center">
          &copy; {new Date().getFullYear()} MySocialApp | Created by Marwa Mahmoud{' '}
          <FaHeart className="inline text-red-500 mx-1" /> | All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;