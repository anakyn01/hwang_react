from fastapi import FastAPI, HTTPException
#FastAPI 웹 서버 구축을 위한 클래스와 예외 처리(HTTPException) 모듈
from pydantic import BaseModel
# 클라이언트가 보낸 데이터의 형식과 유효성을 검사(Validation)하기
# 위한 베이스 모델 클래스를 가져옵니다.
from model import ai_manager
# 앞서 작성했던 AI 모델 관리 객체(ai_manager)를 가져옵니다

## FastAPI 앱 인스턴스를 생성하고 문서 제목과 설명을 설정합니다.
app = FastAPI(title="모두의 인공지능 api", description="FastAPI로 구현한 AI 모델 및 LLM 서비스 서버", version="1.0.0")

#FastAPI 서버가 처음 켜질 때(startup) 실행되는 이벤트 핸들러입니다.
@app.on_event("startup")
def startup_event():
    try:
        #서버 구동 시점에 무거운 AI 모델을 미리 메모리에 로드합니다.
        ai_manager.load_llm()
    # 모델 로드 중 에러가 발생하더라도 서버가 다운되지 않도록
    # 예외 처리를 하고 로그만 출력합니다.
    except Exception as e:
        print(f"Model load skipped or failed: {e}")

#클라이언트가 LLM 요청 시 보낼 데이터 구조(JSON 형식)를 정의
class PredictRequest(BaseModel):
    prompt: str #사용자가 입력할 질문 또는 프롬프트 텍스트 (문자열)
    max_tokens: int = 128 # AI가 생성할 최대 답변 길이 (기본값 128)

#딥러닝 숫자 인식(MNIST 등) 요청 시 보낼 데이터 구조를 정의합니다.
class NumberPredictRequest(BaseModel):
    pixel_data: list[float]
    #28x28 이미지의 픽셀 값 배열 (0.0~1.0 사이의 실수 총 784개)

# 서버가 잘 살아있는지 확인하는 기본 루트 경로(GET) 엔드포인트입니다
@app.get("/")
def read_root():
    return {"message":"모두의 인공지능 서버가 정상작동 중입니다!"}

#LLM 텍스트 생성 기능을 제공하는 API 엔드포인트(POST)입니다.
#서버가 클라이언트의 요청을 받아들이고 응답을 돌려주는 '디지털 위치(주소)
@app.post("/api/llm/generate")
def generate_text(request: PredictRequest):
    try:
        #ai_manager를 통해 사용자의 프롬프트를 전달하고 생성된 답변을 받아옵니다.
        answer = ai_manager.predict(request.prompt, request.max_tokens)
        return {"prompt":request.prompt, "response":answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#딥러닝 숫자 추론 기능을 제공하는 API 엔드포인트(POST)
@app.post("/api/deeplearning/predict-number")
def predict_number(request: NumberPredictRequest):
    #전달받은 픽셀 데이터가 정확히 784개인지 검증합니다.
    if len(request.pixel_data) != 784:
        raise HTTPException(status_code=400, detail="784개의 픽셀 데이터(28x28)가 필요합니다.")
    #예측로직
    predicted_number = 7

    return {"predicted_number":predicted_number}






