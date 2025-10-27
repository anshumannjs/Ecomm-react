import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  loginUser,
  registerUser,
  updateUserProfile,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectUserAddresses,
  selectDefaultAddress,
  logoutUser,
  updatePassword
} from '../features/auth/authSlice';
import { clearCart } from '../features/cart/cartSlice';
import { clearWishlist } from '../features/wishlist/wishlistSlice';
import { useToast } from './useToast';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const addresses = useSelector(selectUserAddresses);
  const defaultAddress = useSelector(selectDefaultAddress);

  const handleLogin = async (credentials) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      if(result) {
        toast.success(`Welcome back, ${result?.user?.firstName}!`);
        return result;
      }
    } catch (error) {
      toast.error(error || 'Login failed');
      throw error;
    }
  };

  const handleRegister = async (userData) => {
    try {
      const result = await dispatch(registerUser(userData)).unwrap();
      toast.success(`Welcome, ${result.user.firstName}!`);
      return result;
    } catch (error) {
      toast.error(error || 'Registration failed');
      throw error;
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    dispatch(clearWishlist());
    toast.info('Logged out successfully');
    navigate('/');
  };

  const handleUpdateProfile = async (userData) => {
    try {
      await dispatch(updateUserProfile(userData)).unwrap();
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error || 'Failed to update profile');
      throw error;
    }
  };

  const handleUpdatePassword = async (passwordData) => {
    try {
      await dispatch(updatePassword(passwordData)).unwrap();
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error(error || 'Failed to update password');
      throw error;
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    addresses,
    defaultAddress,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    updatePassword: handleUpdatePassword,
  };

};