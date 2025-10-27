import { createSlice } from '@reduxjs/toolkit';

const CART_STORAGE_KEY = 'shophub_cart';

// Load cart from localStorage
const loadCartFromStorageHelper = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

const initialState = {
  items: [],
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.images[0],
          stock: product.stock,
          quantity: 1,
        });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      
      if (item) {
        // Ensure quantity doesn't exceed stock
        item.quantity = Math.min(Math.max(1, quantity), item.stock);
      }
      saveCartToStorage(state.items);
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity < item.stock) {
        item.quantity += 1;
      }
      saveCartToStorage(state.items);
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
    loadCartFromStorage: (state) => {
      state.items = loadCartFromStorageHelper();
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  loadCartFromStorage,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartLoading = (state) => state.cart.loading;

export const selectCartTotal = (state) => {
  return state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const selectCartItemsCount = (state) => {
  return state.cart.items.reduce((count, item) => count + item.quantity, 0);
};

export const selectCartSubtotal = (state) => {
  return state.cart.items.reduce(
    (subtotal, item) => subtotal + item.price * item.quantity,
    0
  );
};

export const selectCartTax = (state) => {
  const subtotal = selectCartSubtotal(state);
  return subtotal * 0.09; // 9% tax rate
};

export const selectCartItemById = (id) => (state) => {
  return state.cart.items.find((item) => item.id === id);
};

export const selectIsInCart = (id) => (state) => {
  return state?.cart?.items?.some((item) => item?.id === id);
};

export default cartSlice.reducer;