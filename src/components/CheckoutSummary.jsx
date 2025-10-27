import React from 'react';
import { Package, Truck, MapPin, CreditCard } from 'lucide-react';
import Card from './Card';
import { formatCurrency } from '../utils/formatters';

const CheckoutSummary = ({ 
  items = [], 
  shippingAddress, 
  shippingMethod, 
  paymentMethod,
  subtotal,
  shipping,
  tax,
  total,
  className = '' 
}) => {
  return (
    <Card className={className}>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order Review</h3>

      {/* Items */}
      {items.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Items ({items.length})
          </h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-medium text-gray-900 truncate">{item.name}</h5>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shipping Address */}
      {shippingAddress && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Shipping To
          </h4>
          <p className="text-sm text-gray-600">
            {shippingAddress.fullName}<br />
            {shippingAddress.street}
            {shippingAddress.apartment && `, ${shippingAddress.apartment}`}<br />
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
          </p>
        </div>
      )}

      {/* Shipping Method */}
      {shippingMethod && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Shipping Method
          </h4>
          <p className="text-sm text-gray-600">
            {shippingMethod.name} - {shippingMethod.days}
          </p>
        </div>
      )}

      {/* Payment Method */}
      {paymentMethod && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Method
          </h4>
          <p className="text-sm text-gray-600 capitalize">
            {paymentMethod.replace('-', ' ')}
          </p>
        </div>
      )}

      {/* Price Summary */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex items-center justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">
            {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-gray-600">
          <span>Tax</span>
          <span className="font-medium text-gray-900">{formatCurrency(tax)}</span>
        </div>
        
        <div className="pt-3 border-t-2 border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-primary-600">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CheckoutSummary;