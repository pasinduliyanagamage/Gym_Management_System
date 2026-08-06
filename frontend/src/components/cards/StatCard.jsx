import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, className }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "bg-darkSurface border border-white/5 rounded-2xl p-6 shadow-lg relative overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
        {Icon && <Icon size={80} />}
      </div>
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2 space-x-2">
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                trend === 'up' ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
              )}>
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Icon size={24} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
