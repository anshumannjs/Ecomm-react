import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Download, Printer, Package } from 'lucide-react';
import Button from '../components/Button';
import OrderSummary from '../components/OrderSummary';
import OrderStatusTracker from '../components/OrderStatusTracker';
import Spinner from '../components/Spinner';
import { useOrders } from '../hooks/useOrders';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { currentOrder, loading, loadOrder, cancelOrder } = useOrders();

  useEffect(() => {
    if (orderId) {
      loadOrder(orderId);
    }
  }, [orderId]);

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await cancelOrder(orderId);
      } catch (error) {
        // Error handled by hook
      }
    }
  };

  const handleDownloadInvoice = () => {
    // In real app, this would generate/download PDF
    alert('Invoice download feature - Connect to backend');
  };

  const handlePrintInvoice = () => {
    window.print();
  };

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
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <Link to="/orders">
            <Button variant="primary">View All Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const canCancelOrder = ['pending', 'processing'].includes(currentOrder.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/orders')}
            leftIcon={<ArrowLeft className="w-5 h-5" />}
            className="mb-4"
          >
            Back to Orders
          </Button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Order {currentOrder.id}
              </h1>
              <p className="text-gray-600">
                View and track your order details
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                leftIcon={<Download className="w-5 h-5" />}
                onClick={handleDownloadInvoice}
              >
                Download Invoice
              </Button>
              
              <Button
                variant="outline"
                leftIcon={<Printer className="w-5 h-5" />}
                onClick={handlePrintInvoice}
                className="hidden md:flex"
              >
                Print
              </Button>

              {canCancelOrder && (
                <Button
                  variant="danger"
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Status Tracker */}
          <div className="lg:col-span-2 space-y-6">
            <OrderStatusTracker
              status={currentOrder.status}
              createdAt={currentOrder.createdAt}
              updatedAt={currentOrder.updatedAt}
              deliveredAt={currentOrder.deliveredAt}
            />

            {/* Tracking Information */}
            {currentOrder.status === 'shipped' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Tracking Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carrier:</span>
                    <span className="font-medium text-gray-900">FedEx</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking Number:</span>
                    <span className="font-medium text-gray-900">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium text-gray-900">Dec 25, 2024</span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  className="mt-4"
                  onClick={() => window.open('https://fedex.com', '_blank')}
                >
                  Track Package
                </Button>
              </div>
            )}

            {/* Help Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className="block text-primary-600 hover:text-primary-700 font-medium"
                >
                  Contact Customer Support
                </Link>
                <Link
                  to="/returns"
                  className="block text-primary-600 hover:text-primary-700 font-medium"
                >
                  Return or Exchange Items
                </Link>
                <Link
                  to="/faq"
                  className="block text-primary-600 hover:text-primary-700 font-medium"
                >
                  View FAQs
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary order={currentOrder} showItems />
            </div>
          </div>
        </div>
      </div></div>
  );
};

export default OrderDetailPage;