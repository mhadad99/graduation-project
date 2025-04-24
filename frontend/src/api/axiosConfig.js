import axios from 'axios';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5001',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to handle authentication
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to the headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Silently handle request errors - no console errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Only log in development mode, not in production
    if (process.env.NODE_ENV === 'development') {
      // Use a more subtle console method for expected errors
      if (error.code === 'ERR_NETWORK') {
        console.info('Network error detected. Using offline mode.');
      } else if (error.response) {
        console.info(`Server responded with status: ${error.response.status}`);
      } else {
        console.info('API request failed:', error.message);
      }
    }
    
    // For network errors, add a flag to indicate offline mode
    if (error.code === 'ERR_NETWORK') {
      error.isOfflineMode = true;
    }
    
    // Always reject the promise so the calling code can handle it
    return Promise.reject(error);
  }
);

export default api;
