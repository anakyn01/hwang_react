# Streamlit 라이브러리를 st로 임포트합니다.
import streamlit as st
# HTML/JS 컴포넌트 실행을 위해 임포트합니다.
import streamlit.components.v1 as components
# 시간 지연 등을 위한 time 라이브러리를 임포트합니다.
import time
import os
# 바이트 스트림 처리를 위한 io 라이브러리를 임포트합니다.
import io
# 이미지 처리를 위해 Pillow 라이브러리를 임포트합니다.
import base64
from PIL import Image
from openai import OpenAI

from jinja2 import Environment, FileSystemLoader
from openai.types.chat import chat_completion

st.set_page_config(
    page_title="AI Assistant",
    page_icon="✨",
    layout="wide",
    initial_sidebar_state="collapsed"
)

GROQ_API_KEY = st.secrets["GROQ_API_KEY"]

#엔드 포인트
try:
    client = OpenAI(
        base_url="https://api.groq.com/openai/v1",
        api_key=GROQ_API_KEY
    )
    # 기본 텍스트/문서 처리를 위한 모델명을 정의합니다.
    MODEL_NAME = "openai/gpt-oss-120b"
    # 현재 계정에서 사용 가능한 모델 리스트를 서버로부터 조회합니다.
    available_models = [m.id for m in client.models.list().data]
    # 사용 가능한 모델 중 비전(VLM) 관련 키워드가 포함된 모델을 자동으로 필터링합니다.
    vision_candidates = [
        m for m in available_models
        if any(k in m.lower() for k in ["vision", "scout", "maverick", "llava", "pixtral", "omni"])
    ]
    # 비전 모델이 존재하면 첫 번째 모델을 선택하고, 없으면 기본 모델로 대체합니다.
    VLM_MODEL_NAME = vision_candidates[0] if vision_candidates else MODEL_NAME
except Exception as e:
    # 초기화 실패 시 클라이언트 및 모델 변수를 안전하게 비웁니다.
    client = None
    available_models = []
    VLM_MODEL_NAME = None

#jinja2 템플릿 파일이 위치한 디렉토리(templates 폴더)를 환경 설정
env = Environment(loader=FileSystemLoader("templates"))

def render_template(template_name, **context):
    """지정된 이름의 Jinja2 HTML 템플릿을 불러와 렌더링하고 공백을 정제합니다."""
    template = env.get_template(template_name)
    cleaned_lines = [line.lstrip() for line in template.render(**context).splitlines()]
    return "\n".join(cleaned_lines).strip()

