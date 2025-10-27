import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import CheckoutLayout from './layouts/CheckoutLayout';

// Pages
import {
  HomePage,
  ProductsPage,
  ProductDetailPage,
  CartPage,
  CheckoutPage,
  OrderSuccessPage,
  WishlistPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ProfilePage,
  OrdersPage,
  OrderDetailPage,
  NotFoundPage,
} from './pages';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

// Redux actions
import { loadCartFromStorage } from './features/cart/cartSlice';
import { loadWishlistFromStorage } from './features/wishlist/wishlistSlice';
import { checkAuthStatus } from './features/auth/authSlice';
import PasswordlessLoginPage from './pages/PasswordlessLoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Initialize app data from localStorage
  useEffect(() => {
    dispatch(loadCartFromStorage());
    dispatch(loadWishlistFromStorage());
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Main Layout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:orderId"
          element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Checkout Layout Routes */}
      <Route element={<CheckoutLayout />}>
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success/:orderId"
          element={
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Auth Layout Routes */}
      <Route element={<AuthLayout />}>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  <Route path="/reset-password" element={<ResetPasswordPage />} />
  <Route path="/passwordless-login" element={<PasswordlessLoginPage />} />
</Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;