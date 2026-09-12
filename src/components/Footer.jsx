'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-12 bg-amazon-dark text-white text-xs">
      {/* Back to top banner */}
      <button
        onClick={scrollToTop}
        className="w-full bg-amazon-light_dark hover:bg-gray-700 py-3 text-center text-sm font-semibold transition cursor-pointer"
      >
        Back to top
      </button>

      {/* Main Footer Links Grid */}
      <div className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-sm mb-3">Get to Know Us</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:underline">About Amazon</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Press Releases</a></li>
            <li><a href="#" className="hover:underline">Amazon Science</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm mb-3">Connect with Us</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm mb-3">Make Money with Us</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:underline">Sell on Amazon</a></li>
            <li><a href="#" className="hover:underline">Sell under Amazon Accelerator</a></li>
            <li><a href="#" className="hover:underline">Protect and Build Your Brand</a></li>
            <li><a href="#" className="hover:underline">Amazon Global Selling</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm mb-3">Let Us Help You</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/orders" className="hover:underline">Your Account</Link></li>
            <li><Link href="/orders" className="hover:underline">Returns Centre</Link></li>
            <li><a href="#" className="hover:underline">100% Purchase Protection</a></li>
            <li><a href="#" className="hover:underline">Help & Support</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-gray-400">
        <div className="flex items-center justify-center font-bold text-xl mb-2">
          <span>amazon</span>
          <span className="text-amazon-yellow text-xs ml-0.5">.in</span>
        </div>
        <p>© 2026 Amazon Clone - Built with Next.js, Node.js, MongoDB & Razorpay.</p>
      </div>
    </footer>
  );
}
