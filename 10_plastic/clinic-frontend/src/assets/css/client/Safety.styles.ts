import styled from "styled-components";
import { FlexColumn } from "../admin/Common.styles";

//safety
export const SafetySection = styled.section`
background:black;
padding:5.71rem 1.42rem;
`;
export const SafetyInner = styled.div`
max-width:1200px;
margin:0 auto;
`;
export const SafetyHeader = styled.div`
display:flex; justify-content:space-between;
align-items:flex-end;
margin-bottom:2.86rem;
`;
export const SafetyTitleGroup = styled.div`
${FlexColumn}
`;
export const SafetyMainTitle = styled.h2`
font-size:2.29rem; font-weight:900;
color:#fff; margin:0;
display:inline-block;
border-bottom:2px solid #fff;
padding-bottom:0.714rem;
`;
export const SafetyControls = styled.div`
display:flex; align-items:center;
gap:0.714rem;
`;
export const SafetyViewMoreBtn = styled.button`
border:1px solid #fff;
background:transparent;
border-radius:20px;
padding:8px 16px;
font-size:1rem; font-weight:600;
cursor:pointer;
color:#fff;
&:hover{
background-color:#fff;
color:#000;
}
`;
export const SafetyArrowBtn = styled.button`
width:36px; height:36px;
border-radius:50%;
border:none;
font-size:16px;
cursor:pointer;
background-color:#222;
color:white;
&:hover{
background-color:#444;
}

`;
export const SafetySliderWrapper = styled.div`
display:flex;
gap:20px;
overflow-x:auto;
scroll-behavior:smooth;
padding-bottom:20px;

&::-webkit-scrollbar{
display:none;
}
-ms-overflow-style:none;
scrollbar-width:none;
`;
export const SafetyCard = styled.div`
min-width:300px;
width:300px;
border-radius:20px;
position:relative;
overflow:hidden;
flex-shrink:0;
cursor:pointer;
&:hover img{
transform:scale(1.05);
}
`;
export const SafetyImage = styled.img`
width:100%; height:100%;
object-fit:cover;
transition:transform 0.4s ease;
`;
export const SafetyTextOverlay = styled.div`
background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%);
position:absolute;
bottom:0; left:0;
padding:40px 20px 20px 20px;
${FlexColumn}
justify-content:flex-end;
`;
export const SafetyCardTitle = styled.h3`
color:#fff;
font-size:1.3rem;
line-height:1.3;
margin:0 0 8px 0;
word-break:keep-all;
`;
export const SafetyCardDesc = styled.p`
color:#ddd;
font-size:0.9rem;
line-height:1.5;
margin:0;
word-break:keep-all;
`;