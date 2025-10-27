import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { useProducts } from '../hooks/useProducts';
import { formatCurrency } from '../utils/formatters';

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const debouncedQuery = useDebounce(query, 300);
  const { allProducts } = useProducts();

  // Filter products based on search query
  const searchResults = debouncedQuery
    ? allProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;

    // Save to recent searches
    const updated = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));

    // Navigate to products page with search query
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleProductClick = (product) => {
    handleSearch(product.name);
    navigate(`/products/${product.slug}`);
    onClose();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xl animate-slide-up">
        <div className="container-custom py-4">
          {/* Search Input */}
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, brands, categories..."
              className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>

          {/* Search Results */}
          <div className="mt-4 max-h-96 overflow-y-auto">
            {query && searchResults.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-500 font-medium mb-3">Products</p>
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(product.price)}
                    </span>
                  </button>
                ))}
              </div>
            ) : query && searchResults.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No products found for "{query}"</p>
              </div>
            ) : (
              <>
                {/* Trending Searches */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Trending Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Headphones', 'Smart Watch', 'Leather Jacket', 'Yoga Mat'].map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSearch(term)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Recent Searches
                      </p>
                      <button
                        onClick={clearRecentSearches}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(term)}
                          className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                        >
                          <Search className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{term}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;