import streamlit as st
import time

st.set_page_config(
    page_title="AI",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# css
st.markdown("""
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
<style>
header[data-testid="stHeader"]{
background:transparent !important;
}
.block-container{
padding-top:2.5rem !important;
padding-bottom:2rem !important;
max-width:1360px !important;
}

    .stApp {
        background: linear-gradient(135deg, #0a0e17 0%, #111827 50%, #0d111a 100%) !important;
        color: #f8fafc !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    div[data-testid="stHorizontalBlock"]{
    align-items:center !important;
    }
    div[data-testid="stSelectbox"],
    div[data-testid="stTextInput"],
    div[data-testid="stFormSubmitButton"],
    div.stButton{
    margin-bottom:0px !important;
    padding-bottom:0px !important;
    }
    div[data-testid="stSelectbox"] > div,
    div[data-testid="stTextInput"] > div{
    margin-bottom:0px !important;
    }
    
    div[data-baseweb="select"] > div{
    background:#17223b !important;
    border:1px solid rgba(255,255,255, 0.15) !important;
    border-radius: 1rem !important;
    height:50px !important;
    min-height:50px !important;
    padding:0 16px !important;
    box-sizing:border-box !important;
    display:flex !important;
    align-items:center !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25) !important;
    }
    div[data-baseweb="select"] span,
    div[data-baseweb="select"] div{
    color:#fde047 !important;
    font-weight:700 !important;
    font-size:14px !important;
    }
    div[data-baseweb="select"] svg{
    fill: #fde047 !important;
    }
    div[data-baseweb="popover"]ul{
    background-color:#131b2e !important;
    border:1px solid rgba(255,255,255,0.15) !important;
    border-radius:0.75rem !important;
    }
    div[data-baseweb="popover"]li{
    color:#f8fafc !important;
    }
    div[data-baseweb="popover"]li:hover{
    background-color:#1e2c4f !important;
    color:#fde047 !important;
    }
    
    div[data-testid="stVerticalBlockBorderWrapper"]{
    background-color: rgba(15, 23, 42, 0.6) !important;
    backdrop-filter: blur(12px) !important;
    border:1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius:1rem !important;
    padding:1.25rem !important;
    box-shadow:0 10px 30px rgba(0,0,0,0.35) !important;
    }
    
    div[data-testid="stForm"]{
    border:none !important;
    padding:0 !important;
    margin-top: 12px !important;
    background: transparent !important;
    }
    
    div[data-baseweb="input"]{
    background-color: #131b2e !important;
    border:1px solid rgba(255,255,255, 0.15) !important;
    border-radius:1rem !important;
    height:50px !important;
    padding:0 18px !important;
    display:flex !important;
    align-items:center !important;
    box-shadow: 0 0 0 2px rgba(253, 224, 71, 0.25) !important;
    }
    div[data-baseweb="input"]:focus-within{
    border-color: #fde047 !important;
    box-shadow: 0 0 0 2px rgba(253, 224, 71, 0.25) !important;
    }
    div[data-baseweb="base-input"]{
    background-color: transparent !important;
    }
    div[data-baseweb="input"] input{
    background-color: transparent !important;
    color: #fff !important;
    font-size:14px !important;
    height:50px !important;
    padding:0 !important;
    }
    div[data-baseweb="input"] input::placeholder{
    color:#94a3b8 !important;
    opacity:1 !important;
    }
    div[data-testid="stFormSubmitButton"] button,
    div.stButton > button{
    
    background-color:#fde047 !important;
    border:none !important;
    border-radius:1rem !important;
    height:50px !important;
    min-height:50px !important;
    width:100% !important;
    display:flex !important;
    align-items:center !important;
    box-shadow:0 4px 14px rgba(253,224, 71, 0.3) !important;
    transition:all 0.2s ease !important;
    }

    </style>
""", unsafe_allow_html=True)

# 3. 세션상태 초기화
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": "안녕하세요! 지역 맛집이나 학원을 물어보세요. AI 어시스턴트입니다!"}
    ]

