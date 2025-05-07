import axios from 'axios';

// Base URL for API requests
const API_URL = 'http://localhost:8000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return userInfo?.token || '';
};

// Configure axios instance with authentication
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Admin Dashboard API Services
const adminService = {
  // Users
  getUsers: async () => {
    try {
      // In a real implementation, you would have a dedicated endpoint for admin to get all users
      // For now, we'll use the existing endpoint
      const response = await axiosInstance.get('/user/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await axiosInstance.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await axiosInstance.put(`/user/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axiosInstance.delete(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Projects
  getProjects: async () => {
    try {
      const response = await axiosInstance.get('/project');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getProjectById: async (projectId) => {
    try {
      const response = await axiosInstance.get(`/project/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateProject: async (projectId, projectData) => {
    try {
      const response = await axiosInstance.put(`/project/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteProject: async (projectId) => {
    try {
      const response = await axiosInstance.delete(`/project/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Services
  getServices: async () => {
    try {
      const response = await axiosInstance.get('/service');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getServiceById: async (serviceId) => {
    try {
      const response = await axiosInstance.get(`/service/${serviceId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateService: async (serviceId, serviceData) => {
    try {
      const response = await axiosInstance.put(`/service/${serviceId}`, serviceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteService: async (serviceId) => {
    try {
      const response = await axiosInstance.delete(`/service/${serviceId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Dashboard Statistics
  getStatistics: async () => {
    try {
      // This would ideally be a dedicated endpoint that returns all statistics in one call
      // For now, we'll simulate this by making multiple calls and combining the data
      
      const [users, projects, services] = await Promise.all([
        adminService.getUsers(),
        adminService.getProjects(),
        adminService.getServices()
      ]);
      
      // Calculate statistics
      const statistics = {
        totalUsers: users.length || 0,
        totalProjects: projects.length || 0,
        totalServices: services.length || 0,
        
        // User type distribution
        userTypes: {
          freelancers: users.filter(user => user.user_type === 'freelancer').length || 0,
          clients: users.filter(user => user.user_type === 'client').length || 0,
          admins: users.filter(user => user.user_type === 'none').length || 0
        },
        
        // Project status distribution
        projectStatus: {
          notStarted: projects.filter(project => project.progress === 'not_started').length || 0,
          inProgress: projects.filter(project => project.progress === 'in_progress').length || 0,
          completed: projects.filter(project => project.progress === 'completed').length || 0,
          cancelled: projects.filter(project => project.progress === 'cancelled').length || 0
        },
        
        // Calculate total revenue (this is a simplified example)
        totalRevenue: projects
          .filter(project => project.progress === 'completed')
          .reduce((sum, project) => sum + (project.budget || 0), 0)
      };
      
      return statistics;
    } catch (error) {
      // If the API calls fail, return mock data for testing
      console.error('Error fetching statistics:', error);
      return {
        totalUsers: 245,
        totalProjects: 128,
        totalServices: 312,
        totalRevenue: 52750,
        userTypes: { freelancers: 150, clients: 90, admins: 5 },
        projectStatus: { notStarted: 30, inProgress: 45, completed: 40, cancelled: 13 },
        revenueData: [
          { month: 'Jan', amount: 4200 },
          { month: 'Feb', amount: 5100 },
          { month: 'Mar', amount: 6300 },
          { month: 'Apr', amount: 8200 },
          { month: 'May', amount: 7800 },
          { month: 'Jun', amount: 9100 },
          { month: 'Jul', amount: 12050 }
        ]
      };
    }
  }
};

export default adminService;
