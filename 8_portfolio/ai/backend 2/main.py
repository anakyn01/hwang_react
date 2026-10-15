'''
fastapi : 빠르고 간편한 파이선 프레임워크
uvicorn : 서버를 실행 시켜주는도구
pydantic : 프론트엔드에서 넘어온 메세지 형식이 맞는지 검사
'''
'''FastAPI 라이브러리에서 FastAPI 클래스를 가져오고
파이썬으로 API 서버를 빠르게 만들 수 있게 해주는 도구
'''
from fastapi import FastAPI
'''
CORS(Cross-Origin Resource Sharing) 미들웨어를 가져옵니다.
미들웨어란 요청과 응답 사이에서 중간 처리를 담당하는 기능
다른 주소(포트)에서 오는 요청을 허용할지 말지"를 결정하는 보안 정책
'''
from fastapi.middleware.cors import CORSMiddleware
'''
pydantic: 프론트엔드에서 넘어온 데이터(메시지)의 형식이 맞는지 검사
Pydantic 라이브러리에서 BaseModel 클래스를 가져옵니다
'''
from pydantic import BaseModel

app = FastAPI()
'''
FastAPI 앱(서버) 인스턴스를 생성
모든 설정과 API는 이 app에 등록됩니다
'''
#app에 cors미들웨어를 추가
app.add_middleware(
    CORSMiddleware, #사용할 미들웨어 종류를 지정
    #요청을 허용할 프론트엔드 주소 목록
    allow_origins=["http://localhost:3000"],
    # 쿠키나 인증 정보(credentials )를 요청에 포함하는 것을 허용
    allow_credentials=True,
    # 허용할 http메서드를 지정
    allow_methods=["*"],
    # 허용할 http헤더를 지정
    allow_headers=["*"],
)

'''프론트엔드에서 서버로 보내는 요청(Request)데이터의 구조를 정의
BaseModel을 상속받아 Pydantic이 데이터 타입를 자동으로 검증
'''
class ChatRequest(BaseModel):
    message: str
    #사용자가 입력한 채팅 메세지를 받는 필드 str은 문자열 텍스트 타입

class ChatResponse(BaseModel):
    reply: str

'''/api/chat 경로로 POST요청이 들어왓을때 실행될 함수를 등록
response_model=ChatResponse는 
이 함수가 반환하는 데이터 형식을 ChatResponse로 강제
'''
@app.post("/api/chat", response_model=ChatResponse)
# 실제로 요청을 처리하는 비동기 함수 여러 요청을 동시에 효율적으로 처리
async def chat_endpoint(request: ChatRequest):
    #request객체에서 사용자가 보낸 메세지 텍스트만 꺼내 변수에 저장
    user_message = request.message
    #open ai를 여기에..
    temp_reply = f"사용자님이 '{user_message}'라고 말씀하셨군요! 파이선 백엔드가 메세지를 잘 받았습니다"
    #ChatResponse객체를 생성해서 반환
    return ChatResponse(reply=temp_reply)

#구동 명령어 uvicorn main:app --reload