if "show_map" not in st.session_state:
    st.session_state.show_map = False

if "selected_district" not in st.session_state:
    st.session_state.selected_district = "노원구"

if "places" not in st.session_state:
    st.session_state.places = []

# 4. 상단 레이아웃 구성
col_logo, col_select, col_badge = st.columns([2.5, 1.2, 1.3])

with col_logo:
    st.markdown("""
<div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 44px; height: 44px; background: rgba(30, 44, 79, 0.8); backdrop-filter: blur(8px); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #fde047; font-size: 20px; border: 1px solid rgba(255,255,255,0.1); box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);">
                🤖
            </div>
            <div>
                <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #fde047; letter-spacing: -0.5px;">
                    AI <span style="color: #ffffff; font-size: 20px; font-weight: 700;">로컬 어시스턴트</span>
                </h1>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: #94a3b8;">지역 맞춤형 맛집 및 학원 추천 플랫폼</p>
            </div>
        </div>    
    """, unsafe_allow_html=True)

with col_select:
    districts = ["노원구", "도봉구", "강북구", "중랑구", "성북구"]
    selected = st.selectbox(
        "지역 선택",
        districts,
        index=districts.index(st.session_state.selected_district),
        label_visibility="collapsed"
    )
    st.session_state.selected_district = selected

with col_badge:
    badge_text = "지도 연동 활성화" if st.session_state.show_map else "ai 대화모드"
    st.markdown(f"""
<div style="background: rgba(30, 44, 79, 0.8); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 10px 16px; text-align: center; font-size: 12px; font-weight: 600; color: #fde047; box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);">
            {badge_text}
        </div>
    """, unsafe_allow_html=True)

st.markdown("<hr style='border: 0; height: 1px; background: rgba(255,255,255,0.05); margin: 10px 0 20px 0;'>",
            unsafe_allow_html=True)

# 5 중앙 메인 레이아웃
if st.session_state.show_map:
    chat_col, map_col = st.columns([1, 1], gap="medium")
else:
    chat_col = st.container()

# 좌측영역
with (chat_col if not st.session_state.show_map else chat_col):
    chat_container = st.container(height=500)
    with chat_container:
        # 기존 대화 기록 순회 출력
        for message in st.session_state.messages:
            with st.chat_message(message["role"], avatar="🤖" if message["role"] == "assistant" else "👤"):
                st.markdown(message["content"])
    # 하단 입력 폼 (텍스트 입력 및 전송 버튼)
    with st.form(key="chat_form", clear_on_submit=True):
        cols = st.columns([5, 1])
        with cols[0]:
            user_input = st.text_input(
                "메시지 입력",
                placeholder=f"{st.session_state.selected_district} 맛집이나 학원을 물어보세요...",
                label_visibility="collapsed"
            )
        with cols[1]:
            submit_btn = st.form_submit_button("전송")
        # 전송 버튼 클릭 시 동작 로직
        if submit_btn and user_input.strip():
            # 1 사용자 질문 세션에 추가
            st.session_state.messages.append({"role": "user", "content": user_input})
            # 2. 키워드 분석을 통해 지도 모드 판단
            lower_q = user_input.lower()
            is_location = any(k in lower_q for k in ["맛집", "학원", "식당", "카페", "추천", "근처"])
            st.session_state.show_map = is_location

            # 3. AI 응답 생성 시뮬레이션 (실제 구현 시 Groq API 연동 가능)
            with st.spinner("최적의 장소 분석 중..."):
                time.sleep(0.6)
                if is_location:
                    ai_reply = f"[{st.session_state.selected_district}]에서 엄선한 추천 장소들을 지도와 함께 정리해 드렸습니다! 우측 카드를 확인해 보세요."
                    # 가상의 추천 장소 데이터 세팅
                    st.session_state.places = [
                        {
                            "name": f"{st.session_state.selected_district} 모범 한식당",
                            "category": "맛집",
                            "address": f"서울특별시 {st.session_state.selected_district} 동일로 123",
                            "is_registered": True,
                            "description": "신선한 재료와 깊은 국물 맛이 일품인 현지인 추천 맛집입니다."
                        },
                        {
                            "name": f"{st.session_state.selected_district} 탑클래스 학원",
                            "category": "학원",
                            "address": f"서울특별시 {st.session_state.selected_district} 상계로 45",
                            "is_registered": False,
                            "description": "체계적인 커리큘럼과 1:1 맞춤 피드백을 제공하는 전문 교육 기관입니다."
                        }
                    ]
                else:
                    ai_reply = f"말씀하신 내용에 대해 [{st.session_state.selected_district}] 기준에서 친절하게 답변해 드릴께요"
                    st.session_state.places = []

            #  AI 답변 세션에 추가 후 새로고침
            st.session_state.messages.append({"role": "assistant", "content": ai_reply})
            st.rerun()
