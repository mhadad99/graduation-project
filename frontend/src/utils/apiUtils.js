import axios from 'axios';

/**
 * Utility functions for API handling with fallbacks
 */

// Base API URL
export const API_BASE_URL = 'http://localhost:5001';

// Create axios instance with base URL
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Log the error for debugging
    console.error('API Error:', error.message);
    
    // Handle specific error types
    if (error.code === 'ERR_NETWORK') {
      console.warn('Network error detected. Server might be down or unreachable.');
    } else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.warn(`Server responded with status: ${error.response.status}`);
      
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          console.warn('Unauthorized access. User might need to login again.');
          // Could dispatch a logout action here if needed
          break;
        case 403:
          console.warn('Forbidden access. User does not have permission.');
          break;
        case 404:
          console.warn('Resource not found.');
          break;
        case 500:
          console.warn('Internal server error.');
          break;
        default:
          console.warn('Other error occurred.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.warn('No response received from server.');
    }
    
    // Let the calling code handle the error
    return Promise.reject(error);
  }
);

// Safe API call utility function
export const safeApiCall = async (apiCall, fallbackData = null) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    // Only log in development mode and use info level instead of warn/error
    if (process.env.NODE_ENV === 'development') {
      console.info(`Using fallback data for API call. Reason: ${error.code === 'ERR_NETWORK' ? 'Offline mode' : error.message}`);
    }
    return fallbackData;
  }
};

