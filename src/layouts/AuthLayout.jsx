import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Toast from '../components/Toast';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex flex-col">
      {/* Simple Header */}
      <header className="py-6 px-4">
        <div className="container-custom">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <ShoppingBag className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">ShopHub</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Outlet />
      </main>

      {/* Simple Footer */}
      <footer className="py-6 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
      </footer>

      <Toast />
    </div>
  );
};

export default AuthLayout;