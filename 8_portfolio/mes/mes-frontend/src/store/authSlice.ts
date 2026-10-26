import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { userInfo } from "os";

interface AuthState {
    token: string | null;
    isAuthenticated:boolean;
    userInfo:{
        email:string;
        firstName:string;
        lastName:string;
        companyName:string;
    } | null;
}

//
const initialState: AuthState = {
    token:typeof window !== "undefined" ? localStorage.getItem("token"):null,
    isAuthenticated:typeof window !== "undefined" ? !!localStorage.getItem("totken"):false,
    userInfo:null,
};

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
 setLogin:(state, action:PayloadAction<{token:string; userInfo?:any}>) => {
state.token = action.payload.token;
state.isAuthenticated = true;
if(action.payload.userInfo){
 state.userInfo = action.payload.userInfo;   
}
localStorage.setItem("token", action.payload.token);
 },
 
 setLogout:(state)=> {
    state.token = null;
    state.isAuthenticated = false;
    state.userInfo = null;
    localStorage.removeItem("token");
 },
    },
});
/*
리눅스
권한구성
소유자 소유그룹 기타사용자
권한설정 750[r:4 + w:2 x:1]
소유그룹 [r:4 x:1]
기타 [x]
*/
export const {setLogin, setLogout} = 
authSlice.actions;
export default authSlice.reducer;
