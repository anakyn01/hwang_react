/*
Redux Toolkit을 사용하여 
챗봇의 전역 상태(state)와 액션(actions)을 
정의하는 파일입니다.
*/
import {createSlice, PayloadAction
    } from "@reduxjs/toolkit"
import { createCombinedPayloadAtDepth } from "next/dist/server/app-render/instant-validation/instant-validation";
//메시지 데이터 타입 정의
interface Message {
id:number; text:string;
sender: "user" | "ai";    
} 
//PlaceInfo 모델과 1:1로 매칭되는 장소 데이터 타입 정의
export interface PlaceInfo {
name:string;
category:string;
address:string;
lat:number;
lng:number;
is_registered:boolean;
description:string;   
}



//챗봇이 관리할 전체 
//상태의 형태(Interface) 정의 
interface ChatState{
messages:Message[];
inputText:string;
isLoading:boolean;
showMap:boolean;
places:PlaceInfo[];
}  

//초기 상태값 설정
const initialState: ChatState = {
    messages:[
        {
        id: 1,
        text: "안녕하세요! 노원구 맛집이나 학원을 물어보세요. AI 어시스턴트입니다!",
        sender: "ai",    
        }        
    ],
    inputText: "",
    isLoading: false,
    showMap: false,
    places:[],
};

export const chatSlice = createSlice({
name:"chat",
initialState,
reducers:{
// 입력창 텍스트 변경 액션
setInputText:(state, action:PayloadAction<string>) => {
state.inputText = action.payload;
},
// 로딩 상태 변경 액션
setIsLoading:(state, action:PayloadAction<boolean>) => {
state.isLoading = action.payload    
},
// 지도 표시 여부 변경 액션
setShowMap:(state, action:PayloadAction<boolean>) => {
state.showMap = action.payload; 
},
// 새 메시지 추가 액션
addMessage:(state, action:PayloadAction<Message>) => {
state.messages.push(action.payload);    
},
setPlaces:(state, action:PayloadAction<PlaceInfo[]>) => {
state.places = action.payload;
},
},   
});

// 컴포넌트에서 dispatch할 수 있도록 액션 내보내기
export const {setInputText, setIsLoading, setShowMap, addMessage, setPlaces} =chatSlice.actions;

// 스토어 등록을 위한 리듀서 내보내기
export default chatSlice.reducer;

/*
리덕스 스토어(Redux Store)
:애플리케이션의 전체 상태(State)를 담고 있는 하나의 중앙 저장소(객체)

리듀서(Reducer)
:현재의 상태(State)와 액션(Action)을 받아, 
새로운 상태를 계산해서 반환하는 순수 함수

리덕스(스토어와 리듀서)를 쓰는 이유
(Props Drilling) 방지
예시 손수건 돌리기 1~ 5번까지 갈때 중간 중간 거쳐야됨..
부모에서 자식으로만 데이터를 전달할 수 있어서, 
깊이 있는 컴포넌트에 상태를 넘기려면 중간 컴포넌트들을 거쳐야 됨

어느 컴포넌트에서든 스토어에 직접 접근해 상태를 가져다 쓸 수 있습니다

상태의 중앙 집중화 & 예측 가능성
상태가 여기저기 흩어져 있지 않고 
한 곳(스토어)에 모여 있어서 관리가 쉽습니다.

Action(무슨 일이 있었는지 기술) ➔ 
Dispatch(액션을 전달) ➔ 
Reducer(새로운 상태를 계산) ➔ 
Store(전역 상태 업데이트)
*/