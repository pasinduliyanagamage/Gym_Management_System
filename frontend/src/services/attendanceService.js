import api from './api';

export const attendanceService = {
  getAll: () => api.get('/attendance'),
  getById: (id) => api.get(`/attendance/${id}`),
  checkIn: (memberId) => api.post(`/attendance/check-in/${memberId}`),
  checkOut: (attendanceId) => api.put(`/attendance/check-out/${attendanceId}`),
  create: (data) => api.post('/attendance', data),
  delete: (id) => api.delete(`/attendance/${id}`),
};

export default attendanceService;
