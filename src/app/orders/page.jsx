'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, PackageCheck, Calendar, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

function OrdersContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams ? searchParams.get('success') === 'true' : false;
  const orderId = searchParams ? searchParams.get('orderId') : null;
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setOrders([
        {
          _id: orderId || `ORD_${Date.now()}`,
          date: new Date().toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          totalAmount: 134900,
          status: 'Confirmed & Paid (Razorpay Verified)',
          items: [
            {
              title: 'Apple iPhone 15 Pro Max (256 GB) - Natural Titanium',
              quantity: 1,
              price: 134900,
              image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80',
            },
          ],
        },
      ]);
    }
  }, [isSuccess, orderId]);

  const formatPrice = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 sm:p-6 my-4">
      {/* Success Alert Banner if coming from payment */}
      {isSuccess && (
        <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-10 h-10 text-green-600 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-extrabold text-green-900">Order Placed Successfully!</h2>
              <p className="text-sm text-green-800 mt-1">
                Thank you for shopping on Amazon. Your payment was verified securely via Razorpay.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-green-900 bg-green-100 px-3 py-1.5 rounded w-fit">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                <span>Order Reference ID: {orderId || 'ORD_SUCCESS_RAZORPAY'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 border-b pb-4 mb-6 border-gray-200 flex items-center gap-2">
          <PackageCheck className="w-7 h-7 text-amazon-orange" />
          <span>Your Orders & Purchase History</span>
        </h1>

        {orders.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <PackageCheck className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-lg font-semibold text-gray-800">No past orders found.</p>
            <p className="text-xs text-gray-500 mt-1 mb-4">When you place orders, they will show up right here.</p>
            <Link href="/" className="btn-amazon-primary px-6 py-2">
              Start Shopping Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((ord) => (
              <div key={ord._id} className="border border-gray-300 rounded-lg overflow-hidden">
                {/* Order Top Bar */}
                <div className="bg-gray-100 p-4 border-b border-gray-300 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex gap-8">
                    <div>
                      <span className="text-gray-500 block uppercase font-medium">ORDER PLACED</span>
                      <span className="font-bold text-gray-800 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {ord.date}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block uppercase font-medium">TOTAL</span>
                      <span className="font-bold text-gray-900">{formatPrice(ord.totalAmount)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block uppercase font-medium">SHIP TO</span>
                      <span className="font-bold text-amazon-blue cursor-pointer">
                        {user ? user.name : 'Rajesh Kumar'}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-gray-500 block uppercase font-medium">ORDER # {ord._id}</span>
                    <span className="text-green-700 font-bold">{ord.status}</span>
                  </div>
                </div>

                {/* Order Items Body */}
                <div className="p-4 space-y-4">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <img src={item.image} alt={item.title} className="w-20 h-20 object-contain border p-1 rounded bg-gray-50" />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm hover:text-amazon-orange transition cursor-pointer">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">Return window open until next week</p>
                      </div>
                      <div className="text-right font-bold text-sm text-gray-900">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-amazon-bg">
      <Header />
      <SubHeader />
      <Suspense fallback={<div className="max-w-[1200px] mx-auto p-12 text-center text-gray-500">Loading orders...</div>}>
        <OrdersContent />
      </Suspense>
    </div>
  );
}
