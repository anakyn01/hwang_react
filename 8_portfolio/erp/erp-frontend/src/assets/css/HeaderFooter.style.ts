"use client";
import styled from "styled-components";
import Link from "next/link";

/*헤더 */
export const HeaderContainer = styled.header``;
export const Logo = styled.div``;
export const DesktopNav = styled.nav``;
export const NavLink = styled.a``;
export const UserSection = styled.div``;
export const LogoutButton = styled.button``;
export const MobileMenuToggle = styled.button``;
export const MobileNav = styled.nav<{$isOpen:boolean}>``;
export const StyledLink = styled(Link)``;
/*푸터*/
export const FooterContainer = styled.footer`
background-color:#f8fafc;
border-top:1px solid #e2e8f0;
padding:1.5rem 2.285rem;
color:#64748b; display:flex;
flex-direction:column; align-items:center;
gap:1.143rem;

@media (min-width: 768px) {
flex-direction:row;
justify-content:space-between;
}
`;
export const FooterInfo = styled.div`
font-size:0.875rem; text-align:center;
line-height:1.5;
@media(min-width: 768px){text-align:left;}
`;
export const FooterLinks= styled.div`
display:flex; 
gap:16px;
font-size:0.875rem;

a{
color:#475569; text-decoration:none;
transition:color 0.2s;
&:hover{
color:#0f172a;
text-decoration:underline;
}
}
`;