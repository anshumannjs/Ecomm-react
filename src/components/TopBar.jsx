import React from 'react';
import { Truck, Shield, Clock, Headphones } from 'lucide-react';

const TopBar = () => {
  const features = [
    {
      icon: Truck,
      text: 'Free Shipping on Orders Over $50',
    },
    {
      icon: Shield,
      text: '100% Secure Payment',
    },
    {
      icon: Clock,
      text: '30-Day Return Policy',
    },
    {
      icon: Headphones,
      text: '24/7 Customer Support',
    },
  ];

  return (
    <div className="bg-primary-600 text-white py-2 hidden lg:block">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Icon className="w-4 h-4" />
                <span>{feature.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopBar;