import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchProductBySlug,
  setFilter,
  setSearchQuery,
  setCategory,
  setSortOption,
  setPriceRange,
  setRatingFilter,
  setPage,
  resetFilters,
  selectAllProducts,
  selectCurrentProduct,
  selectProductsLoading,
  selectProductsError,
  selectFilteredProducts,
  selectPaginatedProducts,
  selectTotalPages,
  selectFeaturedProducts,
  selectFilters,
  selectPagination,
} from '../features/products/productsSlice';

export const useProducts = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector(selectAllProducts);
  const currentProduct = useSelector(selectCurrentProduct);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const filteredProducts = useSelector(selectFilteredProducts);
  const paginatedProducts = useSelector(selectPaginatedProducts);
  const totalPages = useSelector(selectTotalPages);
  const featuredProducts = useSelector(selectFeaturedProducts);
  const filters = useSelector(selectFilters);
  const pagination = useSelector(selectPagination);

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  const loadProduct = (slug) => {
    dispatch(fetchProductBySlug(slug));
  };

  const updateFilters = (newFilters) => {
    dispatch(setFilter(newFilters));
  };

  const updateSearchQuery = (query) => {
    dispatch(setSearchQuery(query));
  };

  const updateCategory = (category) => {
    dispatch(setCategory(category));
  };

  const updateSortOption = (sort) => {
    dispatch(setSortOption(sort));
  };

  const updatePriceRange = (range) => {
    dispatch(setPriceRange(range));
  };

  const updateRatingFilter = (rating) => {
    dispatch(setRatingFilter(rating));
  };

  const changePage = (page) => {
    dispatch(setPage(page));
  };

  const clearFilters = () => {
    dispatch(resetFilters());
  };

  return {
    allProducts,
    currentProduct,
    loading,
    error,
    filteredProducts,
    paginatedProducts,
    totalPages,
    featuredProducts,
    filters,
    pagination,
    loadProduct,
    updateFilters,
    updateSearchQuery,
    updateCategory,
    updateSortOption,
    updatePriceRange,
    updateRatingFilter,
    changePage,
    clearFilters,
  };
};