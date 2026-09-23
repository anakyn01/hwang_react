import styled from "styled-components";
import { FlexCenter } from "../admin/Common.styles";
export const MAIN_COLOR = '#ffe6f0';
export const POINT_COLOR = '#ff1493';
export const TEXT_COLOR = '#111';
//Vlogslider..
export const VlogSection = styled.section`
padding:3.75rem 1.25rem;
background-color:${MAIN_COLOR};
`;
export const VlogInner = styled.div`
max-width:1200px;
margin:0 auto;
`;
export const VlogHeader = styled.div`
display:flex;
justify-content:space-between;
align-items:flex-end;
margin-bottom:2.15rem;
border-bottom:2xp solid ${TEXT_COLOR};
padding-bottom:1rem;
`;
export const VlogControls = styled.div`
${FlexCenter}
gap:10px;
`;
export const VlogTitleGroup = styled.div`
${FlexCenter}
`;
export const VlogMainTitle = styled.h2`
font-size:2.29rem; font-weight:900;
color:${TEXT_COLOR};
margin:0;
`;
export const VlogViewMoreBtn = styled.button`
border:1px solid ${TEXT_COLOR};
background:transparent;
border-radius:1.42rem;
padding:0.42rem 1.14rem;
font-size:0.93rem;
font-weight:600;
cursor:pointer;
color:${TEXT_COLOR};
transtion:all .2s ease-in-out;

&:hover{
background-color:${TEXT_COLOR};
color:#fff;
}
`;
export const VlogArrowBtn = styled.button`
width:2.29rem; height:2.29rem;
border-radius:50%;
background-color:${TEXT_COLOR};
border:none;
font-size:1rem;
corsor:pointer;
color:#fff;
/*display:flex;
justify-content:center;
algin-items:center;*/
&:hover{
background-color:#333;
}
`;
export const VlogSliderWrapper = styled.div`
display:flex;
gap:20px;
overflow-x: auto;
scroll-behavior:smooth;
padding-bottom:1.43rem;

&::-webkit-scrollbar{
display:none;
}
-ms-overflow-style:none;
scrollbar-width:none;
`;
export const VlogCard = styled.div`
min-width:17.14rem;
width:17.14rem;
background-color:#fff;
flex-shrink:0;
cursor:pointer;
box-shadow:0 4px 10px rgba(0,0,0,0.05);
&:hover img{
transform:scale(1.05);
}
`;
export const VlogImageWrapper = styled.div`
width:100%;
height:10rem;
overflow:hidden;
position:relative;

img{
width:100%; height:100%;
object-fit:cover;
transition:transform 0.3 ease;
}
`;
export const VlogInfo = styled.div`
padding:1.1rem;
`;
export const VlogDesc = styled.p`
margin:0;
font-size:1rem;
color:#333;
font-weight:500;
line-height:1.4;
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;
`;