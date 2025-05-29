import apiClient from './axiosConfig';

// Define interfaces for admin operations
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface EmployerRequest {
  id: number;
  user_id: number;
  company_name: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

// Admin API functions
const adminApi = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await apiClient.get('/api/v1/manage/admin/dashboard');
    return response.data;
  },

  // User management
  getAllUsers: async () => {
    const response = await apiClient.get('/api/v1/manage/admin/users');
    return response.data;
  },

  getUserById: async (userId: number) => {
    const response = await apiClient.get(`/api/v1/manage/admin/users/${userId}`);
    return response.data;
  },

  updateUser: async (userId: number, userData: Partial<User>) => {
    const response = await apiClient.put(`/api/v1/manage/admin/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId: number) => {
    const response = await apiClient.delete(`/api/v1/manage/admin/users/${userId}`);
    return response.data;
  },

  suspendUser: async (userId: number, suspensionData: { reason: string; duration: number }) => {
    const response = await apiClient.post(`/api/v1/manage/admin/users/${userId}/suspend`, suspensionData);
    return response.data;
  },

  activateUser: async (userId: number) => {
    const response = await apiClient.post(`/api/v1/manage/admin/users/${userId}/activate`);
    return response.data;
  },

  // Employer requests
  getEmployerRequests: async () => {
    const response = await apiClient.get('/api/v1/manage/admin/employer-requests');
    return response.data;
  },

  approveEmployerRequest: async (requestId: number) => {
    const response = await apiClient.post(`/api/v1/manage/admin/employer-requests/${requestId}/approve`);
    return response.data;
  },

  rejectEmployerRequest: async (requestId: number, reason: string) => {
    const response = await apiClient.post(`/api/v1/manage/admin/employer-requests/${requestId}/reject`, { reason });
    return response.data;
  },

  // Analytics
  getAnalytics: async (params: Record<string, any>) => {
    const response = await apiClient.get('/api/v1/manage/admin/analytics', { params });
    return response.data;
  },

  // System settings
  getSettings: async () => {
    const response = await apiClient.get('/api/v1/manage/admin/settings');
    return response.data;
  },

  updateSettings: async (settings: Record<string, any>) => {
    const response = await apiClient.put('/api/v1/manage/admin/settings', settings);
    return response.data;
  }
};

export default adminApi;