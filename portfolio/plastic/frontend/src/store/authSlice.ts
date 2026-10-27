import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: boolean;
    userId: string | null;
    isAdmin: boolean;
}

const initialState: AuthState = {
    isLoggedIn: false,
    userId: null,
    isAdmin: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ userId: string; isAdmin: boolean }>) => {
            state.isLoggedIn = true;
            state.userId = action.payload.userId;
            state.isAdmin = action.payload.isAdmin;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userId = null;
            state.isAdmin = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;