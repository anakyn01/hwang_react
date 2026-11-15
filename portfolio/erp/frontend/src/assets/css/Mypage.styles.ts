import styled from "styled-components";
import Link from "next/link";
import { BoxShadow, FlexColumn, FlexColumnStart, Fw500, W100 } from "./common/Common.styles";



export const RightPanel = styled.div`
flex:1; min-width:0;
`;

//sidebar
export const AsideContainer = styled.div`
width:100%;
height:100%;
padding:24px 0;
${FlexColumnStart};
background-color:#fff;
`;
export const MenuSection = styled.div`
margin-bottom:24px;
${W100};
`;
export const SectionTitle = styled.h3`
padding:0 24px;
font-size:0.75rem;
font-weight:700;
color:#94a3b8;
margin-bottom:8px;
letter-spacing:0.05em;
`;
export const MenuList = styled.div`
width:100%;
list-style:none;
padding:0; margin:0;
`;
export const MenuItem = styled(Link)`
width:100%;
box-sizing: border-box;
display:block;
padding:10px 24px;
color:#475569;
text-decoration:none;
font-size:0.95rem;
${Fw500};
border-right: 3px solid transparent;
transition:background-color 0.2s ease, color 0.2s ease;

&:hover{
background-color:#f1f5f9;
color:#2563eb;
border-right:3px solid #2563eb;
}
`;