'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import HeroCarousel from '../components/HeroCarousel';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/api';
import { Sparkles, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const [category, setCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadProducts(category, search);
  }, [category]);

  const loadProducts = async (cat, searchTerm) => {
    setLoading(true);
    const data = await fetchProducts(cat, searchTerm);
    setProducts(data);
    setLoading(false);
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

        {/* Section Title */}
        <div className="bg-white p-4 rounded-t-lg border border-gray-200 flex items-center justify-between mb-0">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>{category === 'All' ? "Today's Great Deals & Best Sellers" : `${category} Collection`}</span>
            <span className="text-xs bg-red-600 text-white font-black px-2 py-0.5 rounded">UP TO 50% OFF</span>
          </h1>
          <span className="text-xs text-gray-500">{products.length} Products Available</span>
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
            <p className="text-gray-600 font-semibold text-lg">No products found matching your search.</p>
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
