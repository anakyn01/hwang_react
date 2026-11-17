import streamlit as st  # Streamlit 라이브러리를 st로 임포트합니다.
import streamlit.components.v1 as components  # HTML/JS 컴포넌트 실행을 위해 임포트합니다.
import time  # 시간 지연 등을 위한 time 라이브러리를 임포트합니다.
import os  # 운영체제 경로 및 환경 변수 처리를 위해 임포트합니다.
import io  # 바이트 스트림 처리를 위한 io 라이브러리를 임포트합니다.
import base64  # 이미지를 base64 인코딩하기 위해 임포트합니다.
from PIL import Image  # 이미지 처리를 위해 Pillow 라이브러리를 임포트합니다.
from openai import OpenAI  # Groq API 연동을 위한 OpenAI 호환 클라이언트를 임포트합니다.

from jinja2 import Environment, FileSystemLoader  # HTML 템플릿 렌더링을 위해 Jinja2를 임포트합니다.

# 페이지 기본 설정 (제목, 아이콘, 레이아웃 및 사이드바 축소 상태 지정)
st.set_page_config(
    page_title="그런지 AI Assistant",
    page_icon="✨",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Streamlit 시크릿 파일에서 Groq API 키를 안전하게 불러옵니다.
GROQ_API_KEY = st.secrets["GROQ_API_KEY"]

try:
    # Groq API 엔드포인트와 인증 키를 설정하여 OpenAI 클라이언트를 초기화합니다.
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

# Jinja2 템플릿 파일이 위치한 디렉토리(templates 폴더)를 환경 설정합니다.
env = Environment(loader=FileSystemLoader("templates"))


def render_template(template_name, **context):
    """지정된 이름의 Jinja2 HTML 템플릿을 불러와 렌더링하고 공백을 정제합니다."""
    template = env.get_template(template_name)
    cleaned_lines = [line.lstrip() for line in template.render(**context).splitlines()]
    return "\n".join(cleaned_lines).strip()


def load_css(file_path):
    """지정된 경로의 CSS 파일(style.css)을 읽어와 앱 전체에 스타일을 적용합니다."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)
    except FileNotFoundError:
        pass


def show_glass_toast(title, desc, fa_icon="fa-circle-check"):
    """우측 상단에 글래스모피즘 스타일과 FontAwesome 아이콘이 포함된 토스트 팝업을 출력합니다."""
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


def extract_image_info(image_bytes, image_name):
    """비전 모델 사용 불가 시, PIL을 이용해 이미지 메타데이터 및 주요 색상 분포를 텍스트로 추출합니다."""
    try:
        img = Image.open(io.BytesIO(image_bytes))
        width, height = img.size
        img_format = img.format or image_name.split('.')[-1].upper()
        mode = img.mode

        rgb_img = img.convert("RGB")
        colors = rgb_img.getcolors(maxcolors=width * height)
        total_unique_colors = len(colors) if colors else "수만 개 이상"

        quantized = rgb_img.quantize(colors=10).convert("RGB")
        q_colors = quantized.getcolors(maxcolors=10)
        q_colors.sort(key=lambda x: x[0], reverse=True)
        total_pixels = width * height

        top_colors_desc = []
        for count, rgb in q_colors[:5]:
            ratio = (count / total_pixels) * 100
            hex_code = '#{:02x}{:02x}{:02x}'.format(*rgb)
            top_colors_desc.append(f"HEX {hex_code} (RGB{rgb}: {ratio:.1f}%)")

        return (
            f"- 파일명: {image_name}\n"
            f"- 포맷/모드: {img_format} / {mode}\n"
            f"- 해상도(크기): {width} x {height} px\n"
            f"- 총 고유 색상(RGB) 개수: {total_unique_colors}개\n"
            f"- 주요 구성 색상 Top 5: {', '.join(top_colors_desc)}"
        )
    except Exception as e:
        return f"이미지 파일명: {image_name} (상세 분석 오류: {e})"


def trigger_auto_scroll():
    """새로운 메시지 추가 시 브라우저 화면 및 컨테이너를 부드럽게 최하단으로 스크롤합니다."""
    components.html(
        f"""
        <script>
            const scrollDown = () => {{
                const mainSection = window.parent.document.querySelector('section.main');
                if (mainSection) {{
                    mainSection.scrollTo({{ top: mainSection.scrollHeight, behavior: 'smooth' }});
                }}
                window.parent.scrollTo({{ top: window.parent.document.body.scrollHeight, behavior: 'smooth' }});
            }};
            setTimeout(scrollDown, 120);
        </script>
        <!-- trigger: {len(st.session_state.get("chat_history", []))} -->
        """,
        height=0,
    )


# Bootstrap 5 및 FontAwesome 6 아이콘 라이브러리 CDN을 페이지에 주입합니다.
st.markdown("""
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
""", unsafe_allow_html=True)

# 커스텀 글래스모피즘 스타일 파일(style.css)을 불러옵니다.
load_css("style.css")

# 대화 기록을 유지하기 위한 세션 상태(session_state)를 초기화합니다.
if "chat_history" not in st.session_state:
    st.session_state.chat_history = [
        {"role": "assistant",
         "content": "안녕하세요! 글래스모피즘 UI로 업그레이드된 Groq 통합 어시스턴트입니다. 하단 입력창 좌측의 클립 아이콘(<i class='fa-solid fa-paperclip'></i>)을 눌러 문서나 이미지를 첨부하고 질문해 주세요."}
    ]

# 업로드된 파일의 텍스트 내용을 저장할 세션 상태를 초기화합니다.
if "uploaded_file_content" not in st.session_state:
    st.session_state.uploaded_file_content = None

# 업로드된 파일의 이름을 저장할 세션 상태를 초기화합니다.
if "uploaded_file_name" not in st.session_state:
    st.session_state.uploaded_file_name = None

# 업로드된 파일의 유형(문서 또는 이미지)을 저장할 세션 상태를 초기화합니다.
if "uploaded_file_type" not in st.session_state:
    st.session_state.uploaded_file_type = None

# 업로드된 이미지의 바이트 데이터를 저장할 세션 상태를 초기화합니다.
if "uploaded_image_bytes" not in st.session_state:
    st.session_state.uploaded_image_bytes = None

# 파일 업로더 컴포넌트를 강제 초기화하기 위한 키 값을 설정합니다.
if "uploader_key" not in st.session_state:
    st.session_state.uploader_key = 0

# 화면에 띄울 토스트 팝업의 데이터(페이로드)를 저장할 세션 상태를 초기화합니다.
if "toast_payload" not in st.session_state:
    st.session_state.toast_payload = None

# 대기 중인 토스트 팝업 데이터가 있으면 화면에 팝업을 띄우고 세션을 비웁니다.
if st.session_state.toast_payload:
    t_title, t_desc, t_icon = st.session_state.toast_payload
    show_glass_toast(t_title, t_desc, t_icon)
    st.session_state.toast_payload = None

# 상단 글래스 헤더 영역을 템플릿으로부터 불러와 렌더링합니다.
header_html = render_template("header.html", title="Groq Glass AI Studio")
st.markdown(header_html, unsafe_allow_html=True)

# 파일이 성공적으로 첨부된 경우 화면 상단에 플로팅 상태 바를 표시합니다.
if st.session_state.uploaded_file_name:
    col_chip, col_clear = st.columns([5.2, 1.2], gap="small", vertical_alignment="center")
    with col_chip:
        # 문서인지 이미지인지에 따라 FontAwesome 아이콘 클래스를 다르게 지정합니다.
        icon_cls = "fa-image" if st.session_state.uploaded_file_type == "image" else "fa-file-lines"
        st.markdown(
            f"""
            <div class="active-file-chip">
                <i class="fa-solid {icon_cls} text-info"></i>
                <span>첨부됨: <b>{st.session_state.uploaded_file_name}</b></span>
            </div>
            """,
            unsafe_allow_html=True
        )
    with col_clear:
        # 첨부 해제 버튼 클릭 시 관련된 모든 파일 세션을 초기화하고 안내 토스트를 설정합니다.
        if st.button("첨부 해제", width="stretch"):
            removed_name = st.session_state.uploaded_file_name
            st.session_state.uploaded_file_content = None
            st.session_state.uploaded_file_name = None
            st.session_state.uploaded_file_type = None
            st.session_state.uploaded_image_bytes = None
            st.session_state.uploader_key += 1
            st.session_state.toast_payload = ("첨부 해제 완료", f"'{removed_name}' 파일이 제외되었습니다.", "fa-trash-can")
            st.rerun()

    # 첨부된 파일이 이미지 형식일 경우 아코디언 메뉴로 미리보기를 제공합니다.
    if st.session_state.uploaded_file_type == "image" and st.session_state.uploaded_image_bytes:
        with st.expander("첨부 이미지 미리보기", expanded=False):
            st.image(st.session_state.uploaded_image_bytes, width="content")

# 메인 대화(채팅) 기록이 출력될 컨테이너를 생성합니다.
chat_container = st.container(border=False)
with chat_container:
    # 세션에 저장된 모든 대화 내역을 순회하며 말풍선 템플릿으로 렌더링합니다.
    for msg in st.session_state.chat_history:
        bubble_html = render_template("chat_message.html", role=msg["role"], content=msg["content"])
        st.markdown(bubble_html, unsafe_allow_html=True)
    # 자동 스크롤이 도달할 하단 앵커 포인트를 지정합니다.
    st.markdown("<div id='chat-bottom-anchor'></div>", unsafe_allow_html=True)

# 하단 고정 독(Dock) UI 배치를 위해 두 개의 컬럼을 생성합니다.
col_dock_file, col_dock_form = st.columns([0.65, 9.35], gap="small", vertical_alignment="center")

with col_dock_file:
    # CSS 스타일에서 이 마커를 인식하여 하단 고정 독(Dock) 형태로 묶어줍니다.
    st.markdown("<span id='footer-dock-marker' style='display:none;'></span>", unsafe_allow_html=True)
    # 클립 아이콘 형태로 커스텀된 단일 파일 업로더 컴포넌트를 배치합니다.
    unified_file = st.file_uploader(
        "파일 첨부",
        type=["pdf", "docx", "txt", "py", "js", "ts", "json", "md", "yml", "yaml", "png", "jpg", "jpeg", "webp"],
        label_visibility="collapsed",
        key=f"unified_uploader_{st.session_state.uploader_key}"
    )

# 사용자가 파일을 선택하는 즉시 파일을 감지하여 자동 파싱 및 토스트 알림을 설정합니다.
if unified_file is not None and unified_file.name != st.session_state.uploaded_file_name:
    file_ext = unified_file.name.split('.')[-1].lower()
    st.session_state.uploaded_file_name = unified_file.name

    # 업로드된 파일이 이미지 확장자인 경우 처리합니다.
    if file_ext in ["png", "jpg", "jpeg", "webp"]:
        st.session_state.uploaded_image_bytes = unified_file.read()
        st.session_state.uploaded_file_type = "image"
        st.session_state.uploaded_file_content = None
        st.session_state.toast_payload = (
            "이미지 업로드 완료!",
            f"'{unified_file.name}' VLM 분석 준비가 완료되었습니다.",
            "fa-image"
        )
        st.rerun()
    else:
        # 업로드된 파일이 문서 또는 소스 코드인 경우 처리합니다.
        st.session_state.uploaded_image_bytes = None
        st.session_state.uploaded_file_type = "document"
        try:
            # Word 파일(.docx) 파싱 처리
            if file_ext == 'docx':
                import docx
                doc = docx.Document(unified_file)
                file_content = "\n".join([para.text for para in doc.paragraphs])
            # PDF 파일(.pdf) 파싱 처리
            elif file_ext == 'pdf':
                import pypdf
                reader = pypdf.PdfReader(unified_file)
                file_content = "\n".join([page.extract_text() for page in reader.pages])
            # 일반 텍스트 및 코드 파일(.txt, .py 등) 읽기 처리
            else:
                file_content = unified_file.read().decode("utf-8")

            # 토큰 초과 방지를 위해 텍스트가 3000자를 넘어가면 자릅니다.
            if len(file_content) > 3000:
                file_content = file_content[:3000] + "\n\n... (내용이 길어 일부 생략되었습니다)"

            st.session_state.uploaded_file_content = file_content
            st.session_state.toast_payload = (
                "문서 업로드 완료!",
                f"'{unified_file.name}' 텍스트 추출 및 로드 완료!",
                "fa-file-circle-check"
            )
            st.rerun()
        except Exception as e:
            # 파일 읽기 중 에러 발생 시 에러 토스트를 설정합니다.
            st.session_state.toast_payload = (
                "파일 읽기 오류",
                str(e),
                "fa-triangle-exclamation"
            )
            st.rerun()

with col_dock_form:
    # 텍스트 입력창과 전송 버튼을 포함하는 하단 입력 폼(st.form)을 생성합니다.
    with st.form(key="llm_chat_form", clear_on_submit=True):
        col_input, col_btn = st.columns([8.3, 1.7], gap="small", vertical_alignment="center")

        with col_input:
            # 사용자가 메시지를 입력하는 텍스트 입력창입니다.
            user_input = st.text_input(
                "메시지 입력",
                placeholder="클립 아이콘으로 문서/이미지를 첨부하거나 메시지를 입력하세요...",
                label_visibility="collapsed"
            )

        with col_btn:
            # 메시지를 전송하는 제출 버튼입니다.
            submit_btn = st.form_submit_button("전송", width="stretch")

        # 전송 버튼이 눌리고 입력된 텍스트가 존재할 때 LLM 질의응답 로직을 실행합니다.
        if submit_btn and user_input.strip():
            display_user_msg = user_input
            # 파일이 첨부된 상태라면 메시지 상단에 첨부된 파일명을 함께 표시합니다.
            if st.session_state.uploaded_file_name:
                display_user_msg = f"<span style='font-size:0.78rem; opacity:0.85;'><i class='fa-solid fa-paperclip me-1'></i>{st.session_state.uploaded_file_name}</span><br>{user_input}"

            # 사용자의 질문을 대화 기록 세션에 추가합니다.
            st.session_state.chat_history.append({"role": "user", "content": display_user_msg})

            # 응답 대기 시간 동안 로딩 스피너를 표시합니다.
            with st.spinner("AI가 분석 중입니다..."):
                try:
                    if client is not None:
                        prompt_to_send = user_input

                        # 문서 파일이 첨부되어 있다면 질문과 함께 프롬프트에 문맥을 주입합니다.
                        if st.session_state.uploaded_file_type == "document" and st.session_state.uploaded_file_content:
                            prompt_to_send = f"""
                            [참고 파일: {st.session_state.uploaded_file_name}]
                            {st.session_state.uploaded_file_content}

                            [사용자 질문]
                            {user_input}
                            """

                        # 이미지 파일이 첨부되어 있다면 VLM API를 호출하고, 실패 시 로컬 분석(Fallback)을 수행합니다.
                        if st.session_state.uploaded_file_type == "image" and st.session_state.uploaded_image_bytes is not None:
                            encoded_image = base64.b64encode(st.session_state.uploaded_image_bytes).decode("utf-8")
                            img_ext = st.session_state.uploaded_file_name.split('.')[-1].lower()
                            mime_type = f"image/{'jpeg' if img_ext in ['jpg', 'jpeg'] else img_ext}"

                            try:
                                # 1차 시도: 멀티모달(VLM) 모델 규격으로 이미지를 포함해 요청합니다.
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
                                        {"role": "system", "content": "You are a professional AI assistant. Use the provided image data to answer accurately in Korean."},
                                        {"role": "user", "content": fallback_prompt}
                                    ],
                                    model=MODEL_NAME,
                                )
                        else:
                            # 이미지가 없는 일반 텍스트 또는 문서 분석 요청인 경우 기존 LLM 모델을 호출합니다.
                            chat_completion = client.chat.completions.create(
                                messages=[
                                    {"role": "system", "content": "You are a professional AI software architect and developer assistant."},
                                    {"role": "user", "content": prompt_to_send}
                                ],
                                model=MODEL_NAME,
                            )

                        # AI 응답 텍스트 내 줄바꿈(\n)을 HTML 줄바꿈(<br>)으로 변환합니다.
                        ai_reply = chat_completion.choices[0].message.content.replace("\n", "<br>")
                    else:
                        ai_reply = "<i class='fa-solid fa-triangle-exclamation text-warning me-1'></i> API 키가 설정되지 않았거나 `secrets.toml` 파일을 확인해 주세요."
                except Exception as e:
                    # API 호출 중 에러 발생 시 에러 메시지를 응답에 담습니다.
                    ai_reply = f"<i class='fa-solid fa-circle-exclamation text-danger me-1'></i> API 연동 중 오류가 발생했습니다: {e}"

            # AI의 답변을 대화 기록 세션에 추가하고 화면을 새로고침합니다.
            st.session_state.chat_history.append({"role": "assistant", "content": ai_reply})
            st.rerun()

# 앱 렌더링이 완료된 직후 화면을 최하단으로 내려주는 스크롤 함수를 실행합니다.
trigger_auto_scroll()