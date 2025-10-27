import apiClient from './api';

// ==================== PRODUCTS ====================

export const productsAPI = {
  // Get all products with filters
  getAll: async (params = {}) => {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  // Get single product by ID or slug
  getById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  getBySlug: async (slug) => {
    const response = await apiClient.get(`/products/slug/${slug}`);
    return response.data;
  },

  // Get products by category
  getByCategory: async (category) => {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  },

  // Search products
  search: async (query) => {
    const response = await apiClient.get('/products/search', {
      params: { q: query },
    });
    return response.data;
  },

  // Get featured products
  getFeatured: async () => {
    const response = await apiClient.get('/products/featured');
    return response.data;
  },

  // Get product reviews
  getReviews: async (productId) => {
    const response = await apiClient.get(`/products/${productId}/reviews`);
    return response.data;
  },
};

// ==================== AUTH ====================

export const authAPI = {
  //Get Current Auth Status
  me: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
  
  // Login
  loginLocal: async (credentials) => {
    const response = await apiClient.post('/auth/login/local', credentials);
    return response.data;
  },

  loginPasswordlessSendCode: async (credentials) => {
    const response = await apiClient.post(`/auth/login/${credentials.email?"email":"phone"}`, credentials);
    return response.data;
  },

  loginPasswordlessVerifyCode: async (credentials) => {
    const response = await apiClient.post(`/auth/login/${credentials.email?"email":"phone"}/verifyOtp`, credentials);
    return response.data;
  },

  loginGoogle: async () => {
    const response = await apiClient.get('/auth/google');
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // Logout
  logout: async () => {
    console.log('API logout called');
    const response = await apiClient.get('/auth/logout');
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Update profile
  updateProfile: async (userData) => {
    const response = await apiClient.put('/auth/profile', userData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await apiClient.put('/auth/changePassword', passwordData);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, password) => {
    const response = await apiClient.post('/auth/reset-password', {
      token,
      password,
    });
    return response.data;
  },
};

// ==================== ORDERS ====================

export const ordersAPI = {
  // Get all orders for user
  getAll: async () => {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  // Get single order
  getById: async (orderId) => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  },

  // Create new order
  create: async (orderData) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },

  // Cancel order
  cancel: async (orderId) => {
    const response = await apiClient.put(`/orders/${orderId}/cancel`);
    return response.data;
  },

  // Update order status (admin)
  updateStatus: async (orderId, status) => {
    const response = await apiClient.put(`/orders/${orderId}/status`, { status });
    return response.data;
  },
};

// ==================== CART ====================

export const cartAPI = {
  // Get cart
  get: async () => {
    const response = await apiClient.get('/cart');
    return response.data;
  },

  // Add item to cart
  addItem: async (productId, quantity = 1) => {
    const response = await apiClient.post('/cart/items', { productId, quantity });
    return response.data;
  },

  // Update cart item
  updateItem: async (itemId, quantity) => {
    const response = await apiClient.put(`/cart/items/${itemId}`, { quantity });
    return response.data;
  },

  // Remove item from cart
  removeItem: async (itemId) => {
    const response = await apiClient.delete(`/cart/items/${itemId}`);
    return response.data;
  },

  // Clear cart
  clear: async () => {
    const response = await apiClient.delete('/cart');
    return response.data;
  },
};

// ==================== WISHLIST ====================

export const wishlistAPI = {
  // Get wishlist
  get: async () => {
    const response = await apiClient.get('/wishlist');
    return response.data;
  },

  // Add to wishlist
  addItem: async (productId) => {
    const response = await apiClient.post('/wishlist/items', { productId });
    return response.data;
  },

  // Remove from wishlist
  removeItem: async (productId) => {
    const response = await apiClient.delete(`/wishlist/items/${productId}`);
    return response.data;
  },

  // Clear wishlist
  clear: async () => {
    const response = await apiClient.delete('/wishlist');
    return response.data;
  },
};

// ==================== CATEGORIES ====================

export const categoriesAPI = {
  // Get all categories
  getAll: async () => {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  // Get single category
  getById: async (id) => {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },
};

// ==================== ADDRESSES ====================

export const addressesAPI = {
  // Get all addresses
  getAll: async () => {
    const response = await apiClient.get('/addresses');
    return response.data;
  },

  // Get single address
  getById: async (id) => {
    const response = await apiClient.get(`/addresses/${id}`);
    return response.data;
  },

  // Create address
  create: async (addressData) => {
    const response = await apiClient.post('/addresses', addressData);
    return response.data;
  },

  // Update address
  update: async (id, addressData) => {
    const response = await apiClient.put(`/addresses/${id}`, addressData);
    return response.data;
  },

  // Delete address
  delete: async (id) => {
    const response = await apiClient.delete(`/addresses/${id}`);
    return response.data;
  },

  // Set default address
  setDefault: async (id) => {
    const response = await apiClient.put(`/addresses/${id}/default`);
    return response.data;
  },
};

// ==================== REVIEWS ====================

export const reviewsAPI = {
  // Create review
  create: async (productId, reviewData) => {
    const response = await apiClient.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
  },

  // Update review
  update: async (reviewId, reviewData) => {
    const response = await apiClient.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  // Delete review
  delete: async (reviewId) => {
    const response = await apiClient.delete(`/reviews/${reviewId}`);
    return response.data;
  },

  // Mark review as helpful
  markHelpful: async (reviewId) => {
    const response = await apiClient.post(`/reviews/${reviewId}/helpful`);
    return response.data;
  },
};