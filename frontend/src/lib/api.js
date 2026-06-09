import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gatherly_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints that should NOT trigger an automatic redirect on 401
const AUTH_URLS = ['/v1/auth/login', '/v1/auth/register', '/v1/auth/me'];

// Response interceptor — handle 401
// Only hard-redirect if the 401 came from a *protected* endpoint, not from
// an explicit auth call (e.g. wrong password on login, or bootstrap /me check).
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';
    const isAuthEndpoint = AUTH_URLS.some((u) => requestUrl.includes(u));
    const alreadyOnLogin = window.location.pathname === '/login';

    if (error.response?.status === 401 && !isAuthEndpoint && !alreadyOnLogin) {
      // Token expired or invalid — clear it and force a full reload to /login
      localStorage.removeItem('gatherly_token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
