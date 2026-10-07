'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, MapPin, User, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import DeliveryLocationModal from './DeliveryLocationModal';

export default function Header({ selectedCategory = 'All', onCategoryChange }) {
  const router = useRouter();
  const { totalItemsCount } = useCart();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(selectedCategory);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState({ city: 'India', pincode: '' });

  useEffect(() => {
    const loadLocation = () => {
      try {
        const stored = localStorage.getItem('amazon_delivery_location');
        if (stored) {
          setDeliveryLocation(JSON.parse(stored));
        } else {
          setDeliveryLocation({ city: 'India', pincode: 'Update location' });
        }
      } catch (e) {}
    };

    loadLocation();
    window.addEventListener('amazon_location_changed', loadLocation);
    return () => window.removeEventListener('amazon_location_changed', loadLocation);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/?category=${encodeURIComponent(category)}&search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header className="bg-amazon-dark text-white sticky top-0 z-50 shadow-md">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-3 py-2 gap-2 max-w-[1500px] mx-auto">
        {/* Amazon Logo */}
        <Link href="/" className="flex items-center p-1 rounded hover:outline hover:outline-1 hover:outline-white shrink-0">
          <div className="flex items-baseline font-bold text-2xl tracking-tighter">
            <span className="text-white">amazon</span>
            <span className="text-amazon-yellow text-sm font-semibold ml-0.5">.in</span>
          </div>
        </Link>

        {/* Deliver To Widget (Desktop only) */}
        <div
          onClick={() => setIsLocationModalOpen(true)}
          className="hidden md:flex items-center gap-1.5 p-2 rounded hover:outline hover:outline-1 hover:outline-white cursor-pointer text-xs group transition shrink-0"
          title="Click to choose delivery location"
        >
          <MapPin className="w-5 h-5 text-gray-300 group-hover:text-amazon-yellow transition self-end mb-0.5" />
          <div className="flex flex-col">
            <span className="text-gray-400 font-normal truncate max-w-[130px]">
              Delivering to {deliveryLocation.city || 'India'}
            </span>
            <span className="font-bold text-white leading-tight">
              {deliveryLocation.pincode || 'Update location'}
            </span>
          </div>
        </div>

        {/* Amazon Search Bar (Desktop only) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-3xl items-center h-10 rounded-md overflow-hidden bg-white text-black shadow-inner mx-2">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (onCategoryChange) onCategoryChange(e.target.value);
            }}
            className="bg-gray-100 border-r border-gray-300 text-xs px-2 h-full text-gray-700 font-medium focus:outline-none cursor-pointer hover:bg-gray-200 shrink-0"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Fashion">Fashion (All)</option>
            <option value="Men's Wear">Men's Wear</option>
            <option value="Women's Wear">Women's Wear</option>
            <option value="Kids' Wear">Kids' Wear</option>
            <option value="Home">Home</option>
            <option value="Books">Books</option>
          </select>
          <input
            type="text"
            placeholder="Search Amazon.in"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 text-sm focus:outline-none text-gray-800 placeholder-gray-500"
          />
          <button
            type="submit"
            aria-label="Search"
            className="bg-amazon-yellow hover:bg-amazon-orange transition text-amazon-dark font-bold px-4 h-full flex items-center justify-center cursor-pointer shrink-0"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>
        </form>

        {/* Right Section: Account, Orders & Cart */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* User Account / Sign in */}
          {user ? (
            <div className="group relative p-1.5 sm:p-2 rounded hover:outline hover:outline-1 hover:outline-white cursor-pointer text-xs">
              <span className="text-gray-300 block truncate max-w-[90px] sm:max-w-none">Hello, {user.name}</span>
              <span className="font-bold flex items-center gap-0.5 text-white">
                Account <ChevronDown className="w-3 h-3" />
              </span>
              <div className="hidden group-hover:block absolute right-0 top-full pt-1 z-50">
                <div className="bg-white text-black p-3 rounded shadow-2xl border border-gray-200 w-44">
                  <p className="font-semibold text-gray-800 border-b pb-2 mb-2">Your Account</p>
                  <Link href="/orders" className="block text-sm py-1 hover:text-amazon-orange">Your Orders</Link>
                  <button
                    onClick={logout}
                    className="w-full text-left text-sm py-1 text-red-600 hover:underline mt-2 font-medium cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login" className="p-1.5 sm:p-2 rounded hover:outline hover:outline-1 hover:outline-white text-xs">
              <span className="text-gray-300 block">Hello, sign in</span>
              <span className="font-bold flex items-center gap-0.5 text-white">
                Account <ChevronDown className="w-3 h-3" />
              </span>
            </Link>
          )}

          {/* Returns & Orders (Desktop only) */}
          <Link href="/orders" className="hidden sm:block p-2 rounded hover:outline hover:outline-1 hover:outline-white text-xs">
            <span className="text-gray-300 block">Returns</span>
            <span className="font-bold text-white">& Orders</span>
          </Link>

          {/* Shopping Cart Widget */}
          <Link href="/cart" className="flex items-center gap-1 p-1.5 sm:p-2 rounded hover:outline hover:outline-1 hover:outline-white relative">
            <div className="relative">
              <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              <span className="absolute -top-1 left-2.5 sm:left-3 bg-amazon-yellow text-amazon-dark font-black text-[11px] sm:text-xs px-1.5 py-0.2 sm:py-0.5 rounded-full min-w-[18px] sm:min-w-[20px] text-center shadow">
                {totalItemsCount}
              </span>
            </div>
            <span className="font-bold text-sm hidden md:inline self-end mb-1">Cart</span>
          </Link>
        </div>
      </div>

      {/* Full-Width Mobile Search Bar (Mobile & Tablet) */}
      <div className="flex md:hidden px-3 pb-2.5">
        <form onSubmit={handleSearchSubmit} className="flex flex-1 items-center h-10 rounded-md overflow-hidden bg-white text-black shadow-inner">
          <input
            type="text"
            placeholder="Search Amazon.in (e.g. iPhone, Shirt, Laptop)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 text-sm focus:outline-none text-gray-800 placeholder-gray-500"
          />
          <button
            type="submit"
            aria-label="Search"
            className="bg-amazon-yellow hover:bg-amazon-orange transition text-amazon-dark font-bold px-4 h-full flex items-center justify-center cursor-pointer shrink-0"
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>
        </form>
      </div>

      {/* Mobile Delivery Location Bar (Mobile & Tablet) */}
      <div
        onClick={() => setIsLocationModalOpen(true)}
        className="flex md:hidden items-center justify-between px-3 py-2 bg-[#232f3e] border-t border-gray-700 text-xs text-gray-200 cursor-pointer hover:bg-gray-800 transition"
      >
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-4 h-4 text-amazon-yellow shrink-0" />
          <span className="truncate">
            Delivering to <b className="text-white">{deliveryLocation.city || 'India'}</b> {deliveryLocation.pincode ? `- ${deliveryLocation.pincode}` : ''}
          </span>
        </div>
        <span className="text-amazon-yellow font-bold text-[11px] shrink-0 ml-2">
          Update
        </span>
      </div>

      {/* Choose Delivery Location Modal */}
      <DeliveryLocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelect={(loc) => setDeliveryLocation(loc)}
      />
    </header>
  );
}
