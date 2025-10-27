import React from 'react';
import { X, Check } from 'lucide-react';
import clsx from 'clsx';
import Button from './Button';
import Rating from './Rating';
import { formatCurrency } from '../utils/formatters';

const ProductCompare = ({ products = [], onRemove, onClose }) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <p className="text-gray-500">No products to compare</p>
      </div>
    );
  }

  const features = [
    { key: 'price', label: 'Price', format: (val) => formatCurrency(val) },
    { key: 'rating', label: 'Rating', format: (val) => `${val} / 5` },
    { key: 'reviews', label: 'Reviews', format: (val) => val },
    { key: 'brand', label: 'Brand', format: (val) => val },
    { key: 'stock', label: 'In Stock', format: (val) => val },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-xl font-bold text-gray-900">Compare Products</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-4 text-left font-medium text-gray-900 w-40">Feature</th>
              {products.map((product) => (
                <th key={product.id} className="p-4 text-center">
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                    />
                    <button
                      onClick={() => onRemove(product.id)}
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                    {product.name}
                  </h4>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={feature.key}
                className={clsx(
                  'border-b border-gray-200',
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                )}
              >
                <td className="p-4 font-medium text-gray-700">{feature.label}</td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 text-center text-gray-900">
                    {feature.format(product[feature.key])}
                  </td>
                ))}
              </tr>
            ))}
            
            {/* Add to Cart Row */}
            <tr>
              <td className="p-4 font-medium text-gray-700">Action</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <Button
                    size="sm"
                    fullWidth
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCompare;