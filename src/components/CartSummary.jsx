import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Tag } from 'lucide-react';
import Button from './Button';
import { formatCurrency } from '../utils/formatters';
import { useCart } from '../hooks/useCart';

const CartSummary = ({ 
  showCheckoutButton = true, 
  showCoupon = true,
  className = '' 
}) => {
  const navigate = useNavigate();
  const { subtotal, tax, itemsCount } = useCart();

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

      {/* Coupon Code */}
      {showCoupon && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coupon Code
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter code"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" size="md">
              Apply
            </Button>
          </div>
        </div>
      )}

      {/* Summary Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal ({itemsCount} items)</span>
          <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              formatCurrency(shipping)
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>Tax (9%)</span>
          <span className="font-medium text-gray-900">{formatCurrency(tax)}</span>
        </div>

        {/* Free Shipping Progress */}
        {shipping > 0 && (
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">
                Add {formatCurrency(50 - subtotal)} for FREE shipping
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600 transition-all duration-300"
                style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="pt-4 border-t-2 border-gray-200 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-primary-600">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      {showCheckoutButton && (
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleCheckout}
          leftIcon={<ShoppingBag className="w-5 h-5" />}
        >
          Proceed to Checkout
        </Button>
      )}

      {/* Security Badge */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Secure Checkout
      </div>
    </div>
  );
};

export default CartSummary;