'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import { useCart } from '../../context/CartContext';
import { Trash2, ShieldCheck, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotalAmount, totalItemsCount } = useCart();

  const formatPrice = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <div className="min-h-screen bg-amazon-bg">
      <Header />
      <SubHeader />

      <div className="max-w-[1400px] mx-auto p-4 sm:p-6 my-4 sm:my-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Cart Items List (8 or 9 cols) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4 mb-4 border-gray-200">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-xs text-gray-500">Items saved for checkout</p>
              </div>
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-red-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear Cart
                </button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-gray-800">Your Amazon Cart is empty</h3>
                <p className="text-sm text-gray-500 mt-1 mb-6">Check out today's deals and featured categories.</p>
                <Link href="/" className="btn-amazon-primary px-8 py-3 text-base">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Free Shipping Notification */}
                <div className="bg-green-50 border border-green-200 rounded p-3 text-xs text-green-800 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Your order qualifies for <b>FREE Delivery</b> in India with Razorpay protection.</span>
                </div>

                {/* Items List */}
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-4 border-b pb-6 border-gray-200 last:border-b-0"
                  >
                    {/* Item Image */}
                    <div className="w-28 h-28 shrink-0 bg-gray-50 border border-gray-200 rounded p-2 flex items-center justify-center">
                      <img
                        src={item.images ? item.images[0] : ''}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link href={`/product/${item._id}`} className="font-bold text-gray-900 text-base hover:text-amazon-orange transition line-clamp-2">
                          {item.title}
                        </Link>
                        <p className="text-xs text-green-700 font-semibold mt-1">In Stock</p>
                        <span className="prime-badge text-xs mt-1">✓prime</span>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center gap-4 mt-3 text-xs">
                        <div className="flex items-center gap-1 border border-gray-300 rounded bg-gray-100 px-2 py-1">
                          <span className="text-gray-700 font-medium">Qty:</span>
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                            className="bg-transparent font-bold text-gray-900 focus:outline-none cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 10].map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                        </div>

                        <span className="text-gray-300">|</span>

                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-amazon-blue hover:underline font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right font-extrabold text-lg text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Summary Box (4 cols) */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-24">
                <div className="flex items-center gap-2 text-xs text-green-700 font-bold mb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Eligible for FREE Shipping</span>
                </div>

                <div className="text-lg font-bold text-gray-900 mb-4 border-b pb-3 border-gray-200">
                  Subtotal ({totalItemsCount} items):{' '}
                  <span className="text-xl font-extrabold text-amazon-price">{formatPrice(subtotalAmount)}</span>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full py-3.5 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] text-amazon-dark font-extrabold text-sm rounded-lg hover:from-[#f5d78e] hover:to-[#eeb933] shadow transition cursor-pointer mb-3"
                >
                  Proceed to Buy ({totalItemsCount} items)
                </button>

                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-gray-400" />
                  <span>Razorpay Verified Safe Checkout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
