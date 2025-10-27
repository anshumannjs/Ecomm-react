import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import Button from '../components/Button';
import OrderSummary from '../components/OrderSummary';
import { useOrders } from '../hooks/useOrders';
import Spinner from '../components/Spinner';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { currentOrder, loading, loadOrder } = useOrders();

  useEffect(() => {
    if (orderId) {
      loadOrder(orderId);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <Button onClick={() => navigate('/orders')}>View Orders</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        {/* Success Message */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your order. We've received your order and will send you a confirmation email shortly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Home className="w-5 h-5" />}
              >
                Back to Home
              </Button>
            </Link>
            
            <Link to="/orders">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                View My Orders
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Details */}
        <div className="max-w-4xl mx-auto">
          <OrderSummary order={currentOrder} showItems />

          {/* Next Steps */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              What's Next?
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </span>
                <span>You'll receive an order confirmation email with your order details.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </span>
                <span>We'll send you shipping updates as your order is processed and shipped.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </span>
                <span>You can track your order anytime in the "My Orders" section.</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Need help? Contact our{' '}
              <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                customer support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;