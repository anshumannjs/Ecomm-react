import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import ImageGallery from '../components/ImageGallery';
import Button from '../components/Button';
import Rating from '../components/Rating';
import Badge from '../components/Badge';
import ProductBreadcrumb from '../components/ProductBreadcrumb';
import ProductSpecifications from '../components/ProductSpecifications';
import ProductReviews from '../components/ProductReviews';
import ProductTags from '../components/ProductTags';
import RelatedProducts from '../components/RelatedProducts';
import Spinner from '../components/Spinner';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { formatCurrency, calculateDiscount } from '../utils/formatters';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { currentProduct, loading, loadProduct } = useProducts();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const inCart = isInCart(currentProduct?.id);
  const inWishlist = isInWishlist(currentProduct?.id);

  // Call hooks before any conditional returns
  // const inCart = currentProduct ? isInCart(currentProduct?.id) : false;
  // const inWishlist = currentProduct ? isInWishlist(currentProduct?.id) : false;

  useEffect(() => {
    loadProduct(slug);
  }, [slug]);

  useEffect(() => {
    if (currentProduct) {
      document.title = `${currentProduct.name} - ShopHub`;
    }
  }, [currentProduct]);

  // Early returns AFTER all hooks are called
  if (loading || !currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const discount = calculateDiscount(currentProduct.originalPrice, currentProduct.price);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(currentProduct);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentProduct.name,
          text: currentProduct.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    }
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: `Reviews (${currentProduct.reviews})` },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <ProductBreadcrumb product={currentProduct} className="mb-6" />

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Images */}
          <div>
            <ImageGallery images={currentProduct.images} alt={currentProduct.name} />
          </div>

          {/* Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8 h-fit">
            {/* Brand & Category */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                {currentProduct.brand}
              </span>
              {currentProduct.isFeatured && (
                <Badge variant="warning" size="sm">
                  Featured
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="danger" size="sm">
                  -{discount}% OFF
                </Badge>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {currentProduct.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <Rating value={currentProduct.rating} size="lg" showValue={false} />
              <span className="text-lg font-medium text-gray-700">
                {currentProduct.rating} ({currentProduct.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-primary-600">
                {formatCurrency(currentProduct.price)}
              </span>
              {currentProduct.originalPrice > currentProduct.price && (
                <span className="text-2xl text-gray-500 line-through">
                  {formatCurrency(currentProduct.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {currentProduct.description}
            </p>

            {/* Stock Status */}
            <div className="mb-6">
              {currentProduct.inStock ? (
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  <span className="font-medium">In Stock ({currentProduct.stock} available)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            {currentProduct.inStock && (
              <div className="flex items-center gap-4 mb-6">
                <label className="font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(currentProduct.stock, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={!currentProduct.inStock || inCart}
                leftIcon={<ShoppingCart className="w-5 h-5" />}
              >
                {!currentProduct.inStock ? 'Out of Stock' : inCart ? 'Added to Cart' : 'Add to Cart'}
              </Button>

              <Button
                variant={inWishlist ? 'danger' : 'outline'}
                size="lg"
                onClick={() => toggleWishlist(currentProduct)}
                className="px-4"
              >
                <Heart className={inWishlist ? 'fill-current' : ''} />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleShare}
                className="px-4"
              >
                <Share2 />
              </Button>
            </div>

            {currentProduct.inStock && (
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            )}

            {/* Features */}
            <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Truck className="w-5 h-5 text-primary-600" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Shield className="w-5 h-5 text-primary-600" />
                <span>1 year warranty included</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <RotateCcw className="w-5 h-5 text-primary-600" />
                <span>30-day easy returns</span>
              </div>
            </div>

            {/* Tags */}
            {currentProduct.tags && currentProduct.tags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <ProductTags tags={currentProduct.tags} />
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8 mb-12">
          {/* Tab Headers */}
          <div className="flex items-center gap-6 mb-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {currentProduct.description}
                </p>
                
                {currentProduct.features && currentProduct.features.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features:</h3>
                    <ul className="space-y-2">
                      {currentProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <ProductSpecifications product={currentProduct} />
            )}

            {activeTab === 'reviews' && (
              <ProductReviews
                reviews={[]}
                productRating={currentProduct.rating}
                totalReviews={currentProduct.reviews}
              />
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts currentProduct={currentProduct} />
      </div>
    </div>
  );
};

export default ProductDetailPage;