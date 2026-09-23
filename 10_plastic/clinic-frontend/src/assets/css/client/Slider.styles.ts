import styled from "styled-components";
//슬라이더
export const SliderSection = styled.section`
background-color:#ffe6f0;
padiing:60px 20px;
overflow:hidden;
`;
export const SliderInner = styled.div`
max-width:1200px;
margin:0 auto;
`;
export const SliderHeader = styled.div`
display:flex;
justify-content:space-between;
align-items:flex-end;
margin-bottom:30px;
`;
export const SliderTitleGroup = styled.div`
display:flex;
flex-direction:column;
`;
export const SliderMainTitle = styled.h2`
font-size:32px;
font-weight:900;
color:#111;
margin:0;
`;
export const SliderSubTitle = styled.p`
font-size:18px;
color:#888;
margin:5px 0 0 0;`;
export const SliderControls = styled.div`
display:flex;
align-items:center;
gap:10px;
`;
export const SliderViewMoreBtn = styled.button`
border:1px solid #111;
background:transparent;
border-radius:20px;
padding:8px 16px;
font-size:14px;
font-weight:600;
cursor:pointer;
&:hover{
background-color:#111;
color:#fff;
}
`;
export const SliderArrowBtn = styled.button`
width:36px; height:36px; border-radius:50%;
background-color:#111;
color:#fff;
border:none;
font-size:16px;
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;
&:hover{
background-color:#333;}
`;
export const SelfieSliderWrapper = styled.div`
display:flex; gap:20px;
overflow-x:auto;
scroll-behavior:smooth;
padding-bottom:20px;

&::-webkit-scrollbar{
display:none;
}
-ms-overflow-style:none;
scrollbar-width:none;
`;
export const SelfieCard = styled.div`
min-width:240px;
height:340px;
border-radius:20px;
position:relative;
overflow:hidden;
flex-shrink:0;
cursor:pointer;
img{
width:100%;
height:100%;
object-fit:cover;
}
`;
export const SelfieCardOverlay = styled.div`
position:absolute;
top:0; left:0; right:0; bottom:0;
background:linear-gradient(
to bottom,
rgba(0,0,0,0.3) 0%,
rgba(0,0,0,0) 30%,
rgba(0,0,0,0) 60%,
rgba(0,0,0,0.6) 100%;
);
display:flex;
flex-direction:column;
justify-content:space-between;
padding:20px;
`;
export const SelfieLikeBadge = styled.div`
color:#fff;
font-size:14px;
font-weight:700;
display:flex;
align-items:center;
gap:5px;

span{
color:#fff1493;
font-size:18px;
}
`;
export const SelfieViewCount = styled.div`
color:#fff;
font-size:15px;
font-weight:700;
span{
display:block;
font-size:12px;
font-weight:400;
color:#ccc;
margin-top:4px;
}
`;