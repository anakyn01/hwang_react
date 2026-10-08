import styled,{css} from "styled-components";
import { FlexCenter, W100, Pointer, InlineFlex, TransitionAll, Fw900 } from "./common/Common.styles";

// 버튼에 전달할 Props의 타입 정의
interface ButtonProps{
$variant?: "primary" | "danger" | "outline" | "ghost";
$size?:"small"|"medium"|"large";
$fullWidth?:boolean;
$width?:string;    
}

export const Button = styled.button<ButtonProps>`
${InlineFlex};
border-radius:0.25rem;
${Pointer};
${TransitionAll};
${Fw900};

//크기 사이즈 설정
${({ $size}) =>{
switch($size){
case "small":return css`padding:0.25rem .5rem; font-size:.75rem`; 
case "large":return css`padding:0.825rem 2rem !important; font-size:1.125rem`; 
case "medium":return css`padding:0.375rem 0.75rem; font-size:.875rem`;     
}    
}}

//가로길이 설정
${({ $fullWidth }) => $fullWidth && css`width:100%`}
${({ $width }) => $width && css`width:${$width}`}

//색상
${({ $variant}) => {
    switch ($variant){
case "danger":return css`
background-color: #ef4444;
color:white;
border:none;
&:hover{background-color: #dc2626;}
padding:.5rem 1rem;
`; 

case "outline":return css`
background-color:transparent;
color: #333;
border:1px solid #d1d3e2;
&:hover{background-color: #f8f9fa;}
padding:.5rem 1rem;
`;

case "primary":return css`
background-color: #2563eb;
color:white;
border:none;
padding:.5rem 1rem;
&:hover{background-color: #1d4ed8;}
`; 

case "ghost":return css`
background-color: transparent;
border:none;
color:inherit;
padding:0;
&:hover{opacity: .7;}
`; 
    }
}}
`;

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