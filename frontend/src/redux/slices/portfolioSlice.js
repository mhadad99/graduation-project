import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for portfolio operations
export const fetchUserPortfolio = createAsyncThunk(
  'portfolio/fetchUserPortfolio',
  async (userId, { rejectWithValue }) => {
    try {
      // Get all portfolio items and filter by userId
      const response = await fetch('/portfolio');
      const data = await response.json();
      return data.filter(item => item.userId === parseInt(userId));
    } catch (error) {
      return rejectWithValue(error.message || { message: 'Failed to fetch user portfolio' });
    }
  }
);

export const addPortfolioItem = createAsyncThunk(
  'portfolio/addItem',
  async (portfolioData, { rejectWithValue }) => {
    try {
      const response = await fetch('/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolioData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || { message: 'Failed to add portfolio item' });
    }
  }
);

export const updatePortfolioItem = createAsyncThunk(
  'portfolio/updateItem',
  async ({ itemId, itemData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/portfolio/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || { message: 'Failed to update portfolio item' });
    }
  }
);

export const deletePortfolioItem = createAsyncThunk(
  'portfolio/deleteItem',
  async (itemId, { rejectWithValue }) => {
    try {
      await fetch(`/portfolio/${itemId}`, { method: 'DELETE' });
      return itemId;
    } catch (error) {
      return rejectWithValue(error.message || { message: 'Failed to delete portfolio item' });
    }
  }
);

const initialState = {
  portfolioItems: [],
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    clearPortfolio: (state) => {
      state.portfolioItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Portfolio
      .addCase(fetchUserPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolioItems = action.payload;
      })
      .addCase(fetchUserPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Portfolio Item
      .addCase(addPortfolioItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPortfolioItem.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolioItems.push(action.payload);
      })
      .addCase(addPortfolioItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Portfolio Item
      .addCase(updatePortfolioItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePortfolioItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.portfolioItems.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.portfolioItems[index] = action.payload;
        }
      })
      .addCase(updatePortfolioItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Portfolio Item
      .addCase(deletePortfolioItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePortfolioItem.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolioItems = state.portfolioItems.filter(item => item.id !== action.payload);
      })
      .addCase(deletePortfolioItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
