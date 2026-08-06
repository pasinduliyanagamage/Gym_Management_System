import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Moon, Sun, User } from 'lucide-react';
import { cn } from '../../utils/cn';

const Navbar = ({ onThemeToggle, isDarkMode }) => {
  const location = useLocation();
  const pathName = location.pathname.split('/')[1] || 'Dashboard';
  const pageTitle = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  return (
    <header className="h-16 px-6 bg-darkBg/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between sticky top-0 z-10">
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-white tracking-wide">
        {pageTitle}
      </h1>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 h-10 pl-10 pr-4 rounded-full bg-darkSurface border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onThemeToggle}
          className="w-10 h-10 rounded-full bg-darkSurface border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="w-10 h-10 rounded-full bg-darkSurface border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white leading-none">Admin User</p>
            <p className="text-xs text-gray-500 mt-1">Manager</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-yellow-600 flex items-center justify-center text-black">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
