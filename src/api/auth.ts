import apiClient from './axiosConfig';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role?: string;
}

interface RegisterEmployerData extends RegisterData {
  company_name: string;
  company_description: string;
  industry: string;
}

const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post('/api/v1/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/api/v1/auth/logout');
    return response.data;
  },

  register: async (userData: RegisterData) => {
    const response = await apiClient.post('/api/v1/auth/register', userData);
    return response.data;
  },

  registerEmployer: async (employerData: RegisterEmployerData) => {
    const response = await apiClient.post('/api/v1/auth/register/employer', employerData);
    return response.data;
  },

  verifyEmail: async (verificationCode: string) => {
    const response = await apiClient.get(`/api/v1/auth/verify-email/${verificationCode}/`);
    return response.data;
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/api/v1/auth/current-user');
      return response.data;
    } catch (error) {
      return null;
    }
  }
};

export default authApi;