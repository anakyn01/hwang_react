import styled,{keyframes, Keyframes} from 'styled-components';
import { BoxShadow, CircleBtn, FlexBetween, FlexCenter, FlexColumn, FlexStart, FlexTopBetween, FlexWrap, LinearGradient, TransitionAll, Transparent } from '../admin/Common.styles';

export const AdminContainer = styled.div`
display:flex;
height:100vh;
overflow:hidden;
`;
export const AdminSidebar = 
styled.ul<{$isCollapsed:boolean}>`
width:${(props) => (props.$isCollapsed ? '6.5rem':'14rem')};
${TransitionAll}
${FlexColumn}
min-height:100vh;
${LinearGradient}
margin:0; padding:0;
list-style:none;
color:white;
z-index:100;
`;
export const AdminSidebarBrand = 
styled.div<{$isCollapsed:boolean}>`
height:4.375rem;
${FlexCenter}
font-size:${(props) => (props.$isCollapsed ? '1rem' :'1.2rem')};
font-weight:800;
letter-spacing:0.05rem;
border-bottom:1px solid rgba(255,255,255,.1);
cursor:pointer;
text-align:center;
`;
export const AdminNavItem = 
styled.li<{$isCollapsed:boolean}>`
padding:1rem 1.5rem;
font-size:0.85rem;
font-weight:bold;
cursor:pointer;
border-bottom:1px solid rgba(255,255,255,.1);
${TransitionAll}
color:rgba(255,255,255,.8);
display:flex;
align-items:center;
justify-content:${(props) =>(props.$isCollapsed ? 'center' : 'flex-start')};
gap:0.8rem;
&:hover{
background-color:rgba(255,255,255,.2);
color:#fff;
}
`;

export const SidebarTogglerWrapper = styled.div`
display:flex; justify-content:center;
padding:1rem;
margin-top:auto;
`;

export const SidebarToggler = styled.button`
${CircleBtn}
background-color:rgba(255, 255, 255, .2);
${FlexCenter}
${TransitionAll}
&:hover{
background-color:rgba(255, 255, 255, .3);
}
`;

export const AdminContentWrapper = styled.div`
${FlexColumn} flex:1;
background-color: #f8f9fc;
overflow-x:hidden;
`;
export const AdminTopbar = styled.nav`
height:4.375rem;
background-color: #fff;
${FlexBetween}
padding:0 1.5rem;
z-index:10;
`;
export const AdminMain = styled.main`
flex:1; padding:1.5rem;
overflow-y:auto;
`;

export const AdminTopbarBrand = styled.div`
font-size:1.25rem; color:#4e73df;
font-weight:800; letter-spacing:0.05rem;
`;
export const AdminTopbarRight = styled.div`
display:flex; align-items:center;
gap:1.2rem;
`;
export const AdminTopbarUser = styled.span`
font-size:0.9rem;
color:#858796;
font-weight:600;
`;
export const AdminLogoutBtn = styled.button`
${Transparent}
color: #858796;
border:1px solid #d1d3e2;
${FlexCenter}
gap:0.4rem;
${TransitionAll}

&:hover{
background-color: #eaecf4;
color: #3a3b45;
border-color: #b7b9cc;
}
`;

export const DashboardContainer = styled.div`
width:100%;
`;
export const DashboardPageTitle = styled.h1`
font-size:1.5rem; color:#5a5c69;
font-weight:700; margin-bottom:1.5rem;
`;
export const DashboardCardGrid = styled.div`
display:grid;
grid-template-columns:repeat(4, 1fr);
gap:1.5rem;
margin-bottom:2rem;

@media (max-width: 1400px) {
grid-template-columns:repeat(2, 1fr);
}

@media (max-width: 768px) {
grid-template-columns:repeat(1, 1fr);
}
`;
export const DashboardSummaryCard = 
styled.div<{$borderColor:string}>`
${FlexTopBetween}
background-color:#fff;
border-radius:0.35rem;
border-left:0.25rem solid ${(props) => props.$borderColor};
${BoxShadow}
padding:1.25rem;
`;
export const DashboardCardInfo = styled.div`
${FlexColumn}
gap:0.2rem;
flex:1;
`;
export const DashboardCardLabel = 
styled.span<{$textColor:string}>`
font-size:0.75rem;
font-weight:800;
color:${(props) => props.$textColor};
text-transform:uppercase;
margin-bottom:0.2rem;
`;
export const DashboardCardMainValue = 
styled.span`
font-size:1.5rem;
font-weight:bold;
color:#5a5c69;
margin-bottom:0.8rem;
`;
export const DashboardCardSubGrid = styled.div`
${FlexWrap} gap:0.8rem; font-size:0.8rem;
color: #858796; 
border-top:1px solid #eaecf4;
padding-top:0.8rem;
width:100%;
`;
export const DashboardCardSubItem = 
styled.div`
display:flex; gap:0.3rem;
strong{color: #5a5c69;}
`;
export const DashboardCardIconWrapper = 
styled.div`
opacity:.6;
margin-top:0.5rem;
margin-left:1rem;
`;
export const DashboardBottomSection = 
styled.div`
background-color:#fff;
border-radius:0.35rem;
${BoxShadow}
border:1px solid #e3e6f0;
min-height:300px;
${FlexCenter}
`;