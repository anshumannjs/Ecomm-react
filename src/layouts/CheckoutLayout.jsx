import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShoppingBag, Lock } from 'lucide-react';
import Toast from '../components/Toast';

const CheckoutLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="container-custom flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">ShopHub</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
      </footer>

      <Toast />
    </div>
  );
};

export default CheckoutLayout;