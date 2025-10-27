import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, Lock, ExternalLink } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateForm } from '../utils/validators';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('input'); // 'input', 'sent', 'expired'
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const validationRules = {
      email: { required: true, email: true },
    };

    const validationErrors = validateForm({ email }, validationRules);

    if (validationErrors.email) {
      setError(validationErrors.email);
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call to send reset email
    setTimeout(() => {
      setLoading(false);
      setStep('sent');
    }, 1500);
  };

  const handleResendEmail = async () => {
    setResendLoading(true);

    // Simulate API call
    setTimeout(() => {
      setResendLoading(false);
    }, 1500);
  };

  const handleBackToInput = () => {
    setStep('input');
    setEmail('');
    setError('');
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {step === 'sent' ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <Mail className="w-8 h-8 text-primary-600" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {step === 'input' && 'Forgot Password?'}
            {step === 'sent' && 'Check Your Email'}
            {step === 'expired' && 'Link Expired'}
          </h1>
          <p className="text-gray-600">
            {step === 'input' && "Enter your email and we'll send you a link to reset your password"}
            {step === 'sent' && "We've sent a password reset link to your email"}
            {step === 'expired' && 'This reset link has expired or already been used'}
          </p>
        </div>

        {/* Step 1: Email Input */}
        {step === 'input' && (
          <>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Enter your email"
                leftIcon={<Mail className="w-5 h-5" />}
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
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>

            {/* Demo Notice */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 mb-2">
                <strong>Demo Mode:</strong>
              </p>
              <p className="text-sm text-blue-800">
                Enter any email address. In production, a real email with a reset link will be sent.
              </p>
            </div>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </>
        )}

        {/* Step 2: Email Sent Success */}
        {step === 'sent' && (
          <>
            <div className="space-y-6">
              {/* Success Message */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-green-900 font-medium mb-1">
                      Password reset email sent!
                    </p>
                    <p className="text-sm text-green-800">
                      We've sent an email to <strong>{email}</strong> with a link to reset your password.
                    </p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">What to do next:</h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <span>Check your inbox for an email from ShopHub</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <span>Click the "Reset Password" button in the email</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <span>Create your new password and sign in</span>
                  </li>
                </ol>
              </div>

              {/* Didn't Receive Email */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Didn't receive the email?</p>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Check your spam folder or</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResendEmail}
                    loading={resendLoading}
                  >
                    {resendLoading ? 'Sending...' : 'Resend Email'}
                  </Button>
                </div>
              </div>

              {/* Demo Link */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 mb-3">
                  <strong>Demo Mode:</strong> Click the button below to simulate clicking the email link
                </p>
                <Link to="/reset-password?token=demo_reset_token_12345">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    rightIcon={<ExternalLink className="w-4 h-4" />}
                  >
                    Simulate Email Link
                  </Button>
                </Link>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleBackToInput}
                  leftIcon={<ArrowLeft className="w-5 h-5" />}
                >
                  Try Different Email
                </Button>
                <Link to="/login">
                  <Button variant="ghost" fullWidth>
                    Back to Login
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Link Expired */}
        {step === 'expired' && (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                This password reset link has expired or has already been used. Password reset links are valid for 1 hour.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleBackToInput}
              >
                Request New Reset Link
              </Button>

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
      {step === 'input' && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <Link to="/contact" className="text-primary-600 hover:underline font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      )}

      {/* Security Note */}
      {step === 'sent' && (
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            For security, reset links expire after 1 hour
          </p>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;