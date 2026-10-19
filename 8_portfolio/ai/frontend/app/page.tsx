
"use client";
import React,{useRef, useEffect, useCallback} from "react";

import { useSelector, useDispatch } from "react-redux";
import {RootState, AppDispatch} from "@/store/store";
import {setInputText, setIsLoading, setShowMap, addMessage
} from "@/store/chatSlice";

import ReactMarkdown from "react-markdown";
//무조건 시간 관련된건 템포럴로..
import { Temporal } from "@js-temporal/polyfill";

export default function Chat() {

    //Redux 스토어에서 dispatch 함수 가져오기
    const dispatch = useDispatch<AppDispatch>();

    //Redux 스토어의 상태(state)를 안전하게 구독(select)하여 가져오기
    const {messages, inputText, isLoading, showMap} = 
    useSelector((state:RootState) => state.chat
    );

    //채팅 내용 자동 스크롤을 위한 DOM 참조 변수
    const messagesEndRef = useRef<HTMLDivElement>(null);

    //새 메시지가 추가될 때마다 가장 
    // 최신 메시지(맨 아래)로 부드럽게 스크롤을 이동시킵니다.
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior:"smooth"  
        });
    },[messages]);

    /*
[useCallback 훅 적용]
사용자가 전송버튼을 누르거나 엔터키를 칠때
실행되는 비동기 전송 함수    
불필요한 함수 재생성 방지    
    */
const handleSend = useCallback(async () => {
    //입력된 텍스트의 양쪽 공백을 제거했을 때 빈 값이면 함수 실행 중지
    if(!inputText.trim()) return;
    //1.사용자가 입력한 쿼리 저장 및 메시지 객체 생성
     const userQuery = inputText;
//템포럴일때..다른 패턴.
const uniqueId = 
Temporal.Now.instant().epochMilliseconds;

     const newUserMessage = {
        //id:Date.now() 옛날방식,
        id:uniqueId,
        text:userQuery,
        sender:"user" as const,
     };

     // 2. Redux 액션을 통해 화면에 사용자 메시지 
     // 추가 및 입력창 초기화, 로딩 시작
     dispatch(addMessage(newUserMessage));
     dispatch(setInputText(""));
     dispatch(setIsLoading(true));

     //[지능형 분기 처리] 질문 내용에 장소 
     // 관련 키워드가 포함되어 있는지 검사
     const lowerQuery = userQuery.toLowerCase();
     const isLocationQuery =
     lowerQuery.includes("맛집")||
     lowerQuery.includes("학원")||
     lowerQuery.includes("식당")||
     lowerQuery.includes("카페")||
     lowerQuery.includes("추천")||
     lowerQuery.includes("극장")||
     lowerQuery.includes("근처");

     // 장소 관련 질문이면 지도 창(showMap)을 활성화(true)하고 
     // 아니면 숨깁니다(false).
     dispatch(setShowMap(isLocationQuery));

     try{
const response =
await fetch("http://localhost:8000/api/chat",{
    method:"POST",
    headers:{
        "Content-type":"application/json",
    },
    body:JSON.stringify({messages:userQuery}),
});

if(!response.ok){
    throw new Error('서버 에러가 발생했습니다')
}

const data =
await response.json();

//백엔드에서 받은 AI 답변을 Redux 상태에 추가
dispatch(
    addMessage({
        id:uniqueId,
        text:data.reply,
        sender:"ai",
    })
);
     }catch(error){

     }finally{

     }
},[inputText, dispatch]);

    return(
        <></>
    );
}
