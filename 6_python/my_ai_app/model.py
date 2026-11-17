#인공지는 모델 관리 및 추론
import torch
#파이토치(PyTorch) 라이브러리를 임포트합니다 (딥러닝 연산의 핵심 도구).
from transformers import AutoModelForCausalLM, AutoTokenizer
#허깅페이스에서 LLM 모델 본체와 텍스트를 변환할 토크나이저 클래스를 가져옵니다

#LLM모델의 로드와 텍스트 생성(추론)을 전담하여 관리하는 클래스 정의
class AIModelManager:
    def __init__(self): #클래스가 처음 생성될 때 실행되는 초기화 메서드입니다.
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        #컴퓨터에 GPU(CUDA)가 있으면 사용하고, 없으면 일반 CPU를 쓰도록 설정합니다.
        self.llm_model = None
        #나중에 로드될 LLM 모델 객체를 담을 변수를 빈 상태(None)로 초기화합니다.
        self.tokenizer = None
        #나중에 로드될 토크나이저 객체를 담을 변수를 빈 상태로 초기화합니다.

    def load_llm(self):
        #대형 언어 모델을 메모리에 불러오는 메서드입니다.
        #model_id = "microsoft/phi-4" 무겁스
        model_id = "Qwen/Qwen2.5-1.5B-Instruct"  # 가벼운 모델 추천
        #다운로드하여 사용할 허깅페이스 모델의 고유 ID(이름)를 지정합니다.
        print(f"Loading LLM model on {self.device}...")
        ## 현재 어떤 장치(GPU 또는 CPU)에서 모델을 불러오는지 콘솔에 출력합니다.
        # 문장을 토큰(조각)으로 쪼개고 합치는 전용 토크나이저를 불러옵니다.
        self.tokenizer = AutoTokenizer.from_pretrained(model_id)
        #사전 학습된 대형 언어 모델 본체를 메모리에 로드합니다.
        self.llm_model = AutoModelForCausalLM.from_pretrained(
            model_id,
            #torch_dtype=torch.float16 if self.device == "cuda" else torch.float32,
            torch_dtype=torch.float32
            #GPU면 연산 속도가 빠른 반정밀도(16비트)
            #CPU면 표준 32비트 자료형을 사용합니다
            #device_map="auto"
            #사용 가능한 하드웨어(GPU/CPU)에 맞게 모델 레이어를 알아서 분산 배치합니다.
        )
        self.llm_model.to(self.device)
    # 사용자의 질문을 받아 답변 글을 생성하는 메서드입니다.
    # max_new_tokens : 텍스트를 생성할 때 기존에 입력된 프롬프트(입력 텍스트)를 제외하고,
    # 새롭게 생성할 최대 토큰(단어 또는 단어 조각의 단위)의 개수를 제한하는 설정
    # int = 128 타입 힌팅(Type Hinting) 문법
    def predict_llm(self, prompt:str, max_new_tokens: int = 128) -> str:
        ## 모델이 아직 로드되지 않은 상태라면 에러성 안내 문구를 반환합니다.
        if not self.llm_model:
            return "LLM model is not loaded"

        #입력받은 질문 텍스트를 숫자로 이루어진 텐서 형태로 변환한 뒤에 설정된 장치로 보낸다
        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.device)
        #모델의 인공신경망을 통해 다음 올 단어들을 순차적으로 예측하여 생성합니다.
        outputs = self.llm_model.generate(
            **inputs, #토큰화된 입력 데이터를 풀어서 전달합니다.
            max_new_tokens=max_new_tokens,
            #AI가 새로 답변으로 만들어낼 최대 토큰 개수를 제한합니다.
            temperature=0.7,
            ## 답변의 무작위성(창의성)을 조절합니다
            # (값이 클수록 다양하고 독창적인 답변이 나옴).
            do_sample=True
            # 단순 확률 최고값만 고르지 않고 샘플링 기법을 적용해 자연스러운 문장을 유도합니다.

        )
        result = self.tokenizer.decode(outputs[0], skip_special_token=True)
        # AI가 생성한 숫자(토큰) 결과물을 사람이 읽을 수 있는 일반 문자열로 다시 바꿉니다
        return result

        # ✨ 어떤 이름으로 호출하든 에러가 나지 않도록 연결해 주는 메서드
    def predict(self, prompt: str, max_new_tokens: int = 128) -> str:
        return self.predict_llm(prompt, max_new_tokens)


ai_manager = AIModelManager()
#서버 어디서든 이 모델 관리 기능을 불러다
# 쓸 수 있도록 전역 인스턴스(객체)를 생성합니다.