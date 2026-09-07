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
          <li><S.MenuItem href="/production">생산 관리</S.MenuItem></li>
          <li><S.MenuItem href="/material">자재 관리</S.MenuItem></li>
          <li><S.MenuItem href="/quality">품질 관리</S.MenuItem></li>
          <li><S.MenuItem href="/equipment">설비 관리</S.MenuItem></li>
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