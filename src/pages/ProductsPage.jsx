import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import ProductList from '../components/ProductList';
import ProductFilter from '../components/ProductFilter';
import ProductSort from '../components/ProductSort';
import Pagination from '../components/Pagination';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { useProducts } from '../hooks/useProducts';
import { PRODUCT_CATEGORIES } from '../constants';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);

  const {
    paginatedProducts,
    loading,
    filters,
    pagination,
    totalPages,
    updateFilters,
    updateSearchQuery,
    updateCategory,
    updateSortOption,
    changePage,
    clearFilters,
  } = useProducts();

  // Sync URL params with filters
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'featured';

    if (category !== filters.category) {
      updateCategory(category);
    }
    if (search !== filters.search) {
      updateSearchQuery(search);
    }
    if (sort !== filters.sort) {
      updateSortOption(sort);
    }
  }, [searchParams]);

  // Update URL when filters change
  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
    
    const params = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params);
  };

  const handleSortChange = (sort) => {
    updateSortOption(sort);
    const params = new URLSearchParams(searchParams);
    params.set('sort', sort);
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    changePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    clearFilters();
    setSearchParams({});
  };

  const currentCategory = PRODUCT_CATEGORIES.find(
    (cat) => cat.id === filters.category
  );

  const breadcrumbItems = [
    { label: 'Products', path: '/products' },
    ...(currentCategory && currentCategory.id !== 'all'
      ? [{ label: currentCategory.name, path: `/products?category=${currentCategory.id}` }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentCategory ? currentCategory.name : 'All Products'}
          </h1>
          <p className="text-gray-600">
            Discover our {currentCategory && currentCategory.id !== 'all' ? currentCategory.name.toLowerCase() : 'amazing products'}
          </p>
        </div>

        {/* Filters & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="w-5 h-5" />}
              className="lg:hidden"
            >
              Filters
            </Button>

            <span className="text-sm text-gray-600">
              {paginatedProducts.length} of {pagination.totalItems} products
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Sort */}
            <ProductSort value={filters.sort} onChange={handleSortChange} />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <ProductFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Products Grid/List */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <ProductGrid products={paginatedProducts} columns={3} />
                ) : (
                  <ProductList products={paginatedProducts} />
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={pagination.currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                title="No products found"
                description="Try adjusting your filters or search terms"
                action={handleResetFilters}
                actionLabel="Clear Filters"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;