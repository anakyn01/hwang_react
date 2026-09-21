import styled from 'styled-components';
import {BoxShadow, FlexBetween, FlexCenter, TransitionAll} from './Common.styles';

export const ToneContainer= styled.div`
width:100%;
`;
export const TonePageHeader= styled.div`
${FlexBetween}
margin-bottom:1.5rem;
`;
export const TonePageTitle= styled.h1`
font-size:1.5rem;
color:#5a5c69;
font-weight: 700;
  margin: 0;
`;
export const ToneSaveButton= styled.button`
${FlexCenter} color:white; border:none;
padding:0.5rem 1.2rem;
border-radius:0.35rem;
font-size:0.9rem;
font-weight:600;
cursor:pointer;
${BoxShadow}
${TransitionAll}
background:#4e73df;

&:hover{background-color:#2e59d9;}
`;
export const ToneCardGrid= styled.div`
display:grid; 
grid-template-columns:repeat(2, 1fr);
gap:1.5rem;

@media (max-width: 768px) {
grid-template-columns:1fr;
}
`;
export const ToneSettingsCard= styled.div`
background-color:#fff;
border-radius:0.35rem;
${BoxShadow}
border:1px solid #e3e6f0;
overflow:hidden;
`;
export const ToneCardHeader= styled.div`
background-color:#f8f9fc;
padding:1rem 1.25rem;
border-bottom:1px solid #e3e6f0;
`;
export const ToneCardTitle=styled.h6`
margin:0; font-weight:700;
color:#4e73df;
`;
export const ToneCardBody= styled.div`
padding:1.5rem;
color:#858796;
p{
margin-top:0;
margin-bottom:1.5rem;
font-size:0.9rem;
}
`;
export const ToneColorOptionWrapper= styled.div`
display:flex;
gap:1.5rem;
margin-bottom:1.5rem;
`;
export const ToneColorBox= 
styled.div<{$color:string; $isActive:boolean}>`
${FlexCenter}
width:5rem; height:5rem;
background-color:${(props) => props.$color};
cursor:pointer;
box-shadow:${(props) => (props.$isActive ? `0 0 0 4px #fff, 0 0 0 7px ${props.$color}`:"0 0.15rem 0.5rem 0 rgba(0,0,0,0.1")};
`;
export const ToneToggleWrapper= styled.div`
display:flex;
background-color:#eaecf4;
border-radius:0.5rem;
padding:0.3rem;
width:fit-content;
margin-bottom:1.5rem;
`;
export const ToneModeButton= 
styled.button<{$isActive:boolean; $isDark?:boolean}>`
background-color:${(props) => (props.$isActive ? (props.$isDark ? "#202020" : "#fff" ) : "transparent")};
color:${(props) => (props.$isActive ? (props.$isDark ? "#fff" :"#4e73df") : "858796")};
border:none;
padding:0.6rem 1.5rem;
border-radius:0.35rem;
font-weight:600;
corsor:pointer;
display:flex;
align-items:center;
gap:0.5rem;
${TransitionAll}
`;
export const ToneSelectedText = styled.div`
font-size:0.9rem;
border-top:1px solid #eaecf4;
padding-top:1rem;
strong{
color:#5a5c69;
}
`;