"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CustomAlert } from "@/components/common/CustomAlert";

import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 커스텀 알럿 상태 관리
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const router = useRouter();

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    
    setAlertMessage("로그아웃 되었습니다");
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    router.push("/");
  };

  return (
    <>
      <header {...stylex.props(styles.headerContainer)}>
        <div {...stylex.props(styles.logo)}>Smart ERP</div>

        <nav {...stylex.props(styles.desktopNav)}>
          <a href="/dashboard" {...stylex.props(styles.navLink)}>대시보드</a>
          <a href="/dashboard/calender" {...stylex.props(styles.navLink)}>캘린더</a>
          <a href="/dashboard/production" {...stylex.props(styles.navLink)}>생산관리</a>
          <a href="/dashboard/inventory" {...stylex.props(styles.navLink)}>재고관리</a>
          <a href="/dashboard/hr" {...stylex.props(styles.navLink)}>인사관리</a>
          <a href="/dashboard/settings" {...stylex.props(styles.navLink)}>기준정보</a>
        </nav>

        <div {...stylex.props(styles.userSection)}>
          <span>관리자님 환영합니다</span>
          
          {/* 💡 마이페이지 아이콘 버튼 추가 (/dashboard/mypage 연결) */}
          <button 
            {...stylex.props(styles.mypageIconButton)} 
            onClick={() => router.push("/dashboard/mypage")}
            title="마이페이지"
            aria-label="마이페이지"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          <button {...stylex.props(styles.logoutButton)} onClick={handleLogout}>
            로그아웃
          </button>
        </div>

        <button {...stylex.props(styles.mobileMenuToggle)} onClick={toggleMenu} aria-label="메뉴 열기">
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* 모바일 내비게이션 */}
        <div {...stylex.props(styles.mobileNav, isMobileMenuOpen && styles.mobileNavOpen)}>
          <a href="/dashboard/production" {...stylex.props(styles.mobileNavLink)}>생산관리</a>
          <a href="/dashboard/inventory" {...stylex.props(styles.mobileNavLink)}>재고관리</a>
          <a href="/dashboard/hr" {...stylex.props(styles.mobileNavLink)}>인사관리</a>
          <a href="/dashboard/mypage" {...stylex.props(styles.mobileNavLink)} style={{ color: "#0066CC" }}>마이페이지 (내 정보)</a>
          <button 
            onClick={handleLogout} 
            style={{ background: "none", border: "none", textAlign: "left", padding: "8px 0", color: "#FF3B30", fontWeight: 500, cursor: "pointer" }}
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* 커스텀 알럿 모달 */}
      <CustomAlert 
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={handleAlertClose}
      />
    </>
  );
};