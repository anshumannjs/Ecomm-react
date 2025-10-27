import React, { useState } from 'react';
import { CreditCard, Wallet, Banknote, Lock } from 'lucide-react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { PAYMENT_METHODS } from '../constants';
import { validateForm } from '../utils/validators';
import clsx from 'clsx';

const PaymentForm = ({ onSubmit, onBack, loading = false }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substr(0, 5);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === 'cod') {
      onSubmit({ method: 'cod' });
      return;
    }

    if (paymentMethod === 'paypal') {
      onSubmit({ method: 'paypal' });
      return;
    }

    // Validate card form
    const validationRules = {
      cardNumber: {
        required: true,
        custom: (value) => {
          const cleaned = value.replace(/\s/g, '');
          return {
            isValid: cleaned.length === 16,
            message: 'Card number must be 16 digits',
          };
        },
      },
      cardName: { required: true, minLength: 3 },
      expiryDate: {
        required: true,
        pattern: /^\d{2}\/\d{2}$/,
        patternMessage: 'Invalid expiry date format (MM/YY)',
      },
      cvv: {
        required: true,
        custom: (value) => ({
          isValid: /^\d{3,4}$/.test(value),
          message: 'CVV must be 3 or 4 digits',
        }),
      },
    };

    const validationErrors = validateForm(formData, validationRules);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      method: 'card',
      cardDetails: {
        ...formData,
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
      },
    });
  };

  const paymentMethodIcons = {
    card: CreditCard,
    paypal: Wallet,
    cod: Banknote,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Payment Method
        </label>
        <div className="grid sm:grid-cols-3 gap-3">
          {PAYMENT_METHODS.map((method) => {
            const Icon = paymentMethodIcons[method.id];
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className={clsx(
                  'p-4 border-2 rounded-lg transition-all duration-200 flex flex-col items-center gap-2',
                  paymentMethod === method.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{method.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Payment Form */}
      {paymentMethod === 'card' && (
        <>
          <Input
            label="Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            error={errors.cardNumber}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            required
            fullWidth
            leftIcon={<CreditCard className="w-5 h-5" />}
          />

          <Input
            label="Cardholder Name"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            error={errors.cardName}
            placeholder="John Doe"
            required
            fullWidth
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              error={errors.expiryDate}
              placeholder="MM/YY"
              maxLength="5"
              required
              fullWidth
            />

            <Input
              label="CVV"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              error={errors.cvv}
              placeholder="123"
              maxLength="4"
              type="password"
              required
              fullWidth
              leftIcon={<Lock className="w-5 h-5" />}
            />
          </div>

          {/* Accepted Cards */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>We accept:</span>
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6" />
            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6" />
            <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className="h-6" />
          </div>
        </>
      )}

      {/* PayPal */}
      {paymentMethod === 'paypal' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <Wallet className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Pay with PayPal</h4>
          <p className="text-sm text-gray-600 mb-4">
            You will be redirected to PayPal to complete your payment securely.
          </p>
        </div>
      )}

      {/* Cash on Delivery */}
      {paymentMethod === 'cod' && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <Banknote className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Cash on Delivery</h4>
          <p className="text-sm text-gray-600 mb-4">
            Pay with cash when your order is delivered to your doorstep.
          </p>
        </div>
      )}

      {/* Security Note */}
      <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
        <Lock className="w-5 h-5 text-green-600 flex-shrink-0" />
        <p className="text-sm text-gray-700">
          Your payment information is encrypted and secure. We never store your card details.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;