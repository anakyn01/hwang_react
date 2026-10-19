import styled from "styled-components";
import { BoxShadow, FlexCenter, FlexColumn, TransitionAll } from "../admin/Common.styles";

//floating
export const FlaotingMenu = styled.div`
position:fixed; right:30px; bottom:90px;
${FlexColumn}
gap:15px; z-index:100;
@media (max-width: 768px) {
right:15px; bottom:20px;
transform:scale(0.85);
}
`;
export const FabItem = styled.div`
${FlexColumn}
align-items:center;
gap:5px;
cursor:pointer;
`;
export const FabIcon = styled.div<{$bgColor:string}>`
width:60px; height:60px;
border-radius:50%;
background-color:${(props) => props.$bgColor};
${FlexCenter}
color:#000;
font-weight:900;
font-size:16px;
${BoxShadow}
${TransitionAll}

&:hover{
transform: translateY(-5px);
}

svg{
width:30px; height:30px; color:#fff;
}
`;
export const FabText = styled.span`
background-color: #111;
color:#fff;
font-size:11px;
font-weight:bold;
padding:4px 8px;
border-radius:10px;
letter-spacing:-0.5px;
`;
