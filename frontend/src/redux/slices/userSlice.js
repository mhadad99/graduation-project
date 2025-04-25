import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for user operations
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/users');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message || { message: 'Failed to fetch users' });
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      console.log('Attempting login with:', credentials);
      // Use JSON server (db.json) for authentication
      const response = await fetch(`http://localhost:5001/users?email=${encodeURIComponent(credentials.email)}&password=${encodeURIComponent(credentials.password)}`);
      if (!response.ok) {
        throw new Error('Login failed.');
      }
      const users = await response.json();
      if (!users || users.length === 0) {
        throw new Error('Invalid email or password.');
      }
      const user = users[0];
      // Set user in localStorage (no token with JSON server)
      localStorage.setItem('user', JSON.stringify(user));
      if (user && user.id) {
        const role = await detectUserRole(user.id);
        dispatch(setUserRole(role));
      }
      return { user };
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(error.message || 'Login failed. Please try again.');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Attempting registration with:', userData);
      // Check if user with this email already exists
      const checkResponse = await fetch('http://localhost:5001/users?email=' + encodeURIComponent(userData.email));
      if (checkResponse.ok) {
        const checkData = await checkResponse.json();
        if (checkData.length > 0) {
          return rejectWithValue({ message: 'User with this email already exists' });
        }
      }
      const newUser = {
        ...userData,
        id: String(Date.now()), // Ensure ID is always a string
        joinDate: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
        status: 'pending',
        isVerified: false,
        isDeleted: false
        // REMOVE 'role' from user object, only relation will be in role table
      };
      const response = await fetch('http://localhost:5001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Registration failed.');
      }
      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        data = { success: true, message: 'Registration successful' };
      }

      // Add user to the correct role collection (relation only)
      if (userData.role === 'freelancer') {
        await fetch('http://localhost:5001/freelancers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: newUser.id,
            // Add default freelancer-only fields here
            skillsId: '',
            experienceLevel: '',
            cv: '',
            is_tested: false,
            job_title: '',
            isDeleted: false,
            status: 'pending'
          })
        });
      } else if (userData.role === 'client') {
        await fetch('http://localhost:5001/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: newUser.id,
            // Add default client-only fields here
            companyName: '',
            companyType: '',
            isDeleted: false,
            status: 'pending'
          })
        });
      }
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      return rejectWithValue(error.message || { message: 'Registration failed' });
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
      const response = await fetch(`/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      // If the specific user endpoint fails, try getting all users
      const allUsersResponse = await fetch('/users');
      if (allUsersResponse.ok) {
        const allUsersData = await allUsersResponse.json();
        const user = allUsersData.find(u => u.id.toString() === userId.toString());
        if (user) {
          return user;
        }
      }
      console.error('User not found with ID:', userId);
      return rejectWithValue({ message: 'User profile not found' });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return rejectWithValue(error.message || { message: 'Failed to fetch user profile' });
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userId, userData }, { rejectWithValue, getState }) => {
    try {
      try {
        // Try to update with the real API first
        const response = await fetch(`/users/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
        const updatedUser = await response.json();
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
          console.info('API update failed:', apiError.message || 'Unknown error');
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

const detectUserRole = async (userId) => {
  if (!userId) return 'unknown';

  // Check admin
  const adminRes = await fetch(`/admins?userId=${userId}`);
  if (adminRes.ok) {
    const admins = await adminRes.json();
    if (admins.length > 0) return 'admin';
  }

  // Check freelancer
  const freelancerRes = await fetch(`/freelancers?userId=${userId}`);
  if (freelancerRes.ok) {
    const freelancers = await freelancerRes.json();
    if (freelancers.length > 0) return 'freelancer';
  }

  // Check client
  const clientRes = await fetch(`/clients?userId=${userId}`);
  if (clientRes.ok) {
    const clients = await clientRes.json();
    if (clients.length > 0) return 'client';
  }

  return 'unknown';
};

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
    logout(state) {
      state.currentUser = null;
      state.userRole = null;
      state.isAuthenticated = false;
      state.token = null;
      // Remove all user-related data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      localStorage.removeItem('profile');
      localStorage.removeItem('portfolio');
      localStorage.removeItem('userRatings');
      localStorage.removeItem('notifications');
      localStorage.removeItem('messages');
      localStorage.removeItem('conversations');
      localStorage.removeItem('savedServices');
      // If you have other user-related keys, add them here
    },
    setUserRole(state, action) {
      state.userRole = action.payload;
    },
    initializeFromLocalStorage(state, action) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        state.token = token;
        state.currentUser = JSON.parse(user);
        state.isAuthenticated = true;
      }
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
