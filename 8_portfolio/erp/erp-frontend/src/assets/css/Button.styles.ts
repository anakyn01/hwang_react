import styled,{css} from "styled-components";
import { FlexCenter, W100, Pointer, InlineFlex, TransitionAll, Fw900 } from "./common/Common.styles";

// 버튼에 전달할 Props의 타입 정의
interface ButtonProps{
$variant?: "primary" | "danger" | "outline" | "ghost" | "insta" | "kakao";
$size?:"small"|"medium"|"large";
$fullWidth?:boolean;
$width?:string;    
}

export const Button = styled.button<ButtonProps>`
${InlineFlex};
border-radius:2.5rem;
${Pointer};
${TransitionAll};
${Fw900};
justify-content: center;

//크기 사이즈 설정
${({ $size}) =>{
switch($size){
case "small":return css`padding:0.25rem .5rem; font-size:.75rem;`; 
case "large":return css`padding:0.95rem 2rem; !important; font-size:1.125rem;`; 
case "medium":return css`padding:0.375rem; 0.75rem; font-size:.875rem;`; 
default:return css`padding: 0.95rem 1rem; font-size: 0.875rem;`;    
}    
}}

//가로길이 설정
${({ $fullWidth }) => $fullWidth && css`width:100%;`}
${({ $width }) => $width && css`width:${$width};`}

//색상
${({ $variant}) => {
    switch ($variant){
case "danger":return css`
background-color: #ef4444;
color:white;
border:none;
&:hover{background-color: #dc2626;}
`; 

case "outline":return css`
background-color:transparent;
color: #333;
border:1px solid #d1d3e2;
&:hover{background-color: #f8f9fa;}
`;

case "primary":return css`
background-color: #2563eb !important;
color:white;
border:none;
&:hover{background-color: #1d4ed8;}
`; 

case "insta":return css`
background-color: #e1306c !important;
color:white;
border:none;
&:hover{background-color: #c13584;}
`; 

case "kakao":return css`
background-color: #FEE500 !important;
color:#3c1e1e;
border:none;
&:hover{background-color: #F4dc00;}
`; 

case "ghost":return css`
background-color: transparent;
border:none;
color:inherit;
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





