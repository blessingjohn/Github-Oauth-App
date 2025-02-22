import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import repoReducer from './repoSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    repos: repoReducer,
  },
});

export default store;
