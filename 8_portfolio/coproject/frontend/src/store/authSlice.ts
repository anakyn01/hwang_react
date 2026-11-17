// Redux Toolkit에서 슬라이스 생성 함수와 액션 타입 정의 도구를 불러옵니다.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 인증 상태(AuthState)가 가져야 할 데이터 구조(타입)를 인터페이스로 정의합니다.
interface AuthState {
  token: string | null;          // JWT 토큰 문자열이 저장될 공간 (없으면 null)
  isAuthenticated: boolean;      // 로그인 여부를 판별하는 불리언 값
}

// 스토어가 처음 만들어질 때 가질 초기 상태값을 설정합니다.
const initialState: AuthState = {
  // SSR 환경 에러 방지를 위해 window 객체 존재 여부 확인 후 로컬 스토리지의 토큰을 가져옵니다.
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  // 토큰 존재 유무를 확인해 초기 로그인 상태를 true 또는 false로 설정합니다.
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
};

// 인증 관련 전역 상태와 상태 변경 리듀서를 묶어주는 슬라이스를 생성합니다.
export const authSlice = createSlice({
  name: "auth",       // 슬라이스의 고유 이름
  initialState,       // 초기 상태 지정
  reducers: {         // 상태를 변경하는 함수(액션)들을 정의
    
    // 로그인 성공 또는 회원가입 직후 토큰을 받아 상태와 로컬 스토리지에 저장하는 액션
    setLogin: (state, action: PayloadAction<string>) => {
      state.token = action.payload;             // 전달받은 토큰을 전역 상태에 저장
      state.isAuthenticated = true;             // 인증 상태를 true로 변경
      localStorage.setItem("token", action.payload); // 브라우저 스토리지에 영구 저장
    },
    
    // 로그아웃 시 상태를 비우고 스토리지에서 토큰을 제거하는 액션
    setLogout: (state) => {
      state.token = null;                       // 토큰 초기화
      state.isAuthenticated = false;            // 미인증 상태로 변경
      localStorage.removeItem("token");         // 브라우저 스토리지에서 토큰 삭제
    },
  },
});

// 외부 컴포넌트에서 상태를 변경하기 위해 사용할 액션 함수들을 내보냅니다.
export const { setLogin, setLogout } = authSlice.actions;

// 스토어 등록을 위해 리듀서 함수를 기본값으로 내보냅니다.
export default authSlice.reducer;