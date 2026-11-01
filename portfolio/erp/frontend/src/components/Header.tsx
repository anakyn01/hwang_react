"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CustomAlert } from "@/components/common/CustomAlert";
import styles from "./Header.module.css";

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
    
    // 브라우저 alert 대신 커스텀 알럿 호출
    setAlertMessage("로그아웃 되었습니다");
    setIsAlertOpen(true);
  };

  // 알럿 확인 버튼을 누를 때 로그인 페이지('/')로 이동
  const handleAlertClose = () => {
    setIsAlertOpen(false);
    router.push("/");
  };

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.logo}>Smart ERP</div>

        <nav className={styles.desktopNav}>
          <a href="/dashboard" className={styles.navLink}>대시보드</a>
          <a href="/dashboard/calender" className={styles.navLink}>캘린더</a>
          <a href="/dashboard/production" className={styles.navLink}>생산관리</a>
          <a href="/dashboard/inventory" className={styles.navLink}>재고관리</a>
          <a href="/dashboard/hr" className={styles.navLink}>인사관리</a>
          <a href="/dashboard/settings" className={styles.navLink}>기준정보</a>
        </nav>

        <div className={styles.userSection}>
          <span>관리자님 환영합니다</span>
          <button className={styles.logoutButton} onClick={handleLogout}>
            로그아웃
          </button>
        </div>

        <button className={styles.mobileMenuToggle} onClick={toggleMenu} aria-label="메뉴 열기">
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ""}`}>
          <a href="/production" className={styles.mobileNavLink}>생산관리</a>
          <a href="/material" className={styles.mobileNavLink}>자재관리</a>
          <a href="/quality" className={styles.mobileNavLink}>품질관리</a>
          <a href="/equipment" className={styles.mobileNavLink}>설비관리</a>
          <a href="/dashboard/mypage" className={styles.mobileNavLink} style={{ color: "#0066CC" }}>내 정보</a>
          <button 
            onClick={handleLogout} 
            style={{ background: "none", border: "none", textAlign: "left", padding: "8px 0", color: "#FF3B30", fontWeight: 500, cursor: "pointer" }}
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* 커스텀 알럿 모달 (로그아웃 확인 후 이동 처리) */}
      <CustomAlert 
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={handleAlertClose}
      />
    </>
  );
};