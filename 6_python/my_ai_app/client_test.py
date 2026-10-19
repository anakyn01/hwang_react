import requests

# FastAPI 서버가 실행 중인 주소
BASE_URL = "http://127.0.0.1:8000"

def test_root():
    response = requests.get(f"{BASE_URL}/")
    print("=== 1. 루트 접속 결과 ===")
    print(response.json())
    print()

def test_llm_generate():
    endpoint = f"{BASE_URL}/api/llm/generate"
    payload = {
        "prompt": "인공지능과 머신러닝의 차이를 간단히 설명해줘.",
        "max_tokens": 50
    }
    print("=== 2. LLM 생성 요청 중... ===")
    response = requests.post(endpoint, json=payload)
    if response.status_code == 200:
        result = response.json()
        print(f"질문: {result['prompt']}")
        print(f"답변: {result['response']}")
    else:
        print(f"에러 발생: {response.status_code} - {response.text}")
    print()

def test_number_predict():
    endpoint = f"{BASE_URL}/api/deeplearning/predict-number"
    dummy_pixels = [0.0] * 784
    payload = {"pixel_data": dummy_pixels}
    print("=== 3. 딥러닝 숫자 추론 요청 중... ===")
    response = requests.post(endpoint, json=payload)
    if response.status_code == 200:
        result = response.json()
        print(f"추론된 숫자: {result['predicted_number']}")
    else:
        print(f"에러 발생: {response.status_code} - {response.text}")
    print()

if __name__ == "__main__":
    try:
        test_root()
        test_llm_generate()
        test_number_predict()
    except requests.exceptions.ConnectionError:
        print("서버에 연결할 수 없습니다. FastAPI 서버가 켜져 있는지 확인해주세요!")