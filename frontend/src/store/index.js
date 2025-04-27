import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { themeReducer } from "./slices/themeSlice";

export const myStore = configureStore({
  reducer: {
    authSlice: authReducer,
    themeSlice: themeReducer
  },
});
