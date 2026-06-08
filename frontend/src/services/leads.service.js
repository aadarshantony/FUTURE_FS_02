import api from '../lib/api';

export const leadsService = {
  getAll: (params) => api.get('/v1/leads', { params }),
  getById: (id) => api.get(`/v1/leads/${id}`),
  getStats: () => api.get('/v1/leads/stats'),
  create: (data) => api.post('/v1/leads', data),
  update: (id, data) => api.patch(`/v1/leads/${id}`, data),
  delete: (id) => api.delete(`/v1/leads/${id}`),
  addNote: (id, content) => api.post(`/v1/leads/${id}/notes`, { content }),
};
