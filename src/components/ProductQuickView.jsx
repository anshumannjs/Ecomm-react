import React from 'react';
import { X, ShoppingCart, Heart } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import Rating from './Rating';
import Badge from './Badge';
import { formatCurrency, calculateDiscount } from '../utils/formatters';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

const ProductQuickView = ({ product, isOpen, onClose }) => {
    const { addToCart, isInCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    if (!product) return null;

    const discount = calculateDiscount(product.originalPrice, product.price);
    const inCart = isInCart(product.id);
    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleToggleWishlist = () => {
        toggleWishlist(product);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
            showCloseButton={false}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                aria-label="Close"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {discount > 0 && (
                            <Badge variant="danger">-{discount}%</Badge>
                        )}
                        {product.isFeatured && (
                            <Badge variant="warning">Featured</Badge>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    {/* Brand & Category */}
                    <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                        {product.brand}
                    </div>

                    {/* Product Name */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {product.name}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        <Rating value={product.rating} size="md" showValue={false} />
                        <span className="text-sm text-gray-600">
                            ({product.reviews} reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-3xl font-bold text-gray-900">
                            {formatCurrency(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                            <span className="text-xl text-gray-500 line-through">
                                {formatCurrency(product.originalPrice)}
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 line-clamp-3">
                        {product.description}
                    </p>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                            <ul className="space-y-1">
                                {product.features.slice(0, 4).map((feature, index) => (
                                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Stock Status */}
                    {product.inStock ? (
                        <p className="text-sm text-green-600 mb-6">
                            ✓ In Stock ({product.stock} available)
                        </p>
                    ) : (
                        <p className="text-sm text-red-600 mb-6">
                            ✗ Out of Stock
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            onClick={handleAddToCart}
                            disabled={!product.inStock || inCart}
                            leftIcon={<ShoppingCart className="w-5 h-5" />}
                        >
                            {!product.inStock ? 'Out of Stock' : inCart ? 'In Cart' : 'Add to Cart'}
                        </Button>

                        <Button
                            variant={inWishlist ? 'danger' : 'outline'}
                            size="lg"
                            onClick={handleToggleWishlist}
                            className="px-4"
                        >
                            <Heart className={inWishlist ? 'fill-current' : ''} />
                        </Button>
                    </div>

                    {/* View Full Details Link */}
                    <a
                        href={`/products/${product.slug}`}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-4 text-center"
                        onClick={onClose}
                    >
                        View Full Details →
                    </a>
                </div>
            </div>
        </Modal >
    );
};

export default ProductQuickView;