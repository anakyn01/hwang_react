"use client"

import React from 'react';
import { Sidebar } from '../sidebar/Sidebar';
import { Topbar } from '../topbar/Topbar';
// 💡 앞서 쿨그레이 톤으로 만들어둔 스타일 컴포넌트들을 임포트합니다.
import { 
    Wrapper, 
    ContentWrapper, 
    MainContent, 
    ContainerFluid 
} from "./layout.styled";

interface LayoutProps {
    children: React.ReactNode;
}

/*
사용이유 :
레이아웃 컴포넌트는 태그와 태그 사이에 내용물을 받을 것이고,
화면에 렌더링 할 수 있는 거라면 무엇이든 다 받을 수 있다고
타입스크립트에게 알려주는 약속/규약입니다.

children :
아주 특별한 Prop(속성)입니다. 
컴포넌트를 호출할 때 속성값으로 넘기는 것이 아니라, 
열림 태그와 닫힘 태그 사이에 들어가는 모든 내용을 의미합니다.
React.ReactNode는 React가 화면에 그릴 수 있는
(렌더링 할 수 있는) 모든 것을 아우르는 가장 넓은 타입입니다.

헤더(Topbar), 사이드바(Sidebar), 푸터를 고정해 두고
가운데 알맹이(children) 페이지 내용만 바꿔 끼우기 위해 만듭니다.
*/

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Wrapper id="wrapper">
            {/* 좌측 고정 사이드바 */}
            <Sidebar />
            
            {/* 우측 전체 콘텐츠 영역 (쿨그레이 배경) */}
            <ContentWrapper id="content-wrapper">
                
                {/* 상하단 여백 및 콘텐츠 크기 자동 조절 영역 */}
                <MainContent id="content">
                    {/* 상단 고정 네비게이션 바 */}
                    <Topbar />
                    
                    {/* 실제 각 페이지의 내용이 주입되는 래퍼 */}
                    <ContainerFluid>
                        {children}
                    </ContainerFluid>
                </MainContent>
                
            </ContentWrapper>
        </Wrapper>
    );
};