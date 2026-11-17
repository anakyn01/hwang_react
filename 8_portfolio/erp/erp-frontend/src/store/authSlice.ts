//먼저 로그인한 토큰과 사용자 상태를 관리할 슬라이스
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
//인증상태가 가질 데이터 정의
interface AuthState{
    token: string | null; //JWT 토큰 문자열이 들어가거나 없으면 null
    isAuthenticated:boolean; //로그인 여부를 나타내는 불리언 값
    userInfo:{
    email:string;
    firstName:string;
    lastName:string;
    companyName:string;    
    } | null;
}

/*
Authentication(인증)
Authorization(인가/권한부여)
Accounting(회계/과금)
*/
const initialState: AuthState = {
    //SSR(서버에서 미리 완성된 HTML로 만들어 사용자에게 전달) 
    // 환경에서 에러가 나지 않도록 window 객체 존재 여부를 확인한 뒤 
    // localStorage의 토큰을 가져옵니다.
    token: typeof window !== 
    "undefined" ? localStorage.getItem("token") : null,
    // 토큰 존재 여부를 판별하여 초기 로그인 상태(true/false)를 결정
    isAuthenticated: typeof window !== 
    "undefined" ? !!localStorage.getItem("token") : false,
    userInfo:null,
};

//인증 관련 전역 상태와 
// 상태 변경 로직(Reducer)을 하나로 묶어주는 슬라이스를 생성
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{// 상태를 변경하는 함수(액션)들을 정의하는 객체
        //로그인 성공
        setLogin:(state, action:PayloadAction<{token:string; userInfo?:any}>) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            if (action.payload.userInfo){
                state.userInfo = action.payload.userInfo;
            }
            localStorage.setItem("token", action.payload.token);
        },
        //로그아웃
        setLogout:(state) => {
            state.token=null;
            state.isAuthenticated = false; 
            state.userInfo = null;           
            localStorage.removeItem("token");
        },
    },
});

// 컴포넌트에서 상태를 변경하기 위해 
// dispatch[상태를 변경해 달라고 요청하는 "전송/발송 함수]할 수 
// 있는 액션 생성 함수들을 내보냅니다.
export const { setLogin, setLogout} = authSlice.actions;

//스토어(store.ts)등록을 위해 리듀서 함수를 기본값으로 내보냅니다
export default authSlice.reducer;