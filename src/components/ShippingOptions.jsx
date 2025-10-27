import React, { useState } from 'react';
import { Check, Truck, Zap, Clock } from 'lucide-react';
import clsx from 'clsx';
import { SHIPPING_METHODS } from '../constants';
import { formatCurrency } from '../utils/formatters';

const ShippingOptions = ({ selected, onSelect, className = '' }) => {
  const shippingIcons = {
    standard: Truck,
    express: Zap,
    overnight: Clock,
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Shipping Method
      </label>
      
      {SHIPPING_METHODS.map((method) => {
        const Icon = shippingIcons[method.id];
        const isSelected = selected === method.id;
        
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className={clsx(
              'w-full p-4 border-2 rounded-lg transition-all duration-200 text-left',
              isSelected
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={clsx(
                  'p-2 rounded-lg',
                  isSelected ? 'bg-primary-100' : 'bg-gray-100'
                )}>
                  <Icon className={clsx(
                    'w-5 h-5',
                    isSelected ? 'text-primary-600' : 'text-gray-600'
                  )} />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900">{method.name}</h4>
                    {isSelected && (
                      <Check className="w-5 h-5 text-primary-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{method.days}</p>
                </div>
              </div>
              
              <span className="font-bold text-gray-900">
                {method.price === 0 ? 'FREE' : formatCurrency(method.price)}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ShippingOptions;