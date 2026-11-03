"use client";

import { useState } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { Layout } from "@/components/Layout";
import { Calender } from "@/components/Calender";
import ScheduleModal from "@/components/modal/ScheduleModal";
import { useSchedule } from "@/context/ScheduleContext"; // 💡 올바른 Context 경로에서 임포트
import * as S from "@/assets/css/Style.style"; // 스타일은 스타일 전용 파일에서만 임포트

export default function MyPage() {
  const [currentYear, setCurrentYear] = useState(Temporal.Now.plainDateISO().year);
  const [currentMonth, setCurrentMonth] = useState(Temporal.Now.plainDateISO().month);

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 💡 전역 Context에서 스케줄 및 세팅 함수 가져오기
  const { schedules, setSchedules } = useSchedule();

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
      <S.CalendarLayout>
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