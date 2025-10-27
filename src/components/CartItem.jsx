import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { useCart } from '../hooks/useCart';

const CartItem = ({ item, compact = false }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= item.stock) {
      updateQuantity(item.id, value);
    }
  };

  const itemTotal = item.price * item.quantity;

  if (compact) {
    return (
      <div className="flex items-center gap-3 py-2">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
        </div>
        <span className="text-sm font-semibold text-gray-900">
          {formatCurrency(itemTotal)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200">
      {/* Product Image */}
      <Link to={`/products/${item.slug}`} className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg hover:opacity-80 transition-opacity"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Info */}
        <div className="flex-1">
          <Link
            to={`/products/${item.slug}`}
            className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
          >
            {item.name}
          </Link>

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(item.price)}
            </span>
            <span className="text-sm text-gray-500">each</span>
          </div>

          {/* Stock Status */}
          {item.stock < 10 && (
            <p className="text-xs text-orange-600 mt-1">
              Only {item.stock} left in stock
            </p>
          )}
        </div>

        {/* Quantity & Actions */}
        <div className="flex flex-col sm:items-end gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => decrementQuantity(item.id)}
              disabled={item.quantity <= 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>

            <input
              type="number"
              value={item.quantity}
              onChange={handleQuantityChange}
              min="1"
              max={item.stock}
              className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />

            <button
              onClick={() => incrementQuantity(item.id)}
              disabled={item.quantity >= item.stock}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Total & Remove */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(itemTotal)}
            </span>

            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;