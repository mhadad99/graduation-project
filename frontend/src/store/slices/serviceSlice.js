import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addService, getAllServices, getMyServices } from "../../api/service";

const initialState = {
    services: [],
    myServices: [],
    isLoading: false,
    error: null,

};

export const addServiceAction = createAsyncThunk(

    "service/addServiceAction",
    async (args, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await addService(args);
            return response.data;
            
        } catch (error) {
            const serializedError = {
                status: error.response?.status,
                data: error.response?.data,
            };
            return rejectWithValue(serializedError);
        }   
    }
)

export const getMyServicesAction = createAsyncThunk(

    "service/getMyServicesAction",
    async (args, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await getMyServices();
            console.log(response.data);
            return response.data;
            
        } catch (error) {
            const serializedError = {
                status: error.response?.status,
                data: error.response?.data,
            };
            return rejectWithValue(serializedError);
        }       
    });

export const getAllServicesAction = createAsyncThunk(

    "service/getAllServicesAction",
    async (args, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await getAllServices();
            return response.data;
            
        } catch (error) {
            const serializedError = {
                status: error.response?.status,
                data: error.response?.data,
            };
            return rejectWithValue(serializedError);
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
                builder
                .addCase(addServiceAction.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                })
                .addCase(addServiceAction.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.services.push(action.payload);
                })
                .addCase(addServiceAction.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                });
                builder
                .addCase(getMyServicesAction.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                })
                .addCase(getMyServicesAction.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.myServices = action.payload;
                })
                .addCase(getMyServicesAction.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                });
        },
    }
)

export const serviceReducer = serviceSlice.reducer;