import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Eye, EyeOff } from 'lucide-react';

const Input = React.forwardRef(({
  className,
  type = 'text',
  label,
  error,
  icon: Icon,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full relative space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-300 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Icon size={18} />
          </div>
        )}
        <input
          type={inputType}
          className={cn(
            'flex h-11 w-full rounded-lg border bg-darkSurface px-3 py-2 text-sm text-white placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200',
            'disabled:cursor-not-allowed disabled:opacity-50',
            Icon && 'pl-10',
            isPassword && 'pr-10',
            error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : 'border-white/10',
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 ml-1 mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
