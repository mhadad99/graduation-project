import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for rating operations
export const fetchUserRatings = createAsyncThunk(
  'rating/fetchUserRatings',
  async (userId, { rejectWithValue }) => {
    try {
      // Get all user ratings and filter by userId
      const response = await fetch('/userRatings');
      const ratings = await response.json().then(data => data.filter(rating => rating.userId === parseInt(userId)));
      
      // Calculate average rating
      let averageRating = 0;
      if (ratings.length > 0) {
        const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
        averageRating = sum / ratings.length;
      }
      
      return {
        ratings,
        averageRating
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch user ratings' });
    }
  }
);

export const fetchServiceRatings = createAsyncThunk(
  'rating/fetchServiceRatings',
  async (serviceId, { rejectWithValue }) => {
    try {
      // Get all service ratings and filter by serviceId
      const response = await fetch('/serviceRatings');
      const ratings = await response.json().then(data => data.filter(rating => rating.serviceId === parseInt(serviceId)));
      
      // Calculate average rating
      let averageRating = 0;
      if (ratings.length > 0) {
        const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
        averageRating = sum / ratings.length;
      }
      
      return {
        ratings,
        averageRating
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch service ratings' });
    }
  }
);

export const submitUserRating = createAsyncThunk(
  'rating/submitUserRating',
  async (ratingData, { rejectWithValue }) => {
    try {
      const response = await fetch('/ratings/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ratingData)
      });
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to submit user rating' });
    }
  }
);

export const submitServiceRating = createAsyncThunk(
  'rating/submitServiceRating',
  async (ratingData, { rejectWithValue }) => {
    try {
      const response = await fetch('/ratings/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ratingData)
      });
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to submit service rating' });
    }
  }
);

const initialState = {
  userRatings: [],
  serviceRatings: [],
  userAverageRating: 0,
  serviceAverageRating: 0,
  loading: false,
  error: null,
};

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    clearRatings: (state) => {
      state.userRatings = [];
      state.serviceRatings = [];
      state.userAverageRating = 0;
      state.serviceAverageRating = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Ratings
      .addCase(fetchUserRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.userRatings = action.payload.ratings;
        state.userAverageRating = action.payload.averageRating;
      })
      .addCase(fetchUserRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Service Ratings
      .addCase(fetchServiceRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceRatings = action.payload.ratings;
        state.serviceAverageRating = action.payload.averageRating;
      })
      .addCase(fetchServiceRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit User Rating
      .addCase(submitUserRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitUserRating.fulfilled, (state, action) => {
        state.loading = false;
        state.userRatings.push(action.payload);
        // Recalculate average
        const sum = state.userRatings.reduce((total, rating) => total + rating.rating, 0);
        state.userAverageRating = sum / state.userRatings.length;
      })
      .addCase(submitUserRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit Service Rating
      .addCase(submitServiceRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitServiceRating.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceRatings.push(action.payload);
        // Recalculate average
        const sum = state.serviceRatings.reduce((total, rating) => total + rating.rating, 0);
        state.serviceAverageRating = sum / state.serviceRatings.length;
      })
      .addCase(submitServiceRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRatings } = ratingSlice.actions;
export default ratingSlice.reducer;
