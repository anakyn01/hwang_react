"use client";
import * as  S from '@/assets/css/Style.style';
import { useRouter } from 'next/navigation';
import { useState } from "react";

export const Header = () => {

const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const router = useRouter();

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLogoutClick = () => {
    alert("성공적으로 로그아웃 되었습니다");
    router.push("/admin/logout");
  }

  const handleAdminClick = () => {
    router.push("/admin");
  }
    return(
        <>
<S.HeaderContainer>
      <S.Logo
      onClick={handleAdminClick}
      > Apple iPhone Smart MES</S.Logo>

      {/* 데스크탑 네비게이션 */}
      <S.DesktopNav>
        <S.NavLink href="/admin/process">라인 공정 제어</S.NavLink>
        <S.NavLink href="/admin/components">핵심 부품 SCM</S.NavLink>
        <S.NavLink href="/admin/quality">비전 품질 검사</S.NavLink>
        <S.NavLink href="/admin/cleanroom">클린룸 & 설비</S.NavLink>
        <S.NavLink href="/admin/analytics">실시간 통합 관제</S.NavLink>
      </S.DesktopNav>

      {/* 데스크탑 유저 섹션 */}
      <S.UserSection>
        <span>관리자님 환영합니다</span>
        <S.Button $size="small" 
        $variant="danger"
        onClick={handleLogoutClick}
        >로그아웃</S.Button>
      </S.UserSection>

      {/* 모바일 햄버거 버튼 */}
      <S.MobileMenuToggle onClick={toggleMenu}>
        {isMobileMenuOpen ? "✕" : "☰"}
      </S.MobileMenuToggle>

      {/* 모바일 드롭다운 메뉴 */}
      <S.MobileNav $isOpen={isMobileMenuOpen}>
        <a href="/admin/process">라인 공정 제어</a>
        <a href="/admin/components">핵심 부품 SCM</a>
        <a href="/admin/quality">비전 품질 검사</a>
        <a href="/admin/cleanroom">클린룸 & 설비</a>
        <a href="/admin/cleanroom">실시간 통합 관제</a>
        <a href="/admin/analytics" style={{ color: "#93c5fd" }}>내 정보</a>
        <a href="/admin/logout" style={{ color: "#fca5a5" }}>로그아웃</a>
      </S.MobileNav>
    </S.HeaderContainer>     
        </>
    )
}