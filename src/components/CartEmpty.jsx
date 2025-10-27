import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Button from './Button';
import EmptyState from './EmptyState';

const CartEmpty = () => {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={ShoppingCart}
      title="Your cart is empty"
      description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
      action={() => navigate('/products')}
      actionLabel="Start Shopping"
    />
  );
};

export default CartEmpty;