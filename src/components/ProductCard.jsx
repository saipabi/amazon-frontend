'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const formatPrice = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col justify-between product-card-hover relative z-0">
      <Link href={`/product/${product._id}`} className="block group">
        {/* Product High-Resolution Image Container */}
        <div className="w-full h-48 sm:h-56 relative mb-3 flex items-center justify-center bg-gray-50 rounded overflow-hidden p-2">
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Category & Brand Tag */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span className="font-semibold uppercase tracking-wider text-amazon-blue">{product.brand || 'Amazon Choice'}</span>
          <span>{product.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug group-hover:text-amazon-orange transition-colors mb-2">
          {product.title}
        </h3>

        {/* Star Rating & Review Count */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center text-amazon-orange">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 fill-current ${
                  i < Math.floor(product.rating || 4.5) ? 'text-amazon-orange' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-amazon-blue">
            {product.rating || 4.5}
          </span>
          <span className="text-xs text-gray-500">({product.numReviews || 120})</span>
        </div>

        {/* Price & Discount */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs font-bold text-amazon-price">
                ({product.discountPercentage || 15}% off)
              </span>
            </>
          )}
        </div>

        {/* Prime Badge & FREE Delivery */}
        {product.isPrime !== false && (
          <div className="flex items-center gap-2 mb-3">
            <span className="prime-badge">✓prime</span>
            <span className="text-xs text-gray-600 font-medium">FREE Delivery Tomorrow</span>
          </div>
        )}
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={handleAdd}
        className={`w-full py-2 rounded-md text-xs font-bold transition flex items-center justify-center gap-1 shadow-sm cursor-pointer ${
          added
            ? 'bg-green-600 text-white'
            : 'bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark border border-[#a88734]'
        }`}
      >
        {added ? (
          <>
            <Check className="w-4 h-4" /> Added to Cart!
          </>
        ) : (
          'Add to Cart'
        )}
      </button>
    </div>
  );
}
