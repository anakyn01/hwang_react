'''
fastapi : 빠르고 간편한 파이선 프레임워크
uvicorn : 서버를 실행 시켜주는도구
pydantic : 프론트엔드에서 넘어온 메세지 형식이 맞는지 검사
'''
import os
from pathlib import Path
from dotenv import load_dotenv

# [수정 1] 불필요하게 자동완성된 from groq.types.chat import chat_completion 제거

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

# Groq 라이브러리 가져오기
from groq import Groq

# 같은 폴더에 있는 .env 파일을 정확히 로드
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# 만약 설정이 안되어 있으면
if not GROQ_API_KEY:
    print("warning: .env 파일에서 api키를 찾을수 없음!!!!!")

# 꺼내온 API 키로 Groq 클라이언트 생성
client = Groq(api_key=GROQ_API_KEY)

app = FastAPI()
'''
FastAPI 앱(서버) 인스턴스를 생성
모든 설정과 API는 이 app에 등록됩니다
'''
# app에 cors미들웨어를 추가
app.add_middleware(
    CORSMiddleware,  # 사용할 미들웨어 종류를 지정
    # 요청을 허용할 프론트엔드 주소 목록
    allow_origins=["http://localhost:3000"],
    # 쿠키나 인증 정보(credentials)를 요청에 포함하는 것을 허용
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
    # 사용자가 입력한 채팅 메세지를 받는 필드 str은 문자열 텍스트 타입


class ChatResponse(BaseModel):
    reply: str


'''/api/chat 경로로 POST요청이 들어왔을때 실행될 함수를 등록
response_model=ChatResponse는 
이 함수가 반환하는 데이터 형식을 ChatResponse로 강제
'''


@app.post("/api/chat", response_model=ChatResponse)
# 실제로 요청을 처리하는 함수
def chat_endpoint(request: ChatRequest):
    # request객체에서 사용자가 보낸 메세지 텍스트만 꺼내 변수에 저장
    user_message = request.message

    # 맛집뿐만 아니라 모든 질문에 답할 수 있도록 지침 설정
    system_prompt = (
        "당신은 박식하고 친절한 만능 AI 어시스턴트입니다. "
        "일상 대화, 코딩, 번역, 비즈니스, 맛집 추천(특히 서울 노원구 등)을 포함해 "
        "사용자가 묻는 모든 분야의 질문에 대해 정확하고 이해하기 쉽게 답변해 주세요. "
        "반드시 자연스럽고 매끄러운 한국어로 답변하세요."
    )

    try:
        print(f"사용자 질문 수신: {user_message} -> Groq 초고속 응답 요청 중...")

        chat_completion = client.chat.completions.create(
            # [수정 2] 404 에러가 나는 구형 모델 대신 현재 작동하는 최신 무료 모델로 변경
            model="openai/gpt-oss-120b",
            messages=[
                # 1. 시스템 역할 부여
                {"role": "system", "content": system_prompt},
                # 2. 사용자의 실제 질문 전달
                {"role": "user", "content": user_message},
            ],
            temperature=0.6,
        )

        # AI가 생성한 답변 텍스트 꺼내기
        ai_reply = chat_completion.choices[0].message.content
        print("Groq 응답 완료")

    except Exception as e:
        print(f"Groq AI 호출중 에러 발생: {e}")
        ai_reply = "죄송합니다. 현재 AI 응답을 가져오는 중 문제가 발생했습니다. .env 파일의 GROQ_API_KEY 설정이나 서버 콘솔을 확인해 주세요."

    # [수정 3 - 가장 중요!] return을 except 밖으로 빼서 성공했을 때도 답변이 전달되도록 수정!
    return ChatResponse(reply=ai_reply)

# 구동 명령어: ./.venv/bin/python -m uvicorn main:app --reload --port 8000