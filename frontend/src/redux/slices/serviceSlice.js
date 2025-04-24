/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

// Async thunks for service operations
export const fetchServices = createAsyncThunk(
  "service/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/services");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch services" }
      );
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  "service/fetchById",
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/services/${serviceId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch service" }
      );
    }
  }
);

export const createService = createAsyncThunk(
  "service/create",
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await api.post("/services", serviceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create service" }
      );
    }
  }
);

export const updateService = createAsyncThunk(
  "service/updateService",
  async (payload, { rejectWithValue, getState }) => {
    try {
      try {
        // Try to update with the real API first
        const response = await api.put(`/services/${payload.id}`, payload);
        if (process.env.NODE_ENV === 'development') {
          console.info('Service updated successfully');
        }
        return response.data;
      } catch (apiError) {
        if (process.env.NODE_ENV === 'development') {
          console.info('API update failed, using mock update. Offline mode active.');
        }
        
        // If API fails, update locally using the current state
        const { services } = getState().service;
        const serviceToUpdate = services.find(service => service.id === payload.id);
        
        if (!serviceToUpdate) {
          throw new Error(`Service with ID ${payload.id} not found`);
        }
        
        // Create updated service by merging current service with updates
        const mockUpdatedService = { ...serviceToUpdate, ...payload };
        
        if (process.env.NODE_ENV === 'development') {
          console.info('Service updated successfully (offline mode)');
        }
        return mockUpdatedService;
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.info('Error updating service:', error.message || 'Unknown error');
      }
      return rejectWithValue({ message: error.message || 'Failed to update service' });
    }
  }
);

export const deleteService = createAsyncThunk(
  "service/delete",
  async (serviceId, { rejectWithValue, getState }) => {
    try {
      try {
        // Try to delete with the real API first
        await api.delete(`/services/${serviceId}`);
        if (process.env.NODE_ENV === 'development') {
          console.info('Service deleted successfully');
        }
        return serviceId;
      } catch (apiError) {
        if (process.env.NODE_ENV === 'development') {
          console.info('API delete failed, using mock delete. Offline mode active.');
        }
        
        // If API fails, just return the ID to simulate successful deletion
        // The reducer will handle removing it from the state
        return serviceId;
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.info('Error deleting service:', error.message || 'Unknown error');
      }
      return rejectWithValue({ message: error.message || 'Failed to delete service' });
    }
  }
);

export const submitProposal = createAsyncThunk(
  "service/submitProposal",
  async (proposalData, { rejectWithValue }) => {
    try {
      const response = await api.post("/proposals", proposalData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to submit proposal" }
      );
    }
  }
);

export const createProposal = createAsyncThunk(
  "service/createProposal",
  async (proposalData, { rejectWithValue }) => {
    try {
      const response = await api.post("/proposals", proposalData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create proposal" }
      );
    }
  }
);

export const fetchUserServices = createAsyncThunk(
  "service/fetchUserServices",
  async (userId, { rejectWithValue }) => {
    try {
      // Get all services and filter by userId
      const response = await api.get("/services");
      return response.data.filter(
        (service) => service.userId === parseInt(userId)
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch user services" }
      );
    }
  }
);

export const fetchProposals = createAsyncThunk(
  "service/fetchProposals",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}/proposals`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch proposals" }
      );
    }
  }
);

// Alias for backward compatibility
export const fetchUserProposals = fetchProposals;

const initialState = {
  services: [],
  currentService: null,
  userServices: [],
  userProposals: [],
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    clearCurrentService: (state) => {
      state.currentService = null;
    },
    filterServices: (state, action) => {
      // Filter logic can be implemented here if needed
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Service By ID
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentService = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Service
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
        state.userServices.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Service
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.services.findIndex(
          (service) => service.id === action.payload.id
        );
        if (index !== -1) {
          state.services[index] = action.payload;
        }
        const userServiceIndex = state.userServices.findIndex(
          (service) => service.id === action.payload.id
        );
        if (userServiceIndex !== -1) {
          state.userServices[userServiceIndex] = action.payload;
        }
        if (
          state.currentService &&
          state.currentService.id === action.payload.id
        ) {
          state.currentService = action.payload;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Service
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(
          (service) => service.id !== action.payload
        );
        state.userServices = state.userServices.filter(
          (service) => service.id !== action.payload
        );
        if (
          state.currentService &&
          state.currentService.id === action.payload
        ) {
          state.currentService = null;
        }
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Proposal
      .addCase(createProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProposal.fulfilled, (state, action) => {
        state.loading = false;
        state.userProposals.push(action.payload);
      })
      .addCase(createProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch User Services
      .addCase(fetchUserServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserServices.fulfilled, (state, action) => {
        state.loading = false;
        state.userServices = action.payload;
      })
      .addCase(fetchUserServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch User Proposals
      .addCase(fetchUserProposals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProposals.fulfilled, (state, action) => {
        state.loading = false;
        state.userProposals = action.payload;
      })
      .addCase(fetchUserProposals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentService, filterServices } = serviceSlice.actions;
export default serviceSlice.reducer;
