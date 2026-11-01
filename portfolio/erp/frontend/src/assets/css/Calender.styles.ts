import styled from "styled-components";
import { BgWhite, FlexColumn, Fw700 } from "./common/Common.styles";

export const CalendarLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px;
`;

/* 상단 컨트롤러 바 (두 번째 이미지 디자인 반영) */
export const CalendarHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 20px 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1D1D1F;
    margin: 0;
    letter-spacing: -0.02em;
  }
`;

export const NavButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const NavButton = styled.button`
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #1D1D1F;
  padding: 10px 20px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;

  &:hover {
    background-color: #0066CC;
    color: #FFFFFF;
    border-color: #0066CC;
  }
`;

/* 상단: 3개 캘린더 가로 배치 (좌: 전달 블러, 중: 이번 달 메인, 우: 다음 달 블러) */
export const TripleCalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 24px;
  align-items: center;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const SidePanel = styled.div`
  opacity: 0.35;
  filter: blur(5px);
  transform: scale(0.92);
  pointer-events: none;
  transition: all 0.3s ease;
  width: 100%;
`;

export const CenterPanel = styled.div`
  opacity: 1;
  filter: none;
  transform: scale(1);
  transition: all 0.3s ease;
  z-index: 2;
  width: 100%;
`;

/* 하단 영역: 왼쪽에 쏠리도록 배치 */
export const BottomSection = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 10px;
`;

export const LeftPanel = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  width: 100%;
  max-width: 360px;
`;

// 기존 개별 캘린더 스타일
export const CalTopMargin = styled.div`
  padding: 0;
  width: 100%;
`;

export const CalenderWrapper = styled.div`
  width: 100%;
  margin: 0 auto; 
  ${BgWhite};
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  padding: 24px;
`;

export const CalHeader = styled.h2`
  text-align: center; 
  font-size: 20px; 
  ${Fw700};
  margin-bottom: 20px; 
  color: #1D1D1F;
`;

export const Grid = styled.div`
  display: grid; 
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

export const DayName = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  padding-bottom: 10px;
  color: #86868B;

  &:nth-child(1) { color: #FF3B30; }
  &:nth-child(7) { color: #0066CC; }
`;

export const Tooltip = styled.div``;

interface DayCellProps {
  $isEmpty?: boolean;
  $isToday?: boolean;
  $isHoliday?: boolean;
  $isSunday?: boolean;
  $isSaturday?: boolean;
}

export const DayCell = styled.div<DayCellProps>`
  position: relative;
  ${FlexColumn};
  height: 75px;
  border-radius: 10px;
  font-size: 14px;
  background-color: ${({ $isEmpty }) => ($isEmpty ? "transparent" : "rgba(255, 255, 255, 0.6)")};
  pointer-events: ${({ $isEmpty }) => ($isEmpty ? "none" : "auto")};
  border: 1px solid ${({ $isToday }) => ($isToday ? "#0066CC" : "rgba(0, 0, 0, 0.04)")};

  color: ${({ $isHoliday, $isSunday, $isSaturday }) => {
    if ($isHoliday || $isSunday) return "#FF3B30";
    if ($isSaturday) return "#0066CC";
    return "#1D1D1F";
  }};

  font-weight: ${({ $isToday }) => ($isToday ? "600" : "400")};
  background-color: ${({ $isToday }) => ($isToday ? "rgba(0, 102, 204, 0.06)" : undefined)};

  &:hover {
    background-color: ${({ $isEmpty }) => ($isEmpty ? "transparent" : "rgba(0, 102, 204, 0.04)")};
  }
`;