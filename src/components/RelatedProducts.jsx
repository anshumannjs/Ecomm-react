import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../features/products/productsSlice';
import ProductCard from './ProductCard';
import Spinner from './Spinner';

const RelatedProducts = ({ currentProduct, limit = 4 }) => {
  const allProducts = useSelector(selectAllProducts);

  if (!currentProduct) {
    return null;
  }

  // Find related products from the same category
  const relatedProducts = allProducts
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        product.category === currentProduct.category
    )
    .slice(0, limit);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Related Products
        </h2>
        <p className="text-gray-600">You might also be interested in these products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;