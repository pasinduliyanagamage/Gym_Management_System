import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 px-6 border-t border-white/5 bg-darkBg text-center text-sm text-gray-500">
      <p>
        &copy; {new Date().getFullYear()} GymMaster Professional. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
