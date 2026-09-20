'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/';
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(name, email, password);
      router.push(redirect);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8 px-4">
      {/* Amazon Logo */}
      <Link href="/" className="mb-6 flex items-baseline font-bold text-3xl tracking-tighter">
        <span className="text-black">amazon</span>
        <span className="text-amazon-orange text-lg font-semibold ml-0.5">.in</span>
      </Link>

      {/* Registration Box */}
      <div className="w-full max-w-sm bg-white p-6 border border-gray-300 rounded shadow-sm">
        <h1 className="text-2xl font-normal text-gray-900 mb-4">Create Account</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-xs mb-4 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-800 mb-1">Your name</label>
            <input
              type="text"
              placeholder="First and last name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-400 p-2 rounded focus:border-amazon-orange focus:outline-none"
              required
            />
          </div>

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
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 p-2 rounded focus:border-amazon-orange focus:outline-none"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] font-medium text-xs rounded text-black hover:from-[#f5d78e] hover:to-[#eeb933] shadow-sm cursor-pointer"
          >
            {loading ? 'Creating Account...' : 'Create your Amazon account'}
          </button>
        </form>

        <p className="text-[11px] text-gray-600 mt-4 border-t pt-3">
          Already have an account?{' '}
          <Link href="/login" className="text-amazon-blue hover:underline font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-gray-500 font-bold">Loading Registration...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
