import styled from "styled-components";
import Link from "next/link";
import { BoxShadow, FlexColumn } from "./common/Common.styles";

//mypage
export const CalendarLayout = styled.div`
display:flex; gap:24px;
@media(max-width:1024px) {
flex-direction:column;
}
`;
export const LeftPanel = styled.div`
width:320px;
flex-shrink:0;
@media(max-width:1024px){width:100%;}
`;
export const RightPanel = styled.div`
flex:1; min-width:0;
`;

//sidebar
export const AsideContainer = styled.div`
width:100%;
height:100%;
padding:24px 0;
${FlexColumn};
background-color:#fff;
`;
export const MenuSection = styled.div`
margin-bottom:24px;
`;
export const SectionTitle = styled.h3`
padding:0 24px;
font-size:0.75rem;
font-weight:700;
color:#94a3b8;
margin-bottom:8px;
letter-spacing:0.05em;
`;
export const MenuList = styled.ul`
list-style:none;
padding:0; margin:0;
`;
export const MenuItem = styled(Link)`
display:block;
padding:10px 24px;
color:#475569;
text-decoration:none;
font-size:0.95rem;
font-weight:500;
transition:background-color 0.2s ease, color 0.2s ease;

&:hover{
background-color:#f1f5f9;
color:#2563eb;
border-right:3px solid #2563eb;
}
`;
export const CalendarWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  ${BoxShadow};
`;