def load_css(file_path):
    """지정된 경로의 CSS 파일(style.css)을 읽어와 앱 전체에 스타일을 적용"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)
    except FileNotFoundError:
        pass
# 토스트 팝업 부분
def show_glass_toast(title, desc, fa_icon="fa-circle-check"):
    st.markdown(
        f"""
        <div class="glass-toast">
            <div class="glass-toast-icon">
                <i class="fa-solid {fa_icon}"></i>
            </div>
            <div class="glass-toast-body">
                <span class="glass-toast-title">{title}</span>
                <span class="glass-toast-desc">{desc}</span>
            </div>
        </div>
        """,
        unsafe_allow_html=True
    )
# 이미지 관련
def extract_image_info(image_bytes, image_name):
    try:
        # 1. 바이트 형태의 이미지 데이터를 메모리 상에서
        # 열어 이미지 객체(PIL Image)로 생성합니다.
        img = Image.open(io.BytesIo(image_bytes))
        width, height = img.size
        img_format = img.format or image_name.split('.')[-1].upper()
        mode = img.mode
        rgb_img = img.convert("RGB")
        colors = rgb_img.getcolors(maxcolors=width*height)
        #추출된 색상
        total_unique_colors = len(colors) if colors else "수만개 이상"

        quantized = rgb_img.quantize(colors=10).convert("RGB")
        q_colors = quantized.getcolors(maxcolors=10)
        #10. 많이 사용된 색상 순서(빈도수 기준 내림차순)로 정렬합니다.
        q_colors.sort(key=lambda x: x[0], reverse=True)
        total_pixels = width * height

        #빈리스트를 만듬
        top_colors_desc = []

        # 상위 5개의 주요 색상(빈도수와 RGB 값)을 순회
        for count, rgb in q_colors[:5]:
            #전체 픽셀 대비 색상이 차지 하는 비율 계산
            ratio = (count / total_pixels) * 100
            # 웹에서 쓰이는 HEX #FFF 문자열로 변환
            hex_code = '#{:02x}{:02x}{:02:x}'.format(*rgb)
            # 완성된 색상 정보(HEX, RGB, 비율)를 리스트에 추가합니다.
            top_colors_desc.append(f"HEX {hex_code} (RGB{rgb}: {ratio:.1f}%")

            return(
                f"- 파일명: {image_name}\n"
                f"- 포맷/모드: {img_format} / {mode}\n"
                f"- 해상도(크기): {width} x {height} px\n"
                f"- 총 고유 색상(RGB) 개수: {total_unique_colors}개\n"
                f"- 주요 구성 색상 Top 5: {', '.join(top_colors_desc)}"
            )
    except Exception as e:
        return f"이미지 파일명: {image_name} (상세 분석 오류: {e})"

# 스크롤바 관련
def trigger_auto_scroll():
    components.html(
        f"""
        <script>
            const scrollDown = () => {{
            //메인 콘텐츠 영역(section.main) DOM 요소를 부모 창에서 찾습니다.
const mainSection = window.parent.document.querySelector('section.main');
            if(mainSection){{
                mainSection.scrollTo({{ top:mainSection.scrollHeight, behavior:'smooth'}});
            }}
            window.parent.scrollTo({{ top:window.parent.dicument.body.scrollHeight, behavior:'smooth}});
            }}
            setTimeout(scrollDown, 120);
        </script>
        <!-- trigger:{len(st.session_state.get("chat_history",[]))} -->
        """,
        height=0,
    )
# 폰트어섬 cdn
st.markdown("""
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
""", unsafe_allow_html=True)

load_css("styles.css")

#대화 기록을 유지하기 위한 새션상태 초기화
if "uploaded_file_content" not in st.session_state:
    st.session_state.chat_history = [
        {"role": "assistant",
         "content": "안녕하세요! 글래스모피즘 UI로 업그레이드된 Groq 통합 어시스턴트입니다. 하단 입력창 좌측의 클립 아이콘(<i class='fa-solid fa-paperclip'></i>)을 눌러 문서나 이미지를 첨부하고 질문해 주세요."}
    ]
# 업로드된 파일의 이름을 저장할 새션상태 초기화
if "uploaded_file_name" not in st.session_state:
    st.session_state.uploaded_file_name = None

# 업로드된 파일의 유형(문서 또는 이미지)을 저장할 세션 상태를 초기화합니다.
if "uploaded_file_type" not in st.session_state:
    st.session_state.uploaded_file_type = None
#업로드된 이미지의 바이트 데이터를 저장할 세션 상태를 초기화
if "uploaded_image_bytes" not in st.session_state:
    st.session_state.uploaded_image_bytes = None

if "uploader_key" not in st.session_state:
    st.session_state.uploader_key = 0

# 화면에 띄울 토스트 팝업의 데이터(페이로드)를 저장할 세션 상태를 초기화합니다.
if "toast_payload" not in st.session_state:
    st.session_state.toast_payload = None

# 대기중인 토스트 팝업
if st.session_state.toast_payload:
    t_title, t_desc, t_icon = st.session_state.toast_payload
    show_glass_toast(t_title, t_desc, t_icon)
    st.session_state.toast_payload = None

# 상단 헤더
header_html = render_template("header.html", title="AI Studio")
st.markdown("""""", unsafe_allow_html=True)

# 파일이 성공적으로 첨부되면 플로팅 상태바 표시
if st.session_state.uploaded_file_name:
    col_chip, col_clear = st.columns([5.2, 1.2], gap="small", vertical_alignment="center")
    with col_chip:
        icon_cls = "fa-image" if st.session_state.uploaded_file_type == "image" else "fa-file-lines"
        st.markdown(
            f"""
            <div class="active-file-chip">
                <i class="fa-solid {icon_cls} text-info"></i>
                <span>
                    <b>
                    {st.session_state.uploaded_file_name}
                    </b>
                </span>
            </div>
            """,
            unsafe_allow_html=True
        )
    with col_clear:
        if st.button("첨부 해제", width="stretch"):
            removed_name = st.session_state.uploaded_file_name
            st.session_state.uploaded_file_content = None
            st.session_state.uploaded_file_name = None
            st.session_state.uploaded_file_type = None
            st.session_state.uploaded_image_bytes = None
            st.session_state.uploader_key += 1
            st.session_state.toast_payload = ("첨부 해제 완료",f"'{removed_name}' 파일이 제외 되었습니다","fa-trash-can")
            st.rerun()
    # 첨부된 파일이 이미지 형식일 경우 아코디언 메뉴로 미리보기를 제공합니다.
    if st.session_state.uploader_file_type == "image" and st.session_state.uploaded_image_bytes:
        with st.expander("첨부 이미지 미리보기", expanded=False):
             st.image(st.session_state.uploaded_image_bytes, width="content")

# 채팅 대화 기록
chat_container = st.container(border=False)
with chat_container:
    # 세션에 저장된 모든 대화 내역을 순회하며 말풍선 템플릿으로 렌더링합니다.
    for msg in st.session_state.chat_history:
        bubble_html = render_template("chat_message.html", role=msg["role"], content=msg["content"])
        st.markdown(bubble_html, unsafe_allow_html=True)
    st.markdown("<div id='chat-bottom-anchor'></div>", unsafe_allow_html=True)

#하단 고정 독(Dock) UI 배치를 위해 두 개의 컬럼을 생성
col_dock_file, col_dock_form = st.columns([0.65, 9.35], gap="small", vertical_alignment="center")

with col_dock_file:
    st.markdown("<span id='footer-dock-marker' style='display:none;'></span>", unsafe_allow_html=True)
    # 클립 아이콘 형태로 커스텀된 단일 파일 업로더
    unified_file = st.file_uploader(
        "파일 첨부",
        type=["pdf", "docx", "txt", "py", "js", "ts", "json", "md", "yml", "yaml", "png", "jpg", "jpeg", "webp"],
        label_visibility="collapsed",
        key=f"unified_uploader_{st.session_state.uploader_key}"

    )

# 사용자가 파일을 선택하는 즉시 파일을 감지하여
# 자동 파싱 및 토스트 알림을 설정합니다.
if unified_file is not None and unified_file != st.session_state.uploaded_file_name:
    # 2. 파일 이름에서 확장자를 추출하여 소문자로 변환합니다.
    file_ext = unified_file.name.split('.')[-1].lower()
    # 3. 현재 업로드된 파일 이름을 세션 상태에 저장하여 중복 처리를 방지합니다.
    st.session_state.uploaded_file_name = unified_file.name
    # 업로드된 파일이 이미지 확장자인 경우 처리합니다.
    if file_ext in ["png", "jpg", "jpeg", "webp"]:
        st.session_state.uploaded_image_bytes = unified_file.read()
        st.session_state.uploaded_file_type = "image"
        st.session_state.uploaded_file_content = None
        st.session_state.toast_payload = (
            "이미지 업로드 완료!",
            f"'{unified_file.name}' VLM 분석 준비가 완료되었습니다",
            "fa-image"
        )
        st.rerun()
    else:
        st.session_state.uploaded_image_bytes = None
        st.session_state.uploaded_file_type = "document"
        try:
            if file_ext == 'docx':
                import docx
                doc = docx.Document(unified_file)
                file_content = "\n".join([para.text for para in doc.paragraphs])
            #PDF 파일(.pdf) 파싱 처리
            elif file_ext == 'pdf':
                import pypdf
                reader = pypdf.Pdfreader(unified_file)
                file_content = "\n".join([page.extract() for page in reader.pages])
            # 일반 텍스트 및 코드 파일(.txt, .py 등) 읽기 처리
            else:
                file_content = unified_file.read().decode("utf-8")

            # 토큰 초과 방지를 위해 텍스트가 3000자를 넘어가면 자릅니다.
            if len(file_content) > 3000:
                file_content = file_content[:3000] + "\n\n...(내용이 너무 길어서 일부 생략되었습니다)"

            st.session_state.uploaded_file_content = file_content
            st.session_state.toast_payload = (
                "문서 업로드 완료!",
                 f"'{unified_file.name}' 텍스트 추출 및 로드 완료!",
                "fa-file-circle-check"
            )
            st.rerun()
        except Exception as e:
            st.session_state.toast_payload = (
                "파일 일기 오류",
                str(e),
                "fa-triangle-exclamation"
            )
            st.rerun()

with col_dock_form:
    # 텍스트 입력창과 전송 버튼을 포함하는 하단 입력 폼(st.form)을 생성합니다.
    with st.form(key="llm_chat_form", clear_on_submit=True):
        col_input, col_btn = st.columns([8.3, 1.7], gap="small", vertical_alignment="center")
        with col_input:
            user_input = st.text_input(
                "메세지 입력",
                placeholder="클립 아이콘으로 문서/이미지를 첨부하거나 메시지를 입력하세요...",
                label_visibility="collapsed"
            )

        with col_btn:
            submit_btn = st.form_submit_button("전송",width="stretch")

        # 전송 버튼이 눌리고 입력된 텍스트가 존재할 때 LLM 질의응답 로직을 실행합니다.
        if submit_btn and user_input.strip():
            display_user_msg = user_input

            # 파일이 첨부된 상태라면 메시지 상단에 첨부된 파일명을 함께 표시합니다.
            if st.session_state.uploaded_file_name:
                display_user_msg = f"<span style='font-size:0.78rem; opacity:0.85;'><i class='fa-solid fa-paperclip me-1'></i>{st.session_state.uploaded_file_name}</span><br>{user_input}"

            # 사용자의 질문을 대화 기록 세션에 추가합니다.
            st.session_state.chat_history.append({"role":"user","content":display_user_msg})

            # 응답 대기 시간 동안 로딩 스피너를 표시합니다.
            with st.spinner("AI가 분석 중입니다..."):
                try:
                    if client is not None:
                        prompt_to_send = user_input

                        #문서 파일이 첨부되어 있다면 질문과 함께 프롬프트에 문맥을 주입합니다
                        if st.session_state.uploaded_file_type == "document" and st.session_state.uploaded_file_content:
                            prompt_to_send = f"""
                            [참고 파일: {st.session_state.uploaded_file_name}]
                            {st.session_state.uploaded_file_content}
                            
                            [사용자 질문]
                            {user_input}
                            """

                        # 이미지 파일이 첨부되어 있다면 VLM API를 호출하고, 실패 시 로컬 분석(Fallback)을 수행합니다.
                        if st.session_state.uploaded_file_type == "image" and st.session_state.uploaded_image_bytes  is not None:
                            encoded_image = base64.b64encode(st.session_state.uploaded_image_bytes).decode("utf-8")
                            img_ext = st.session_state.uploaded_file_name.split('.')[-1].lower()
                            mime_type = f"image/{'jpeg' if img_ext in ['jpg','jpeg'] else img_ext}"

                            try:
                                #1차 시도
                                chat_completion = client.chat.completions.create(
                                    messages=[
                                        {
                                            "role": "user",
                                            "content": [
                                                {"type": "text", "text": prompt_to_send},
                                                {
                                                    "type": "image_url",
                                                    "image_url": {
                                                        "url": f"data:{mime_type};base64,{encoded_image}"
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    model=VLM_MODEL_NAME,
                                )
                            except Exception:
                                    # 2차 시도(대체 로직): 비전 권한이 없을 경우 로컬 픽셀/메타 데이터를 추출해 텍스트 모델로 전달합니다.
                                    img_analysis_text = extract_image_info(
                                        st.session_state.uploaded_image_bytes,
                                        st.session_state.uploaded_file_name
                                    )
                                    fallback_prompt = f"""
                                    [업로드된 이미지 분석 데이터]
                                    {img_analysis_text}
                    
                                    {prompt_to_send}
                                    """
                                    chat_completion = client.chat.completions.create(
                                        messages=[
                                            {"role": "system",
                                             "content": "You are a professional AI assistant. Use the provided image data to answer accurately in Korean."},
                                            {"role": "user", "content": fallback_prompt}
                                        ],
                                        model=MODEL_NAME,
                                    )
                        else:
                            #  이미지가 없는 일반 텍스트 문서
                            chat_completion = client.chat.completions.create(
                                messages=[
                                    {"role": "system","content": "You are a professional AI software architect and developer assistant."},
                                    {"role": "user", "content": prompt_to_send}
                                ],
                                model=MODEL_NAME,
                            )
                        ai_reply = chat_completion.choices[0].message.content("\n", "<br>")
                    else:
                        ai_reply = "<i class='fa-solid fa-triangle-exclamation text-warning me-1'></i> API 키가 설정되지 않았거나 `secrets.toml` 파일을 확인해 주세요."
                except Exception as e:
                    # API 호출 중 에러 발생 시 에러 메시지를 응답에 담습니다.
                    ai_reply = f"<i class='fa-solid fa-circle-exclamation text-danger me-1'></i> API 연동 중 오류가 발생했습니다: {e}"

            st.session_state.chat_history.append({"role":"assistant","content":ai_reply})
            st.rerun()

#앱 렌더링후 스크롤 함수
trigger_auto_scroll()