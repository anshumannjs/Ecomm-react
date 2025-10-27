import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CheckoutSteps from '../components/CheckoutSteps';
import ShippingForm from '../components/ShippingForm';
import ShippingOptions from '../components/ShippingOptions';
import PaymentForm from '../components/PaymentForm';
import CheckoutSummary from '../components/CheckoutSummary';
import Button from '../components/Button';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';
import { SHIPPING_METHODS } from '../constants';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, tax, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();

  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [loading, setLoading] = useState(false);

  const selectedShipping = SHIPPING_METHODS.find((method) => method.id === shippingMethod);
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const total = subtotal + tax + shippingCost;

  const steps = [
    { id: 1, label: 'Shipping' },
    { id: 2, label: 'Payment' },
    { id: 3, label: 'Review' },
  ];

  const handleShippingSubmit = (address) => {
    setShippingAddress(address);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async (paymentData) => {
    setLoading(true);

    try {
      // Create order
      const orderData = {
        userId: user.id,
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        shipping: shippingCost,
        tax,
        total,
        shippingAddress,
        paymentMethod: paymentData.method,
      };

      const order = await placeOrder(orderData);

      // Clear cart
      clearCart();

      // Redirect to success page
      navigate(`/order-success/${order.id}`);
    } catch (error) {
      console.error('Order failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/cart')}
            leftIcon={<ArrowLeft className="w-5 h-5" />}
            className="mb-4"
          >
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <CheckoutSteps currentStep={currentStep} steps={steps} />

        {/* Checkout Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
              {/* Step 1: Shipping */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Shipping Information
                  </h2>
                  <ShippingForm
                    onSubmit={handleShippingSubmit}
                    onBack={() => navigate('/cart')}
                  />
                </div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Shipping Method
                  </h2>
                  <ShippingOptions
                    selected={shippingMethod}
                    onSelect={setShippingMethod}
                    className="mb-8"
                  />

                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Payment Information
                  </h2>
                  <PaymentForm
                    onSubmit={handlePaymentSubmit}
                    onBack={() => setCurrentStep(1)}
                    loading={loading}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CheckoutSummary
                items={items}
                shippingAddress={shippingAddress}
                shippingMethod={selectedShipping}
                subtotal={subtotal}
                shipping={shippingCost}
                tax={tax}
                total={total}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;