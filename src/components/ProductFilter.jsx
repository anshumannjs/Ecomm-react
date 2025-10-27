import React, { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import clsx from 'clsx';
import Button from './Button';
import Checkbox from './Checkbox';
import { PRODUCT_CATEGORIES } from '../constants';
import { formatCurrency } from '../utils/formatters';

const ProductFilter = ({
  filters,
  onFilterChange,
  onReset,
  className = '',
}) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 1000]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (categoryId) => {
    onFilterChange({ category: categoryId });
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = Number(value);
    setPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    onFilterChange({ priceRange });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ rating: filters.rating === rating ? 0 : rating });
  };

  const toggleMobileFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          fullWidth
          onClick={toggleMobileFilter}
          leftIcon={<SlidersHorizontal className="w-5 h-5" />}
        >
          Filters
        </Button>
      </div>

      {/* Filter Panel */}
      <div
        className={clsx(
          'lg:block',
          isOpen ? 'block' : 'hidden',
          className
        )}
      >
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </h3>
            <button
              onClick={onReset}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Category</h4>
            <div className="space-y-2">
              {PRODUCT_CATEGORIES.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Price Range</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Min"
                  min="0"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Max"
                  min="0"
                />
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                  className="w-full accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatCurrency(0)}</span>
                  <span>{formatCurrency(1000)}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={applyPriceFilter}
              >
                Apply Price Filter
              </Button>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Minimum Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.rating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={clsx(
                          'text-lg',
                          index < rating ? 'text-yellow-400' : 'text-gray-300'
                        )}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">& up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Availability</h4>
            <div className="space-y-2">
              <Checkbox label="In Stock Only" />
              <Checkbox label="Include Out of Stock" />
            </div>
          </div>

          {/* Brand Filter (Optional) */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Brand</h4>
            <div className="space-y-2">
              <Checkbox label="AudioPro" />
              <Checkbox label="TechFit" />
              <Checkbox label="UrbanStyle" />
              <Checkbox label="EcoWear" />
              <Checkbox label="ChefMaster" />
            </div>
          </div>

          {/* Mobile Close Button */}
          <div className="lg:hidden pt-4 border-t border-gray-200">
            <Button
              variant="secondary"
              fullWidth
              onClick={toggleMobileFilter}
              leftIcon={<X className="w-5 h-5" />}
            >
              Close Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileFilter}
        />
      )}
    </>
  );
};

export default ProductFilter;