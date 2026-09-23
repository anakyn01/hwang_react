import styled, {keyframes} from "styled-components";
import { FlexBetween, FlexCenter, FlexColumn } from "../admin/Common.styles";

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
${FlexColumn}
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
${FlexCenter}
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
${FlexCenter}

&:hover{
background-color:#444;
}
`;
export const EventSliderWrapper = styled.div`
display:flex; gap:24px;
overflow-x:auto; scroll-behavior:smooth;
padding:30px 10px 20px 20px;

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

// 🎯 평상시엔 직사각형이다가, 마우스를 올리면 위가 둥글게 변하는 애니메이션 추가
export const EventImageWrapper = styled.div`
  width: 100%;
  height: 340px;
  position: relative;
  overflow: hidden;
  
  /* 🎯 핵심 1: 평상시엔 모서리가 뾰족한 직사각형 */
  border-radius: 0px; 
  /* 🎯 핵심 2: 모양이 부드럽게 변하도록 트랜지션 추가 */
  transition: border-radius 0.3s ease-in-out;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
`;

export const EventCard = styled.div`
  min-width: 280px;
  width: 280px;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;

  /* 🎯 핵심 3: 마우스 오버 시 이미지 윗부분 양쪽 모서리를 둥글게 깎음 (가로 280px의 절반인 140px로 완벽한 반원 생성) */
  &:hover ${EventImageWrapper} {
    border-top-left-radius: 140px;
    border-top-right-radius: 140px;
  }

  &:hover ${HoverSvg} {
    opacity: 1;
  }
  
  &:hover img {
    transform: scale(1.05);
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
${FlexCenter}
border-radius:${(props) => props.$radius || '50%'};
box-shadow:2px 2px 10px rgba(0,0,0,0.3);
`;
export const EventInfo = 
styled.div<{$bgColor:string}>`
background-color:${(props) => props.$bgColor};
padding:16px 20px;
${FlexBetween}
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
