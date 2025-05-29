import apiClient from './axiosConfig';

// Define interfaces for employer data
interface Employer {
  id: number;
  user_id: number;
  company_name: string;
  company_description: string;
  industry: string;
  verification_status: string;
  created_at: string;
  updated_at: string;
}

interface JobPosting {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  job_type: string;
  salary_range: string;
  application_deadline: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Employer API functions
const employersApi = {
  // Get employer profile
  getProfile: async () => {
    const response = await apiClient.get('/api/v1/manage/employer/profile');
    return response.data;
  },

  // Update employer profile
  updateProfile: async (profileData: Partial<Employer>) => {
    const response = await apiClient.put('/api/v1/manage/employer/profile', profileData);
    return response.data;
  },

  // Get job postings for the employer
  getJobPostings: async () => {
    const response = await apiClient.get('/api/v1/manage/employer/jobs');
    return response.data;
  },

  // Create a new job posting
  createJobPosting: async (jobData: Partial<JobPosting>) => {
    const response = await apiClient.post('/api/v1/manage/employer/jobs', jobData);
    return response.data;
  },

  // Update a job posting
  updateJobPosting: async (jobId: number, jobData: Partial<JobPosting>) => {
    const response = await apiClient.put(`/api/v1/manage/employer/jobs/${jobId}`, jobData);
    return response.data;
  },

  // Delete a job posting
  deleteJobPosting: async (jobId: number) => {
    const response = await apiClient.delete(`/api/v1/manage/employer/jobs/${jobId}`);
    return response.data;
  },

  // Search for graduates
  searchGraduates: async (searchParams: Record<string, any>) => {
    const response = await apiClient.get('/api/v1/manage/employer/graduates', {
      params: searchParams
    });
    return response.data;
  },

  // Get specific graduate details
  getGraduateDetails: async (graduateId: number) => {
    const response = await apiClient.get(`/api/v1/manage/employer/graduates/${graduateId}`);
    return response.data;
  }
};

export default employersApi;