import styled from "styled-components";
import { FlexCenter, TextShadow } from "../admin/Common.styles";

export const Pagenation = styled.div`
${FlexCenter}
margin-top:20px;
gap:8px;
padding-bottom:20px;
`;
export const PagenationBtn = styled.button`
${FlexCenter} width:32px; height:32px;
border:1px solid #ddd;
background-color:currentPage === page ? '#333' : '#fff';
color:currentPage === page ? '#fff' : '#333';
cursor:pointer;
border-radius:4px;
font-weight:currentPage === page ? 'bold' : 'normal';
`;

export const LogoImg = styled.img`
max-height:40px;
width:50px;
`;

export const SlideCopy = styled.div`
position:absolute;
top:86%; left:50%;
transform:translate(-50%, -50%);
color:#fff;
font-size:2.5rem;
font-weight:bold;
${TextShadow}
z-index:10;
text-align:center;
`;