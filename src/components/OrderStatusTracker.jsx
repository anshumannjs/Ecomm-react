import React from 'react';
import { Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { formatDate } from '../utils/formatters';

const OrderStatusTracker = ({ status, createdAt, updatedAt, deliveredAt }) => {
  const steps = [
    { 
      id: 'pending', 
      label: 'Order Placed', 
      icon: Package,
      date: createdAt 
    },
    { 
      id: 'processing', 
      label: 'Processing', 
      icon: Package,
      date: status === 'processing' || status === 'shipped' || status === 'delivered' ? updatedAt : null
    },
    { 
      id: 'shipped', 
      label: 'Shipped', 
      icon: Truck,
      date: status === 'shipped' || status === 'delivered' ? updatedAt : null
    },
    { 
      id: 'delivered', 
      label: 'Delivered', 
      icon: CheckCircle,
      date: deliveredAt
    },
  ];

  if (status === 'cancelled') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <XCircle className="w-8 h-8 text-red-600" />
          <div>
            <h3 className="font-semibold text-red-900">Order Cancelled</h3>
            <p className="text-sm text-red-700 mt-1">
              This order was cancelled on {formatDate(updatedAt, 'long')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex((step) => step.id === status);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-6">Order Status</h3>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-200">
          <div
            className="absolute top-0 left-0 w-full bg-primary-600 transition-all duration-500"
            style={{ 
              height: `${(currentStepIndex / (steps.length - 1)) * 100}%` 
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.id} className="flex items-start gap-4">
                <div
                  className={clsx(
                    'relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200',
                    isCompleted
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 pt-1">
                  <h4
                    className={clsx(
                      'font-medium',
                      isCurrent ? 'text-primary-600' : 'text-gray-900'
                    )}
                  >
                    {step.label}
                  </h4>
                  {step.date && (
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(step.date, 'long')}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusTracker;