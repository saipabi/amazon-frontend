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
    const data = await fetchProducts(cat, searchTerm);
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

        {/* Fashion Sub-Category Quick Filter Pills */}
        {isFashionCategory && (
          <div className="bg-white p-3 rounded-t-lg border border-b-0 border-gray-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-700 flex items-center gap-1 mr-2">
              <Shirt className="w-4 h-4 text-amazon-orange" /> Select Department:
            </span>
            <button
              onClick={() => setCategory("Men's Wear")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                category === "Men's Wear"
                  ? 'bg-amazon-dark text-amazon-yellow font-bold shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              👔 Men's Dresses Only
            </button>
            <button
              onClick={() => setCategory("Women's Wear")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                category === "Women's Wear"
                  ? 'bg-amazon-dark text-amazon-yellow font-bold shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              👗 Women's Dresses Only
            </button>
            <button
              onClick={() => setCategory("Kids' Wear")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                category === "Kids' Wear"
                  ? 'bg-amazon-dark text-amazon-yellow font-bold shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              👶 Kids' Dresses Only
            </button>
            <button
              onClick={() => setCategory('Fashion')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                category === 'Fashion'
                  ? 'bg-amazon-dark text-amazon-yellow font-bold shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✨ All Fashion (Clothing + Accessories)
            </button>
          </div>
        )}

        {/* Section Title */}
        <div className={`bg-white p-4 ${isFashionCategory ? '' : 'rounded-t-lg'} border border-gray-200 flex items-center justify-between mb-0`}>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>{getSectionTitle()}</span>
            <span className="text-xs bg-red-600 text-white font-black px-2 py-0.5 rounded">UP TO 50% OFF</span>
          </h1>
          <span className="text-xs text-gray-500">{products.length} Items Available</span>
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
        ) : products.length === 0 ? (
          <div className="bg-white p-12 text-center border border-t-0 border-gray-200 rounded-b-lg">
            <p className="text-gray-600 font-semibold text-lg">No items found matching your filter.</p>
            <button
              onClick={() => setCategory('All')}
              className="mt-4 btn-amazon-primary text-sm font-bold"
            >
              Browse All Categories
            </button>
          </div>
        ) : (
          <div className="bg-white p-4 border border-t-0 border-gray-200 rounded-b-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
