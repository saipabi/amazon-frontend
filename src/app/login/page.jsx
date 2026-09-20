'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Lock, Sparkles } from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/';
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push(redirect);
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('testrajesh@amazon.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8 px-4">
      {/* Amazon Logo */}
      <Link href="/" className="mb-6 flex items-baseline font-bold text-3xl tracking-tighter">
        <span className="text-black">amazon</span>
        <span className="text-amazon-orange text-lg font-semibold ml-0.5">.in</span>
      </Link>

      {/* Login Box */}
      <div className="w-full max-w-sm bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h1 className="text-2xl font-normal text-gray-900 mb-4">Sign in</h1>

        {/* Quick Demo Fill Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded p-2.5 mb-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amazon-orange" /> Quick Demo Test:
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs bg-amazon-yellow text-amazon-dark px-2 py-0.5 rounded font-bold hover:bg-yellow-400 shadow-sm cursor-pointer"
            >
              Auto Fill
            </button>
          </div>
          <p className="text-[11px] text-gray-600 mt-1">
            Email: <b>testrajesh@amazon.com</b> | Pass: <b>password123</b>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-xs mb-4 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-800 mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 p-2 rounded focus:border-amazon-orange focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 p-2 rounded focus:border-amazon-orange focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] font-medium text-xs rounded text-black hover:from-[#f5d78e] hover:to-[#eeb933] shadow-sm cursor-pointer"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-[11px] text-gray-600 mt-4 leading-normal">
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
      </div>

      {/* New to Amazon Divider */}
      <div className="w-full max-w-sm flex items-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-3 text-xs text-gray-500 font-normal">New to Amazon?</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Create Account Link */}
      <Link
        href="/register"
        className="w-full max-w-sm py-2 bg-gray-100 border border-gray-400 rounded text-center text-xs font-medium text-black hover:bg-gray-200 shadow-sm"
      >
        Create your Amazon account
      </Link>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-gray-500 font-bold">Loading Sign in...</div>}>
      <LoginContent />
    </Suspense>
  );
}
