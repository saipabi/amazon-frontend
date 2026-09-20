'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import HeroCarousel from '../components/HeroCarousel';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/api';
import {
  Sparkles,
  Truck,
  ShieldCheck,
  RefreshCw,
  Filter,
  Shirt,
  X,
  CheckCircle2,
  Star,
  Lock,
  PackageCheck,
  ShieldAlert,
  CreditCard,
  RotateCcw,
} from 'lucide-react';
import Link from 'next/link';

function HomeContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams?.get('category') || 'All';
  const urlSearch = searchParams?.get('search') || '';

  const [category, setCategory] = useState(urlCategory);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(urlSearch);
  const [minDiscount, setMinDiscount] = useState(0);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [returnsModalOpen, setReturnsModalOpen] = useState(false);

  // Multi-dimensional active filters
  let displayedProducts = products;
  if (minDiscount > 0) {
    displayedProducts = displayedProducts.filter((p) => (p.discountPercentage || 0) >= minDiscount);
  }
  if (primeOnly) {
    displayedProducts = displayedProducts.filter((p) => p.isPrime === true);
  }
  if (topRatedOnly) {
    displayedProducts = displayedProducts.filter((p) => (p.rating || 0) >= 4.7);
  }

  useEffect(() => {
    if (urlCategory) {
      setCategory(urlCategory);
    }
  }, [urlCategory]);

  useEffect(() => {
    if (urlSearch !== search) {
      setSearch(urlSearch);
    }
  }, [urlSearch]);

  useEffect(() => {
    loadProducts(category, search);
  }, [category, search]);

  const loadProducts = async (cat, searchTerm) => {
    setLoading(true);
    let data = await fetchProducts(cat, searchTerm);

    // For Today's Deals, showcase the biggest discount items across all categories (Fashion, Mobiles, Electronics)
    if (cat === 'All' && !searchTerm && Array.isArray(data)) {
      data = [...data].sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    }

    setProducts(data);
    setLoading(false);
  };

  const isFashionCategory = ['Fashion', "Men's Wear", "Women's Wear", "Kids' Wear"].includes(category);

  const getSectionTitle = () => {
    if (category === 'All') return "Today's Great Deals & Best Sellers";
    if (category === "Men's Wear") return "Men's Clothing & Dresses";
    if (category === "Women's Wear") return "Women's Dresses & Clothing";
    if (category === "Kids' Wear") return "Kids' Dresses & Clothing";
    if (category === "Fashion") return "All Fashion (Dresses, Footwear & Accessories)";
    return `${category} Collection`;
  };

  return (
    <div className="min-h-screen bg-amazon-bg">
      <Header selectedCategory={category} onCategoryChange={(cat) => setCategory(cat)} />
      <SubHeader selectedCategory={category} onCategorySelect={(cat) => setCategory(cat)} />

      {/* Hero Banner Section */}
      <HeroCarousel />

      {/* Main Content Area */}
      <div className="max-w-[1500px] mx-auto px-4 -mt-16 sm:-mt-24 md:-mt-32 relative z-20 pb-12">
        {/* Amazon Value Props Bar - 100% Fully Interactive */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* 1. Fast & Free Shipping (Prime Filter Toggle) */}
          <div
            onClick={() => setPrimeOnly((prev) => !prev)}
            className={`p-4 rounded-lg shadow-sm flex items-center gap-3 border transition cursor-pointer hover:shadow-md hover:-translate-y-0.5 select-none ${
              primeOnly
                ? 'bg-amber-50 border-amazon-orange ring-2 ring-amazon-orange shadow-md'
                : 'bg-white border-gray-200 hover:border-amazon-orange'
            }`}
          >
            <Truck className="w-8 h-8 text-amazon-orange shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">Fast & Free Shipping</p>
                {primeOnly && <span className="text-[10px] bg-amazon-orange text-white px-1.5 py-0.5 rounded font-bold">Active</span>}
              </div>
              <p className="text-xs text-gray-500">
                {primeOnly ? '✓ Prime Items Only (Click to reset)' : 'Click to filter Prime items'}
              </p>
            </div>
          </div>

          {/* 2. Razorpay Secured (Security Modal Trigger) */}
          <div
            onClick={() => setSecurityModalOpen(true)}
            className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3 border border-gray-200 transition cursor-pointer hover:border-amazon-orange hover:shadow-md hover:-translate-y-0.5 select-none"
          >
            <ShieldCheck className="w-8 h-8 text-green-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">Razorpay Secured</p>
                <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-bold">100% Safe</span>
              </div>
              <p className="text-xs text-gray-500">Click for security details</p>
            </div>
          </div>

          {/* 3. Easy Returns (Returns Policy Modal Trigger) */}
          <div
            onClick={() => setReturnsModalOpen(true)}
            className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3 border border-gray-200 transition cursor-pointer hover:border-amazon-orange hover:shadow-md hover:-translate-y-0.5 select-none"
          >
            <RefreshCw className="w-8 h-8 text-amazon-orange shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">Easy Returns</p>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">7-Day</span>
              </div>
              <p className="text-xs text-gray-500">Click for policy & orders</p>
            </div>
          </div>

          {/* 4. Clear HD Quality (Top Rated 4.7+ ⭐ Filter Toggle) */}
          <div
            onClick={() => setTopRatedOnly((prev) => !prev)}
            className={`p-4 rounded-lg shadow-sm flex items-center gap-3 border transition cursor-pointer hover:shadow-md hover:-translate-y-0.5 select-none ${
              topRatedOnly
                ? 'bg-amber-50 border-amazon-orange ring-2 ring-amazon-orange shadow-md'
                : 'bg-white border-gray-200 hover:border-amazon-orange'
            }`}
          >
            <Sparkles className="w-8 h-8 text-amazon-orange shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">Clear HD Quality</p>
                {topRatedOnly && <span className="text-[10px] bg-amazon-orange text-white px-1.5 py-0.5 rounded font-bold">4.7+ ⭐</span>}
              </div>
              <p className="text-xs text-gray-500">
                {topRatedOnly ? '✓ 4.7+ Rated Only (Click to reset)' : 'Click to filter top verified'}
              </p>
            </div>
          </div>
        </div>

        {/* Active Filter Badges Bar (shown if any card filter is active) */}
        {(primeOnly || topRatedOnly || minDiscount > 0) && (
          <div className="bg-amber-50 border border-amber-300 rounded-lg p-2.5 mb-4 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-800">Active Filters:</span>
              {primeOnly && (
                <span
                  onClick={() => setPrimeOnly(false)}
                  className="bg-white border border-gray-300 text-gray-800 px-2.5 py-1 rounded-full font-bold flex items-center gap-1 cursor-pointer hover:bg-gray-100 shadow-sm"
                >
                  <Truck className="w-3.5 h-3.5 text-amazon-orange" /> Prime Only <X className="w-3 h-3" />
                </span>
              )}
              {topRatedOnly && (
                <span
                  onClick={() => setTopRatedOnly(false)}
                  className="bg-white border border-gray-300 text-gray-800 px-2.5 py-1 rounded-full font-bold flex items-center gap-1 cursor-pointer hover:bg-gray-100 shadow-sm"
                >
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 4.7+ Stars <X className="w-3 h-3" />
                </span>
              )}
              {minDiscount > 0 && (
                <span
                  onClick={() => setMinDiscount(0)}
                  className="bg-white border border-gray-300 text-gray-800 px-2.5 py-1 rounded-full font-bold flex items-center gap-1 cursor-pointer hover:bg-gray-100 shadow-sm"
                >
                  🔥 {minDiscount}%+ Discount <X className="w-3 h-3" />
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setPrimeOnly(false);
                setTopRatedOnly(false);
                setMinDiscount(0);
              }}
              className="text-amazon-blue hover:underline font-bold cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Fashion & Department Sub-Category Quick Filter Bar */}
        <div className="bg-white p-3 rounded-t-lg border border-b-0 border-gray-200 flex flex-wrap items-center justify-between gap-3">
          {/* Department Selector & Quick Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-700 flex items-center gap-1 mr-1">
              <Shirt className="w-4 h-4 text-amazon-orange" /> Select Department:
            </span>

            {/* Interactive Department Select Dropdown */}
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setMinDiscount(0);
              }}
              className="bg-gray-50 border border-gray-300 text-xs font-bold rounded px-2.5 py-1 text-gray-800 focus:outline-none focus:border-amazon-orange cursor-pointer hover:bg-gray-100 shadow-sm"
            >
              <option value="All">All Departments (Today's Deals)</option>
              <option value="Men's Wear">👔 Men's Clothing & Dresses</option>
              <option value="Women's Wear">👗 Women's Clothing & Dresses</option>
              <option value="Kids' Wear">👶 Kids' Clothing & Dresses</option>
              <option value="Fashion">✨ All Fashion</option>
              <option value="Electronics">💻 Electronics & Audio</option>
              <option value="Mobiles">📱 Mobiles & Smartphones</option>
              <option value="Home">🏠 Home & Kitchen</option>
              <option value="Books">📚 Books & Kindle</option>
            </select>

            {/* Quick Pills for Current Category */}
            <button
              onClick={() => {
                setCategory("Men's Wear");
                setMinDiscount(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                category === "Men's Wear"
                  ? 'bg-amazon-dark text-amazon-yellow font-bold shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              👔 Men's Dresses Only
            </button>
            <button
              onClick={() => {
                setCategory("Women's Wear");
                setMinDiscount(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                category === "Women's Wear"
                  ? 'bg-amazon-dark text-amazon-yellow font-bold shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              👗 Women's Dresses Only
            </button>
            <button
              onClick={() => {
                setCategory("Kids' Wear");
                setMinDiscount(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                category === "Kids' Wear"
                  ? 'bg-amazon-dark text-amazon-yellow font-bold shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              👶 Kids' Dresses Only
            </button>
            <button
              onClick={() => {
                setCategory('Fashion');
                setMinDiscount(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                category === 'Fashion'
                  ? 'bg-amazon-dark text-amazon-yellow font-bold shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✨ All Fashion
            </button>
          </div>

          {/* Discount Quick Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-gray-500 font-bold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-amazon-orange" /> Discount:
            </span>
            <button
              onClick={() => setMinDiscount(0)}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                minDiscount === 0
                  ? 'bg-gray-800 text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setMinDiscount((prev) => (prev === 30 ? 0 : 30))}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer border ${
                minDiscount === 30
                  ? 'bg-red-600 text-white border-red-600 shadow'
                  : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
              }`}
            >
              🔥 30%+ OFF
            </button>
            <button
              onClick={() => setMinDiscount((prev) => (prev === 40 ? 0 : 40))}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer border ${
                minDiscount === 40
                  ? 'bg-red-600 text-white border-red-600 shadow'
                  : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
              }`}
            >
              ⚡ 40%+ OFF
            </button>
            <button
              onClick={() => setMinDiscount((prev) => (prev === 50 ? 0 : 50))}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer border ${
                minDiscount === 50
                  ? 'bg-red-600 text-white border-red-600 shadow'
                  : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
              }`}
            >
              💥 50% OFF
            </button>
          </div>
        </div>

        {/* Section Title with Interactive UP TO 50% OFF Button */}
        <div className="bg-white p-4 border border-gray-200 flex items-center justify-between mb-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              {getSectionTitle()}
            </h1>
            <button
              onClick={() => setMinDiscount((prev) => (prev === 50 ? 0 : 50))}
              className={`text-xs font-black px-2.5 py-1 rounded transition cursor-pointer flex items-center gap-1.5 shadow-sm ${
                minDiscount === 50
                  ? 'bg-red-800 text-white ring-2 ring-red-400'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
              title="Click to toggle 50% discount deals"
            >
              <span>{minDiscount === 50 ? '✓ 50% OFF APPLIED' : 'UP TO 50% OFF'}</span>
              {minDiscount === 50 && <span className="bg-red-950 text-[10px] px-1 rounded">Reset ✕</span>}
            </button>
          </div>
          <span className="text-xs text-gray-500 font-semibold">{displayedProducts.length} Items Available</span>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="bg-white p-8 border border-t-0 border-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 h-80 rounded-lg p-4 flex flex-col justify-between">
                <div className="bg-gray-200 h-44 rounded w-full mb-3"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2 mb-2"></div>
                <div className="bg-gray-200 h-8 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="bg-white p-12 text-center border border-t-0 border-gray-200 rounded-b-lg">
            <p className="text-gray-600 font-semibold text-lg">
              {minDiscount > 0
                ? `No items with ${minDiscount}%+ discount found in this department.`
                : 'No items found matching your filter.'}
            </p>
            {minDiscount > 0 && (
              <button
                onClick={() => setMinDiscount(0)}
                className="mt-4 px-4 py-2 bg-amazon-yellow text-amazon-dark font-bold text-xs rounded shadow hover:bg-yellow-400 transition"
              >
                Clear Discount Filter (Show All Items)
              </button>
            )}
            <button
              onClick={() => {
                setCategory('All');
                setMinDiscount(0);
              }}
              className="mt-4 ml-2 btn-amazon-primary text-sm font-bold"
            >
              Browse All Categories
            </button>
          </div>
        ) : (
          <div className="bg-white p-4 border border-t-0 border-gray-200 rounded-b-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Razorpay Security Modal */}
      {securityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSecurityModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 z-10 border border-gray-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-green-600" />
                <h3 className="font-extrabold text-lg text-gray-900">Razorpay Secured</h3>
              </div>
              <button
                onClick={() => setSecurityModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <Lock className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-green-950">256-Bit SSL Bank-Grade Encryption</p>
                  <p className="text-green-800 mt-0.5">
                    All payment transactions are encrypted end-to-end. Your card and banking credentials are never stored.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <CreditCard className="w-5 h-5 text-amazon-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">Supported Payment Methods</p>
                  <p className="text-gray-600 mt-0.5">
                    UPI (Google Pay, PhonePe, Paytm, BHIM), RuPay, Visa, MasterCard, and Netbanking across 50+ banks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">RBI Authorized & PCI-DSS Compliant</p>
                  <p className="text-gray-600 mt-0.5">
                    Operating on certified Razorpay Payment Gateway infrastructure with HMAC SHA256 signature verification.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSecurityModalOpen(false)}
                className="w-full py-2.5 bg-amazon-dark text-amazon-yellow font-bold text-xs rounded-lg hover:bg-gray-800 shadow transition"
              >
                Close & Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Easy Returns Policy Modal */}
      {returnsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setReturnsModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 z-10 border border-gray-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-amazon-orange" />
                <h3 className="font-extrabold text-lg text-gray-900">7-Day Easy Returns</h3>
              </div>
              <button
                onClick={() => setReturnsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <RotateCcw className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-950">7-Day Replacement Guarantee</p>
                  <p className="text-amber-900 mt-0.5">
                    If an item is damaged, defective, or different from described, you can request a replacement or return within 7 days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Truck className="w-5 h-5 text-amazon-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">Free Doorstep Pickup</p>
                  <p className="text-gray-600 mt-0.5">
                    Our Amazon courier executive will collect the item from your delivery doorstep at zero cost.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <PackageCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">Instant Refund Verification</p>
                  <p className="text-gray-600 mt-0.5">
                    Refunds are initiated directly to your Razorpay/original bank source upon item inspection.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/orders"
                onClick={() => setReturnsModalOpen(false)}
                className="w-full py-2.5 bg-amazon-yellow text-amazon-dark font-extrabold text-xs rounded-lg hover:bg-yellow-400 shadow text-center transition"
              >
                View Your Orders & Request Return →
              </Link>
              <button
                onClick={() => setReturnsModalOpen(false)}
                className="w-full py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-lg hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-amazon-bg flex items-center justify-center text-gray-500 font-bold">Loading Amazon Store...</div>}>
      <HomeContent />
    </Suspense>
  );
}
