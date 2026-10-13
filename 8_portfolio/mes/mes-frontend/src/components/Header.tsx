"use client";
import * as  S from '@/assets/css/Style.style';
import { useState } from "react";

export const Header = () => {

const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

    return(
        <>
<S.HeaderContainer>
      <S.Logo> Apple iPhone Smart MES</S.Logo>

      {/* 데스크탑 네비게이션 */}
      <S.DesktopNav>
        <S.NavLink href="/process">라인 공정 제어</S.NavLink>
        <S.NavLink href="/components">핵심 부품 SCM</S.NavLink>
        <S.NavLink href="/quality">비전 품질 검사</S.NavLink>
        <S.NavLink href="/cleanroom">클린룸 & 설비</S.NavLink>
        <S.NavLink href="/analytics">실시간 통합 관제</S.NavLink>
      </S.DesktopNav>

      {/* 데스크탑 유저 섹션 */}
      <S.UserSection>
        <span>관리자님 환영합니다</span>
        <S.Button $size="small" 
        $variant="danger"
        >로그아웃</S.Button>
      </S.UserSection>

      {/* 모바일 햄버거 버튼 */}
      <S.MobileMenuToggle onClick={toggleMenu}>
        {isMobileMenuOpen ? "✕" : "☰"}
      </S.MobileMenuToggle>

      {/* 모바일 드롭다운 메뉴 */}
      <S.MobileNav $isOpen={isMobileMenuOpen}>
        <a href="/process">라인 공정 제어</a>
        <a href="/components">핵심 부품 SCM</a>
        <a href="/quality">비전 품질 검사</a>
        <a href="/cleanroom">클린룸 & 설비</a>
        <a href="/cleanroom">실시간 통합 관제</a>
        <a href="/analytics" style={{ color: "#93c5fd" }}>내 정보</a>
        <a href="/profile" style={{ color: "#fca5a5" }}>로그아웃</a>
      </S.MobileNav>
    </S.HeaderContainer>     
        </>
    )
}