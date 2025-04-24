import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosConfig';
import { mockLogin } from '../../utils/apiUtils';

// Async thunks for user operations
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch users' });
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Attempting login with:', credentials);
      
      try {
        // Try to login with the real API first
        const response = await api.post('/login', credentials);
        
        // Store token in localStorage
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        return response.data;
      } catch (apiError) {
        console.warn('API login failed, trying mock login:', apiError.message);
        
        // If API fails, try mock login
        const mockResult = mockLogin(credentials.email, credentials.password);
        
        if (mockResult.success) {
          // Store mock token in localStorage
          localStorage.setItem('token', mockResult.token);
          localStorage.setItem('user', JSON.stringify(mockResult.user));
          
          console.log('Mock login successful:', mockResult.user.name);
          return {
            user: mockResult.user,
            token: mockResult.token
          };
        } else {
          // Mock login also failed
          return rejectWithValue(mockResult.message);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(error.response?.data?.message || 'Login failed. Please try again.');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Attempting registration with:', userData);
      
      // Check if user with this email already exists
      const checkResponse = await api.get(`/users?email=${userData.email}`);
      if (checkResponse.data.length > 0) {
        return rejectWithValue({ message: 'User with this email already exists' });
      }
      
      // Add additional user fields
      const newUser = {
        ...userData,
        id: Date.now(), // Generate a unique ID
        joinDate: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
        isVerified: false,
        profileImage: 'https://i.imgur.com/JFHjdNZ.jpeg' // Default profile image
      };
      
      // Create the new user directly
      const response = await api.post('/users', newUser);
      console.log('Registration successful:', response.data);
      
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      console.error('Registration error:', error);
      return rejectWithValue(error.response?.data || { message: 'Registration failed' });
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, { rejectWithValue, getState }) => {
    try {
      // First check if the user is already in the Redux store
      const { users, currentUser } = getState().user;
      
      // Check if the user is already in the users array
      const existingUser = users.find(u => u.id.toString() === userId.toString());
      if (existingUser) {
        return existingUser;
      }
      
      // Check if the requested user is the current user
      if (currentUser && currentUser.id.toString() === userId.toString()) {
        return currentUser;
      }
      
      // Check localStorage before making an API call
      const localUser = JSON.parse(localStorage.getItem('user'));
      if (localUser && localUser.id.toString() === userId.toString()) {
        return localUser;
      }
      
      // If we still don't have the user, make the API call
      console.log('Fetching user profile for userId:', userId);
      const response = await api.get(`/users/${userId}`);
      
      if (response.data) {
        return response.data;
      }
      
      // If the specific user endpoint fails, try getting all users
      const allUsersResponse = await api.get('/users');
      const user = allUsersResponse.data.find(u => u.id.toString() === userId.toString());
      
      if (user) {
        return user;
      }
      
      console.error('User not found with ID:', userId);
      return rejectWithValue({ message: 'User profile not found' });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch user profile' });
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userId, userData }, { rejectWithValue, getState }) => {
    try {
      try {
        // Try to update with the real API first
        const response = await api.put(`/users/${userId}`, userData);
        const updatedUser = response.data;
        
        // Update the user in localStorage
        const localStorageUser = JSON.parse(localStorage.getItem('user'));
        if (localStorageUser && localStorageUser.id === userId) {
          console.info('Updating user in localStorage');
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        console.info('User profile updated successfully');
        return updatedUser;
      } catch (apiError) {
        // Only log in development mode and use info level
        if (process.env.NODE_ENV === 'development') {
          console.info('API update failed, using mock update. Offline mode active.');
        }
        
        // If API fails, update locally using the current state
        const { users } = getState().user;
        const userToUpdate = users.find(user => user.id === userId);
        
        if (!userToUpdate) {
          throw new Error(`User with ID ${userId} not found`);
        }
        
        // Create updated user by merging current user with updates
        const mockUpdatedUser = { ...userToUpdate, ...userData };
        
        // If this is the current user, update localStorage
        const localStorageUser = JSON.parse(localStorage.getItem('user'));
        if (localStorageUser && localStorageUser.id === userId) {
          console.info('Updating user in localStorage (offline mode)');
          localStorage.setItem('user', JSON.stringify(mockUpdatedUser));
        }
        
        console.info('User profile updated successfully (offline mode)');
        return mockUpdatedUser;
      }
    } catch (error) {
      // Only log in development mode and use info level
      if (process.env.NODE_ENV === 'development') {
        console.info('Error updating user profile:', error.message || 'Unknown error');
      }
      return rejectWithValue({ message: error.message || 'Failed to update user profile' });
    }
  }
);

const initialState = {
  currentUser: null,
  userRole: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
  userProfile: null,
  profileLoading: false,
  profileError: null,
  registrationSuccess: false,
  users: [],
  usersLoading: false,
  usersError: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.userRole = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    initializeFromLocalStorage: (state, action) => {
      // Ensure we have all required fields
      return { 
        ...state, 
        currentUser: action.payload.currentUser || null,
        userRole: action.payload.userRole || null,
        isAuthenticated: action.payload.isAuthenticated || false,
        loading: false,
        error: null
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users reducers
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.userRole = action.payload.user.role;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        // Add the user to the users array if not already there
        const userExists = state.users.some(user => user.id === action.payload.id);
        if (!userExists) {
          state.users.push(action.payload);
        }
        // Only update currentUser if it's the same ID
        if (state.currentUser && state.currentUser.id === action.payload.id) {
          state.currentUser = action.payload;
          state.userRole = action.payload.role;
        }
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUserRole, initializeFromLocalStorage } = userSlice.actions;
export default userSlice.reducer;
