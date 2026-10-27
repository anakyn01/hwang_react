// src/redux/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  nickname: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  nickname: '회원',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 로컬스토리지에서 유저 정보를 읽어와 상태를 세팅하는 액션
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem('token');
      const storedNickname = localStorage.getItem('nickname');

      if (token) {
        state.isLoggedIn = true;
      }
      if (storedNickname) {
        state.nickname = storedNickname;
      }
    },
    // 로그아웃 시 상태 초기화 액션
    logoutUser: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('nickname');
      state.isLoggedIn = false;
      state.nickname = '회원';
    },
  },
});

export const { loadUserFromStorage, logoutUser } = userSlice.actions;
export default userSlice.reducer;