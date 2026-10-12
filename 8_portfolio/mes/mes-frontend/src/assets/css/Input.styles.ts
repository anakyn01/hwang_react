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