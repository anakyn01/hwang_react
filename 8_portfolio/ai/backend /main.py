'''
fastapi : 빠르고 간편한 파이선 프레임워크
uvicorn : 서버를 실행 시켜주는도구
pydantic : 프론트엔드에서 넘어온 메세지 형식이 맞는지 검사
'''
import os
import json #AI가 보내준 JSON 문자열 데이터를 파이썬 딕셔너리로 변환하기 위해
from pathlib import Path
# 리스트(List)나 선택적 값(Optional) 같은 데이터 타입을 명확히 지정하기 위해 typing 모듈을 가져옵니다.
from typing import List, Optional
from dotenv import load_dotenv

from app import ai_reply

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

#다음맵(카카오맵)에 마커(아이콘)를 찍기 위해 개별 장소의 데이터 구조를 정의합니다.
class PlaceInfo(BaseModel):
    name: str
    category : str
    address : str
    lat : float
    lng : float
    is_registered : bool
    description : str

class ChatResponse(BaseModel):
    reply: str
    #* 프론트엔드가 지도를 화면에 띄울지 말지 결정하는 상태값 (기본값: False)
    show_map: bool = False
    # 지도에 표시할 맛집/학원 장소들의 배열 데이터
    places: List[PlaceInfo] = []


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
        "반드시 자연스럽고 매끄러운 한국어로 답변하세요.\n\n"
        "응답은 반드시 아래의 JSON 형식으로만 작성해야 합니다:\n"
        "{\n"
        '  "reply": "사용자에게 보여줄 친절한 답변 (마크다운 문법 사용 가능)",\n'
        '  "show_map": true 또는 false (맛집, 학원, 카페, 식당, 장소 추천 등 지도가 필요한 질문이면 true, 일반 대화면 false),\n'
        '  "places": [\n'
        "   {\n"
        '      "name": "업체명",\n'
        '      "category": "맛집 또는 학원 등 카테고리",\n'
        '      "address": "서울 노원구 상세 주소",\n'
        '      "lat": 37.6551 (실제 노원구 해당 지역의 대략적인 위도 숫자),\n'
        '      "lng": 127.0614 (실제 노원구 해당 지역의 대략적인 경도 숫자),\n'
        '      "is_registered": true 또는 false (유명 프랜차이즈나 다음맵에 등록된 유명 업체면 true, 숨은 골목식당이나 가상의 추천/미등록 업체면 false),\n'
        '      "description": "대표 메뉴나 학원 특징 요약"\n'
        "   }\n"
        "  ]\n"
        "}\n"
        "주의: 일반 대화(show_map이 false일때)인 경우 places는 빈 배열 [] 로 보내세요"
    )

    # [추가됨] 에러가 발생했을 때를 대비해 기본 반환값 변수를 미리 초기화해 둡니다.
    show_map_flag = False
    places_list = []

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
            # 다른 뱀에 발이 없이 JSON 형태로만 답하게..
            response_format = {"type":"json_object"},

        )

        # AI가 생성한 답변 텍스트 꺼내기
        raw_content = chat_completion.choices[0].message.content
        print("Groq 응답 완료")

        #★ [추가됨] AI가 보내준 JSON 문자열을 파이썬 딕셔너리 객체로 변환(파싱)합니다.
        parsed_data = json.loads(raw_content)

        #[추가됨] 파싱된 데이터에서 채팅 답변(reply),
        # 지도 표시 여부(show_map),
        # 장소 목록(places)을 각각 안전하게 꺼냅니다.
        ai_reply = parsed_data.get("reply","답변을 생성하지 못했습니다")
        show_map_flag = parsed_data.get("show_map", False)
        places_list = parsed_data.get("places",[])

    except Exception as e:
        print(f"Groq AI 호출중 에러 발생: {e}")
        ai_reply = "죄송합니다. 현재 AI 응답을 가져오는 중 문제가 발생했습니다. .env 파일의 GROQ_API_KEY 설정이나 서버 콘솔을 확인해 주세요."
        show_map_flag = False
        places_list = []

    # [수정 3 - 가장 중요!] return을 except 밖으로 빼서 성공했을 때도 답변이 전달되도록 수정!
    return ChatResponse(
        reply=ai_reply,
        show_map=show_map_flag,
        places=places_list
    )

# 구동 명령어: ./.venv/bin/python -m uvicorn main:app --reload --port 8000