'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, X, Check, Building2, Navigation, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Predefined major Indian PIN codes for instant auto-recognition
const PINCODE_MAP = {
  '600': 'Chennai, Tamil Nadu',
  '601': 'Chennai Region, Tamil Nadu',
  '602': 'Tiruvallur, Tamil Nadu',
  '641': 'Coimbatore, Tamil Nadu',
  '625': 'Madurai, Tamil Nadu',
  '620': 'Tiruchirappalli, Tamil Nadu',
  '636': 'Salem, Tamil Nadu',
  '560': 'Bengaluru, Karnataka',
  '500': 'Hyderabad, Telangana',
  '400': 'Mumbai, Maharashtra',
  '110': 'New Delhi, Delhi',
  '700': 'Kolkata, West Bengal',
  '411': 'Pune, Maharashtra',
  '380': 'Ahmedabad, Gujarat',
  '302': 'Jaipur, Rajasthan',
  '682': 'Kochi, Kerala',
};

const POPULAR_CITIES = [
  { name: 'Chennai', pincode: '600001', state: 'Tamil Nadu' },
  { name: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu' },
  { name: 'Madurai', pincode: '625001', state: 'Tamil Nadu' },
  { name: 'Bengaluru', pincode: '560001', state: 'Karnataka' },
  { name: 'Hyderabad', pincode: '500081', state: 'Telangana' },
  { name: 'Mumbai', pincode: '400001', state: 'Maharashtra' },
  { name: 'New Delhi', pincode: '110001', state: 'Delhi' },
  { name: 'Kolkata', pincode: '700001', state: 'West Bengal' },
];

export default function DeliveryLocationModal({ isOpen, onClose, onLocationSelect }) {
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');
  const [activeLocation, setActiveLocation] = useState({
    city: 'Hyderabad',
    pincode: '500081',
    state: 'Telangana',
  });
  const [showFullAddressForm, setShowFullAddressForm] = useState(false);
  const [fullAddress, setFullAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedLoc = localStorage.getItem('amazon_delivery_location');
        if (storedLoc) {
          setActiveLocation(JSON.parse(storedLoc));
        }
        const storedAddr = localStorage.getItem('amazon_user_address');
        if (storedAddr) {
          setFullAddress(JSON.parse(storedAddr));
        }
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApplyPincode = (e) => {
    if (e) e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setError('Please enter a valid 6-digit Indian PIN code (e.g. 600001)');
      return;
    }

    const prefix = cleanPin.substring(0, 3);
    const resolvedName = PINCODE_MAP[prefix] || 'India';
    const city = resolvedName.split(',')[0].trim();
    const state = resolvedName.split(',')[1]?.trim() || 'India';

    const newLoc = { city, pincode: cleanPin, state };
    saveAndNotify(newLoc);
  };

  const handleSelectCity = (cityItem) => {
    const newLoc = {
      city: cityItem.name,
      pincode: cityItem.pincode,
      state: cityItem.state,
    };
    saveAndNotify(newLoc);
  };

  const saveAndNotify = (loc) => {
    setActiveLocation(loc);
    setError('');
    setPincode('');
    setSavedSuccess(true);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('amazon_delivery_location', JSON.stringify(loc));
        // Also update city/pincode in user address
        const storedAddr = JSON.parse(localStorage.getItem('amazon_user_address') || '{}');
        localStorage.setItem(
          'amazon_user_address',
          JSON.stringify({
            ...storedAddr,
            city: loc.city,
            postalCode: loc.pincode,
          })
        );
        window.dispatchEvent(new Event('amazon_location_changed'));
      } catch (e) {}
    }

    if (onLocationSelect) {
      onLocationSelect(loc);
    }

    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleSaveFullAddress = (e) => {
    e.preventDefault();
    if (!fullAddress.fullName || !fullAddress.address || !fullAddress.postalCode) {
      setError('Please fill in required address fields');
      return;
    }

    const loc = {
      city: fullAddress.city || 'India',
      pincode: fullAddress.postalCode,
      state: 'India',
    };

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('amazon_user_address', JSON.stringify(fullAddress));
        localStorage.setItem('amazon_delivery_location', JSON.stringify(loc));
        window.dispatchEvent(new Event('amazon_location_changed'));
      } catch (e) {}
    }

    setActiveLocation(loc);
    setSavedSuccess(true);
    if (onLocationSelect) onLocationSelect(loc);

    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-200">
        {/* Amazon Header Bar */}
        <div className="bg-gray-100 px-5 py-3.5 border-b border-gray-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amazon-orange" />
            <h3 className="font-extrabold text-base text-gray-900">Choose your location</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black p-1 rounded hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[85vh] overflow-y-auto text-xs sm:text-sm">
          <p className="text-gray-600 text-xs leading-relaxed">
            Select a delivery location to see product availability and guaranteed delivery options for your area.
          </p>

          {/* Current Active Location Card */}
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Navigation className="w-4 h-4 text-amazon-orange shrink-0" />
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase block">Currently Delivering To</span>
                <span className="font-bold text-gray-900 text-sm">
                  {activeLocation.city} {activeLocation.pincode ? `- ${activeLocation.pincode}` : ''}
                </span>
                {activeLocation.state && <span className="text-xs text-gray-600 block">({activeLocation.state})</span>}
              </div>
            </div>
            <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-300">
              Active
            </span>
          </div>

          {savedSuccess && (
            <div className="bg-green-50 border border-green-300 text-green-800 px-3 py-2 rounded flex items-center gap-2 text-xs font-semibold animate-pulse">
              <Check className="w-4 h-4 text-green-600" />
              <span>Location updated successfully! Delivery options refreshed.</span>
            </div>
          )}

          {/* Form: Enter Indian PIN code */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              Enter an Indian pincode
            </label>
            <form onSubmit={handleApplyPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="e.g. 600001, 560001"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange focus:outline-none"
              />
              <button
                type="submit"
                className="bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-extrabold px-4 py-2 rounded text-xs transition shadow-sm border border-[#a88734] cursor-pointer"
              >
                Apply
              </button>
            </form>
            {error && (
              <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {error}
              </p>
            )}
          </div>

          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400 font-semibold">or select popular city</span>
            </div>
          </div>

          {/* Quick Select Popular Cities */}
          <div className="grid grid-cols-2 gap-2">
            {POPULAR_CITIES.map((c) => (
              <button
                key={c.name}
                onClick={() => handleSelectCity(c)}
                type="button"
                className={`flex items-center justify-between p-2.5 rounded border text-left transition cursor-pointer ${
                  activeLocation.city === c.name
                    ? 'border-amazon-orange bg-amber-50/60 font-bold text-amazon-dark ring-1 ring-amazon-orange'
                    : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-gray-800'
                }`}
              >
                <div>
                  <span className="block text-xs font-bold text-gray-900">{c.name}</span>
                  <span className="block text-[11px] text-gray-500 font-normal">{c.pincode} • {c.state}</span>
                </div>
                <MapPin className={`w-3.5 h-3.5 ${activeLocation.city === c.name ? 'text-amazon-orange' : 'text-gray-400'}`} />
              </button>
            ))}
          </div>

          {/* Collapsible: Full Doorstep Address for Checkout Delivery */}
          <div className="border-t border-gray-200 pt-3">
            <button
              type="button"
              onClick={() => setShowFullAddressForm(!showFullAddressForm)}
              className="text-xs font-bold text-amazon-blue hover:text-amazon-orange flex items-center gap-1 cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>{showFullAddressForm ? 'Hide Full Address Form ▲' : '+ Add / Edit Full Doorstep Delivery Address ▼'}</span>
            </button>

            {showFullAddressForm && (
              <form onSubmit={handleSaveFullAddress} className="mt-3 space-y-2.5 bg-gray-50 p-3 rounded border border-gray-200">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Recipient Full Name"
                    value={fullAddress.fullName}
                    onChange={(e) => setFullAddress({ ...fullAddress, fullName: e.target.value })}
                    className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white focus:outline-none focus:border-amazon-orange"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700">Mobile Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={fullAddress.phone}
                    onChange={(e) => setFullAddress({ ...fullAddress, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white focus:outline-none focus:border-amazon-orange"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700">Flat / House No / Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="House / Flat No., Apartment Name, Street"
                    value={fullAddress.address}
                    onChange={(e) => setFullAddress({ ...fullAddress, address: e.target.value })}
                    className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white focus:outline-none focus:border-amazon-orange"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700">City</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chennai"
                      value={fullAddress.city}
                      onChange={(e) => setFullAddress({ ...fullAddress, city: e.target.value })}
                      className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white focus:outline-none focus:border-amazon-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700">Pincode</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="6-digit pincode"
                      value={fullAddress.postalCode}
                      onChange={(e) => setFullAddress({ ...fullAddress, postalCode: e.target.value })}
                      className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white focus:outline-none focus:border-amazon-orange"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-bold py-2 rounded text-xs transition border border-[#a88734] mt-2 cursor-pointer"
                >
                  Save Address & Set as Default Delivery
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex items-center justify-between text-xs">
          <Link
            href="/login"
            onClick={onClose}
            className="text-amazon-blue hover:text-amazon-orange font-semibold"
          >
            Sign in to see saved addresses
          </Link>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded cursor-pointer transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
