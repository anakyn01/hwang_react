import styled from "styled-components";

import Link from "next/link";
import { FlexCenter, W100, FlexColumn, FlexColumnStart, H100 } from "../common/Common.style";

export const Container = styled.div`
width:100vw;
${FlexCenter};
min-height:100vh;
padding:2rem;
background-color: ${(props: any) => props.theme?.colors?.background || "#536692"};
`;
export const Card = styled.div`
display:flex;
width:100%;
max-width:1200px;
background:#fff;
border-radius:0.35rem;
box-shadow:0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
overflow:hidden;
`;
export const ImageColumn = styled.div`
width:41.66667%;
background:url("");
@media(max-width:992px){
display:none;
}
`;
export const FormColumn = styled.div`
width:58.33333%;
padding:3rem;
@media(max-width: 992px){
width:100%;
}
`;
export const Title = styled.h1`
text-align:center;
font-size:1.5rem;
color:#3a3b45;
margin-bottom:1.5rem;
font-weight:400;
`;
export const Form = styled.form`
display:flex; flex-direction:column;
gap:1rem;
`;
export const Row = styled.div`
display:flex;
gap:1rem;
@media(max-width: 768px){
flex-direction:column;
}
`;
export const Col = styled.div`
flex:1;
`;

export const AddressWrapper = styled.div`
display:flex;
gap:0.5rem;
`;


export const Divider = styled.hr`
margin:1.5rem 0;
border:0;
border-top:1px solid rgba(0,0,0,0.1);
`;
export const StyledLink = styled(Link)`
display:block;
text-align:center;
font-size:0.875rem;
color:#4e73df;
text-decoration:none;
margin-bottom:0.5rem;
&:hover{
text-decoration:underline;
color:#224abe;
}
`;

export const CheckboxWrapper = styled.div`
display:flex;
align-items:center;
gap:0.5rem;
padding-left:0.5rem;
margin-bottom:0.5rem;
`;

export const Description = styled.p`
text-align: center;
font-size: 0.875rem;
color: #6e707e;
margin-bottom: 1.5rem;
line-height: 1.5;
`;

export const AsideContainer = styled.div`
  ${W100};  
  ${H100};
  padding: 24px 0;
  ${FlexColumnStart};
  background-color: #ffffff;
`;

export const MenuSection = styled.div`
${W100};
margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  padding: 0 24px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  margin-bottom: 8px;
  letter-spacing: 0.05em;
`;

