/*
Nextjs 13버전 이상에서 이파일이 클라이언트(브라우저)
측에서 실행되는 컴포넌트임을 명시
React의 useState, useEffect같은 훅을 사용하려면 필요
*/
"use client";
//리액트 라이브러리에서 기본 기능과 상태관리(useState), 참조(useRef), 생명주기(useEffect) 푹 가져오기
import React,{useState, useRef, useEffect} from "react";
import{//Material Design for Bootstrap
MDBContainer,
MDBCard,
MDBCardHeader,
MDBCardBody,
MDBCardFooter,
MDBIcon,
MDBBtn,
} from "mdb-react-ui-kit";

/*메세지 타입 정의
TypeScript를 사용하여 'Message'라는 데이터의 형태(타입)를 정의
이렇게 하면 코드 작성 중 실수를 방지할 수 있습
*/
interface Message{
    id:number; 
    text:string; 
    sender:"user"|"ai";
    //메시지를 보낸 사람이 '사용자'인지 'AI'인지 구분
}

export default function Home(){
    //사용자가 입력창에 적고 있는 글자를 저장하는 상태(State)입니다.
    const [inputText, setInputText] =useState("");
    //AI가 답변을 생각하는 중(로딩 중)인지 여부를 저장하는 상태입니다. 
    const [isLoading, setIsLoading] = useState(false);//로딩상태 추가
    //채팅 화면에 보여줄 메시지들의 목록을 배열로 저장하는 상태입니다.
    const [messages, setMessages] = useState<Message[]>([
        //화면이 처음 켜졌을 때 보여줄 기본 AI 인사말을 설정
        {
            id:1,
            text:"안녕하세요! 노원구 맛집 AI 에이전트 입니다. 어떤 맛집을 찾고 계신가요?",
            sender:"ai",
        }
    ]);

    /*
    채팅이 길어질 때 가장 최신 메시지(맨 아래)로 자동 스크롤하기 위해 
    화면의 특정 HTML요소를 가리키는 참조(REF)를 만듭니다
    */
   const messagesEndRef = useRef<HTMLDivElement>(null);

   /*
   특정 상황에서 자동으로 실행되는 함수 useEffect를 넣어줌
   여기서는 messages배열이 변경될때 마다 (즉 새 메세지가 추가될때 마다)
   실행
   */
  useEffect(() => {
//messagesEndRef가 가리키는 화면 요소(맨 아래 빈 div)로 부드럽게(smooth) 스크롤을 이동
    messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages]);

  //사용자가 전송 버튼을 누르거나 엔터키를 쳤을때 실행되는 비동기 함수
    const handleSend = async () => {
/*
입력창의 양쪽 공백을 제거(trim)했을 때 아무 글자도 없으면
함수를 종료합니다. (빈 메시지 방지)
*/        
if (!inputText.trim()) return;

        //사용자 메시지 추가
        const newUserMessage: Message = {
id: Date.now(),//현재 시간을 밀리초로 가져와 고유한 ID로 사용합니다.
text:inputText,//사용자가 입력한 텍스트
sender:"user",//보낸 사람은 '사용자'
        };
 //기존 메시지 배열(prev)의 끝에 방금 만든 사용자 메시지를 추가하여 화면을 업데이트합니다.       
setMessages((prev) => [...prev, newUserMessage]);
//메세지를 화면에 추가 했으니 입력창은 다시 빈칸으로 비워둡니다
setInputText("");
//AI 응답 대기 상태로 변경
setIsLoading(true); 

        //여기에 추후 파이선 백앤드 api가 들어갈 예정
        try{
const response = await fetch("http://localhost:8000/api/chat",{
    method:"POST",//데이터를 서버로 보내는 방식
    headers:{
        "Content-Type":"application/json",
        //리가 보내는 데이터가 JSON 형식임을 서버에 알려줍니다.

    },
    //자바스크립트 객체({ message: ... } )를 JSON 문자열로 변환하여 보냅니다.
    body:JSON.stringify({message:newUserMessage.text}),
});
//버에서 온 응답 상태가 정상(200번대)이 아니면 에러를 발생시킵니다.
if(!response.ok){
    throw new Error("서버 에러가 발생했습니다");
}

//서버가 정상적으로 보내준 JSON 데이터를 자바스크립트 객체로 변환(파싱)합니다.
const data = await response.json();

//백앤드에서 보내준 답변(data.reply)을 이용해 AI메세지 객체를 만들고 화면에 추가
setMessages((prev) => [
    ...prev,
    { id: Date.now(), text:data.reply, sender:"ai"},
]);

/*
파이썬 백엔드 서버(FastAPI)로 데이터를 보냅니다(POST 요청).
fetch 함수는 네트워크 통신을 담당하며, await를 써서 응답이 
올 때까지 기다립니다
*/
        } catch (error) {
//통신 중 에러(서버 꺼짐, 인터넷 끊김 등)가 발생하면 콘솔에 에러를 출력
console.error("통신에러: ", error);
//사용자에게 서버와 연결할 수 없다는 안내 메시지를 AI가 말하는 것처럼 화면에 띄워줍니다.
setMessages((prev) => [
...prev,
{
id:Date.now(),
text:"백앤드 서버와 연결할수 없음 파이선 서버(8000)켜져 있는지 확인요망" ,
sender:"ai",   
},
]);
        } finally {
setIsLoading(false);
        }
    };
/*임시 AI응답 (나중에 백앤드 연동후 삭제)
setTimeout(() => {
setMessages((prev) =>[
...prev,
{ id: Date.now(), text:"백앤드 연결 전입니다.조금만 기다려 주세요", sender:"ai"},
]);
}, 1000);
};*/
//사용자가 입력창에 키보드를 누를떄 마다 실행되는 함수
const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
//누른키가 'Enter'이고 현재 로딩중이 아닐때만 전송(handleSend)함수를 실행
    if (e.key === "Enter" && !isLoading) {
        handleSend();
    }
};

