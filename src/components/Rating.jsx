import React from 'react';
import { Star } from 'lucide-react';
import clsx from 'clsx';

const Rating = ({
  value = 0,
  max = 5,
  size = 'md',
  showValue = true,
  readonly = true,
  onChange,
  className = '',
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (rating) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className={clsx('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {[...Array(max)].map((_, index) => {
          const rating = index + 1;
          const isFilled = rating <= Math.floor(value);
          const isPartial = rating === Math.ceil(value) && value % 1 !== 0;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(rating)}
              disabled={readonly}
              className={clsx(
                'transition-transform',
                !readonly && 'hover:scale-110 cursor-pointer',
                readonly && 'cursor-default'
              )}
              aria-label={`Rate ${rating} out of ${max}`}
            >
              <Star
                className={clsx(
                  sizes[size],
                  isFilled || isPartial ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                )}
              />
            </button>
          );
        })}
      </div>
      
      {showValue && (
        <span className="text-sm font-medium text-gray-700 ml-1">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;