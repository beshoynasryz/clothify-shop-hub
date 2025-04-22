
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { Trash, ShoppingBag, X, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <ShoppingBag size={64} className="text-gray-300" />
          </div>
          <h1 className="text-3xl font-bold text-brand-dark mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. Browse our products and find something you'll love!
          </p>
          <Link to="/products" className="btn-primary text-lg py-3 px-8">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Calculate order summary values
  const shipping = 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-brand-dark mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-brand-dark">
                Cart Items ({totalItems})
              </h2>
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 flex items-center text-sm"
              >
                <Trash size={16} className="mr-1" /> Clear Cart
              </button>
            </div>
            
            <div className="divide-y">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="py-4 flex flex-wrap md:flex-nowrap">
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-grow md:ml-4 mt-4 md:mt-0">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-brand-dark">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-600"
                        aria-label="Remove item"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    {(item.size || item.color) && (
                      <div className="mt-1 text-sm text-gray-500">
                        {item.size && <span className="mr-4">Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                    )}
                    
                    <div className="mt-4 flex flex-wrap justify-between gap-y-2">
                      {/* Quantity Control */}
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 rounded-l-md border border-gray-300 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1 border-t border-b border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-r-md border border-gray-300 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <div className="text-brand-dark font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-brand-dark mb-4">
              Delivery Options
            </h2>
            <div className="space-y-4">
              <label className="flex items-start p-4 border border-gray-200 rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  className="mt-0.5 text-brand focus:ring-brand"
                  defaultChecked
                />
                <div className="ml-3">
                  <span className="block font-medium text-brand-dark">Standard Shipping</span>
                  <span className="block text-sm text-gray-500">Delivery in 3-5 business days</span>
                </div>
                <span className="ml-auto font-medium">$10.00</span>
              </label>
              <label className="flex items-start p-4 border border-gray-200 rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  className="mt-0.5 text-brand focus:ring-brand"
                />
                <div className="ml-3">
                  <span className="block font-medium text-brand-dark">Express Shipping</span>
                  <span className="block text-sm text-gray-500">Delivery in 1-2 business days</span>
                </div>
                <span className="ml-auto font-medium">$20.00</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-brand-dark mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="font-medium text-brand-dark">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-brand-dark">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-brand-dark">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-brand-dark">Total</span>
                  <span className="text-xl font-bold text-brand">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link
                to="/checkout"
                className="w-full btn-primary text-center py-3 text-lg"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/products"
                className="block text-center mt-4 text-brand hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
