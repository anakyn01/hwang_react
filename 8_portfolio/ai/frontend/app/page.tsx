"use client";
import React,{useRef, useEffect, useCallback} from "react";

import { useSelector, useDispatch } from "react-redux";
import {RootState, AppDispatch} from "@/store/store";
import {setInputText, setIsLoading, setShowMap, addMessage
} from "@/store/chatSlice";

import ReactMarkdown from "react-markdown";

export default function Chat() {

    //Redux 스토어에서 dispatch 함수 가져오기
    const dispatch = useDispatch<AppDispatch>();

    //Redux 스토어의 상태(state)를 안전하게 구독(select)하여 가져오기
    const {messages, inputText, isLoading, showMap} = 
    useSelector((state:RootState) => state.chat
    );

    return(
        <></>
    );
}
