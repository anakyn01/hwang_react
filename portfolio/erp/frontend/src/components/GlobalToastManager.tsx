"use client";

import { useSchedule } from "@/context/ScheduleContext";
import * as S from "@/assets/css/Style.style";

export function GlobalToastManager() {
  const { currentToast, setCurrentToast } = useSchedule();

  if (!currentToast) return null;

  return (
    <S.ToastContainer style={{ zIndex: 99999 }}>
      <S.ToastIcon>⏰</S.ToastIcon>
      <S.ToastContent>
        <S.ToastTitle>{currentToast.title}</S.ToastTitle>
        <S.ToastMessage>{currentToast.content}</S.ToastMessage>
      </S.ToastContent>
      <S.ToastCloseBtn onClick={() => setCurrentToast(null)}>
        확인
      </S.ToastCloseBtn>
    </S.ToastContainer>
  );
}