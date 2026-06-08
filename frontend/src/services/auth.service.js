import api from '../lib/api';

export const authService = {
  register: (data) => api.post('/v1/auth/register', data),
  login: (data) => api.post('/v1/auth/login', data),
  me: () => api.get('/v1/auth/me'),
};
