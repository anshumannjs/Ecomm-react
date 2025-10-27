import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import clsx from 'clsx';
import Rating from './Rating';
import Badge from './Badge';
import Button from './Button';
import { formatCurrency, calculateDiscount, truncateText } from '../utils/formatters';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

const ProductList = ({ products = [], className = '' }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (products.length === 0) {
    return null;
  }

  return (
    <div className={clsx('space-y-4', className)}>
      {products.map((product) => {
        const discount = calculateDiscount(product.originalPrice, product.price);
        const inCart = isInCart(product.id);
        const inWishlist = isInWishlist(product.id);

        return (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex gap-4">
              {/* Product Image */}
              <Link
                to={`/products/${product.slug}`}
                className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg overflow-hidden"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </Link>

              {/* Product Info */}
              <div className="flex-1 flex flex-col">
                {/* Brand & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {product.brand}
                  </span>
                  {discount > 0 && (
                    <Badge variant="danger" size="sm">
                      -{discount}%
                    </Badge>
                  )}
                </div>

                {/* Product Name */}
                <Link
                  to={`/products/${product.slug}`}
                  className="font-semibold text-gray-900 hover:text-primary-600 mb-2 transition-colors"
                >
                  {product.name}
                </Link>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3">
                  {truncateText(product.description, 120)}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <Rating value={product.rating} size="sm" showValue={false} />
                  <span className="text-xs text-gray-500">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={clsx(
                        'p-2 rounded-lg transition-colors',
                        inWishlist
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      )}
                      aria-label="Add to wishlist"
                    >
                      <Heart className={clsx('w-5 h-5', inWishlist && 'fill-current')} />
                    </button>

                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock || inCart}
                      leftIcon={<ShoppingCart className="w-4 h-4" />}
                    >
                      {!product.inStock ? 'Out of Stock' : inCart ? 'In Cart' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;