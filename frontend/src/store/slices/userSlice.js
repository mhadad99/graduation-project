import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyProfile, updateUserImage, updateUserProfile } from "../../api/user";


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
            return response.data;
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
        },
    }
)

export const userReducer = userSlice.reducer;