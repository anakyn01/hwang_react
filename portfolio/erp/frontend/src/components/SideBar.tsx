"use client";
import * as S from "@/assets/css/Style.style";

export const SideBar = () => {
    return(
        <>
<S.AsideContainer>
<S.MenuSection>
    <S.SectionTitle>
        ERP 업무
    </S.SectionTitle>
    <S.MenuList>
<li>
    <S.MenuItem href="/dashboard">
    대시보드
    </S.MenuItem>
</li>        
<li>
    <S.MenuItem href="/dashboard/production">
    생산관리
    </S.MenuItem>
</li>
<li>
    <S.MenuItem href="/dashboard/inventory">
    재고관리
    </S.MenuItem>
</li>
<li>
    <S.MenuItem href="/dashboard/hr">
    인사관리
    </S.MenuItem>
</li>
<li>
    <S.MenuItem href="/dashboard/settings">
    기준정보
    </S.MenuItem>
</li>
    </S.MenuList>
</S.MenuSection>

<S.MenuSection>
    <S.SectionTitle>
       시스템관리
    </S.SectionTitle>
    <S.MenuList>
<li>
    <S.MenuItem href="/master-data">
    기준 정보 관리
    </S.MenuItem>
</li>
<li>
    <S.MenuItem href="/users">
    사용자 권한 관리
    </S.MenuItem>
</li>
<li>
    <S.MenuItem href="/settings">
    시스템 환경설정
    </S.MenuItem>
</li>
    </S.MenuList>
</S.MenuSection>




</S.AsideContainer>        
        </>
    )
}