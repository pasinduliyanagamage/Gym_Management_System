import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Apply dark mode class to html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const handleLogout = () => {
    // Handle logout logic here (clear tokens, etc.)
    navigate('/');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-darkBg text-white">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={toggleSidebar} 
        onLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Dynamic Background Image based on route */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           {/* Fallback pattern if no background image is available */}
           <div className="absolute inset-0 bg-darkBg opacity-95 z-10" />
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        </div>

        <Navbar 
          onThemeToggle={toggleTheme} 
          isDarkMode={isDarkMode} 
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto relative z-10 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
