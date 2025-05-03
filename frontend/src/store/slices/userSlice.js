import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyClientProfile, getMyFreelancerProfile, getMyProfile, updateClientProfile, updateFreelancerProfile, updateUserImage, updateUserProfile } from "../../api/user";


const saveUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};


const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
};


const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};





const initialState = {
    user: "",
    freelancer: "",
    client: "",
    isLoading: false,
    error: null,

};

export const getMyProfileAction = createAsyncThunk(

    "user/getMyProfileAction",
    async (args, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await getMyProfile();
            return response.data;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const getMyFreelancerProfileAction = createAsyncThunk(

    "user/getMyFreelancerProfileAction",
    async (args, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await getMyFreelancerProfile();
            return response.data;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const getMyClientProfileAction = createAsyncThunk(

    "user/getMyClientProfileAction",
    async (args, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await getMyClientProfile();
            return response.data;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


export const updateUserImageAction = createAsyncThunk(
    "user/updateUserImageAction",
    async (image, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await updateUserImage(image);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateUserProfileAction = createAsyncThunk(
    "user/updateUserProfileAction",
    async (formData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await updateUserProfile(formData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const updateFreelancerProfileAction = createAsyncThunk(
    "user/updateFreelancerProfileAction",
    async (formData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await updateFreelancerProfile(formData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const updateClientProfileAction = createAsyncThunk(
    "user/updateClientProfileAction",
    async (formData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await updateClientProfile(formData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const userSlice = createSlice(
    {
        name: "user",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(getMyProfileAction.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                })
                .addCase(getMyProfileAction.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.user = action.payload;
                })
                .addCase(getMyProfileAction.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                });
            builder.addCase(updateUserImageAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }).addCase(updateUserImageAction.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedUser = { ...state.user, photo: `http://127.0.0.1:8000${action.payload.photo}` };
                state.user = updatedUser;
                saveUserToLocalStorage(updatedUser);
            }).addCase(updateUserImageAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }

            );

            builder.addCase(updateUserProfileAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }).addCase(updateUserProfileAction.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedUser = { ...state.user, ...action.payload };
                state.user = updatedUser;
                saveUserToLocalStorage(updatedUser);
            }).addCase(updateUserProfileAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
            builder.addCase(getMyFreelancerProfileAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }).addCase(getMyFreelancerProfileAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.freelancer = action.payload;
            }).addCase(getMyFreelancerProfileAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
            builder.addCase(getMyClientProfileAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }).addCase(getMyClientProfileAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.client = action.payload;
            }).addCase(getMyClientProfileAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
            builder.addCase(updateFreelancerProfileAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }).addCase(updateFreelancerProfileAction.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedUser = { ...state.freelancer, ...action.payload };
                state.freelancer = updatedUser;
                // saveUserToLocalStorage(updatedUser);
            }).addCase(updateFreelancerProfileAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
            builder.addCase(updateClientProfileAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            }).addCase(updateClientProfileAction.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedUser = { ...state.client, ...action.payload };
                state.client = updatedUser;
                // saveUserToLocalStorage(updatedUser);
            }).addCase(updateClientProfileAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
        },
    }
)

export const userReducer = userSlice.reducer;