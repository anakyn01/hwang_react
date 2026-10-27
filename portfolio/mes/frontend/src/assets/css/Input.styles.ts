import styled from "styled-components";
import { BoxShadow, FlexCenter, TransitionAll } from "./common/Common.style";

export const Input = styled.input`
width:100%;
padding:0.8rem 1rem;
border:1px solid #d1d3e2;
border-radius:10rem;
outline:none;
${TransitionAll};
&:focus{
border-color:#bac8f3;
${BoxShadow};
}
&[readonly]{
background-color:#eaecf4;
}
`;
export const RadioGroup=styled.div`
${FlexCenter};
gap:1rem;
padding:0 1rem;
`;
export const RadioLabel=styled.label`
display:flex; align-items:center;
gap:0.3rem;
font-size:.9rem;
color:#6e707e;
cursor:pointer;
`;

export const CheckboxLabel = styled.label`
font-size:0.8rem;
color:#6e707e;
cursor:pointer;
`;

export const Select = styled.select`
padding:8px;
border:1px solid #d1d3e2;
border-radius:4px;
outline:none;
font-size:0.9rem;
`;
export const TextArea = styled.textarea`
width:100%;
padding:8px;
border:1px solid #d1d3e2;
border-radius:4px;
outline:none;
resize:none;
height:80px;
`;

// 입력 폼 필드들을 세로 또는 가로로 묶어주는 래퍼 컴포넌트
export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 15px;
    width: 100%;
`;