// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../redux/homeSlice';
import signupReducer from '../redux/signupSlice';
import loginReducer from '../redux/loginSlice';
import missingReducer from '../redux/missingSlice';
import userReducer from '../redux/userSlice';
import shelterReducer from '../redux/shelterSlice';
import storyReducer from '../redux/storySlice';
import campaignAdminReducer from '../redux/campaignAdminSlice';
import integrateAdminReducer from '../redux/integrateAdminSlice';
import adminLoginReducer from '../redux/adminLoginSlice';
import recommendedAdminReducer from '../redux/recommendedAdminSlice';
import shelterAdminReducer from '../redux/shelterAdminSlice'; // 👈 추가

export const store = configureStore({
  reducer: {
    home: homeReducer,
    signup: signupReducer,
    login: loginReducer,
    missing: missingReducer,
    user: userReducer,
    shelter: shelterReducer,
    story: storyReducer,
    campaignAdmin: campaignAdminReducer,
    integrateAdmin: integrateAdminReducer,
    adminLogin: adminLoginReducer,
    recommendedAdmin: recommendedAdminReducer,
    shelterAdmin: shelterAdminReducer, // 👈 추가
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;