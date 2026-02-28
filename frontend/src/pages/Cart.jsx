import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  // Calculate totals
  const subtotal = getCartTotal();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = 0; // Free shipping
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <svg
            className="mx-auto w-32 h-32 text-gray-300 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link to="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const price = item.discountPrice || item.price;
              const itemSubtotal = price * item.quantity;
              const itemId = item._id || item.id;
              const imageUrl = item.images?.[0]?.url || item.image || 'https://via.placeholder.com/150';
              const maxStock = typeof item.stock === 'number' ? item.stock : Number.MAX_SAFE_INTEGER;

              return (
                <div key={itemId} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link to={`/product/${itemId}`} className="flex-shrink-0">
                      <img
                        src={imageUrl}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link to={`/product/${itemId}`}>
                        <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 mb-2">
                          {item.name}
                        </h3>
                      </Link>

                      <p className="text-gray-600 mb-2">{item.category}</p>

                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-2xl font-bold text-gray-900">
                          ${price.toFixed(2)}
                        </span>
                        {item.discountPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(itemId, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-primary-600 transition-colors font-semibold"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-semibold text-lg">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(itemId, item.quantity + 1)}
                            disabled={item.quantity >= maxStock}
                            className="w-8 h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(itemId)}
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </div>

                      {item.quantity >= maxStock && Number.isFinite(maxStock) && (
                        <p className="text-orange-600 text-sm mt-2">
                          Maximum stock reached
                        </p>
                      )}
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${itemSubtotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert('Checkout feature coming soon!')}
                className="w-full btn-primary text-lg py-4 mb-4"
              >
                Proceed to Checkout
              </button>

              <Link to="/" className="block text-center text-primary-600 hover:underline">
                ← Continue Shopping
              </Link>

              {/* Savings Info */}
              {cartItems.some(item => item.discountPrice) && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-green-700 font-semibold text-center">
                    🎉 You're saving ${(cartItems.reduce((acc, item) => {
                      if (item.discountPrice) {
                        return acc + ((item.price - item.discountPrice) * item.quantity);
                      }
                      return acc;
                    }, 0)).toFixed(2)}!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

