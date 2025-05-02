import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { themeReducer } from "./slices/themeSlice";
import { serviceReducer } from "./slices/serviceSlice";
import { userReducer } from "./slices/userSlice";

export const myStore = configureStore({
  reducer: {
    authSlice: authReducer,
    themeSlice: themeReducer,
    serviceSlice: serviceReducer,
    userSlice: userReducer,
  },
});
