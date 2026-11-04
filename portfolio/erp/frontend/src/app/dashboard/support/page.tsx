"use client";

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { CustomAlert } from "@/components/common/CustomAlert";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<"faq" | "inquiry">("faq");

  // 1:1 문의 폼 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 알럿 상태
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showAlert("제목과 내용을 모두 입력해 주세요.");
      return;
    }
    showAlert("기술지원 요청이 성공적으로 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.");
    setTitle("");
    setContent("");
  };

  return (
    <Layout>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.headerWrapper)}>
          <h2 {...stylex.props(styles.title)}>기술지원 및 고객 센터</h2>
        </div>

        <div {...stylex.props(styles.settingsContentLayout)}>
          {/* 좌측 사이드바 탭 */}
          <div {...stylex.props(styles.settingsSidebar)}>
            <ul {...stylex.props(styles.sidebarMenuUl)}>
              <li 
                {...stylex.props(styles.sidebarItem, activeTab === "faq" && styles.sidebarItemActive)}
                onClick={() => setActiveTab("faq")}
              >
                자주 묻는 질문 (FAQ)
              </li>
              <li 
                {...stylex.props(styles.sidebarItem, activeTab === "inquiry" && styles.sidebarItemActive)}
                onClick={() => setActiveTab("inquiry")}
              >
                1:1 기술지원 문의
              </li>
            </ul>
          </div>

          {/* 우측 메인 패널 */}
          <div {...stylex.props(styles.settingsMainPanel)}>
            <h3 {...stylex.props(styles.panelTitle)}>
              {activeTab === "faq" ? "자주 묻는 질문 (FAQ)" : "1:1 기술지원 문의"}
            </h3>

            {/* 1. FAQ 탭 */}
            {activeTab === "faq" && (
              <div {...stylex.props(styles.supportWrapper)}>
                <span style={{ fontSize: "13px", color: "#86868B" }}>Smart ERP 이용 중 자주 발생하는 문의 사항에 대한 답변입니다.</span>
                
                <div {...stylex.props(styles.faqItem)}>
                  <span {...stylex.props(styles.faqQuestion)}>Q. 로그인 및 JWT 토큰 인증 오류가 발생합니다.</span>
                  <span {...stylex.props(styles.faqAnswer)}>브라우저 로컬 스토리지(LocalStorage)의 토큰이 만료되었을 수 있습니다. 로그아웃 후 다시 로그인해 주세요.</span>
                </div>

                <div {...stylex.props(styles.faqItem)}>
                  <span {...stylex.props(styles.faqQuestion)}>Q. 재고 수량이 실시간으로 반영되지 않아요.</span>
                  <span {...stylex.props(styles.faqAnswer)}>재고관리 탭에서 상단의 검색 또는 새로고침을 통해 최신 DB 상태를 동기화할 수 있습니다.</span>
                </div>

                <div {...stylex.props(styles.faqItem)}>
                  <span {...stylex.props(styles.faqQuestion)}>Q. 시스템 권한(RBAC)은 어떻게 변경하나요?</span>
                  <span {...stylex.props(styles.faqAnswer)}>기준정보 설정 내의 '시스템 권한 설정' 메뉴 또는 관리자 계정을 통해 직급별 권한을 편집할 수 있습니다.</span>
                </div>
              </div>
            )}

            {/* 2. 1:1 기술지원 문의 탭 */}
            {activeTab === "inquiry" && (
              <form onSubmit={handleInquirySubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <span style={{ fontSize: "13px", color: "#86868B" }}>시스템 오류나 기능 개선 요청 사항을 남겨주시면 빠르게 처리해 드립니다.</span>

                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.formLabel)}>문의 제목</label>
                  <div {...stylex.props(styles.inputWrapper)}>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="문의 제목을 입력하세요" 
                      {...stylex.props(styles.formInput)} 
                    />
                  </div>
                </div>

                <div {...stylex.props(styles.formGroup)}>
                  <label {...stylex.props(styles.formLabel)}>문의 내용</label>
                  <div {...stylex.props(styles.inputWrapper)} style={{ height: "140px", alignItems: "flex-start", padding: "8px" }}>
                    <textarea 
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="발생한 문제나 상세한 요청 사항을 남겨주세요..."
                      {...stylex.props(styles.supportTextarea)}
                    />
                  </div>
                </div>

                <button type="submit" {...stylex.props(styles.saveButton)}>
                  문의 접수하기
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 커스텀 알럿 모달 */}
      <CustomAlert 
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={() => setIsAlertOpen(false)}
      />
    </Layout>
  );
}