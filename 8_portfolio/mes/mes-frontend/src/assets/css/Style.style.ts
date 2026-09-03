import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
min-height:100vh;
padding:2rem;
background-color: ${(props) => props.theme?.colors?.background || "#536692"};
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
export const Input = styled.input`
width:100%;
padding:0.8rem 1rem;
border:1px solid #d1d3e2;
border-radius:10rem;
outline:none;
transition:border-color 0.15s ease-in-out;
&:focus{
border-color:#bac8f3;
box-shadow:0 0 0 0.2rem rgba(78,115,223,0.25);
}
&[readonly]{
background-color:#eaecf4;
}
`;
export const RadioGroup=styled.div`
display:flex;
align-items:center;
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
export const AddressWrapper = styled.div`
display:flex;
gap:0.5rem;
`;
export const Button = styled.button`
width:100%; padding:0.8rem;
background-color:#4e73df;
color:white;
border:none;
border-radius:10rem;
font-size:0.9rem;
cursor:pointer;
transition:background-color 0.15s ease-in-out;

&:hover{
background-color:#2e59d9;
}
`;
export const SearchButton = styled(Button)`
width:auto; min-width:100px;
background-color:#858796;
&:hover{
background-color:#717384;
}
`;
export const SocialButton = styled.button<{$provider:"insta"|"kakao"}>`
width:100%;
padding:0.8rem;
margin-bottom:0.5rem;
background-color:${({ $provider}) => ($provider === "insta" ? "#e1306c" : "#FEE500")};
color:${({ $provider }) => ($provider === "insta" ? "white" : "#000")};
border:none;
border-radius:10rem;
font-size:0.9rem;
cursor:pointer;
text-align:center;
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
export const CheckboxLabel = styled.label`
font-size:0.8rem;
color:#6e707e;
cursor:pointer;
`;


