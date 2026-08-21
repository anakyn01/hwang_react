'use client';

import React from 'react';
// 💡 길게 나열했던 스타일 컴포넌트들을 'S'라는 바구니(별칭) 하나로 깔끔하게 묶어옵니다!
import * as S from './Sidebar.styled';

export const Sidebar: React.FC = () => {
    return (
        <>
            <S.SidebarContainer className='sidebar sidebar-dark accordion'>
                <S.SidebarBrand href="/">
                    <div className='sidebar-brand-icon rotate-n-15'>
                        <i className='fas fa-laugh-wink'></i>
                    </div>
                    <div className='sidebar-brand-text mx-3'>
                        Admin <sup>2</sup>
                    </div>
                </S.SidebarBrand>
                
                <S.Divider className='my-0'/>

                {/* 1. 대시보드 (메인) 링크 */}
                <S.NavItem className='active'>
                    <S.NavLink href="/admin">
                        <i className='fas fa-fw fa-tachometer-alt'></i>
                        <span>Dashboard</span>
                    </S.NavLink>
                </S.NavItem>

                <S.Divider/>

                <S.NavItem>
                    <S.NavLink href="/admin/pick">
                        <i className='fas fa-fw fa-users'></i>
                        <span>추천동물설정</span>
                    </S.NavLink>
                </S.NavItem>

                {/* 2. 각 메뉴별로 NavItem 하나씩 독립적으로 적용 */}
                <S.NavItem>
                    <S.NavLink href="/admin/campaign">
                        <i className='fas fa-fw fa-users'></i>
                        <span>캠페인</span>
                    </S.NavLink>
                </S.NavItem>

                <S.NavItem>
                    <S.NavLink href="/admin/intergrate">
                        <i className='fas fa-fw fa-cogs'></i>
                        <span>통합게시물설정</span>
                    </S.NavLink>
                </S.NavItem>

                <S.NavItem>
                    <S.NavLink href="/bannersetting">
                        <i className='fas fa-fw fa-image'></i>
                        <span>배너 설정</span>
                    </S.NavLink>
                </S.NavItem>

                <S.NavItem>
                    <S.NavLink href="/wearesetting">
                        <i className='fas fa-fw fa-info-circle'></i>
                        <span>우리는 설정</span>
                    </S.NavLink>
                </S.NavItem>

                <S.NavItem>
                    <S.NavLink href="/worksetting">
                        <i className='fas fa-fw fa-briefcase'></i>
                        <span>work</span>
                    </S.NavLink>
                </S.NavItem>

                <S.NavItem>
                    <S.NavLink href="/blogsetting">
                        <i className='fas fa-fw fa-blog'></i>
                        <span>blog</span>
                    </S.NavLink>
                </S.NavItem>

                <S.NavItem>
                    <S.NavLink href="/mapsetting">
                        <i className='fas fa-fw fa-map-marker-alt'></i>
                        <span>map</span>
                    </S.NavLink>
                </S.NavItem>

                <S.NavItem>
                    <S.NavLink href="/contactsetting">
                        <i className='fas fa-fw fa-envelope'></i>
                        <span>contact</span>
                    </S.NavLink>
                </S.NavItem>
                
                <S.Divider/>

            </S.SidebarContainer>
        </>
    );
};