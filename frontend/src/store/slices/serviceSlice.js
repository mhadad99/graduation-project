import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllServices } from "../../api/service";

const initialState = {
    services: [],
    isLoading: false,
    error: null,

};

export const getAllServicesAction = createAsyncThunk(

    "service/getAllServicesAction",
    async (args, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await getAllServices();
            return response.data;
            
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const serviceSlice = createSlice(
    {
        name: "services",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(getAllServicesAction.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                })
                .addCase(getAllServicesAction.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.services = action.payload;
                })
                .addCase(getAllServicesAction.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                });
        },
    }
)

export const serviceReducer = serviceSlice.reducer;