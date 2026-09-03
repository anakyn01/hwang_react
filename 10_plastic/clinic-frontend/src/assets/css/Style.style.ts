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
export const HoverSvg = styled.svg``;
export const EventCard = styled.div``;
export const EventImageWrapper = styled.div``;
export const RankBadge=styled.div<{$bgColor:string; $radius?:string}>``;
export const EventInfo = styled.div<{$bgColor:string}>``;
export const SurgeryLabel = styled.div``;
export const EventPrice = styled.div``;     