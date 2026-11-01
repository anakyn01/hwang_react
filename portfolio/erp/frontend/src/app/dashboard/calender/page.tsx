"use client";

import { useState } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { Layout } from "@/components/Layout";
import { SmallCalendar } from "@/components/SmallCalendar";
import { Calender } from "@/components/Calender";
import * as S from "@/assets/css/Style.style";

export default function MyPage() {
  const [currentYear, setCurrentYear] = useState(Temporal.Now.plainDateISO().year);
  const [currentMonth, setCurrentMonth] = useState(Temporal.Now.plainDateISO().month);

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

  return (
    <Layout>
      <S.CalendarLayout>
        
        {/* 상단 통합 컨트롤러 바 (이전 달 / 연월 타이틀 / 오늘 / 다음 달) */}


        {/* 상단: 큰 캘린더 3개 나란히 배치 (좌: 전달 블러, 중: 이번 달 메인, 우: 다음 달 블러) */}
        <S.TripleCalendarWrapper>
          <S.SidePanel>
            <Calender year={prev.year} month={prev.month} />
          </S.SidePanel>

          <S.CenterPanel>
            <Calender year={currentYear} month={currentMonth} />
          </S.CenterPanel>

          <S.SidePanel>
            <Calender year={next.year} month={next.month} />
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
    </Layout>
  );
}