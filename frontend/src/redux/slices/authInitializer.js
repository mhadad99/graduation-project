import { initializeFromLocalStorage } from './userSlice';

/**
 * Initialize authentication state from localStorage
 * @param {Object} store - Redux store
 */
export const initializeAuth = (store) => {
  try {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    
    if (token && userString) {
      const user = JSON.parse(userString);
      
      // Set the initial state
      const initialState = {
        currentUser: user,
        userRole: user.role,
        isAuthenticated: true,
        loading: false,
        error: null
      };
      
      // Use the action creator to initialize state
      store.dispatch(initializeFromLocalStorage(initialState));
      
      console.log('Auth initialized from localStorage:', { user, token });
    } else {
      console.log('No auth data found in localStorage');
    }
  } catch (error) {
    console.error('Error initializing auth state:', error);
    // Clear localStorage if there's an error parsing the user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
