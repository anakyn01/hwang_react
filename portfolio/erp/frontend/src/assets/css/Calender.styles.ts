import styled,{keyframes} from "styled-components";
import { BgWhite, FlexColumn, Fw700 } from "./common/Common.styles";

export const CalendarLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  /* 💡 달력 높이가 줄어든 만큼 하단 패딩도 줄여 전체 화면을 컴팩트하게 유지 */
  padding: 10px 10px 45px 10px;
  box-sizing: border-box;
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
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #0066CC;
    color: #FFFFFF;
    border-color: #0066CC;
  }
`;

/* 💡 달력 높이를 600px -> 480px로 낮춰 하단 공간을 당겨 올림 */
export const TripleCalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 24px;
  align-items: start;
  width: 100%;
  height: 480px;
  min-height: 480px;
  max-height: 480px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    height: auto;
    max-height: none;
  }
`;

export const SidePanel = styled.div`
  opacity: 0.35;
  filter: blur(5px);
  transform: scale(0.92);
  pointer-events: none;
  transition: all 0.3s ease;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const CenterPanel = styled.div`
  opacity: 1;
  filter: none;
  transform: scale(1);
  transition: all 0.3s ease;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

/* 💡 달력 높이가 줄어든 만큼 플로팅 바가 훨씬 위쪽으로 올라와 달력 하단에 착 감기듯 배치됨 */
export const CalendarHeaderBar = styled.div`
  position: absolute;
  bottom: 130px; /* 더 위로 올리고 싶으시면 25px ~ 35px로 숫자를 키우시면 됩니다 */
  left: 58%;
  transform: translateX(-50%);
  width: 95%;
  max-width: 1380px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  padding: 14px 36px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  z-index: 20;
  box-sizing: border-box;

  h2 {
    font-size: 20px;
    font-weight: 700;
    color: #1D1D1F;
    margin: 0;
    letter-spacing: -0.02em;
    white-space: nowrap;
  }
`;

// 기타 보존용 스타일
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

export const CalTopMargin = styled.div`
  padding: 0;
  width: 100%;
`;

export const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto; 
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  padding: 20px;
  box-sizing: border-box;
`;

export const CalHeader = styled.h2`
  text-align: center; 
  font-size: 19px; 
  ${Fw700};
  margin-bottom: 14px; 
  color: #1D1D1F;
`;

export const Grid = styled.div`
  display: grid; 
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-auto-rows: 54px;
  gap: 6px;
`;

export const DayName = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  padding-bottom: 6px;
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 54px;
  border-radius: 10px;
  font-size: 13px;
`;


/* ---------------- 커스텀 시간 선택기 스타일 (너비 확장 및 미니멀 아이콘 적용) ---------------- */

export const TimeSelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 양 끝으로 여유 있게 배치 */
  background-color: rgba(245, 245, 247, 0.8);
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  width: 100%;
  box-sizing: border-box;
`;

export const TimeLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #1d1d1f;
  white-space: nowrap;

  /* 💡 폰트어썸 느낌의 미니멀한 단색 시계 아이콘 (SVG) */
  svg {
    width: 16px;
    height: 16px;
    fill: #515154; /* 단색 미니멀 톤 */
  }
`;

export const TimeSelectGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  color: #1d1d1f;
  font-size: 13px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  transition: all 0.15s ease;
  /* 💡 셀렉트 박스 너비를 시원하게 늘림 */
  min-width: 76px; 
  text-align: center;

  &:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.12);
  }
`;

export const TimeColon = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #86868b;
`;

/* ---------------- 알람 팝업 (확인 버튼을 눌러야만 꺼지는 모달 스타일) ---------------- */

const modalCenterIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -60%) scale(0.9); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const ringAnimation = keyframes`
  0% { transform: rotate(0deg); }
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-15deg); }
  60% { transform: rotate(10deg); }
  80% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
`;

export const ToastContainer = styled.div`
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  z-index: 2147483647 !important;
  
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 34px 44px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 420px;
  width: 90%;
  box-sizing: border-box;
  text-align: center;
  animation: ${modalCenterIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

export const ToastIcon = styled.div`
  font-size: 46px;
  line-height: 1;
  animation: ${ringAnimation} 0.6s ease-in-out infinite;
`;

export const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const ToastTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.02em;
`;

export const ToastMessage = styled.div`
  font-size: 15px;
  color: #515154;
  line-height: 1.5;
  word-break: break-all;
`;

/* 💡 사용자가 직접 누르기 전까지 안 꺼지도록 만드는 확인 버튼 */
export const ToastCloseBtn = styled.button`
  margin-top: 12px;
  background-color: #0066cc;
  color: #ffffff;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 12px 32px;
  border-radius: 14px;
  width: 100%;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #0055b3;
  }
`;