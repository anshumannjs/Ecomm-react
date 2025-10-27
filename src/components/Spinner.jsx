import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

const Spinner = ({
  size = 'md',
  color = 'primary',
  className = '',
  fullScreen = false,
}) => {
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colors = {
    primary: 'text-primary-600',
    secondary: 'text-gray-600',
    white: 'text-white',
  };

  const spinner = (
    <Loader2
      className={clsx(
        'animate-spin',
        sizes[size],
        colors[color],
        className
      )}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Spinner;