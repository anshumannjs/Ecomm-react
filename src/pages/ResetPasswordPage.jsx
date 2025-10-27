import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import { validatePassword } from '../utils/validators';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [step, setStep] = useState('loading'); // 'loading', 'valid', 'success', 'invalid'
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  // Verify token on mount
  useEffect(() => {
    if (!token) {
      setStep('invalid');
      return;
    }

    // Simulate token verification API call
    setTimeout(() => {
      // In demo mode, accept any token that starts with 'demo_'
      if (token.startsWith('demo_')) {
        setStep('valid');
      } else {
        setStep('invalid');
      }
    }, 1500);
  }, [token]);

  // Check password strength
  useEffect(() => {
    if (newPassword) {
      const strength = validatePassword(newPassword);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(null);
    }
  }, [newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    const strength = validatePassword(newPassword);
    
    if (!strength.isValid) {
      setErrors({ password: strength.message });
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setLoading(true);

    // Simulate API call to reset password
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }, 1500);
  };

  const getPasswordStrengthColor = () => {
    if (!passwordStrength) return '';
    
    switch (passwordStrength.strength) {
      case 'weak':
        return 'bg-red-500';
      case 'fair':
        return 'bg-orange-500';
      case 'good':
        return 'bg-yellow-500';
      case 'strong':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getPasswordStrengthWidth = () => {
    if (!passwordStrength) return '0%';
    
    switch (passwordStrength.strength) {
      case 'weak':
        return '25%';
      case 'fair':
        return '50%';
      case 'good':
        return '75%';
      case 'strong':
        return '100%';
      default:
        return '0%';
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {step === 'loading' && (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
            )}
            {step === 'valid' && <Lock className="w-8 h-8 text-primary-600" />}
            {step === 'success' && <CheckCircle className="w-8 h-8 text-green-600" />}
            {step === 'invalid' && <AlertCircle className="w-8 h-8 text-red-600" />}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {step === 'loading' && 'Verifying Link...'}
            {step === 'valid' && 'Create New Password'}
            {step === 'success' && 'Password Reset!'}
            {step === 'invalid' && 'Invalid Link'}
          </h1>
          <p className="text-gray-600">
            {step === 'loading' && 'Please wait while we verify your reset link'}
            {step === 'valid' && 'Enter your new password below'}
            {step === 'success' && 'Your password has been successfully reset'}
            {step === 'invalid' && 'This reset link is invalid or has expired'}
          </p>
        </div>

        {/* Loading State */}
        {step === 'loading' && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
          </div>
        )}

        {/* Valid Token - Show Reset Form */}
        {step === 'valid' && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors({});
                }}
                error={errors.password}
                placeholder="Enter new password"
                leftIcon={<Lock className="w-5 h-5" />}
                required
                fullWidth
              />

              {/* Password Strength Indicator */}
              {newPassword && passwordStrength && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Password Strength:</span>
                    <span className="text-xs font-medium capitalize text-gray-700">
                      {passwordStrength.strength}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: getPasswordStrengthWidth() }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use 8+ characters with a mix of letters, numbers & symbols
                  </p>
                </div>
              )}
            </div>

            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors({});
              }}
              error={errors.confirmPassword}
              placeholder="Re-enter new password"
              leftIcon={<Lock className="w-5 h-5" />}
              required
              fullWidth
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-900">
                <strong>Password Requirements:</strong>
              </p>
              <ul className="text-xs text-blue-800 mt-2 space-y-1 list-disc list-inside">
                <li>At least 8 characters long</li>
                <li>Contains uppercase and lowercase letters</li>
                <li>Contains at least one number</li>
                <li>Contains at least one special character</li>
              </ul>
            </div>
          </form>
        )}

        {/* Success State */}
        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Password Reset Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              Your password has been updated. Redirecting to login...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
            </div>
          </div>
        )}

        {/* Invalid/Expired Token */}
        {step === 'invalid' && (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                This password reset link is invalid, has expired, or has already been used. 
                Reset links are valid for 1 hour from the time they are sent.
              </p>
            </div>

            <div className="space-y-3">
              <Link to="/forgot-password">
                <Button variant="primary" size="lg" fullWidth>
                  Request New Reset Link
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  variant="outline"
                  fullWidth
                  leftIcon={<ArrowLeft className="w-5 h-5" />}
                >
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Help Text */}
      {(step === 'valid' || step === 'invalid') && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <Link to="/contact" className="text-primary-600 hover:underline font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;