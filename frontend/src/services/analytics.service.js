import api from '../lib/api';

export const analyticsService = {
  getDashboard: () => api.get('/v1/analytics/dashboard'),
  getRevenue: () => api.get('/v1/analytics/revenue'),
};
