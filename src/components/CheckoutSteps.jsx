import React from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

const CheckoutSteps = ({ currentStep = 1, steps = [] }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div className="flex flex-col items-center flex-1">
                <div
                  className={clsx(
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200',
                    isCompleted && 'bg-green-600 text-white',
                    isActive && 'bg-primary-600 text-white ring-4 ring-primary-100',
                    !isCompleted && !isActive && 'bg-gray-200 text-gray-600'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={clsx(
                    'mt-2 text-xs sm:text-sm font-medium text-center',
                    isActive ? 'text-primary-600' : 'text-gray-600'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={clsx(
                    'flex-1 h-0.5 mx-2 transition-all duration-200',
                    isCompleted ? 'bg-green-600' : 'bg-gray-200'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;