import styled from "styled-components";
import Link from "next/link";
import { Absolute, BgWhite, BoxShadow, W100, H100, TransitionAll, FlexColumn, Fixed, FlexCenter, FlexBetween, Relative, FlexColumnStart, Ohidden } from "./common/Common.style";

export const CalTopMargin = styled.div`
margin-top: 2rem;
`;

export const CalendarAll = styled.div`
${FlexBetween};
width:1400px;
max-width:1400px;
margin:0 auto;
padding:0 2.5rem;

${Relative};
gap:1.125rem;
`;

export const CalendarWrapper = styled.div<{ $isBlurred? : boolean}>`
width:600px;  
max-width: 600px;
margin: 0 auto;
padding: 20px;
border: 1px solid #e0e0e0;
border-radius: 12px;
min-height:660px;
${BgWhite}
${BoxShadow}
max-width: ${(props) => (props.$isBlurred ? "380px" : "480px")};
z-index: ${(props) => (props.$isBlurred ? "1" : "2")};
filter: ${(props) => (props.$isBlurred ? "blur(4px)" : "none")};
opacity: ${(props) => (props.$isBlurred ? "0.3" : "1")};
pointer-events: ${(props) => (props.$isBlurred ? "none" : "auto")};
transform: ${(props) => (props.$isBlurred ? "scale(0.75)" : "scale(1)")};
${TransitionAll};
`;

export const CalHeader = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;



export const Tooltip = styled.div`
  visibility: hidden;
  ${Absolute}
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 10;
  opacity: 0;
  ${TransitionAll}
`;

// $ 기호(Transient Props)를 사용하여 DOM으로 속성이 전달되는 것을 방지합니다.
interface DayCellProps {
  $isEmpty?: boolean;
  $isToday?: boolean;
  $isHoliday?: boolean;
  $isSunday?: boolean;   // 추가됨
  $isSaturday?: boolean; // 추가됨
}



export const CalendarLayout = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  width: 320px;
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  min-width: 0;
`;



export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled(Link)`
  display: block;
  padding: 10px 24px;
  color: #475569;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
    color: #2563eb;
    border-right: 3px solid #2563eb;
  }
`;

export const DayName = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  padding-bottom: 10px;
  color: #666;

  &:nth-child(1) { color: #ff4d4f; } /* 1번째 자식인 일요일 빨간색 */
  &:nth-child(7) { color: #1890ff; } /* 7번째 자식인 토요일 파란색 */
`;

// 주말 색상 처리를 위한 타입 추가
interface DayCellProps {
  $isEmpty?: boolean;
  $isToday?: boolean;
  $isHoliday?: boolean;
  $isSunday?: boolean;   // 추가됨
  $isSaturday?: boolean; // 추가됨
}

export const DayCell = styled.div<DayCellProps>`
${Relative};
${FlexColumn};
  justify-content: center;
  height: 80px;
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${({ $isEmpty }) => ($isEmpty ? "transparent" : "#fafafa")};
  pointer-events: ${({ $isEmpty }) => ($isEmpty ? "none" : "auto")};
  
  /* 색상 우선순위: 1. 공휴일/일요일(빨강) -> 2. 토요일(파랑) -> 3. 평일(검정) */
  color: ${({ $isHoliday, $isSunday, $isSaturday }) => {
    if ($isHoliday || $isSunday) return "#ff4d4f"; 
    if ($isSaturday) return "#1890ff";
    return "#333";
  }};
  
  font-weight: ${({ $isToday }) => ($isToday ? "bold" : "normal")};
  border: ${({ $isToday }) => ($isToday ? "2px solid #1890ff" : "1px solid transparent")};

  &:hover {
    background-color: ${({ $isEmpty }) => ($isEmpty ? "transparent" : "#f0f0f0")};
  }
  cursor:pointer;
`;




export const ScheduleList = styled.ul`
list-style:none;
padding:0;
margin:16px 0 0 0;
max-height:150px;
overflow-y:auto;
border-top:1px solid #eee;
`;
export const ScheduleItem = styled.li`
${FlexColumn};
padding:12px 0;
border-bottom:1px solid #eee;
gap:8px;
`;
export const ScheduleHeader = styled.div`
${FlexBetween};
font-size:0.85rem;
color:#666;
`;


export const ScheduleDot = styled.div`
width:6px;
height:6px;
background-color:#3b82f6;
border-radius:50%;
margin-top:4px;
`;

// 커스텀 셀렉트 박스 컨테이너
export const CustomSelectContainer = styled.div`
${Relative};
${W100};
z-index:100;
`;

export const SelectTrigger = styled.div`
padding:10px 12px;
border:1px solid #d1d3e2;
border-radius:6px;
background-color:#fff;
font-size:0.9rem;
cursor:pointer;
${FlexBetween};
color:#333;
&:hover{
border-color:#bac8f3;
}
`;

//드롭다운 리스트 영역
export const SelectList = styled.ul`
${Absolute};
top:100%;
left:0;
width:100%;
margin:4px 0 0 0;
padding:0;
list-style:none;
${BgWhite};
border:1px solid #e2e8f0;
border-radius:6px;
${BoxShadow};
z-index:50;
overflow:hidden;
`;
interface SelectItemprops {
  $isSelected?: boolean;
}

//드롭다운 개별 항목
export const SelectItem = styled.li<SelectItemprops>`
padding:10px 12px;
font-size:0.9rem;
cursor:pointer;
color:${({ $isSelected }) => ($isSelected ? '#4e73df' :'#475569')};
background-color:${({ $isSelected}) => ($isSelected ? '#f8f9fc' :'transparent')};
font-weight:${({ $isSelected }) => ($isSelected ? 'bold' :'normal')};
&:hover{
background-color:#f1f5f9;
}
`;

export const LeftDirection = styled.div`
flex:0 1 20rem;
${FlexCenter};
${Ohidden};
`;

export const CurrentDirection = styled.div`
flex:0 1 30rem;
${FlexCenter};
${Ohidden};
`;

export const RightDirection = styled.div`
flex:0 1 20rem;
${FlexCenter};
${Ohidden};
`;