"use client";

import { useState } from "react";
import * as S from "@/assets/css/HeaderFooter.style";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <S.HeaderContainer>
      <S.Logo>Smart MES</S.Logo>

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
        <S.LogoutButton>로그아웃</S.LogoutButton>
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
        <a href="/profile" style={{ color: "#93c5fd" }}>내 정보</a>
        <a href="/logout" style={{ color: "#fca5a5" }}>로그아웃</a>
      </S.MobileNav>
    </S.HeaderContainer>
  );
};