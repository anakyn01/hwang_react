// src/redux/adminLoginSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AdminLoginState {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminLoginState = {
  email: '',
  password: '',
  isLoading: false,
  error: null,
};

// 관리자 로그인 비동기 Thunk
export const submitAdminLogin = createAsyncThunk(
  'adminLogin/submitAdminLogin',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/admin/login', {
        email,
        password,
      }, { withCredentials: true });

      const data = response.data;
      
      // 관리자 이름 로컬스토리지 저장
      if (data.name) {
        localStorage.setItem('userName', data.name);
      }

      return data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || '로그인 중 오류가 발생했습니다');
      }
      return rejectWithValue('로그인 중 오류가 발생했습니다');
    }
  }
);

export const adminLoginSlice = createSlice({
  name: 'adminLogin',
  initialState,
  reducers: {
    setAdminEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setAdminPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAdminLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitAdminLogin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(submitAdminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAdminEmail, setAdminPassword } = adminLoginSlice.actions;
export default adminLoginSlice.reducer;