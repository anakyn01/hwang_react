"use client";

import { useState, useEffect, useRef } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { Layout } from "@/components/Layout";
import { Calender } from "@/components/Calender";
import ScheduleModal, { Schedule } from "@/components/modal/ScheduleModal";
import * as S from "@/assets/css/Style.style";

interface ToastInfo {
  id: string;
  title: string;
  content: string;
}

export default function MyPage() {
  const [currentYear, setCurrentYear] = useState(Temporal.Now.plainDateISO().year);
  const [currentMonth, setCurrentMonth] = useState(Temporal.Now.plainDateISO().month);

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentToast, setCurrentToast] = useState<ToastInfo | null>(null);
  const alarmIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const schedulesRef = useRef(schedules);
  useEffect(() => {
    schedulesRef.current = schedules;
  }, [schedules]);

  // 💡 단발성 비프음 재생 함수
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

  // 💡 알람이 울리는 동안(토스트가 켜져 있는 동안) 소리를 1.2초마다 무한 반복 재생
  useEffect(() => {
    if (currentToast) {
      playSingleTone(); // 즉시 한 번 울림
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

  // 1초마다 시간 체크
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

  const getPrevMonth = () => {
    const date = Temporal.PlainDate.from({ year: currentYear, month: currentMonth, day: 1 }).subtract({ months: 1 });
    return { year: date.year, month: date.month };
  };

  const getNextMonth = () => {
    const date = Temporal.PlainDate.from({ year: currentYear, month: currentMonth, day: 1 }).add({ months: 1 });
    return { year: date.year, month: date.month };
  };

  const prev = getPrevMonth();
  const next = getNextMonth();

  const handlePrevClick = () => {
    const prevDate = Temporal.PlainDate.from({ year: currentYear, month: currentMonth, day: 1 }).subtract({ months: 1 });
    setCurrentYear(prevDate.year);
    setCurrentMonth(prevDate.month);
  };

  const handleNextClick = () => {
    const nextDate = Temporal.PlainDate.from({ year: currentYear, month: currentMonth, day: 1 }).add({ months: 1 });
    setCurrentYear(nextDate.year);
    setCurrentMonth(nextDate.month);
  };

  const handleTodayClick = () => {
    const today = Temporal.Now.plainDateISO();
    setCurrentYear(today.year);
    setCurrentMonth(today.month);
  };

  const handleDayClick = (day: number, year: number, month: number) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      {/* 💡 우측 상단 토스트 팝업 (사용자가 확인 버튼을 누르기 전까지 소리와 함께 유지됨) */}
      {currentToast && (
        <S.ToastContainer>
          <S.ToastIcon>⏰</S.ToastIcon>
          <S.ToastContent>
            <S.ToastTitle>{currentToast.title}</S.ToastTitle>
            <S.ToastMessage>{currentToast.content}</S.ToastMessage>
          </S.ToastContent>
          <S.ToastCloseBtn onClick={() => setCurrentToast(null)}>
            확인
          </S.ToastCloseBtn>
        </S.ToastContainer>
      )}

      <S.CalendarLayout>
        {/* 삼중 캘린더 영역 */}
        <S.TripleCalendarWrapper>
          <S.SidePanel>
            <Calender year={prev.year} month={prev.month} schedules={schedules} />
          </S.SidePanel>

          <S.CenterPanel>
            <Calender 
              year={currentYear} 
              month={currentMonth} 
              schedules={schedules}
              onDayClick={handleDayClick} 
            />
          </S.CenterPanel>

          <S.SidePanel>
            <Calender year={next.year} month={next.month} schedules={schedules} />
          </S.SidePanel>
        </S.TripleCalendarWrapper>
      </S.CalendarLayout>

      {/* 하단 플로팅 글래스모피즘 컨트롤러 바 */}
      <S.CalendarHeaderBar>
        <S.NavButtonGroup>
          <S.NavButton onClick={handlePrevClick}>
            &larr; 이전 달
          </S.NavButton>
        </S.NavButtonGroup>

        <h2>{currentYear}년 {currentMonth}월</h2>

        <S.NavButtonGroup>
          <S.NavButton onClick={handleTodayClick}>
            오늘
          </S.NavButton>
          <S.NavButton onClick={handleNextClick}>
            다음 달 &rarr;
          </S.NavButton>
        </S.NavButtonGroup>
      </S.CalendarHeaderBar>

      {/* 스케줄 모달 */}
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        year={currentYear}
        month={currentMonth}
        selectedDate={selectedDate}
        schedules={schedules}
        setSchedules={setSchedules}      
      />
    </Layout>
  );
}