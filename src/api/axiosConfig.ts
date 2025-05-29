import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This is important for cookies
});

// Add request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // You can add any request interceptors here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // You can add refresh token logic here if needed
      // For now, redirect to login
      window.location.href = '/auth/login';
    }

    return Promise.reject(error);
  }
);

export default apiClient;
