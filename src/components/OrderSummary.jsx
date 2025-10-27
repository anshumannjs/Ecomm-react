import React from 'react';
import { Package, Truck, CreditCard, MapPin } from 'lucide-react';
import Card from './Card';
import { formatCurrency, formatDate } from '../utils/formatters';

const OrderSummary = ({ order, showItems = true, className = '' }) => {
  if (!order) return null;

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <Card className={className}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Order {order.id}</h3>
          <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt, 'long')}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      {/* Order Items */}
      {showItems && order.items && order.items.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Items ({order.items.length})
          </h4>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 line-clamp-1">{item.name}</h5>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shipping Address */}
      {order.shippingAddress && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Shipping Address
          </h4>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
            <p className="text-sm text-gray-600 mt-1">
              {order.shippingAddress.street}
              {order.shippingAddress.apartment && `, ${order.shippingAddress.apartment}`}
            </p>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p className="text-sm text-gray-600">{order.shippingAddress.country}</p>
          </div>
        </div>
      )}

      {/* Payment Method */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Method
        </h4>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-900 capitalize">{order.paymentMethod.replace('-', ' ')}</p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">{formatCurrency(order.subtotal)}</span>
        </div>
        
        <div className="flex items-center justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">{formatCurrency(order.shipping)}</span>
        </div>
        
        <div className="flex items-center justify-between text-gray-600">
          <span>Tax</span>
          <span className="font-medium text-gray-900">{formatCurrency(order.tax)}</span>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-primary-600">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderSummary;