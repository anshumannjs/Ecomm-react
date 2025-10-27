import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';

const Checkbox = forwardRef(({
  label,
  error,
  className = '',
  checked,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-2 cursor-pointer group">
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            className="sr-only"
            {...props}
          />
          <div className={clsx(
            'w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center',
            checked ? 'bg-primary-600 border-primary-600' : 'bg-white border-gray-300',
            'group-hover:border-primary-400',
            error && 'border-red-500',
            className
          )}>
            {checked && (
              <Check 
                className="w-3.5 h-3.5 text-white"
                strokeWidth={3} 
              />
            )}
          </div>
        </div>
        {label && <span className="text-sm text-gray-700 select-none">{label}</span>}
      </label>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;