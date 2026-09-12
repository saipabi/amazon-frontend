'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import RazorpayModal from '../../components/RazorpayModal';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { MapPin, ShieldCheck, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotalAmount, clearCart } = useCart();
  const { user } = useAuth();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user ? user.name : 'Rajesh Kumar',
    phone: '9876543210',
    address: 'Flat 402, Nura Residency, Hi-Tech City',
    city: 'Hyderabad',
    postalCode: '500081',
    country: 'India',
  });

  const [addressSaved, setAddressSaved] = useState(true);

  const formatPrice = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  const handleOrderSuccess = (createdOrder) => {
    clearCart();
    router.push(`/orders?success=true&orderId=${createdOrder._id || 'ORD_SUCCESS'}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-amazon-bg">
        <Header />
        <SubHeader />
        <div className="max-w-[800px] mx-auto p-12 text-center bg-white my-8 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Your Cart is Empty</h2>
          <p className="text-sm text-gray-500 mt-1 mb-4">Add items to your cart to proceed with checkout.</p>
          <button onClick={() => router.push('/')} className="btn-amazon-primary">
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amazon-bg">
      <Header />
      <SubHeader />

      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 my-4">
        {/* Checkout Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Lock className="w-6 h-6 text-amazon-orange" />
            <span>Secure Amazon Checkout</span>
          </h1>
          <span className="text-xs text-gray-500 font-semibold">{cartItems.length} items</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Address & Items Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Shipping Address */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between border-b pb-3 mb-4 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amazon-orange" /> 1. Delivery Address
                </h3>
              </div>

              <form className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full border border-gray-300 rounded p-2 focus:border-amazon-orange focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Mobile Phone</label>
                    <input
                      type="text"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded p-2 focus:border-amazon-orange focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      className="w-full border border-gray-300 rounded p-2 focus:border-amazon-orange focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Street Address / House No.</label>
                  <input
                    type="text"
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    className="w-full border border-gray-300 rounded p-2 focus:border-amazon-orange focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full border border-gray-300 rounded p-2 focus:border-amazon-orange focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      value={shippingAddress.country}
                      disabled
                      className="w-full border border-gray-200 bg-gray-100 text-gray-500 rounded p-2"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Step 2: Order Items Summary */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4 border-gray-200">
                2. Items & Delivery Schedule
              </h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 text-xs border-b pb-3 last:border-b-0">
                    <img src={item.images ? item.images[0] : ''} alt={item.title} className="w-14 h-14 object-contain border p-1 rounded" />
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 line-clamp-1">{item.title}</p>
                      <p className="text-gray-500">Qty: {item.quantity} x {formatPrice(item.price)}</p>
                    </div>
                    <span className="font-bold text-gray-900 text-sm">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Payment Summary & Razorpay Modal (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4 border-gray-200">
                3. Order Summary & Payment
              </h3>

              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <div className="flex justify-between">
                  <span>Items Total:</span>
                  <span>{formatPrice(subtotalAmount)}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Shipping & Delivery:</span>
                  <span className="font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-900 border-t pt-3 mt-3 border-gray-200">
                  <span>Order Total:</span>
                  <span className="text-amazon-price text-xl">{formatPrice(subtotalAmount)}</span>
                </div>
              </div>

              {/* Razorpay Checkout Trigger Button Component */}
              <RazorpayModal
                amount={subtotalAmount}
                shippingAddress={shippingAddress}
                cartItems={cartItems}
                token={user ? user.token : null}
                onSuccess={handleOrderSuccess}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
