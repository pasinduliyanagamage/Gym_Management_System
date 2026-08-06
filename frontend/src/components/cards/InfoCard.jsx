import React from 'react';
import { cn } from '../../utils/cn';

const InfoCard = ({ className, children }) => {
  return (
    <div className={cn(
      "bg-darkSurface/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl",
      className
    )}>
      {children}
    </div>
  );
};

export default InfoCard;
