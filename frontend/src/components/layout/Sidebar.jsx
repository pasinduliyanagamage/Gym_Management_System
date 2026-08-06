import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  Package, 
  CalendarCheck, 
  CreditCard, 
  PieChart, 
  Settings,
  LogOut,
  ChevronLeft,
  Award,
  CalendarDays
} from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Members', path: '/members', icon: Users },
  { name: 'Trainers', path: '/trainers', icon: Dumbbell },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
  { name: 'Payments', path: '/payments', icon: CreditCard },
  { name: 'Subscriptions', path: '/subscriptions', icon: Award },
  { name: 'Classes', path: '/classes', icon: CalendarDays },
  { name: 'Reports', path: '/reports', icon: PieChart },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = ({ isCollapsed, toggleSidebar, onLogout }) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-screen bg-darkSurface border-r border-white/5 flex flex-col relative z-20 shrink-0"
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-center border-b border-white/5 relative">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl font-bold text-white flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-black">
              G
            </div>
            GymMaster
          </motion.div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-black font-bold">
            G
          </div>
        )}
        
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
        >
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
            <ChevronLeft size={16} />
          </motion.div>
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all relative group",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                  />
                )}
                <item.icon size={22} className="shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-14 bg-darkCard text-white px-3 py-1.5 rounded shadow-xl text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors w-full group relative"
        >
          <LogOut size={22} className="shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-medium whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
          {isCollapsed && (
            <div className="absolute left-14 bg-darkCard text-red-500 px-3 py-1.5 rounded shadow-xl text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </button>
      </div>
    </motion.aside>
  );
};

// Needed to avoid missing AnimatePresence import
import { AnimatePresence } from 'framer-motion';

export default Sidebar;
