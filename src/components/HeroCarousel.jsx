'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    title: "Amazon Electronics & Smart Tech Festival",
    subtitle: "Up to 50% OFF on Laptops, Headphones & Smartphones",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1600&q=80",
    badge: "Limited Time Deals"
  },
  {
    id: 2,
    title: "Next-Gen Smartphones & Accessories",
    subtitle: "Upgrade to Titanium Grade Flagship Mobile Phones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
    badge: "Prime Exclusive"
  },
  {
    id: 3,
    title: "Summer Fashion & Lifestyle Trends",
    subtitle: "Top Brands | Footwear | Smartwatches | Men & Women Wear",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    badge: "Big Discounts"
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  return (
    <div className="relative w-full max-w-[1500px] mx-auto h-[250px] sm:h-[350px] md:h-[420px] overflow-hidden group">
      {/* Background Slides */}
      {BANNERS.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for Amazon effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-amazon-bg via-transparent to-black/40 flex flex-col justify-end p-6 sm:p-12 text-white">
            <span className="bg-amazon-yellow text-amazon-dark font-black text-xs px-3 py-1 rounded w-fit mb-2 shadow">
              {banner.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold drop-shadow-md max-w-2xl">
              {banner.title}
            </h2>
            <p className="text-sm sm:text-lg text-gray-200 mt-1 font-medium max-w-xl">
              {banner.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-r-md transition opacity-80 group-hover:opacity-100"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-l-md transition opacity-80 group-hover:opacity-100"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}
