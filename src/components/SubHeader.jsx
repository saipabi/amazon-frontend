'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

export default function SubHeader({ selectedCategory = 'All', onCategorySelect }) {
  const router = useRouter();
  const pathname = usePathname();

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

  const handleCategoryClick = (cat) => {
    if (pathname === '/' && onCategorySelect) {
      onCategorySelect(cat);
    } else {
      router.push(cat === 'All' ? '/' : `/?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div className="bg-amazon-light_dark text-white text-sm px-4 py-1.5 flex items-center gap-2 sm:gap-3 overflow-x-auto whitespace-nowrap shadow-sm border-t border-gray-700">
      <div
        onClick={() => router.push('/')}
        className="flex items-center gap-1 font-bold cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1 rounded shrink-0"
      >
        <Menu className="w-5 h-5 text-amazon-yellow" />
        <span>All Departments</span>
      </div>

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
  );
}
