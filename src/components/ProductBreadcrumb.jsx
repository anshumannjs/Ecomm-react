import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../constants';
import { capitalize } from '../utils/formatters';

const ProductBreadcrumb = ({ product, className = '' }) => {
  if (!product) return null;

  const category = PRODUCT_CATEGORIES.find((cat) => cat.id === product.category);

  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link
        to="/"
        className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
      >
        <Home className="w-4 h-4" />
        Home
      </Link>

      <ChevronRight className="w-4 h-4 text-gray-400" />

      <Link
        to="/products"
        className="text-gray-500 hover:text-gray-700 transition-colors"
      >
        Products
      </Link>

      {category && (
        <>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link
            to={`/products?category=${category.id}`}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            {category.name}
          </Link>
        </>
      )}

      <ChevronRight className="w-4 h-4 text-gray-400" />

      <span className="text-gray-900 font-medium truncate max-w-xs">
        {product.name}
      </span>
    </nav>
  );
};

export default ProductBreadcrumb;