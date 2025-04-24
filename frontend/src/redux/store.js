import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import serviceReducer from './slices/serviceSlice';
import chatReducer from './slices/chatSlice';
import portfolioReducer from './slices/portfolioSlice';
import ratingReducer from './slices/ratingSlice';
import themeReducer from './slices/themeSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    service: serviceReducer,
    chat: chatReducer,
    portfolio: portfolioReducer,
    rating: ratingReducer,
    theme: themeReducer,
    notification: notificationReducer,
  },
});
