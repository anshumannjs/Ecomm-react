import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import clsx from 'clsx';
import Rating from './Rating';
import Badge from './Badge';
import { formatCurrency, calculateDiscount } from '../utils/formatters';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

const ProductCard = ({ product, className = '' }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const discount = calculateDiscount(product.originalPrice, product.price);
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link
      to={`/products/${product.slug}`}
      className={clsx(
        'group block bg-white rounded-xl border border-gray-200 overflow-hidden',
        'hover:shadow-lg transition-all duration-300',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <Badge variant="danger" size="sm">
              -{discount}%
            </Badge>
          )}
          {product.isFeatured && (
            <Badge variant="warning" size="sm">
              Featured
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="default" size="sm">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleToggleWishlist}
            className={clsx(
              'p-2 rounded-full shadow-lg backdrop-blur-sm transition-colors',
              inWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-700 hover:bg-red-50'
            )}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={clsx('w-5 h-5', inWishlist && 'fill-current')} />
          </button>
          <Link
            to={`/products/${product.slug}`}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5 text-gray-700" />
          </Link>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || inCart}
            className={clsx(
              'w-full py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2',
              product.inStock && !inCart
                ? 'bg-white text-gray-900 hover:bg-gray-100'
                : 'bg-gray-400 text-white cursor-not-allowed'
            )}
          >
            <ShoppingCart className="w-5 h-5" />
            {!product.inStock ? 'Out of Stock' : inCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category & Brand */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.brand}
          </span>
          {product.rating > 0 && (
            <div className="flex items-center gap-1">
              <Rating value={product.rating} size="sm" showValue={false} />
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Info */}
        {product.inStock && product.stock < 10 && (
          <p className="text-xs text-orange-600 mt-2">
            Only {product.stock} left in stock
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;