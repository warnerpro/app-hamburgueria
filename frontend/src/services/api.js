import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email, password) => apiClient.post('/users/login', { email, password }),
  register: (name, email, password, role) =>
    apiClient.post('/users/register', { name, email, password, role })
};

export const customerService = {
  list: () => apiClient.get('/customers'),
  get: (id) => apiClient.get(`/customers/${id}`),
  create: (data) => apiClient.post('/customers', data),
  update: (id, data) => apiClient.put(`/customers/${id}`, data),
  delete: (id) => apiClient.delete(`/customers/${id}`)
};

export const productService = {
  list: (category = null) => {
    const params = category ? { category } : {};
    return apiClient.get('/products', { params });
  },
  get: (id) => apiClient.get(`/products/${id}`),
  create: (data) => apiClient.post('/products', data),
  update: (id, data) => apiClient.put(`/products/${id}`, data),
  delete: (id) => apiClient.delete(`/products/${id}`)
};

export const orderService = {
  list: (status = null) => {
    const params = status ? { status } : {};
    return apiClient.get('/orders', { params });
  },
  get: (id) => apiClient.get(`/orders/${id}`),
  create: (data) => apiClient.post('/orders', data),
  updateStatus: (id, status) => apiClient.put(`/orders/${id}/status`, { status }),
  cancel: (id) => apiClient.put(`/orders/${id}/cancel`),
  delete: (id) => apiClient.delete(`/orders/${id}`)
};

export default apiClient;
