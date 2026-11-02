import styled, { css, keyframes } from "styled-components";
import Link from "next/link";
import { BgWhite, BoxShadow, Fixed, FlexBetween, FlexCenter, FlexColumn, H100, W100 } from "./common/Common.styles";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(1.25rem); }
  to { opacity: 1; transform: translateY(0); }
`;
const slideDown = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(1.25rem); }
`;

// 💡 Props 타입 정의 추가 (닫히고 있는지 여부를 받음)
interface ModalProps {
  $isClosing?: boolean;
}

// 기본/알림 모달 오버레이 및 컨테이너
export const ModalOverlay = styled.div<ModalProps>`
  ${Fixed};
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  ${W100};
  ${H100};
  z-index: 99999;
  ${FlexCenter};
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease-out forwards;
`;

export const ModalContainer = styled.div`
  ${BgWhite};
  width: 400px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

// Alert Modal 전용 (기존 유지)
export const AlertModalBox = styled.div<ModalProps>`
  background-color: #1e293b;
  padding: 2rem;
  border-radius: 0.75rem;
  min-width: 18.75rem;
  max-width: 90%;
  gap: 1.5rem;
  ${FlexColumn};
  ${BoxShadow};
  animation: ${({ $isClosing }) => ($isClosing ? slideDown : slideUp)} 0.3s ease-out forwards;
`;

export const ModalText = styled.p`
  font-size: 1.125rem;
  color: #fff;
  text-align: center;
  margin: 0;
  line-height: 1.5;
`;

// 기타 구버전 모달 호환용 요소 (중복 없는 항목들만 유지)
export const ModalHeader = styled.div`
  ${FlexBetween};
  margin-bottom: 1rem;
`;

export const ModalTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
`;

export const ModalBody = styled.div``;

export const FormGroup = styled.div`
  ${FlexColumn};
  gap: 8px;
  margin-bottom: 1rem;
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #d1d3e2;
  border-radius: 4px;
  outline: none;
  font-size: 0.9rem;
`;

export const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #d1d3e2;
  border-radius: 4px;
  outline: none;
  resize: none;
  height: 80px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 16px;
  & > button {
    width: auto !important;
    min-width: 80px;
    padding: 8px 16px !important;
    flex: none;
  }
`;

export const ScheduleHeader = styled.div`
  ${FlexBetween};
  font-size: 0.85rem;
  color: #666;
`;

export const Badge = styled.span<{ $status: "대기" | "진행" | "완료" }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  background-color: ${({ $status }) =>
    $status === "완료" ? "#10b981" : $status === "진행" ? "#3B82f6" : "#f59e0b"};
`;

export const ScheduleDot = styled.div`
  width: 6px;
  height: 6px;
  background-color: #3b82f6;
  border-radius: 50%;
  margin-top: 4px;
`;

/* ---------------- 스케줄 모달 스타일 정의 (애플 글래스모피즘 - 중복 통합본) ---------------- */

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalBox = styled.div<ModalProps>`
  width: 92%;
  max-width: 460px;
  background-color: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 22px;
  padding: 26px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  animation: ${({ $isClosing }) => ($isClosing ? slideDown : slideUp)} 0.25s ease-out forwards;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #1d1d1f;
    letter-spacing: -0.02em;
  }
`;

export const EditBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #0066cc;
  background-color: rgba(0, 102, 204, 0.1);
  padding: 4px 10px;
  border-radius: 999px;
`;

export const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 180px;
  overflow-y: auto;
  padding-right: 4px;
`;

export const ScheduleItem = styled.div<{ $isEditing?: boolean }>`
  padding: 12px 14px;
  border-radius: 12px;
  background-color: ${({ $isEditing }) =>
    $isEditing ? "rgba(0, 102, 204, 0.08)" : "#ffffff"};
  border: 1px solid
    ${({ $isEditing }) => ($isEditing ? "#0066CC" : "rgba(0, 0, 0, 0.08)")};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #0066cc;
  }
`;

export const ItemTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StatusTag = styled.span<{ $status: "대기" | "진행" | "완료" }>`
  font-size: 11px;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 6px;
  flex-shrink: 0;
  background-color: ${({ $status }) =>
    $status === "완료"
      ? "rgba(52, 199, 89, 0.15)"
      : $status === "진행"
      ? "rgba(0, 102, 204, 0.12)"
      : "rgba(142, 142, 147, 0.15)"};
  color: ${({ $status }) =>
    $status === "완료"
      ? "#248A3D"
      : $status === "진행"
      ? "#0066CC"
      : "#636366"};
`;

export const ItemTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1d1d1f;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 6px;
`;

export const ActionBtn = styled.button<{ $isDelete?: boolean }>`
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 6px;
  color: ${({ $isDelete }) => ($isDelete ? "#FF3B30" : "#0066CC")};

  &:hover {
    background-color: ${({ $isDelete }) =>
      $isDelete ? "rgba(255, 59, 48, 0.1)" : "rgba(0, 102, 204, 0.1)"};
  }
`;

export const ItemContent = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: #515154;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-all;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StatusRow = styled.div`
  display: flex;
  gap: 6px;
`;

export const StatusSelectBtn = styled.button<{ $active: boolean }>`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid
    ${({ $active }) => ($active ? "#0066CC" : "rgba(0, 0, 0, 0.1)")};
  background-color: ${({ $active }) =>
    $active ? "rgba(0, 102, 204, 0.1)" : "#ffffff"};
  color: ${({ $active }) => ($active ? "#0066CC" : "#636366")};
  transition: all 0.15s ease;
`;

export const TitleInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 14px;
  font-weight: 600;
  color: #1d1d1f;
  background-color: #ffffff;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.12);
  }
`;

export const ContentTextarea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 14px;
  color: #1d1d1f;
  background-color: #ffffff;
  box-sizing: border-box;
  resize: none;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.12);
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
`;

export const RightBtns = styled.div`
  display: flex;
  gap: 8px;
`;

export const CancelBtn = styled.button`
  padding: 10px 18px;
  border-radius: 12px;
  border: none;
  background-color: #e8e8ed;
  color: #1d1d1f;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #d2d2d7;
  }
`;

export const SaveBtn = styled.button`
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  background-color: #0066cc;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #0055b3;
  }
`;






/* ---------------- 진짜 슬림한 우측 상단 토스트 스타일 ---------------- */

const toastSlideIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const toastSlideOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;

const ringAnimation = keyframes`
  0% { transform: rotate(0deg); }
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-15deg); }
  60% { transform: rotate(10deg); }
  80% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
`;

export const ToastContainer = styled.div<{ $isClosing?: boolean }>`
  position: fixed !important;
  top: 100px !important;
  right: 25px !important;
  z-index: 2147483647 !important;
  
  background-color: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  padding: 14px 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  
  /* 💡 가로로 나란히 배치되는 슬림한 토스트 구조 */
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 340px;
  width: 100%;
  box-sizing: border-box;
  animation: ${({ $isClosing }) => ($isClosing ? toastSlideOut : toastSlideIn)} 0.25s ease-out forwards;
`;

export const ToastIcon = styled.div`
  font-size: 22px;
  line-height: 1;
  animation: ${ringAnimation} 0.6s ease-in-out infinite;
  flex-shrink: 0;
`;

export const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  overflow: hidden;
  text-align: left;
`;

export const ToastTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #1d1d1f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ToastMessage = styled.div`
  font-size: 12px;
  color: #515154;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ToastCloseBtn = styled.button`
  background-color: #0066cc;
  color: #ffffff;
  border: none;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  flex-shrink: 0;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #0055b3;
  }
`;