// Mock data for fallback
export const mockData = {
  // Mock categories
  categories: [
    { id: 1, name: 'Web Development', icon: 'code-slash' },
    { id: 2, name: 'Mobile App Development', icon: 'phone' },
    { id: 3, name: 'UI/UX Design', icon: 'palette' },
    { id: 4, name: 'Data Science', icon: 'graph-up' },
    { id: 5, name: 'Digital Marketing', icon: 'megaphone' },
    { id: 6, name: 'Content Writing', icon: 'pencil' },
    { id: 7, name: 'Video Editing', icon: 'camera-video' },
    { id: 8, name: 'Graphic Design', icon: 'brush' }
  ],
  
  // Mock users
  users: [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      status: 'active',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'System administrator',
      skills: ['Management', 'System Administration'],
      joinDate: '2023-01-01',
      deleted: false
    },
    {
      id: 2,
      name: 'John Freelancer',
      email: 'john@example.com',
      password: 'password123',
      role: 'freelancer',
      status: 'active',
      profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      bio: 'Experienced web developer with 5+ years of experience',
      skills: ['JavaScript', 'React', 'Node.js'],
      joinDate: '2023-02-15',
      deleted: false
    },
    {
      id: 3,
      name: 'Jane Client',
      email: 'jane@example.com',
      password: 'password123',
      role: 'client',
      status: 'active',
      profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
      bio: 'Project manager looking for talented freelancers',
      skills: ['Project Management', 'Communication'],
      joinDate: '2023-03-10',
      deleted: false
    },
    {
      id: 4,
      name: 'Alice Designer',
      email: 'alice@example.com',
      password: 'password123',
      role: 'freelancer',
      status: 'active',
      profileImage: 'https://randomuser.me/api/portraits/women/4.jpg',
      bio: 'Creative UI/UX designer with a passion for user-centered design',
      skills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD'],
      joinDate: '2023-04-05',
      deleted: false
    },
    {
      id: 5,
      name: 'Bob Developer',
      email: 'bob@example.com',
      password: 'password123',
      role: 'freelancer',
      status: 'inactive',
      profileImage: 'https://randomuser.me/api/portraits/men/5.jpg',
      bio: 'Full-stack developer specializing in MERN stack',
      skills: ['MongoDB', 'Express', 'React', 'Node.js'],
      joinDate: '2023-05-20',
      deleted: false
    }
  ],
  
  // Mock services
  services: [
    {
      id: 1,
      title: 'Professional Website Development',
      description: 'I will create a responsive website for your business using modern technologies.',
      price: 500,
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      userId: 2,
      userName: 'John Freelancer',
      userImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      status: 'active',
      createdAt: '2023-06-01',
      deleted: false
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'I will develop a cross-platform mobile app using React Native.',
      price: 800,
      category: 'Mobile App Development',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      userId: 2,
      userName: 'John Freelancer',
      userImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      status: 'pending',
      createdAt: '2023-06-15',
      deleted: false
    },
    {
      id: 3,
      title: 'UI/UX Design for Web and Mobile',
      description: 'I will create beautiful and user-friendly UI/UX designs for your digital products.',
      price: 600,
      category: 'UI/UX Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      userId: 4,
      userName: 'Alice Designer',
      userImage: 'https://randomuser.me/api/portraits/women/4.jpg',
      status: 'active',
      createdAt: '2023-07-01',
      deleted: false
    },
    {
      id: 4,
      title: 'Full-Stack Web Development',
      description: 'I will build a complete web application with frontend and backend using MERN stack.',
      price: 1200,
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      userId: 5,
      userName: 'Bob Developer',
      userImage: 'https://randomuser.me/api/portraits/men/5.jpg',
      status: 'rejected',
      rejectionReason: 'Insufficient details provided',
      createdAt: '2023-07-15',
      deleted: false
    },
    {
      id: 5,
      title: 'Logo Design and Branding',
      description: 'I will create a professional logo and brand identity for your business.',
      price: 300,
      category: 'Graphic Design',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      userId: 4,
      userName: 'Alice Designer',
      userImage: 'https://randomuser.me/api/portraits/women/4.jpg',
      status: 'pending',
      createdAt: '2023-08-01',
      deleted: false
    }
  ],
  
  // Mock portfolio items
  portfolio: [
    {
      id: 1,
      userId: 2,
      title: 'E-commerce Website',
      description: 'A fully functional e-commerce website built with React and Node.js',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      link: 'https://example.com/portfolio/1',
      createdAt: '2023-05-10'
    },
    {
      id: 2,
      userId: 4,
      title: 'Mobile App UI Design',
      description: 'UI/UX design for a fitness tracking mobile application',
      image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      link: 'https://example.com/portfolio/2',
      createdAt: '2023-06-15'
    }
  ],
  
  // Mock ratings
  ratings: [
    {
      id: 1,
      serviceId: 1,
      userId: 3,
      userName: 'Jane Client',
      userImage: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 5,
      comment: 'Excellent work! The website exceeded my expectations.',
      createdAt: '2023-06-30'
    },
    {
      id: 2,
      serviceId: 3,
      userId: 3,
      userName: 'Jane Client',
      userImage: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 4,
      comment: 'Great design work, very responsive to feedback.',
      createdAt: '2023-07-20'
    }
  ],
  
  // Mock proposals
  proposals: [
    {
      id: 1,
      projectId: 1,
      freelancerId: 2,
      clientId: 3,
      amount: 500,
      status: 'completed',
      createdAt: '2023-06-15'
    },
    {
      id: 2,
      projectId: 2,
      freelancerId: 4,
      clientId: 3,
      amount: 600,
      status: 'in_progress',
      createdAt: '2023-07-10'
    }
  ]
};

// Export individual mock data collections for direct imports
export const mockUsers = mockData.users;
export const mockServices = mockData.services;
export const mockPortfolioItems = mockData.portfolio;
export const mockRatings = mockData.ratings;

// Utility function to get mock user for login
export const getMockUserByEmail = (email) => {
  return mockData.users.find(user => user.email === email);
};

// Function to simulate login with mock data
export const mockLogin = (email, password) => {
  const user = getMockUserByEmail(email);
  
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  
  if (user.password !== password) {
    return { success: false, message: 'Invalid password' };
  }
  
  // Create a user object without sensitive data
  const { password: _, ...userWithoutPassword } = user;
  
  return { 
    success: true, 
    user: userWithoutPassword,
    token: 'mock-jwt-token-' + Date.now() 
  };
};

export default {
  api,
  safeApiCall,
  mockData,
  mockLogin,
  getMockUserByEmail
};
