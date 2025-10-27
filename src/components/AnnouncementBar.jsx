import React, { useState } from 'react';
import { X, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2.5 relative">
      <div className="container-custom">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <Tag className="w-4 h-4" />
          <span className="hidden sm:inline">🎉 Special Offer:</span>
          <Link to="/products" className="underline hover:no-underline">
            Get 20% OFF on your first order! Use code: WELCOME20
          </Link>
        </div>
      </div>
      
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/10 rounded p-1 transition-colors"
        aria-label="Close announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AnnouncementBar;