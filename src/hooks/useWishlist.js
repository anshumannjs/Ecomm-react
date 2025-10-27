import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  selectWishlistItems,
  selectWishlistCount,
  selectIsInWishlist,
} from '../features/wishlist/wishlistSlice';
import { useToast } from './useToast';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const items = useSelector(selectWishlistItems);
  const count = useSelector(selectWishlistCount);

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
    toast.success(`${product.name} added to wishlist`);
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.info('Item removed from wishlist');
  };

  const handleToggleWishlist = (product) => {
    const isInList = items.some((item) => item.id === product.id);
    dispatch(toggleWishlist(product));
    
    if (isInList) {
      toast.info('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.info('Wishlist cleared');
  };

  const isInWishlist = (productId) => {
    return useSelector(selectIsInWishlist(productId));
  };

  return {
    items,
    count,
    addToWishlist: handleAddToWishlist,
    removeFromWishlist: handleRemoveFromWishlist,
    toggleWishlist: handleToggleWishlist,
    clearWishlist: handleClearWishlist,
    isInWishlist,
  };
};