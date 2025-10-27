import React, { useEffect, useState } from 'react';
import { Mail, Phone, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import { validateForm } from '../utils/validators';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PasswordlessAuth = ({ onSuccess, onCancel }) => {
    const navigate = useNavigate();
    const location = useLocation();
  const [step, setStep] = useState('choose'); // 'choose', 'input', 'verify', 'success'
  const [method, setMethod] = useState(null); // 'email' or 'phone'
  const [contactValue, setContactValue] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const { login, isAuthenticated, loading, error } = useAuth();

  // Redirect if already authenticated
    useEffect(() => {
      if (isAuthenticated) {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    }, [isAuthenticated, navigate, location]);

  // Handle method selection
  const handleMethodSelect = (selectedMethod) => {
    setMethod(selectedMethod);
    setStep('input');
  };

  // Handle contact submission (email or phone)
  const handleSubmitContact = async (e) => {
    e.preventDefault();

    // Validate
    const validationRules = {
      contact: {
        required: true,
        ...(method === 'email' ? { email: true } : { phone: true }),
      },
    };

    const validationErrors = validateForm({ contact: contactValue }, validationRules);

    if (validationErrors.contact) {
      setErrors({ contact: validationErrors.contact });
      return;
    }

    // setLoading(true);

    // Simulate API call to send verification code
    // setTimeout(() => {
    // //   setLoading(false);
    //   setStep('verify');
    //   setResendTimer(60); // Start 60 second countdown
      
    //   // Start countdown
    //   const interval = setInterval(() => {
    //     setResendTimer((prev) => {
    //       if (prev <= 1) {
    //         clearInterval(interval);
    //         return 0;
    //       }
    //       return prev - 1;
    //     });
    //   }, 1000);
    // }, 1500);
    try {
      await login(method === 'email' ? { email: contactValue, method: 'passwordless', step: "send_code" } : { phone: contactValue, method: 'passwordless', step: "send_code" });
      setStep('verify');
      setResendTimer(60); // Start 60 second countdown
      
      // Start countdown
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      // Error handled by hook
    }
  };

  // Handle verification code input
  const handleCodeChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle backspace in verification code
  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle verification code submission
  const handleVerifyCode = async (e) => {
    e.preventDefault();

    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      setErrors({ code: 'Please enter the complete 6-digit code' });
      return;
    }

    // setLoading(true);

    // Simulate API call to verify code
    // setTimeout(() => {
    //   setLoading(false);
      
    //   // In real app, check if code is valid
    //   if (code === '123456') {
    //     setStep('success');
        
    //     // Call success callback after showing success message
    //     setTimeout(() => {
    //       onSuccess?.({
    //         method,
    //         contact: contactValue,
    //         user: {
    //           id: 1,
    //           email: method === 'email' ? contactValue : null,
    //           phone: method === 'phone' ? contactValue : null,
    //           firstName: 'Demo',
    //           lastName: 'User',
    //         },
    //       });
    //     }, 2000);
    //   } else {
    //     setErrors({ code: 'Invalid verification code. Please try again.' });
    //   }
    // }, 1500);
    try {
      await login(method === 'email' ? { email: contactValue, method: 'passwordless', step: "verify_code", otp: code } : { phone: contactValue, method: 'passwordless', step: "verify_code", otp: code });
      setStep('success');
      
      // Call success callback after showing success message
      // setTimeout(() => {
      //   onSuccess?.({
      //     method,
      //     contact: contactValue,
      //     user: {
      //       id: 1,
      //       email: method === 'email' ? contactValue : null,
      //       phone: method === 'phone' ? contactValue : null,
      //       firstName: 'Demo',
      //       lastName: 'User',
      //     },
      //   });
      // }, 2000);
    } catch (error) {
      // Error handled by hook
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    if (resendTimer > 0) return;

    // setLoading(true);

    // Simulate API call
    // setTimeout(() => {
    //   setLoading(false);
    //   setResendTimer(60);
      
    //   // Restart countdown
    //   const interval = setInterval(() => {
    //     setResendTimer((prev) => {
    //       if (prev <= 1) {
    //         clearInterval(interval);
    //         return 0;
    //       }
    //       return prev - 1;
    //     });
    //   }, 1000);
    // }, 1000);
    try {
      await login(method === 'email' ? { email: contactValue, method: 'passwordless', step: "send_code" } : { phone: contactValue, method: 'passwordless', step: "send_code" });
      setResendTimer(60);
      
      // Restart countdown
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      // Error handled by hook
    }
  };

  // Reset to choose method
  const handleBack = () => {
    if (step === 'input') {
      setStep('choose');
      setMethod(null);
      setContactValue('');
    } else if (step === 'verify') {
      setStep('input');
      setVerificationCode(['', '', '', '', '', '']);
    }
    setErrors({});
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {step === 'choose' && 'Sign In Without Password'}
            {step === 'input' && 'Enter Your Details'}
            {step === 'verify' && 'Verify Your Identity'}
            {step === 'success' && 'Success!'}
          </h1>
          <p className="text-gray-600">
            {step === 'choose' && 'Choose how you want to sign in'}
            {step === 'input' && `We'll send you a verification code`}
            {step === 'verify' && `Enter the code we sent to ${contactValue}`}
            {step === 'success' && 'You have been successfully authenticated'}
          </p>
        </div>

        {/* Step 1: Choose Method */}
        {step === 'choose' && (
          <div className="space-y-4">
            <button
              onClick={() => handleMethodSelect('email')}
              className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900 mb-1">Sign in with Email</h3>
                  <p className="text-sm text-gray-600">We'll send a code to your email</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </div>
            </button>

            <button
              onClick={() => handleMethodSelect('phone')}
              className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900 mb-1">Sign in with Phone</h3>
                  <p className="text-sm text-gray-600">We'll send a code via SMS</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </div>
            </button>

            {onCancel && (
              <button
                onClick={onCancel}
                className="w-full mt-4 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Use password instead
              </button>
            )}
          </div>
        )}

        {/* Step 2: Input Email or Phone */}
        {step === 'input' && (
          <form onSubmit={handleSubmitContact} className="space-y-6">
            <Input
              label={method === 'email' ? 'Email Address' : 'Phone Number'}
              type={method === 'email' ? 'email' : 'tel'}
              value={contactValue}
              onChange={(e) => {
                setContactValue(e.target.value);
                setErrors({});
              }}
              error={errors.contact}
              placeholder={
                method === 'email' ? 'you@example.com' : '+1 (234) 567-8900'
              }
              leftIcon={method === 'email' ? <Mail className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
              required
              fullWidth
            />

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                leftIcon={<ArrowLeft className="w-5 h-5" />}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                {loading ? 'Sending...' : 'Send Code'}
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Demo Mode:</strong> Use any email or phone number. The verification code is <strong>123456</strong>
              </p>
            </div>
          </form>
        )}

        {/* Step 3: Verify Code */}
        {step === 'verify' && (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Enter 6-digit code
              </label>
              <div className="flex justify-center gap-2">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(index, e)}
                    className={clsx(
                      'w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg',
                      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                      'transition-all duration-200',
                      errors.code ? 'border-red-500' : 'border-gray-300'
                    )}
                  />
                ))}
              </div>
              {errors.code && (
                <p className="text-sm text-red-500 text-center mt-2">{errors.code}</p>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive the code?
              </p>
              {resendTimer > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend code in {resendTimer}s
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  disabled={loading}
                >
                  Resend Code
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                leftIcon={<ArrowLeft className="w-5 h-5" />}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
              >
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Demo Code:</strong> 123456
              </p>
            </div>
          </form>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Verification Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              You're now signed in. Redirecting...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
            </div>
          </div>
        )}
      </div>

      {/* Help Text */}
      {step !== 'success' && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-primary-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordlessAuth;