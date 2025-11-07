import { configureStore } from '@reduxjs/toolkit';
import quizProgressReducer from './slices/quizProgressSlice';
import authReducer from './slices/authSlice';
import sidebarReducer from './slices/sidebarSlice';
import goalReducer from './slices/goalSlice';

export const store = configureStore({
  reducer: {
    quizProgress: quizProgressReducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    goals: goalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