return(
    <MDBContainer
    className="py-5"
    style={{maxWidth:"800px"}}
    >
        <MDBCard
style={{borderRadius:"15px", height:"80vh", display:"flex", flexDirection:"column"}}
        >
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

{/*채팅 내용 영역 */}
<MDBCardBody
style={{overflowY:"auto", flex:1, backgroundColor:"#f9fbfd"}}
>
{messages.map((msg) => (
<div
key={msg.id}
className={`d-flex flex-row justify-content-${msg.sender === "user" ? "end":"start"}`}
>
{msg.sender === "ai" &&(
    <div style={{width:"45px", height:"100%"}} className="me-2 text-center">
        <MDBIcon fas icon="robot" size="2x" style={{color:"#3f51b5"}}/>
    </div>
)}
<div
className="p-3"
style={{
borderRadius:"15px",
backgroundColor:msg.sender === "user" ? "#3f51b5" : "#e0e0e0",
color:msg.sender === "user" ? "white" : "black",
maxWidth:"70%",
}}
>
    <p className="small mb-0" style={{lineHeight:"1.5"}}>
        {msg.text}
    </p>

</div>

</div>
))}
</MDBCardBody>

{/*입력 영역 */}
<MDBCardFooter
className="text-muted d-flex justify-content-start align-items-center p-3"
>
<input
type="text"
className="form-control from-control-lg"
placeholder="메세지를 입력하세요..."
value={inputText}
onChange={(e) => setInputText(e.target.value)}
onKeyPress={handleKeyPress}
style={{borderRadius:"10px"}}
/> 
<MDBBtn color="primary"
className="ms-3"
style={{borderRadius:"10px"}}
onClick={handleSend}
>
<MDBIcon fas icon="paper-plane"/>전송

</MDBBtn>

</MDBCardFooter>

        </MDBCard>
    </MDBContainer>
)

}