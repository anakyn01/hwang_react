"use client";

import { useState } from "react";
import { useRouter} from "next/navigation";
import axios from "axios";
import * as S from "@/assets/css/HeaderFooter.style";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const router = useRouter();

  const handleLogout = () => {
   // 1. 로컬 스토리지에서 JWT 토큰 완전히 삭제
   localStorage.removeItem("token");
   // 2. 이후 Axios 요청 시 헤더에 토큰이 들어가지 않도록 기본 헤더 제거
   delete axios.defaults.headers.common["Authorization"];
   //3. 안내 창 띄우기
   alert("로그아웃 되었습니다");
   //4.메인으로 리다이렉트
   router.push("/");
  }

  return (
    <S.HeaderContainer>
      <S.Logo>Smart ERP</S.Logo>

      {/* 데스크탑 네비게이션 */}
      <S.DesktopNav>
        <S.NavLink href="/production">생산관리</S.NavLink>
        <S.NavLink href="/material">자재관리</S.NavLink>
        <S.NavLink href="/quality">품질관리</S.NavLink>
        <S.NavLink href="/equipment">설비관리</S.NavLink>
      </S.DesktopNav>

      {/* 데스크탑 유저 섹션 */}
      <S.UserSection>
        <span>관리자님 환영합니다</span>
        <S.LogoutButton
        onClick={handleLogout}
        >로그아웃</S.LogoutButton>
      </S.UserSection>

      {/* 모바일 햄버거 버튼 */}
      <S.MobileMenuToggle onClick={toggleMenu}>
        {isMobileMenuOpen ? "✕" : "☰"}
      </S.MobileMenuToggle>

      {/* 모바일 드롭다운 메뉴 */}
      <S.MobileNav $isOpen={isMobileMenuOpen}>
        <a href="/production">생산관리</a>
        <a href="/material">자재관리</a>
        <a href="/quality">품질관리</a>
        <a href="/equipment">설비관리</a>
        <a href="/dashboard/mypage" style={{ color: "#93c5fd" }}>내 정보</a>
        <a href="/logout" style={{ color: "#fca5a5" }}>로그아웃</a>
      </S.MobileNav>
    </S.HeaderContainer>
  );
};
/*
jwt 방식은 로그아웃을 백앤드를 거칠 필요가 없이 프론트엔드(브라우저)에
저장된 토큰 삭제
*/