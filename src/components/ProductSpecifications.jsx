import React from 'react';

const ProductSpecifications = ({ product }) => {
  if (!product) return null;

  const specifications = [
    { label: 'Brand', value: product.brand },
    { label: 'Category', value: product.category },
    { label: 'Stock Status', value: product.inStock ? 'In Stock' : 'Out of Stock' },
    { label: 'Available Quantity', value: product.stock },
    { label: 'Rating', value: `${product.rating} out of 5` },
    { label: 'Reviews', value: product.reviews },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Specifications</h3>
      
      <div className="space-y-4">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
          >
            <span className="text-gray-600 font-medium">{spec.label}</span>
            <span className="text-gray-900">{spec.value}</span>
          </div>
        ))}
      </div>

      {product.features && product.features.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-700 flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductSpecifications;