const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://amazon-backend-wuf3.onrender.com/api';

export const fetchProducts = async (category = 'All', search = '') => {
  try {
    let url = `${API_URL}/products?category=${encodeURIComponent(category)}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (error) {
    console.warn('API fetch products error, using fallback:', error.message);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Product not found');
    return await res.json();
  } catch (error) {
    console.error('Fetch product by id error:', error.message);
    return null;
  }
};

export const loginUserApi = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const registerUserApi = async (name, email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

export const createRazorpayOrderApi = async (amount) => {
  const res = await fetch(`${API_URL}/payment/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create payment order');
  return data;
};

export const verifyRazorpayPaymentApi = async (paymentData) => {
  const res = await fetch(`${API_URL}/payment/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });
  return await res.json();
};

export const createOrderApi = async (orderData, token) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(orderData),
  });
  return await res.json();
};
