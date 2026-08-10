'use client';

import React from 'react';
import { SidebarContainer,
 SidebarBrand, NavItem, NavLink, Divider   
 } from './Sidebar.styled';

export const Sidebar:React.FC = () => {
    return(
        <>
<SidebarContainer 
className='sidebar sidebar-dark accordion'
>
    <SidebarBrand href="/">
    <div className='sidebar-brand-icon rotate-n-15'>
        <i className='fas fa-laugh-wink'></i>
    </div>
    <div className='sidebar-brand-text mx-3'>
        Admin <sup>2</sup>
    </div>
    </SidebarBrand>
    <Divider className='my-0'/>

    {/* 1. 대시보드 (메인) 링크 */}
                <NavItem className='active'>
                    <NavLink href="/admin">
                        <i className='fas fa-fw fa-tachometer-alt'></i>
                        {/* 메뉴 이름 추가 */}
                        <span>Dashboard</span>
                    </NavLink>
                </NavItem>

                <Divider/>

                {/* 2. 회원 리스트 링크 추가 */}
                <NavItem>
  
                    <NavLink href="/userlist">
                        <i className='fas fa-fw fa-users'></i>
                        <span>User List</span>
                    </NavLink>
                </NavItem>

                <NavItem>
  
                    <NavLink href="/headersetting">
                        <i className='fas fa-fw fa-users'></i>
                        <span>헤더/nav 설정</span>
                    </NavLink>

                   <NavLink href="/bannersetting">
                        <i className='fas fa-fw fa-users'></i>
                        <span>배너 설정</span>
                    </NavLink>

                    <NavLink href="/wearesetting">
                        <i className='fas fa-fw fa-users'></i>
                        <span>우리는 설정</span>
                    </NavLink>

                    <NavLink href="/worksetting">
                        <i className='fas fa-fw fa-users'></i>
                        <span>work</span>
                    </NavLink>

                    <NavLink href="/blogsetting">
                        <i className='fas fa-fw fa-users'></i>
                        <span>blog</span>
                    </NavLink>

                    <NavLink href="/mapsetting">
                        <i className='fas fa-fw fa-users'></i>
                        <span>map</span>
                    </NavLink>

                    <NavLink href="/contactsetting">
                        <i className='fas fa-fw fa-users'></i>
                        <span>contact</span>
                    </NavLink>

                </NavItem>

</SidebarContainer>
        </>
    )
}