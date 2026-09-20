'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import HeroCarousel from '../components/HeroCarousel';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/api';
import { Sparkles, Truck, ShieldCheck, RefreshCw, Filter, Shirt } from 'lucide-react';

function HomeContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams?.get('category') || 'All';
  const urlSearch = searchParams?.get('search') || '';

  const [category, setCategory] = useState(urlCategory);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(urlSearch);
  const [minDiscount, setMinDiscount] = useState(0);

  const displayedProducts = minDiscount > 0
    ? products.filter((p) => (p.discountPercentage || 0) >= minDiscount)
    : products;

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
        {/* Amazon Value Props Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3 border border-gray-200">
            <Truck className="w-8 h-8 text-amazon-orange" />
            <div>
              <p className="font-bold text-xs sm:text-sm text-gray-900">Fast & Free Shipping</p>
              <p className="text-xs text-gray-500">On all Prime eligible items</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3 border border-gray-200">
            <ShieldCheck className="w-8 h-8 text-amazon-orange" />
            <div>
              <p className="font-bold text-xs sm:text-sm text-gray-900">Razorpay Secured</p>
              <p className="text-xs text-gray-500">100% Safe Payments</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3 border border-gray-200">
            <RefreshCw className="w-8 h-8 text-amazon-orange" />
            <div>
              <p className="font-bold text-xs sm:text-sm text-gray-900">Easy Returns</p>
              <p className="text-xs text-gray-500">7-Day Replacement Guarantee</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3 border border-gray-200">
            <Sparkles className="w-8 h-8 text-amazon-orange" />
            <div>
              <p className="font-bold text-xs sm:text-sm text-gray-900">Clear HD Quality</p>
              <p className="text-xs text-gray-500">Original Verified Products</p>
            </div>
          </div>
        </div>

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
