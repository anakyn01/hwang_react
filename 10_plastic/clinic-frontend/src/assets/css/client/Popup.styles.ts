import styled from 'styled-components';
import { FlexCenter, BoxShadow, TransitionAll,
     FlexBetween, FlexRight } 
from '../admin/Common.styles';

export const PopupOverlay = styled.div`
position:fixed;
top:0;
left:0;
width:100vw;
height:100vh;
background-color:rgba(0,0,0,0.8);
z-index:999;
${FlexCenter};
`;
export const PopupBox = 
styled.div<{$top?:string; $left?:string}>`
background-color:#fff;
border-radius:0.35rem;
${BoxShadow};
width:90%;
max-width:450px;
overflow:hidden;
`;
export const PopupHeader = styled.header`
${FlexBetween}
padding:1rem 1.5rem;
border-bottom:1px solid #e3e6f0;
background-color:#f8f9fc;
`;
export const PopupTitle = styled.h2`
margin:0; font-size:1.1rem;
font-weight:bold;
color: #4e73df;
`;
export const CloseIcon = styled.button`
background:transparent;
border:none;
font-size:1.5rem;
color:#858796;
cursor:pointer;
line-height:1;
&:hover{color: #3a3b45;}
`;
export const PopupBody= styled.div`
padding:1.5rem; font-size:0.95rem;
color:#5a5c69;
line-height:1.5;
`;
export const PopupFooter = styled.div`
${FlexRight}
gap:0.5rem;
padding:1rem 1.5rem;
border-top:1px solid #e3e6f0;
`;
export const CancelButton = styled.button`
padding:0.5rem 1rem;
border-radius:0.35rem;
background-color: #858796;
border:1px solid #858796;
color:white;
cursor:pointer;
${TransitionAll}
&:hover{
background-color:#717384;
}
`;
export const ConfirmButton = styled.button`
padding:0.5rem 1rem;
border-radius:0.35rem;
background-color: #4e73df;
border:1px solid #4e73df;
color:white;
cursor:pointer;
${TransitionAll}
&:hover{
background-color: #2e59d9;
}
`;
