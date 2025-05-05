import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProposal, getProposalsByProject, updateProposalStatus } from "../../api/proposal";

const initialState = {
  proposals: [],
  isLoading: false,
  error: null,
};

export const addProposalAction = createAsyncThunk(
  "proposal/addProposalAction",
  async (proposal, { rejectWithValue }) => {
    try {
      const response = await addProposal(proposal);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProposalsByProjectAction = createAsyncThunk(
  "proposal/getProposalsByProjectAction",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await getProposalsByProject(projectId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProposalStatusAction = createAsyncThunk(
  "proposal/updateProposalStatusAction",
  async ({ proposalId, status }, { rejectWithValue }) => {
    try {
      const response = await updateProposalStatus(proposalId, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProposalsByProjectAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProposalsByProjectAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.proposals = action.payload;
      })
      .addCase(getProposalsByProjectAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addProposalAction.fulfilled, (state, action) => {
        state.proposals.push(action.payload);
      })
      .addCase(updateProposalStatusAction.fulfilled, (state, action) => {
        const idx = state.proposals.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) state.proposals[idx] = action.payload;
      });
  },
});

export const proposalReducer = proposalSlice.reducer;