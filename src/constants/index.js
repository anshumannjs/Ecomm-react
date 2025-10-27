export const APP_NAME = 'ShopHub';
export const APP_DESCRIPTION = 'Your Premium Shopping Destination';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const API_TIMEOUT = 30000;

export const ITEMS_PER_PAGE = 12;
export const PRODUCTS_PER_PAGE = 16;

export const PRODUCT_CATEGORIES = [
  { id: 'all', name: 'All Products', slug: 'all' },
  { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  { id: 'clothing', name: 'Clothing', slug: 'clothing' },
  { id: 'home', name: 'Home & Kitchen', slug: 'home' },
  { id: 'books', name: 'Books', slug: 'books' },
  { id: 'sports', name: 'Sports & Outdoors', slug: 'sports' },
  { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
];

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'rating', label: 'Highest Rated' },
];

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
  { id: 'paypal', name: 'PayPal', icon: 'Wallet' },
  { id: 'cod', name: 'Cash on Delivery', icon: 'Banknote' },
];

export const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 12.99, days: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, days: 'Next business day' },
];

export const TOAST_DURATION = 3000;

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
};