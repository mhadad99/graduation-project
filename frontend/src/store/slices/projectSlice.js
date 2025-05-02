import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProject } from "../../api/project";

const initialState = {
    project: [],
    isLoading: false,
    error: null,

};

export const getAllProjectAction = createAsyncThunk(

    "project/getAllProjectAction",
    async (args, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await getAllProject();
            return response.data;
            
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const projectSlice = createSlice(
    {
        name: "project",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(getAllProjectAction.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                })
                .addCase(getAllProjectAction.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.project = action.payload;
                })
                .addCase(getAllProjectAction.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                });
        },
    }
)

export const projectReducer = projectSlice.reducer;