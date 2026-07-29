"use client";

import React,{useState} from "react";
import{
MDBContainer,
MDBCard,
MDBCardHeader,
MDBCardBody,
MDBCardFooter,
MDBIcon,
MDBBtn,
} from "mdb-react-ui-kit";

//메세지 타입 정의
interface Message{
    id:number; text:string; sender:"user"|"ai";
}

export default function Home(){
    const [inputText, setInputText] =useState("");
    const [message, setMessages] = useState<Message[]>([
        {
            id:1,
            text:"안녕하세요! 노원구 맛집 AI 에이전트 입니다. 어떤 맛집을 찾고 계신가여? (예: 주차 가능한 고기집 찾아줘)",
            sender:"ai",
        }
    ]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        //사용자 메시지 추가
        const newUserMessage: Message = {
            id: Date.now(),
            text:inputText,
            sender:"user",
        };
        setMessages((prev) => [...prev, newUserMessage]);
        setInputText("");

        //여기에 추후 파이선 백앤드 api가 들어갈 예정

        //임시 AI응답 (나중에 백앤드 연동후 삭제)
        setTimeout(() => {
            setMessages((prev) =>[
...prev,
{ id: Date.now(), text:"백앤드 연결 전입니다.조금만 기다려 주세요", sender:"ai"},
            ]);
        }, 1000);
    };

const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        handleSend();
    }
};

return(
    <MDBContainer
    className="py-5"
    >
        <MDBCard>
            {/*헤더 영역 */}
            <MDBCardHeader
className="d-flex justify-content-between align-items-center p-3 text-white"
            >
<div className="d-flex align-items-center">
    <MDBIcon fas icon="robot" size="lg" className="me-2"/>
    <h5 className="mb-0 fw-bold">노원구 맛집 AI</h5>
</div>

<MDBIcon fas icon="utensils" size="lg"/>
            </MDBCardHeader>
        </MDBCard>
    </MDBContainer>
)

}