
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationPage = () => {
  // Mock order details - In a real app, this would come from your backend
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleDateString();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-brand-dark mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">
          Thank you for your purchase. We've received your order and will begin processing it right away.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold text-brand-dark">Order Details</h2>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Order Number:</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{orderDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Status:</span>
            <span className="font-medium text-green-600">Paid</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping Method:</span>
            <span className="font-medium">Standard Shipping</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold text-brand-dark">What's Next?</h2>
        </div>

        <div className="space-y-6">
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 bg-brand rounded-full flex items-center justify-center text-white font-medium mr-4">
              1
            </div>
            <div>
              <h3 className="font-semibold text-brand-dark mb-1">Order Confirmation</h3>
              <p className="text-gray-600">
                You will receive an email confirmation shortly at your registered email address.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 bg-brand rounded-full flex items-center justify-center text-white font-medium mr-4">
              2
            </div>
            <div>
              <h3 className="font-semibold text-brand-dark mb-1">Order Processing</h3>
              <p className="text-gray-600">
                We will start processing your order and prepare it for shipping.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 bg-brand rounded-full flex items-center justify-center text-white font-medium mr-4">
              3
            </div>
            <div>
              <h3 className="font-semibold text-brand-dark mb-1">Shipping</h3>
              <p className="text-gray-600">
                You will receive a shipping confirmation email with tracking details when your order ships.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link to="/products" className="btn-primary inline-block py-3 px-8 text-lg">
          Continue Shopping
        </Link>
        <div className="mt-4">
          <Link to="/orders" className="text-brand hover:underline">
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
