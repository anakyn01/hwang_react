// Redux Toolkit에서 중앙 스토어를 생성해 주는 configureStore 함수를 불러옵니다.
import { configureStore } from "@reduxjs/toolkit";

// 위에서 만든 인증 리듀서를 불러옵니다.
import authReducer from "./authSlice";

// 애플리케이션의 전체 중앙 스토어를 생성합니다.
export const store = configureStore({
  reducer: {
    // 스토어 내부에 'auth'라는 이름으로 인증 리듀서를 연결합니다.
    auth: authReducer,
  },
});

// 스토어에 정의된 전체 상태(State)의 타입 구조를 추출하여 RootState로 정의합니다.
export type RootState = ReturnType<typeof store.getState>;

// 비동기 작업 등을 처리할 때 사용할 수 있는 디스패치(Dispatch) 타입을 정의합니다.
export type AppDispatch = typeof store.dispatch;