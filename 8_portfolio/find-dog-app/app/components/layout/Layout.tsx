"use client"

import React from 'react';
import {Sidebar} from '../sidebar/Sidebar';
import {Topbar} from '../topbar/Topbar';
import {Wrapper, ContentWrapper, MainContent,
ContainerFluid
} from './Layout.styled';

interface LayoutProps {
    children: React.ReactNode;
}
/*
사용이유 :
레이아웃 컴포넌트는 태그와 태그 사이에 내용물을 받을것이고
화면에 렌더링 할수 있는거 라면 무엇이든 다 받을수 있다
라고 타입 스크립트에게 알려주는 약속규약
children :
아주 특별한 Prop(속성)입니다. 
컴포넌트를 호출할 때 
속성값으로 넘기는 것이 아니라, 
열림 태그와 닫힘 태그 사이에 들어가는 모든 내용
React.ReactNode는 React가 화면에 그릴 수 있는
(렌더링 할 수 있는) 모든 것을 아우르는 가장 넓은 타입입니다.

헤더,사이드바,푸터를 고정해 두고
가운데 알맹이 페이지 내용만 바꿔기우기 위해 만듬
*/

export const Layout:React.FC<LayoutProps> =({children}) =>{
    return(
        <>
        <Wrapper id="wrapper">
            <Sidebar/>
            <ContentWrapper id="content-wrapper">
                <MainContent id="content">
                    <Topbar/>
                    <ContainerFluid>
                        {children}
                    </ContainerFluid>
                </MainContent>
            </ContentWrapper>
        </Wrapper>
        </>
    )
}