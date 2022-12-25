import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import campaignReducer from '../features/campaigns/campaignSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    campaigns: campaignReducer
  },
});
