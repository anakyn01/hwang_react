// Redux Toolkit에서 여러 리듀서를 묶어 중앙 스토어를 
// 생성해 주는 configureStore 함수를 불러옵니다.
import {configureStore} from "@reduxjs/toolkit";
// 앞서 만들어준 인증 관련 리듀서 함수를 불러옵니다
import authReducer from "./authSlice";

//전역 상태를 관리할 중앙 Redux
export const store = configureStore({
    reducer:{
        auth:authReducer,
    },
});

// 스토어에 정의된 전체 상태(State)의 타입 구조를 
// 추출하여 RootState 타입으로 정의
export type RootState = 
ReturnType<typeof store.getState>;

/*
비동기 액션(Thunk[당장 실행하지 않고 나중애 필요할때 연산하기 위해 명시적인 
연산을 감싸주는 함수{계산을 미루기 위한 껍데기 함수}
]) 등을 처리할 때 사용할 수 있는 
디스패치(Dispatch)의 타입 구조를 정의합니다.
*/
export type AppDispatch = typeof store.dispatch;