// src/redux/loginSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  email: '',
  password: '',
  isLoading: false,
  error: null,
};

// 로그인 비동기 Thunk
export const submitLogin = createAsyncThunk(
  'login/submitLogin',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:8080/api/members/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
      }

      const text = await res.text();
      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = text;
      }

      let token = typeof data === 'string' ? data : data.token;

      if (!token) {
        return rejectWithValue('유효하지 않은 토큰입니다.');
      }

      const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
      localStorage.setItem('token', cleanToken);

      if (data.nickname) {
        localStorage.setItem('nickname', data.nickname);
      }

      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || '서버와 연결할 수 없습니다.');
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitLogin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(submitLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setEmail, setPassword } = loginSlice.actions;
export default loginSlice.reducer;