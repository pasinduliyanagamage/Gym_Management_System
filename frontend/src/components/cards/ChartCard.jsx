import React from 'react';
import { cn } from '../../utils/cn';

const ChartCard = ({ title, subtitle, children, className, action }) => {
  return (
    <div className={cn(
      "bg-darkSurface border border-white/5 rounded-2xl p-6 shadow-lg",
      className
    )}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        {action && (
          <div>{action}</div>
        )}
      </div>
      <div className="w-full h-[300px]">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
