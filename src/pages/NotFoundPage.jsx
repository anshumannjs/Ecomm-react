import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, ShoppingBag } from 'lucide-react';
import Button from '../components/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'All Products', path: '/products', icon: ShoppingBag },
    { label: 'My Orders', path: '/orders', icon: ShoppingBag },
    { label: 'Contact Us', path: '/contact', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-primary-100 rounded-full opacity-50 animate-ping" />
            </div>
            <div className="relative">
              <ShoppingBag className="w-32 h-32 text-primary-600 mx-auto" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-8 animate-slide-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            The page you're looking for seems to have wandered off.
          </p>
          <p className="text-gray-600">
            Don't worry, even the best shoppers get lost sometimes!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(-1)}
            leftIcon={<ArrowLeft className="w-5 h-5" />}
          >
            Go Back
          </Button>
          
          <Link to="/">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Home className="w-5 h-5" />}
            >
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Icon className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-gray-900">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8">
          <p className="text-gray-600 mb-4">Looking for something specific?</p>
          <Link to="/products">
            <Button
              variant="ghost"
              leftIcon={<Search className="w-5 h-5" />}
            >
              Search Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;