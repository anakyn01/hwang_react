"use client";
import styled from "styled-components";
import Link from "next/link";

/*헤더 */
export const HeaderContainer = styled.header`
display:flex; justify-content:space-between;
align-items:center;
padding: 0 1.5rem;
height:4rem;
background-color:#1e293b;
color:#fff;
box-shadow:0 2px 4px rgba(0,0,0, 0.1);
position:relative;
`;
export const Logo = styled.div`
font-size:1.5rem; font-weight:700;
letter-spacing:-0.5px;
cursor:pointer;
`;
export const DesktopNav = styled.nav`
display:flex;
gap:2.285rem;

@media (max-width: 768px) {
display:none;
}
`;
export const NavLink = styled.a`
color: #cbd5e1;
text-decoration:none;
font-size:1rem;
font-weight:500;
transition:color 0.2s ease-in-out;
&:hover{color:#fff;}
`;
export const UserSection = styled.div`
display:flex; align-items:center;
gap:16px;
@media(max-width: 768px) {
display:none;
}
`;
export const LogoutButton = styled.button`
background-color: #ef4444;
color: white; border:none;
padding:6px 12px;
border-radius:4px;
font-size:0.875rem;
cursor:pointer;
font-weight:bold;
&:hover{
background-color:#dc2626;
}
`;
export const MobileMenuToggle = styled.button`
display:none;
background:transparent;
border:none;
color:white;
font-size:1.75rem;
cursor:pointer;

@media (max-width: 768px) {
display:block;
}

`;
export const MobileNav = 
styled.nav<{$isOpen:boolean}>`
display:flex;
flex-direction:column;
position:absolute;
top:64px;
left:0;
width:100%;
background-color:#334155;
padding:${({ $isOpen }) => ($isOpen ? "16px 24px" : "0 24px")};
max-height:${({ $isOpen }) => ($isOpen ? "300px" : "0")};
overflow:hidden;
transition:all 0.3s ease-in-out;
box-shadow:0 4px 6px rgba(0,0,0,0.1);
z-index:99999999999999;

& > a{
padding:12px 0;
border-bottom:1px solid #475569;
color:white;
text-decoration:none;
font-weight:500;
}
& > a:last-child{
border-bottom:none;
}
//엑박을 안눌러도 복귀하면 사라지게..
@media (min-width:768px) {
display:none;
}
`;
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