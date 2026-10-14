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

// ==========================================
// PROJECT TRACKER API SERVICES
// ==========================================

export const fetchProjectStats = async (token) => {
  try {
    const res = await fetch(`${API_URL}/projects/stats/summary`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return await res.json();
  } catch (err) {
    console.warn('Fetch stats fallback:', err.message);
    return { totalProjects: 3, totalTasks: 5, overallCompletion: 68, activeProjects: 2, completedProjects: 1 };
  }
};

export const fetchProjects = async (token, search = '', status = '', category = '') => {
  try {
    let url = `${API_URL}/projects?`;
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status && status !== 'All') params.append('status', status);
    if (category && category !== 'All') params.append('category', category);
    url += params.toString();

    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (err) {
    console.warn('Fetch projects fallback:', err.message);
    return [];
  }
};

export const fetchProjectById = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch project');
    return await res.json();
  } catch (err) {
    console.error('Fetch project by id error:', err.message);
    return null;
  }
};

export const createProjectApi = async (projectData, token) => {
  const res = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(projectData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create project');
  return data;
};

export const updateProjectApi = async (id, projectData, token) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(projectData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update project');
  return data;
};

export const deleteProjectApi = async (id, token) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete project');
  return data;
};

export const fetchTasks = async (token, { priority = '', status = '', project = '', search = '' } = {}) => {
  try {
    let url = `${API_URL}/tasks?`;
    const params = new URLSearchParams();
    if (priority && priority !== 'All') params.append('priority', priority);
    if (status && status !== 'All') params.append('status', status);
    if (project && project !== 'All') params.append('project', project);
    if (search) params.append('search', search);
    url += params.toString();

    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return await res.json();
  } catch (err) {
    console.warn('Fetch tasks fallback:', err.message);
    return [];
  }
};

export const createTaskApi = async (taskData, token) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(taskData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create task');
  return data;
};

export const updateTaskApi = async (id, taskData, token) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(taskData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update task');
  return data;
};

export const deleteTaskApi = async (id, token) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete task');
  return data;
};

