/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProject, getAllProject, getMyProjects, getProjectById } from "../../api/project";

const initialState = {
  projectList: [],
  createdProject: null,
  myProjectList: [],
  isLoading: false,
  error: null,
  projectDetails: null,
};

const getProjectByIdAction = createAsyncThunk(
  "project/getProjectByIdAction",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProjectById(id);
      console.log("getProjectById response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
        (typeof error.response?.data === "string" ? error.response.data : error.message)
      );
    }
  }
);

export const getMyProjectsAction = createAsyncThunk(

  "service/getMyProjectsAction",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await getMyProjects();
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


const getAllProjectAction = createAsyncThunk(
  "project/getAllProjectAction",
  async (_, { rejectWithValue }) => {
    console.log("getAllProject response in thunk");
    try {
      console.log("getAllProject response in try");
      const response = await getAllProject(); // This should call your backend
      console.log("getAllProject response in try after response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
        (typeof error.response?.data === "string" ? error.response.data : error.message)
      );
    }
  }
);

const createProjectAction = createAsyncThunk(
  "project/createProjectAction",
  async (projectData, { rejectWithValue }) => {
    console.log("addProject response in thunk");
    try {
      console.log("addProject response in try");
      console.log("projectData", projectData);
      const response = await addProject(projectData);
      console.log("addProject response in try after response");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : error.message)
      );
    }
  }
);

const projectSlice = createSlice({
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
        state.projectList = action.payload;
      })
      .addCase(getAllProjectAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createProjectAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.createdProject = null;
      })
      .addCase(createProjectAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdProject = action.payload;
        state.projectList = [action.payload, ...state.projectList];
      })
      .addCase(createProjectAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getProjectByIdAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.projectDetails = null;
      })
      .addCase(getProjectByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectDetails = action.payload;
      })
      .addCase(getProjectByIdAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.projectDetails = null;
      });
    builder
      .addCase(getMyProjectsAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyProjectsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myProjectList = action.payload;
      })
      .addCase(getMyProjectsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const projectReducer = projectSlice.reducer;
export { createProjectAction, getAllProjectAction, getProjectByIdAction };