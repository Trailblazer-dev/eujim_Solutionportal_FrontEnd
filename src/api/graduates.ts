import apiClient from './axiosConfig';

// Define interfaces for graduate data
interface Graduate {
  id: number;
  user_id: number;
  bio: string;
  skills: string[];
  experience_years: number;
  created_at: string;
  updated_at: string;
}

interface Education {
  id: number;
  graduate_id: number;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

interface Certificate {
  id: number;
  graduate_id: number;
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiration_date?: string;
  credential_id?: string;
  credential_url?: string;
  created_at: string;
  updated_at: string;
}

// Graduate API functions
const graduatesApi = {
  // Get graduate profile
  getProfile: async () => {
    const response = await apiClient.get('/api/v1/manage/graduate/profile');
    return response.data;
  },

  // Update graduate profile
  updateProfile: async (profileData: Partial<Graduate>) => {
    const response = await apiClient.put('/api/v1/manage/graduate/profile', profileData);
    return response.data;
  },

  // Get education entries
  getEducation: async () => {
    const response = await apiClient.get('/api/v1/manage/graduate/education');
    return response.data;
  },

  // Add education entry
  addEducation: async (educationData: Partial<Education>) => {
    const response = await apiClient.post('/api/v1/manage/graduate/education', educationData);
    return response.data;
  },

  // Update education entry
  updateEducation: async (educationId: number, educationData: Partial<Education>) => {
    const response = await apiClient.put(`/api/v1/manage/graduate/education/${educationId}`, educationData);
    return response.data;
  },

  // Delete education entry
  deleteEducation: async (educationId: number) => {
    const response = await apiClient.delete(`/api/v1/manage/graduate/education/${educationId}`);
    return response.data;
  },

  // Get certificates
  getCertificates: async () => {
    const response = await apiClient.get('/api/v1/manage/graduate/certificates');
    return response.data;
  },

  // Add certificate
  addCertificate: async (certificateData: Partial<Certificate>) => {
    const response = await apiClient.post('/api/v1/manage/graduate/certificates', certificateData);
    return response.data;
  },

  // Update certificate
  updateCertificate: async (certificateId: number, certificateData: Partial<Certificate>) => {
    const response = await apiClient.put(`/api/v1/manage/graduate/certificates/${certificateId}`, certificateData);
    return response.data;
  },

  // Delete certificate
  deleteCertificate: async (certificateId: number) => {
    const response = await apiClient.delete(`/api/v1/manage/graduate/certificates/${certificateId}`);
    return response.data;
  },

  // Search for jobs
  searchJobs: async (searchParams: Record<string, any>) => {
    const response = await apiClient.get('/api/v1/manage/graduate/jobs', {
      params: searchParams
    });
    return response.data;
  },

  // Get specific job details
  getJobDetails: async (jobId: number) => {
    const response = await apiClient.get(`/api/v1/manage/graduate/jobs/${jobId}`);
    return response.data;
  },

  // Apply for a job
  applyForJob: async (jobId: number, applicationData: Record<string, any>) => {
    const response = await apiClient.post(`/api/v1/manage/graduate/jobs/${jobId}/apply`, applicationData);
    return response.data;
  }
};

export default graduatesApi;