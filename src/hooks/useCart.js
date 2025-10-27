import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
  selectCartSubtotal,
  selectCartTax,
  selectIsInCart,
} from '../features/cart/cartSlice';
import { useToast } from './useToast';

export const useCart = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const itemsCount = useSelector(selectCartItemsCount);
  const subtotal = useSelector(selectCartSubtotal);
  const tax = useSelector(selectCartTax);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.info('Item removed from cart');
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const handleIncrementQuantity = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrementQuantity = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info('Cart cleared');
  };

  const isInCart = (productId) => {
    return useSelector(selectIsInCart(productId));
  };

  return {
    items,
    total,
    itemsCount,
    subtotal,
    tax,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    incrementQuantity: handleIncrementQuantity,
    decrementQuantity: handleDecrementQuantity,
    clearCart: handleClearCart,
    isInCart,
  };
};