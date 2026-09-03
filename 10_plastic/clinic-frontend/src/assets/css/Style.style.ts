import styled,{keyframes, Keyframes} from 'styled-components';

//🎯 원형 텍스트 회전 애니메이션
const spin = keyframes`
0%{transform: rotate(0deg);}
100% {transform: rotate(360deg);}
`;

export const EventSection = styled.section`
background-color:#000;
padding:80px 20px;
overflow:hidden;
`;
export const EventInner = styled.div`
max-width:1200px;
margin:0 auto;
`;
export const EventHeader = styled.div`
display:flex;  justify-content:space-between;
align-items:flex-end;
margin-bottom:40px;
`;
export const EventTitleGroup= styled.div`
display:flex;
flex-direction:column;
`;
export const EventMainTitle=styled.h2`
font-size:32px;
font-weight:900;
color:#fff;
margin:0;
`;
export const EventSubTitle = styled.p`
font-size:18px;
color:#888;
margin:5px 0 0 0;
`;
export const EventControls = styled.div`
display:flex; align-items:center;
gap:10px;
`;
export const EventViewMoreBtn = styled.button`
border:1px solid #fff;
background:transparent;
color:#fff;
border-radius:20px;
padding:8px 16px;
font-size:14px;
font-weight:600;
cursor:pointer;

&:hover{
background-color:#fff;
color:#000;
}
`;
export const EventArrowBtn = styled.button`
width:36px; height:36px;
border-radius:50%;
background-color:#222;
border:none;
font-size:16px;
color:#fff;
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;

&:hover{
background-color:#444;
}
`;
export const EventSliderWrapper = styled.div`
display:flex; gap:24px;
overflow-x:auto; scroll-behavior:smooth;
padding-bottom:20px;
padding-top:20px;

&::-webkit-scrollbar{
display:none;
}
-ms-overflow-style:none;
scrollbar-width:none;
`;
export const HoverSvg = styled.svg`
position:absolute;
top:50%; left:50%;
width:85%;
height:85%;
margin-top:-42.5%;
margin-left:-42.5%;
opacity:0;
pointer-events:none;
transition:opacity 0.3s ease-in-out;
transform-origin:center center;
`;
export const EventCard = styled.div`
min-width:280px; width:280px;
position:relative;
flex-shink:0;
cursor:pointer;

&:hover ${HoverSvg}{
opacity:1; 
animation:${spin} 15s linear infinite;
}
&:hover img{
transform:scale(1.05);
}
`;
export const EventImageWrapper = styled.div`
width:100%; height:320px;
position:relative;
overflow:hidden;

img{
width:100%; height:100%; object-fit:cover;
transition:transform 0.4s ease;
}
`;
export const RankBadge=
styled.div<{$bgColor:string; $radius?:string}>`
position:absolute;
top:-15px;
left:-15px;
width:54px;
height:54px;
background-color:${(props) => props.$bgColor};
z-index:10; color:#000;
font-size:26px; font-weight:900;
display:flex;
justify-content:center;
align-items:center;
border-radius:${(props) => props.$radius || '50%'};
box-shadow:2px 2px 10px rgba(0,0,0,0.3);
`;
export const EventInfo = 
styled.div<{$bgColor:string}>`
background-color:${(props) => props.$bgColor};
padding:16px 20px;
display:flex;
justify-content:space-between;
align-items:center;
`;
export const SurgeryLabel = styled.div`
background-color:#000;
color:#fff;
padding:6px 12px;
font-size:14px;
font-weight:700;
`;
export const EventPrice = styled.div`
color:#000;
font-size:32px;
font-weight:900;
letter-spacing:-1px;

span{
font-size:16px;
font-weight:700;
margin-left:2px;
color:#666;
}
`;     