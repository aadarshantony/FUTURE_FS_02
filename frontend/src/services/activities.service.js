import api from '../lib/api';

export const activitiesService = {
  getRecent: () => api.get('/v1/activities/recent'),
  getByLead: (leadId) => api.get(`/v1/activities/lead/${leadId}`),
};
