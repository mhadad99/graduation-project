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
            const response = await adminService.getServices();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                (typeof error.response?.data === "string" ? error.response.data : error.message)
            );
        }
    }
);
export const deleteServiceAction = createAsyncThunk(
    'admin/deleteServiceAction',
    async (id, { rejectWithValue }) => {
        try{
            const response = await adminService.deleteService(id);
            return response.data;
        }catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                (typeof error.response?.data === "string" ? error.response.data : error.message)
            );
        }
    }
)

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

export const getAllProposalsAction = createAsyncThunk(
    'admin/getAllProposalsAction',
    async (_, { rejectWithValue }) => {
        try {
            const response = await adminService.getProposals();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.detail ||
                (typeof error.response?.data === "string" ? error.response.data : error.message)
            );
        }
    }
);

export const deleteProposalAction = createAsyncThunk(
    'admin/deleteProposalAction',
    async (id, { rejectWithValue }) => {
        try {
            const response = await adminService.deleteProposal(id);
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
            builder.addCase(deleteServiceAction.pending, (state, action)=>{
                state.isLoading = true;
            })
            .addCase(deleteServiceAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.services = action.payload;
            })
            .addCase(deleteServiceAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }

            )
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
            })
            .addCase(getAllProposalsAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllProposalsAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.proposals = action.payload;
            })
            .addCase(getAllProposalsAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteProposalAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProposalAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.proposals = state.proposals.filter(
                    proposal => proposal.id !== action.payload.id
                );
            })
            .addCase(deleteProposalAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },

});



export const adminReducer = adminSlice.reducer;