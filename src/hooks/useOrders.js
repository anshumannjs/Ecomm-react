import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrders,
  fetchOrderById,
  createOrder,
  cancelOrder,
  selectOrders,
  selectCurrentOrder,
  selectOrdersLoading,
  selectOrdersError,
} from '../features/orders/ordersSlice';
import { useToast } from './useToast';
import { useAuth } from './useAuth';

export const useOrders = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useAuth();

  const orders = useSelector(selectOrders);
  const currentOrder = useSelector(selectCurrentOrder);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    if (user && orders.length === 0) {
      dispatch(fetchOrders(user.id));
    }
  }, [dispatch, user, orders.length]);

  const loadOrder = async (orderId) => {
    try {
      await dispatch(fetchOrderById(orderId)).unwrap();
    } catch (error) {
      toast.error('Failed to load order');
    }
  };

  const placeOrder = async (orderData) => {
    try {
      const result = await dispatch(createOrder(orderData)).unwrap();
      toast.success('Order placed successfully!');
      return result;
    } catch (error) {
      toast.error(error || 'Failed to place order');
      throw error;
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await dispatch(cancelOrder(orderId)).unwrap();
      toast.success('Order cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel order');
      throw error;
    }
  };

  return {
    orders,
    currentOrder,
    loading,
    error,
    loadOrder,
    placeOrder,
    cancelOrder: handleCancelOrder,
  };
};