'use client';

import React from 'react';
import { Menu } from 'lucide-react';

export default function SubHeader({ selectedCategory = 'All', onCategorySelect }) {
  const categories = ['All', 'Electronics', 'Mobiles', 'Fashion', 'Home', 'Books'];

  return (
    <div className="bg-amazon-light_dark text-white text-sm px-4 py-1.5 flex items-center gap-4 overflow-x-auto whitespace-nowrap shadow-sm border-t border-gray-700">
      <div className="flex items-center gap-1 font-bold cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1 rounded">
        <Menu className="w-5 h-5" />
        <span>All Departments</span>
      </div>

      <div className="flex items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategorySelect && onCategorySelect(cat)}
            className={`px-2.5 py-1 rounded text-xs sm:text-sm font-medium transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-amazon-yellow text-amazon-dark font-bold'
                : 'hover:outline hover:outline-1 hover:outline-white text-gray-200'
            }`}
          >
            {cat === 'All' ? "Today's Deals" : cat}
          </button>
        ))}
      </div>

      <div className="ml-auto hidden lg:flex items-center gap-4 text-xs font-semibold text-amazon-yellow">
        <span>Amazon Prime Great Summer Sale is Live!</span>
      </div>
    </div>
  );
}
