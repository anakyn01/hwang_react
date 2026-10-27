import styled from "styled-components";
import Link from "next/link";
import { BgWhite, FlexColumn, Fw700 } from "./common/Common.styles";

//캘린더
export const CalTopMargin = styled.div`
margin-top:2rem;
`;
export const CalenderWrapper = styled.div`
max-width:1000px;
margin:0 auto; 
${BgWhite};
border:1px solid #e0e0e0;
border-radius:20px;
box-shadow:0 4px 6px rgba(0,0,0, 0.5);
`;
export const CalHeader = styled.h2`
text-align:center; 
font-size:32px; 
${Fw700};
margin-bottom:1.5rem; color:#333;
`;
export const Grid = styled.div`
display:grid; 
grid-template-columns: repeat(7, 1fr);
gap:8px;
`;
export const DayName = styled.div`
text-align:center;
font-size:1rem;
padding-bottom:10px;

&:nth-child(1){color: #ff4d4f;}
&:nth-child(7){color: #1890ff;}
}
`;
export const Tooltip = styled.div``;
interface DayCellProps{
$isEmpty?:boolean;
$isToday?:boolean;
$isHoliday?:boolean;
$isSunday?: boolean;   // <--- 추가
$isSaturday?: boolean; // <--- 추가
}

export const DayCell = styled.div<DayCellProps>`
position:relative;
${FlexColumn};
height:80px;
border-radius:8px;
font-size:1.2rem;
background-color:${({ $isEmpty}) => ($isEmpty ? "transparent" : "#fafafa")};
pointer-events:${({ $isEmpty})=>($isEmpty ? "none" : "auto")};

color:${({ $isHoliday, $isSunday, $isSaturday}) =>{
  if( $isHoliday || $isSunday) return "#ff4d4f";
  if( $isSaturday) return "#1890ff";
  return "#333";
}};

font-weight:${({ $isToday}) => ($isToday ? "bold" :"normal")};
border:${({ $isToday}) => ($isToday ? "2px solid #1890ff":"1px solid transparent")};

&:hover{
background-color:${({ $isEmpty }) => ($isEmpty ? "transparent" : "#f0f0f0")};
}
`;