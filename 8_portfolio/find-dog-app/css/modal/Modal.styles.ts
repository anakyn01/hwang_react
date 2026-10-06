import styled from 'styled-components';
import { BgWhite, BoxShadow, Fixed, FlexBetween, FlexCenter, FlexColumn, Fw700, H100, Pointer, TransitionAll, W100 } from '../common/Common.styles';

export const ModalOverlay = styled.div`
${Fixed}
top:0; left:0;
${W100}
${H100}
background:rgba(0,0,0, .5);
${FlexCenter}
z-index:1000;
`;

export const ModalContent = styled.div`
${BgWhite}
padding:24px;
border-radius:1rem;
width:90%;
max-width:500px;
max-height:90vh;
overflow-y:auto;
${BoxShadow}
`;

export const HeaderRow = styled.div`
${FlexBetween}
margin-bottom:1.25rem;
h2{
font-size:1.125rem;
${Fw700}
color:#333;
margin:0;
}
`;

export const CloseButton = styled.button`
background:none;
border:none;
cursor:pointer;
color:#666;
padding:0.25rem;
${FlexCenter}
`;
export const Form = styled.form`
${FlexColumn}
gap:0.75rem;
`;

export const Select = styled.select`
padding:0.75rem;
border:1px solid #e1e1e1;
border-radius:.5rem;
font-size:.8rem;
${BgWhite}
outline:none;
${Pointer}
`;
export const TextArea = styled.textarea`
padding:.8rem;
border:1px solid #e1e1e1;
border-radius:.5rem;
outline:none;
resize:none;
font-family:inherit;
${TransitionAll}
&:focus{border-color:#ff6b6b;}
`;
export const SubmitButton = styled.button`
background: #ff6b6b;
color:#fff;
padding:.8rem;
border:none;
border-radius:.5rem;
font-size:.95rem;
font-weight:bold;
${Pointer}
margin-top:8px;
${TransitionAll}
&:hover{background: #fa5252;}
`;

export const Input = styled.input``;