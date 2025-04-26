import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";

export const myStore = configureStore({
  reducer: {
    authSlice: authReducer,
  },
});
