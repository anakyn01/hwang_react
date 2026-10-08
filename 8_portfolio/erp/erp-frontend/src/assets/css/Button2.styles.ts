import styled from "styled-components";
import { FlexCenter, W100, Pointer } from "./common/Common.styles";

//1) 버튼 랩핑
//가운데
export const BtnCenterWrap = styled.div`
${W100};
margin-top:2rem;
${FlexCenter};
`;

//오른쪽

//버튼
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
${Pointer};

@media (max-width: 768px) {
display:block;
}

`;

export const CloseButton = styled.button`
background:transparent;
border:none;
font-size:2rem; font-weight:300;
line-height:1; 
cursor:pointer;
color:#666;
${FlexCenter};
transform:rotate(45deg);
transition:transform 0.2s ease, color 0.2s ease;
&:hover{
color:#333;
transform:rotate(135deg);
}
`;
export const SmallButton = styled.button`
width:100px;
background:transparent;
border:1px solid #d1d3e2;
border-radius:4px;
padding:4px 8px;
font-size:0.75rem;
cursor:pointer;

`;