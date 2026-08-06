import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const Loader = ({ className, size = 24, text }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-4", className)}>
      <Loader2 size={size} className="animate-spin text-primary" />
      {text && <p className="mt-2 text-sm text-gray-400">{text}</p>}
    </div>
  );
};

export const FullScreenLoader = ({ text = "Loading..." }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-darkBg/80 backdrop-blur-sm">
    <Loader size={40} text={text} />
  </div>
);

export default Loader;
