"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { Schedule } from "@/components/modal/ScheduleModal";

interface ToastInfo {
  id: string;
  title: string;
  content: string;
}

interface ScheduleContextType {
  schedules: Schedule[];
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
  currentToast: ToastInfo | null;
  setCurrentToast: (toast: ToastInfo | null) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  // 💡 서버와 클라이언트의 첫 렌더링 불일치(Hydration Mismatch)를 막기 위해 초기값은 빈 배열로 시작
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const [currentToast, setCurrentToast] = useState<ToastInfo | null>(null);
  const alarmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const schedulesRef = useRef(schedules);

  // 💡 마운트 직후(브라우저 환경)에만 localStorage에서 스케줄 로드
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("erp_schedules");
    if (saved) {
      try {
        setSchedules(JSON.parse(saved));
      } catch (e) {
        console.error("스케줄 파싱 실패:", e);
      }
    }
  }, []);

  // schedules가 변경되고 마운트된 상태일 때만 localStorage에 자동 저장
  useEffect(() => {
    schedulesRef.current = schedules;
    if (isMounted) {
      localStorage.setItem("erp_schedules", JSON.stringify(schedules));
    }
  }, [schedules, isMounted]);

  const playSingleTone = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (currentToast) {
      playSingleTone();
      alarmIntervalRef.current = setInterval(() => {
        playSingleTone();
      }, 1200);
    } else {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
        alarmIntervalRef.current = null;
      }
    }

    return () => {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
      }
    };
  }, [currentToast]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Temporal.Now.plainDateTimeISO();
      const currentY = now.year;
      const currentM = now.month;
      const currentD = now.day;
      const currentTimeStr = `${String(now.hour).padStart(2, "0")}:${String(now.minute).padStart(2, "0")}`;

      schedulesRef.current.forEach((sch) => {
        if (
          Number(sch.year) === currentY &&
          Number(sch.month) === currentM &&
          Number(sch.date) === currentD &&
          sch.time === currentTimeStr &&
          sch.status !== "완료" &&
          currentToast?.id !== sch.id
        ) {
          setCurrentToast({
            id: sch.id,
            title: sch.title,
            content: sch.content || "예정된 시간이 되었습니다.",
          });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentToast]);

  return (
    <ScheduleContext.Provider value={{ schedules, setSchedules, currentToast, setCurrentToast }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
}