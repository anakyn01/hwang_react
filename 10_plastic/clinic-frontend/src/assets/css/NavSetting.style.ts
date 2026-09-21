import styled from 'styled-components';
import { BoxShadow, FlexBetween, FlexCenter, FlexColumn, TransitionAll } from './Common.styles';

export const SetNavContainer = styled.div`
width:100%;
`;
export const SetNavPageHeader = 
styled.header`
width:100%;
${FlexBetween}
margin-bottom:1.5rem;
`;
export const SetNavPageTitle = 
styled.h1`
font-size:1.5rem;
color: #5a5c69; font-weight:700;
margin:0;
`;
export const SetNavSaveButton = 
styled.button`
${FlexCenter}
background-color:#4e73df; color:white; border:none;
padding:0.5rem 1.2rem;
border-radius:0.35rem;
font-size:0.9rem;
font-weight:600;
cursor:pointer;
${BoxShadow}
${TransitionAll}
&:hover{
background-color: #2e59d9;
}
`;
export const SetNavContentGrid = styled.div`
${FlexColumn} gap:1.5rem;
`;
export const SetNavCard = styled.div`
background-color:#fff;
border-radius:0.35rem;
${BoxShadow}
border:1px solid #e3e6f0;
overflow:hidden;
`;
export const SetNavCardHeader = 
styled.header`
background-color: #f8f9fc;
border-bottom:1px solid #e3e6f0;
padding: 1rem 1.25rem;
`;
export const SetNavCardTitle = styled.h6`
margin:0;
font-weight:700;
color:#4e73df;
`;
export const SetNavCardBody = styled.div`
padding:1.5rem; color:#4e73df;
p{
margin-top:0;
margin-bottom:1.5rem;
font-size:0.9rem;
}
`;
export const SetNavRadioGroup = 
styled.div`
display:flex;  gap:1rem;  margin-bottom:1.5rem;
`;
export const SetNavRadioLabel = 
styled.div<{$isActive:boolean}>`
${FlexCenter}
gap:0.5rem;
padding:0.8rem 1.5rem;
border-radius:0.35rem;
border: 1px solid ${(props) => (props.$isActive ? "#4e73df" : "#d1d3e2")};
  background-color: ${(props) => (props.$isActive ? "#eaecf4" : "#fff")};
color: ${(props) => (props.$isActive ? "#4e73df" : "#858796")};
font-weight:600;
cursor:pointer;
${TransitionAll}
&:hover{
background-color:#f8f9fc;
}
`;
export const SetNavInputWrapper = 
styled.div`
${FlexColumn} gap:1rem;
background-color: #f8f9fc;
padding:1.5rem;
border-radius:0.35rem;
border:1px solid #e336f0;
`;
export const SetNavLabel = styled.label`
font-size:0.85rem;
font-weight:700;
color: #5a5c69;

/* 💡 텍스트 찌그러짐 방지 핵심 속성 */
white-space: nowrap; /* 글자가 모자라도 절대 줄바꿈하지 않음 */
flex-shrink: 0;      /* 옆에 있는 인풋창이 커져도 내 영역을 뺏기지(수축하지) 않음 */
`;
export const SetNavInput = styled.input`
width:100%; padding:0.6rem 1rem;
font-size:0.9rem;
background-color:#fff;
border:1px solid #d1d3e2;
border-radius:0.35rem;
outline:none;
${TransitionAll}
&:focus{border-color: #4e73df;}
`;
export const SetNavFileInputWrapper = 
styled.div`
${FlexCenter}
gap:1rem;
.file-name{font-size:0.9rem; color: #858796;}
`;
export const SetNavFileInput = 
styled.input`display:none;`;
export const SetNavFileLabel = 
styled.label`
background-color:#fff;
border:1px solid #d1d3e2;
padding:0.5rem 1rem;
border-radius:0.35rem;
font-size:0.85rem;
font-weight:600;
color:#5a5c69;
cursor:pointer;

&:hover{
background-color:#eaecf4;
}
`;
export const SetNavMenuList = styled.div`
flex-wrap: wrap;
${FlexCenter}
gap:1rem;
background-color: #f8f9fc;
padding:1rem;
border-radius:0.35rem;
border:1px solid #e3e6f0;

.menu-number{
font-weight:900;
color: #b7b9cc;
width:20px;
}
`;
export const SetNavMenuItem = styled.div`
box-sizing:border-box;
${FlexCenter}
gap:1rem;
background-color: #f8f9fc;
border-radius:0.35rem;
border:1px solid #e3e6f0;
padding:1rem;
`;
export const SetNavDeleteButton = styled.button`
background:transparent;
border:none;
color: #e74a3b;
cursor:pointer;
${FlexCenter}
padding:0.5rem;
${TransitionAll}
&:hover{background-color: #fdeaea;}
`;
export const SetNavAddButton = styled.button`
${FlexCenter}
width:100%;
border:1px dashed #b7b9cc;
color:#5a5c69;
padding:1rem;
border-radius:0.35rem;
font-weight:600;
gap:0.5rem;
${TransitionAll}

&:hover{
background-color:#eaecf4;
border-color: #858796;
}
`;