# 우측영역
if st.session_state.show_map:
    with map_col:
        st.markdown(f"""
<div style="background: rgba(13, 17, 26, 0.8); backdrop-filter: blur(12px); border-radius: 16px; padding: 16px; height: 570px; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.1); position: relative; overflow: hidden; box-shadow: 0 15px 30px rgba(0,0,0,0.4);">


                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; z-index: 10;">
                    <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 14px; border-radius: 12px; font-size: 12px; font-weight: bold; color: #fff; border: 1px solid rgba(255,255,255,0.1);">
                        📍 {st.session_state.selected_district} 추천 장소 지도
                    </div>
                </div>


                <div style="position: absolute; inset: 0; background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(10,14,23,0.9) 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 1;">
                    <div style="font-size: 48px; margin-bottom: 8px; animation: pulse 2s infinite;">🗺️</div>
                    <div style="font-size: 11px; font-family: monospace; color: #93c5fd; background: rgba(19, 27, 46, 0.9); padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                        [ Kakao Map Interactive Layer Active ]
                    </div>
                </div>
""", unsafe_allow_html=True)
        # 지도 닫기 버튼
        if st.button("지도 닫기 X", key="close_map_btn"):
            st.session_state.show_map = False
            st.rerun()

        # 토스트 형태의 장소 카드리스트 렌더링 영역
        st.markdown(
            "<div style='position: relative; z-index: 10; flex: 1; overflow-y: auto; margin-top: 10px; padding-right: 4px;'>",
            unsafe_allow_html=True)

        if st.session_state.places:
            for place in st.session_state.places:
                badge_color = "#3b82f6" if place["is_registered"] else "#fde047"
                badge_text = "공식 등록" if place["is_registered"] else "커스텀 추천"

                st.markdown(f"""
                                    <div class="place-card">
                                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                                            <h4 style="margin: 0; font-size: 14px; font-weight: bold; color: #ffffff;">{place['name']}</h4>
                                            <span style="font-size: 10px; padding: 2px 8px; border-radius: 8px; background: rgba({'59, 130, 246' if place['is_registered'] else '253, 224, 71'}, 0.2); color: {badge_color}; font-weight: 600; border: 1px solid rgba(255,255,255,0.05);">
                                                {badge_text}
                                            </span>
                                        </div>
                                        <p style="margin: 0 0 6px 0; font-size: 11px; color: #94a3b8;">
                                            📍 {place['address']} ({place['category']})
                                        </p>
                                        <div style="background: rgba(13, 17, 26, 0.6); padding: 8px 12px; border-radius: 10px; font-size: 11px; color: #cbd5e1; border: 1px solid rgba(255,255,255,0.03);">
                                            {place['description']}
                                        </div>
                                    </div>
                                """, unsafe_allow_html=True)
        else:
            st.markdown("""
            <div style="background: rgba(19, 27, 46, 0.8); backdrop-filter: blur(8px); border-radius: 12px; padding: 30px; text-align: center; color: #94a3b8; font-size: 12px; border: 1px solid rgba(255,255,255,0.05);">
                    🔍 표시할 장소 데이터가 없습니다. 맛집이나 학원을 검색해 보세요!
                </div>
            """, unsafe_allow_html=True)

        st.markdown("</div></div>", unsafe_allow_html=True)





