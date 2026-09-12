'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import SubHeader from '../../../components/SubHeader';
import { fetchProductById } from '../../../lib/api';
import { useCart } from '../../../context/CartContext';
import { Star, ShieldCheck, Truck, RotateCcw, Check, ShoppingCart, Zap } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadProduct(params.id);
    }
  }, [params.id]);

  const loadProduct = async (id) => {
    setLoading(true);
    const data = await fetchProductById(id);
    setProduct(data);
    if (data && data.images && data.images.length > 0) {
      setSelectedImage(data.images[0]);
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      router.push('/checkout');
    }
  };

  const formatPrice = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amazon-bg">
        <Header />
        <SubHeader />
        <div className="max-w-[1400px] mx-auto p-8 bg-white my-6 rounded-lg shadow-sm animate-pulse h-[600px]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-amazon-bg">
        <Header />
        <SubHeader />
        <div className="max-w-[1400px] mx-auto p-12 text-center bg-white my-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">Product Not Found</h2>
          <button onClick={() => router.push('/')} className="mt-4 btn-amazon-primary">
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amazon-bg">
      <Header />
      <SubHeader />

      <div className="max-w-[1400px] mx-auto p-4 sm:p-6 bg-white my-4 sm:my-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex md:flex-col gap-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded border p-1 overflow-hidden flex items-center justify-center cursor-pointer ${
                      selectedImage === img ? 'border-amazon-orange border-2' : 'border-gray-300'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="max-h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Main High-Res Image Display */}
            <div className="flex-1 h-80 sm:h-96 md:h-[450px] border border-gray-200 rounded p-4 flex items-center justify-center bg-gray-50">
              <img
                src={selectedImage || (product.images ? product.images[0] : '')}
                alt={product.title}
                className="max-h-full max-w-full object-contain hover:scale-110 transition duration-300 cursor-zoom-in"
              />
            </div>
          </div>

          {/* Center: Product Information (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-xs text-amazon-blue font-bold uppercase tracking-wider">
              Brand: {product.brand || 'Amazon Choice'}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              {product.title}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 border-b pb-3 border-gray-200">
              <div className="flex text-amazon-orange">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 fill-current ${
                      i < Math.floor(product.rating || 4.5) ? 'text-amazon-orange' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-amazon-blue">{product.rating || 4.5}</span>
              <span className="text-sm text-gray-500">| {product.numReviews || 120} ratings</span>
            </div>

            {/* Price section */}
            <div className="py-2 border-b border-gray-200">
              <div className="flex items-baseline gap-3">
                <span className="text-sm text-amazon-price font-bold">- {product.discountPercentage || 15}%</span>
                <span className="text-3xl font-extrabold text-gray-900">{formatPrice(product.price)}</span>
              </div>
              {product.originalPrice && (
                <p className="text-xs text-gray-500 mt-1">
                  M.R.P.: <span className="line-through">{formatPrice(product.originalPrice)}</span> (Inclusive of all taxes)
                </p>
              )}

              {/* Prime badge */}
              <div className="mt-2 flex items-center gap-2">
                <span className="prime-badge text-sm">✓prime</span>
                <span className="text-xs text-gray-700 font-semibold">FREE Delivery Tomorrow</span>
              </div>
            </div>

            {/* Description */}
            <div className="py-2">
              <h3 className="font-bold text-sm text-gray-900 mb-1">About this item</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features List */}
            {product.features && product.features.length > 0 && (
              <div className="py-2">
                <h4 className="font-bold text-xs text-gray-800 mb-2">Key Features & Technical Specs:</h4>
                <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1">
                  {product.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Buy / Add to Cart Box (3 cols) */}
          <div className="lg:col-span-3">
            <div className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm flex flex-col gap-4 sticky top-24">
              <span className="text-2xl font-bold text-amazon-price">{formatPrice(product.price * quantity)}</span>

              <div className="flex items-center gap-2 text-xs font-semibold text-green-700">
                <Check className="w-4 h-4" /> In Stock (Available for Dispatch)
              </div>

              {/* Delivery info */}
              <div className="text-xs space-y-2 border-t border-b py-3 border-gray-200">
                <div className="flex items-center gap-2 text-gray-700">
                  <Truck className="w-4 h-4 text-amazon-orange" />
                  <span>Ships from <b>Amazon India</b></span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <ShieldCheck className="w-4 h-4 text-amazon-orange" />
                  <span>Sold by <b>Official Verified Merchant</b></span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <RotateCcw className="w-4 h-4 text-amazon-orange" />
                  <span>7-Day Returnable & Exchangeable</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">Quantity:</span>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded p-1 text-sm bg-gray-50 focus:outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-full text-sm font-bold shadow-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark border border-[#a88734]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 bg-gradient-to-b from-[#ffa41c] to-[#ff8f00] text-white rounded-full text-sm font-bold hover:from-[#f39811] hover:to-[#e88100] shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" /> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
