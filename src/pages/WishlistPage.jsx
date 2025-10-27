import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import Rating from '../components/Rating';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { formatCurrency, calculateDiscount } from '../utils/formatters';

const WishlistPage = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      images: [item.image],
      stock: 100, // Mock stock
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container-custom">
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Save your favorite items to your wishlist and shop them anytime!"
            action={() => window.location.href = '/products'}
            actionLabel="Browse Products"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>

          {items.length > 0 && (
            <Button
              variant="ghost"
              onClick={clearWishlist}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear Wishlist
            </Button>
          )}
        </div>

        {/* Wishlist Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => {
            const discount = calculateDiscount(item.originalPrice, item.price);

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Image */}
                <Link to={`/products/${item.slug}`} className="relative block aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {discount > 0 && (
                      <Badge variant="danger" size="sm">
                        -{discount}%
                      </Badge>
                    )}
                    {!item.inStock && (
                      <Badge variant="default" size="sm">
                        Out of Stock
                      </Badge>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-red-50 text-red-600 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </Link>

                {/* Info */}
                <div className="p-4">
                  <Link
                    to={`/products/${item.slug}`}
                    className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 mb-2"
                  >
                    {item.name}
                  </Link>

                  {/* Rating */}
                  {item.rating > 0 && (
                    <div className="mb-3">
                      <Rating value={item.rating} size="sm" showValue={false} />
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(item.price)}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatCurrency(item.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                    leftIcon={<ShoppingCart className="w-4 h-4" />}
                  >
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Shopping Link */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            Continue Shopping
            <Heart className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;