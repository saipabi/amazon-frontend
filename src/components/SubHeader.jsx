'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronRight,
  User,
  ShoppingBag,
  Smartphone,
  Laptop,
  Shirt,
  Sparkles,
  Home,
  BookOpen,
  PackageCheck,
  Flame,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SubHeader({ selectedCategory = 'All', onCategorySelect }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  const categories = [
    'All',
    'Electronics',
    'Mobiles',
    'Fashion',
    "Men's Wear",
    "Women's Wear",
    "Kids' Wear",
    'Home',
    'Books',
  ];

  const departmentList = [
    { name: 'Electronics', label: 'Electronics & Audio', icon: Laptop },
    { name: 'Mobiles', label: 'Mobiles & Smartphones', icon: Smartphone },
    { name: "Men's Wear", label: "Men's Clothing & Dresses", icon: Shirt },
    { name: "Women's Wear", label: "Women's Clothing & Dresses", icon: Shirt },
    { name: "Kids' Wear", label: "Kids' Clothing & Dresses", icon: Shirt },
    { name: 'Fashion', label: 'All Fashion (Accessories & Wear)', icon: Sparkles },
    { name: 'Home', label: 'Home & Kitchen', icon: Home },
    { name: 'Books', label: 'Books & E-Readers', icon: BookOpen },
  ];

  const handleCategoryClick = (cat) => {
    setIsDrawerOpen(false);
    if (pathname === '/' && onCategorySelect) {
      onCategorySelect(cat);
    } else {
      router.push(cat === 'All' ? '/' : `/?category=${encodeURIComponent(cat)}`);
    }
  };

  const handleNavigate = (path) => {
    setIsDrawerOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* Horizontal SubHeader Bar */}
      <div className="bg-amazon-light_dark text-white text-sm px-4 py-1.5 flex items-center gap-2 sm:gap-3 overflow-x-auto whitespace-nowrap shadow-sm border-t border-gray-700">
        {/* All Departments Trigger Button */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-1.5 font-bold cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1 rounded shrink-0 transition"
          aria-label="Open All Departments Menu"
        >
          <Menu className="w-5 h-5 text-amazon-yellow" />
          <span>All Departments</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-2.5 py-1 rounded text-xs sm:text-sm font-medium transition cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-amazon-yellow text-amazon-dark font-bold shadow'
                  : 'hover:outline hover:outline-1 hover:outline-white text-gray-200'
              }`}
            >
              {cat === 'All' ? "Today's Deals" : cat}
            </button>
          ))}
        </div>

        <div className="ml-auto hidden lg:flex items-center gap-4 text-xs font-semibold text-amazon-yellow shrink-0">
          <span>Amazon Prime Great Summer Sale is Live!</span>
        </div>
      </div>

      {/* Slide-out Sidebar Drawer (Amazon Style) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity duration-300"
          />

          {/* Drawer Container */}
          <div className="relative w-full max-w-[365px] bg-white h-full shadow-2xl flex flex-col z-10 transform transition-transform duration-300 ease-out">
            {/* Drawer Header with User Info */}
            <div className="bg-[#232f3e] text-white p-4 flex items-center justify-between shadow-md">
              <div
                onClick={() => handleNavigate(user ? '/orders' : '/login')}
                className="flex items-center gap-3 cursor-pointer hover:opacity-90"
              >
                <div className="w-10 h-10 rounded-full bg-amazon-yellow text-amazon-dark flex items-center justify-center font-bold text-lg">
                  {user ? user.name.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
                </div>
                <div>
                  <p className="text-xs text-gray-300">Hello,</p>
                  <p className="text-base font-extrabold leading-tight">
                    {user ? user.name : 'Sign in'}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-white hover:text-amazon-yellow p-1.5 rounded-full hover:bg-gray-700 transition"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
              {/* Trending Section */}
              <div className="py-3">
                <h3 className="px-6 py-2 text-sm font-bold text-gray-900 tracking-wide uppercase">
                  Trending & Deals
                </h3>
                <button
                  onClick={() => handleCategoryClick('All')}
                  className="w-full px-6 py-2.5 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-100 transition text-left cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <Flame className="w-4 h-4 text-red-500" /> Today's Great Deals
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => handleCategoryClick('All')}
                  className="w-full px-6 py-2.5 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-100 transition text-left cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-amazon-orange" /> Best Sellers
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Shop by Department Section */}
              <div className="py-3">
                <h3 className="px-6 py-2 text-sm font-bold text-gray-900 tracking-wide uppercase">
                  Shop By Department
                </h3>
                {departmentList.map((dept) => {
                  const Icon = dept.icon;
                  const isSelected = selectedCategory === dept.name;
                  return (
                    <button
                      key={dept.name}
                      onClick={() => handleCategoryClick(dept.name)}
                      className={`w-full px-6 py-2.5 flex items-center justify-between text-sm text-left transition cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50 text-amazon-orange font-bold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-amazon-orange' : 'text-gray-500'}`} />
                        {dept.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  );
                })}
              </div>

              {/* Programs & Features */}
              <div className="py-3">
                <h3 className="px-6 py-2 text-sm font-bold text-gray-900 tracking-wide uppercase">
                  Help & Settings
                </h3>
                <button
                  onClick={() => handleNavigate('/orders')}
                  className="w-full px-6 py-2.5 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-100 transition text-left cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <PackageCheck className="w-4 h-4 text-gray-500" /> Your Orders & History
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => handleNavigate('/cart')}
                  className="w-full px-6 py-2.5 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-100 transition text-left cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-gray-500" /> Your Shopping Cart
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => handleNavigate(user ? '/orders' : '/login')}
                  className="w-full px-6 py-2.5 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-100 transition text-left cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <User className="w-4 h-4 text-gray-500" /> Your Account Details
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
