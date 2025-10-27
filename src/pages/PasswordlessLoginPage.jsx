import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PasswordlessAuth from '../components/PasswordlessAuth';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useToast } from '../hooks/useToast';

const PasswordlessLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSuccess = async (data) => {
    try {
      // In real app, send the verification result to backend to get auth token
      // For now, simulate login with demo user
      await dispatch(loginUser({
        email: 'demo@example.com',
        password: 'password123',
      })).unwrap();

      toast.success('Successfully signed in!');

      // Redirect to intended page or home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex flex-col">
      {/* Simple Header */}
      <header className="py-6 px-4">
        <div className="container-custom">
          <Link 
            to="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <PasswordlessAuth 
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </main>

      {/* Simple Footer */}
      <footer className="py-6 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PasswordlessLoginPage;