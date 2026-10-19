'''
streamlit : HTML/CSS 없이 파이썬 코드로 웹 화면(UI)을 만들어주는 도구
'''
import streamlit as st
import requests

# 1. 웹페이지 기본 설정 (맨 처음에 실행되어야 함)
st.set_page_config(
    page_title="나만의 AI 챗봇",
    page_icon="🤖",
    layout="centered"
)

# 2. 페이지 상단 제목 및 설명
st.title("🤖 나만의 AI 어시스턴트")
st.caption("FastAPI 백엔드와 연동된 AI 챗봇입니다.")

# 3. 대화 기억 공간(Session State) 초기화
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": "안녕하세요! 무엇이든 물어보세요. 오늘 어떤 도움이 필요하신가요?"}
    ]

# 4. 이전 대화 내용 화면에 출력하기
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# 5. 하단 채팅 입력창 및 통신 로직
if user_input := st.chat_input("메세지를 입력하세요...."):

    # 사용자가 입력한 메시지 화면에 표시 및 저장
    st.session_state.messages.append({"role": "user", "content": user_input})
    with st.chat_message("user"):
        st.markdown(user_input)

    # FastAPI 백엔드 호출 및 AI 답변 출력
    with st.chat_message("assistant"):
        with st.spinner("생각하는 중..."):
            try:
                fastapi_url = "http://localhost:8000/api/chat"
                response = requests.post(fastapi_url, json={"message": user_input})

                if response.status_code == 200:
                    data = response.json()
                    ai_reply = data.get("reply", "응답을 받지 못했습니다")
                else:
                    ai_reply = f"서버 에러가 발생했습니다. (상태코드: {response.status_code})"
            except Exception as e:
                ai_reply = f"FastAPI 백엔드 서버와 연결할 수 없습니다\n\n(에러: {e})"

            st.markdown(ai_reply)
            st.session_state.messages.append({"role": "assistant", "content": ai_reply})