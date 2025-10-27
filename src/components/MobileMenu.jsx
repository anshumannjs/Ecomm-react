import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, ShoppingBag, User, Heart, Package, LogOut, LogIn } from 'lucide-react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { selectIsAuthenticated, selectUser } from '../features/auth/authSlice';
import { useAuth } from '../hooks/useAuth';
import { PRODUCT_CATEGORIES } from '../constants';

const MobileMenu = ({ isOpen, onClose }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Menu Panel */}
      <div
        className={clsx(
          'fixed top-0 left-0 bottom-0 w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Section */}
        {isAuthenticated && user ? (
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.firstName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <LogIn className="w-5 h-5" />
              Login / Register
            </Link>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="p-4">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              Home
            </Link>

            <Link
              to="/products"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              All Products
            </Link>

            {/* Categories */}
            <div className="pt-2 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Categories
              </p>
              {PRODUCT_CATEGORIES.filter((cat) => cat.id !== 'all').map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  onClick={onClose}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* User Links */}
            {isAuthenticated && (
              <>
                <div className="pt-2 pb-2 border-t border-gray-200">
                  <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    My Account
                  </p>
                  
                  <Link
                    to="/profile"
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5" />
                    Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Package className="w-5 h-5" />
                    My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    Wishlist
                  </Link>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;