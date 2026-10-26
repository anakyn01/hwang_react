"use client";

import * as S from "@/assets/css/Style.style";

export const SideBar = () => {
    return(
        <>
        <S.AsideContainer>
      {/* 주요 업무 메뉴 그룹 */}
      <S.MenuSection>
        <S.SectionTitle>MES 업무</S.SectionTitle>
        <S.MenuList>
          <li><S.MenuItem href="/admin/process">라인 공정 제어</S.MenuItem></li>
          <li><S.MenuItem href="/admin/components">핵심 부품 SCM</S.MenuItem></li>
          <li><S.MenuItem href="/admin/quality">비전 품질 검사</S.MenuItem></li>
          <li><S.MenuItem href="/admin/cleanroom">클린룸 & 설비</S.MenuItem></li>
          <li><S.MenuItem href="/admin/analytics">실시간 통합 관제</S.MenuItem></li>
        </S.MenuList>
      </S.MenuSection>

      {/* 시스템 및 관리 메뉴 그룹 */}
      <S.MenuSection>
        <S.SectionTitle>시스템 관리</S.SectionTitle>
        <S.MenuList>
          <li><S.MenuItem href="/master-data">기준 정보 관리</S.MenuItem></li>
          <li><S.MenuItem href="/users">사용자 권한 관리</S.MenuItem></li>
          <li><S.MenuItem href="/settings">시스템 환경설정</S.MenuItem></li>
        </S.MenuList>
      </S.MenuSection>
    </S.AsideContainer>
        </>
    )
}