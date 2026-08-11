import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('flux_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (typeof window !== 'undefined') {
    const adminKey = localStorage.getItem('admin_key');
    if (adminKey) {
      config.headers['x-admin-key'] = adminKey;
    }
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  getDashboard: () => api.get('/user/dashboard'),
};

export const transactionAPI = {
  purchase: (data) => api.post('/transactions/purchase', data),
  getHistory: (userId) => api.get(`/transactions/history?userId=${userId}`),
  getPreSaleStats: () => api.get('/transactions/presale-stats'),
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  getTransactions: (params) => api.get('/admin/transactions', { params }),
  creditUser: (data) => api.post('/admin/credit-user', data),
  confirmPayment: (id, data) => api.post(`/admin/confirm-payment/${id}`, data),
  updateWallets: (data) => api.put('/payments/wallets', data),
};

export default api;