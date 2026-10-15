import styled from "styled-components";
import { FlexBetween, FlexCenter, TransitionAll } from "../admin/Common.styles";

//헤더
export const HeaderWraper = styled.header`
width:100%; background-color:#fff;
border-bottom:1px solid #f0f0f0;
position:fixed;
z-index:9999;
`;

export const HeaderInner = styled.div`
max-width:1860px;
margin:0 auto;
height:90px;
${FlexBetween}
padding:0 40px;

@media (max-width: 1024px) {
height:60px; padding:0 20px;
}
`;

//로고그룹
export const LogoGroup = styled.div`
${FlexCenter}
flex:1;
`;

export const Logo = styled.h1`
font-family:'Times New Roman',serif;
font-size:34px;
color:#3e2723;
margin:0;
cursor:pointer;
`;

//중앙 네비게이션 그룹
export const NavGroup = styled.nav`
${FlexCenter}
gap:40px;
flex:2;

@media (max-width: 1024px) {
 display:none;
}
`;
export const NavItem = styled.span<{$active?:boolean}>`
font-size:16px;
font-weight:bold;
cursor:pointer;
color:${(props) => (props.$active ? '#0056b3':'#111111')};
border-bottom:${(props) => (props.$active ? '2px solid #0056b3' :'2px solid transparent')}
padding-bottom:5px;
${TransitionAll}

&:hover{ color:#0056b3;}
`;
export const UtilGroup = styled.div`
display:flex;
align-items:center;
justify-content:flex-end;
gap:12px;
flex:1;

@media (max-width: 1024px) {
gap:8px;
}
`;
export const PhoneButton = styled.a`
${FlexCenter}
height:40px;
border:1px solid #d1d5db;
border-radius:20px;
padding: 0 16px;
font-size:14px;
font-weight:bold;
color:#111111;
text-decoration:none;
background-color:#fff;
span{
color:#0056b3;
margin-left:6px;
}
`;
export const CtaButton = styled.button`
height:40px; background-color:#111;
color:#fff;
border:none;
border-radius:20px;
padding:0 20px;
font-size:14px;
font-weight:bold;
cursor:pointer;
`;
export const IconButton = styled.button`
width:40px;
height:40px;
border-radius:50%;
border:1px solid #d1d5db;
background-color:#fff;
${FlexCenter}
cursor:pointer;
color:#333;
transition:background-color .2s;

&:hover{
background-color:#f9fafb;
}

svg{
width:20px; height:20px;
}

`;

//add
export const DesktopOnly = styled.div`
${FlexCenter}
gap:12px;
@media (max-width: 1024px) {
display:none;
}
`;

//모바일 전용 둥근 라인버튼
export const MobilePillButton = styled.button`
display:none;

@media (max-width: 1024px) {
display:inline-block;
height:32px;
border:1px solid #111;
border-radius:16px;
padding:0 12px;
font-size:13px;
font-weight:bold;
color:#111;
background-color:#fff;
cursor:pointer;
}
`;

//아디다스버튼
export const HamburgerButton = styled.button`
display:none;
@media (max-width:1024px) {
${FlexCenter}
gap:5px;
width:32px;
height:32px;
border:none;
background:none;
cursor:pointer;
padding:0;
margin-left:8px;
}

span{
display:block; width:22px; height:2px;
background-color:#111;
border-radius:1px;
}
`;