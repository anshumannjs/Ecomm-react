import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsAPI } from '../../services/apiService';
import { mockProducts, mockReviews } from '../../services/mockData';

// Toggle between API and mock data
// const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || true;
const USE_MOCK_DATA = false

// Async Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      if (USE_MOCK_DATA) {
        // Use mock data
        await new Promise((resolve) => setTimeout(resolve, 800));
        return mockProducts;
      } else {
        // Use real API
        const data = await productsAPI.getAll(params);
        return data.products || data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  'products/fetchProductBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      if (USE_MOCK_DATA) {
        // Use mock data
        await new Promise((resolve) => setTimeout(resolve, 500));
        const product = mockProducts.find((p) => p.slug === slug);
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      } else {
        // Use real API
        const data = await productsAPI.getBySlug(slug);
        return data.product || data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchProductReviews = createAsyncThunk(
  'products/fetchProductReviews',
  async (productId, { rejectWithValue }) => {
    try {
      if (USE_MOCK_DATA) {
        // Use mock data
        await new Promise((resolve) => setTimeout(resolve, 300));
        return mockReviews.filter((review) => review.productId === productId);
      } else {
        // Use real API
        const data = await productsAPI.getReviews(productId);
        return data.reviews || data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query, { rejectWithValue }) => {
    try {
      if (USE_MOCK_DATA) {
        // Use mock data
        await new Promise((resolve) => setTimeout(resolve, 500));
        const searchLower = query.toLowerCase();
        return mockProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.brand.toLowerCase().includes(searchLower)
        );
      } else {
        // Use real API
        const data = await productsAPI.search(query);
        return data.products || data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  items: [],
  currentProduct: null,
  reviews: [],
  loading: false,
  error: null,
  filters: {
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
    search: '',
    sort: 'featured',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 16,
    totalItems: 0,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1;
    },
    setSearchQuery: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.currentPage = 1;
    },
    setCategory: (state, action) => {
      state.filters.category = action.payload;
      state.pagination.currentPage = 1;
    },
    setSortOption: (state, action) => {
      state.filters.sort = action.payload;
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
      state.pagination.currentPage = 1;
    },
    setRatingFilter: (state, action) => {
      state.filters.rating = action.payload;
      state.pagination.currentPage = 1;
    },
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data.products || action.payload;
        state.pagination=action.payload.pagination || state.pagination;
        state.pagination.totalItems = action.payload.totalCount || state.items.length;
        state.pagination.itemsPerPage=action.payload.pagination.limit || state.pagination.itemsPerPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Product by Slug
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload.data.product || action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Product Reviews
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.pagination.totalItems = action.payload.length;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilter,
  setSearchQuery,
  setCategory,
  setSortOption,
  setPriceRange,
  setRatingFilter,
  setPage,
  resetFilters,
  clearCurrentProduct,
} = productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectProductReviews = (state) => state.products.reviews;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectFilters = (state) => state.products.filters;
export const selectPagination = (state) => state.products.pagination;

// Complex selector: Get filtered and sorted products
export const selectFilteredProducts = (state) => {
  const { items, filters } = state.products;
  // let filtered = Array.isArray(items) ? [...items] : Array.isArray(items?.products) ? [...items.products] : [];
  let filtered = Array.isArray(items) ? [...items] : [];

  // Filter by category
  if (filters.category !== 'all') {
    filtered = filtered.filter((product) => product.category === filters.category);
  }

  // Filter by search query
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
    );
  }

  // Filter by price range
  filtered = filtered.filter(
    (product) =>
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
  );

  // Filter by rating
  if (filters.rating > 0) {
    filtered = filtered.filter((product) => product.rating >= filters.rating);
  }

  // Sort products
  switch (filters.sort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  return filtered;
};

// Get paginated products
export const selectPaginatedProducts = (state) => {
  const filtered = selectFilteredProducts(state);
  const { currentPage, itemsPerPage } = state.products.pagination;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  console.log({filtered, currentPage, itemsPerPage, startIndex, endIndex});
  return filtered.slice(startIndex, endIndex);
};

// Get total pages
export const selectTotalPages = (state) => {
  const filtered = selectFilteredProducts(state);
  const { itemsPerPage } = state.products.pagination;
  return Math.ceil(filtered.length / itemsPerPage);
};

// Get featured products
export const selectFeaturedProducts = (state) => {
  console.log({state});
  return Array.isArray(state?.products?.items) ? state.products.items.filter((product) => product?.isFeatured) : [];
};

export default productsSlice.reducer;