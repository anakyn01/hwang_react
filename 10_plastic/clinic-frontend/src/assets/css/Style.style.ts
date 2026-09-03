import styled,{keyframes, Keyframes} from 'styled-components';

//🎯 원형 텍스트 회전 애니메이션
const spin = keyframes`
0%{transform: rotate(0deg);}
100% {transform: rotate(360deg);}
`;

export const EventSection = styled.section``;
export const EventInner = styled.div``;
export const EventHeader = styled.div``;
export const EventTitleGroup= styled.div``;
export const EventMainTitle=styled.h2``;
export const EventSubTitle = styled.p``;
export const EventControls = styled.div``;
export const EventViewMoreBtn = styled.button``;
export const EventArrowBtn = styled.button``;
export const EventSliderWrapper = styled.div``;
export const HoverSvg = styled.svg``;
export const EventCard = styled.div``;
export const EventImageWrapper = styled.div``;
export const RankBadge=styled.div<{$bgColor:string; $radius?:string}>``;
export const EventInfo = styled.div<{$bgColor:string}>``;
export const SurgeryLabel = styled.div``;
export const EventPrice = styled.div``;     