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
    <NavItem className='active'>
        <NavLink href="/">
        <i className='fas fa-fw fa-tachometer-alt'></i>
        </NavLink>
    </NavItem>

    <Divider/>

</SidebarContainer>
        </>
    )
}