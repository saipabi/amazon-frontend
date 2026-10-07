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
    <div className="relative w-full max-w-[1500px] mx-auto h-[210px] sm:h-[280px] md:h-[370px] overflow-hidden group select-none">
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
          {/* Dual Gradient Overlay: Dark contrast at top for crystal clear text, smooth fade at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-transparent flex flex-col justify-start pt-3.5 sm:pt-6 md:pt-10 px-11 sm:px-16 md:px-20 text-white">
            {/* Badge - Compact, sleek Amazon deal pill */}
            <div className="mb-1 sm:mb-2">
              <span className="inline-block bg-amazon-yellow text-amazon-dark font-black text-[9px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded shadow-md tracking-wide uppercase">
                {banner.badge}
              </span>
            </div>

            {/* Title - Reduced mobile font size (text-[13px] sm:text-lg md:text-2xl) to prevent horizontal collision */}
            <h2 className="text-[13px] sm:text-xl md:text-2xl lg:text-3xl font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] max-w-xs sm:max-w-lg md:max-w-2xl leading-snug text-white line-clamp-2">
              {banner.title}
            </h2>

            {/* Subtitle - Clean, readable and compact */}
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-200 mt-0.5 sm:mt-1 font-medium max-w-[260px] sm:max-w-md md:max-w-xl line-clamp-1 sm:line-clamp-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              {banner.subtitle}
            </p>
          </div>

          {/* Bottom gradient fade that transitions smoothly into the page background */}
          <div className="absolute inset-x-0 bottom-0 h-12 sm:h-20 bg-gradient-to-t from-amazon-bg via-amazon-bg/60 to-transparent pointer-events-none" />
        </div>
      ))}

      {/* Navigation Buttons: Compact circular floating buttons with clear margin */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/80 text-white flex items-center justify-center transition opacity-80 hover:opacity-100 cursor-pointer backdrop-blur-sm border border-white/20 shadow-md hover:scale-105 active:scale-95"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/80 text-white flex items-center justify-center transition opacity-80 hover:opacity-100 cursor-pointer backdrop-blur-sm border border-white/20 shadow-md hover:scale-105 active:scale-95"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-1.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex
                ? 'w-4 sm:w-5 h-1 sm:h-1.5 bg-amazon-yellow shadow'
                : 'w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/50 hover:bg-white/90'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
