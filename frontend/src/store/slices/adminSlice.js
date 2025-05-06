import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from '../../api/adminService';
const initialState = {
    isLoading: false,
    error: null,
    users: null,
    services: null,
    projects: null,
    proposals: null,
    isLoggedIn: false,
};


// Action to get all services
export const getAllServicesAction = createAsyncThunk(
    'admin/getAllServicesAction',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllServices();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                (typeof error.response?.data === "string" ? error.response.data : error.message)
            );
        }
    }
);

//action to delete project

export const deleteProjectAction = createAsyncThunk(
    'admin/deleteProjectAction',
    async (id, { rejectWithValue }) => {
        try {
            const response = await adminService.deleteProject(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                (typeof error.response?.data === "string" ? error.response.data : error.message)
            );
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllServicesAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllServicesAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.services = action.payload;
            })
            .addCase(getAllServicesAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
            builder
            .addCase(deleteProjectAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProjectAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = action.payload;
            })
            .addCase(deleteProjectAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },

});



export const adminReducer = adminSlice.reducer;