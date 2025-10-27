import { createSlice } from '@reduxjs/toolkit';

const WISHLIST_STORAGE_KEY = 'shophub_wishlist';

// Load wishlist from localStorage
const loadWishlistFromStorageHelper = () => {
  try {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error('Error loading wishlist from storage:', error);
    return [];
  }
};

// Save wishlist to localStorage
const saveWishlistToStorage = (wishlist) => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  } catch (error) {
    console.error('Error saving wishlist to storage:', error);
  }
};

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);

      if (!exists) {
        state.items.push({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images[0],
          rating: product.rating,
          inStock: product.inStock,
          addedAt: new Date().toISOString(),
        });
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlistToStorage(state.items);
    },
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);

      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images[0],
          rating: product.rating,
          inStock: product.inStock,
          addedAt: new Date().toISOString(),
        });
      }
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },
    loadWishlistFromStorage: (state) => {
      state.items = loadWishlistFromStorageHelper();
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  loadWishlistFromStorage,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;

export const selectWishlistCount = (state) => state.wishlist.items.length;

export const selectIsInWishlist = (id) => (state) => {
  return state.wishlist.items.some((item) => item.id === id);
};

export const selectWishlistItemById = (id) => (state) => {
  return state.wishlist.items.find((item) => item.id === id);
};

export default wishlistSlice.reducer;