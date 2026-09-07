"use client";

import {useState, useEffect} from "react";
import { Temporal } from "@js-temporal/polyfill";
import { Holiday } from "../app/type/holiday";
import { fetchHolidays } from "../app/api/holidays";
import * as S from "@/assets/css/Style.style";
 
export const Calendar = ({year = Temporal.Now.plainDateTimeISO().year,
month = Temporal.Now.plainDateISO().month, // 현재 달(예: 9월)을 자동으로 가져오도록 추가    
}:{year?:number, month?: number;}) => {
  // 1. 해당 연/월의 1일을 명시적으로 직접 생성 (가장 안전한 방식)
  const targetYearMonth = Temporal.PlainYearMonth.from({ year, month });
  const firstDayDate = Temporal.PlainDate.from({ year, month, day: 1 });
  
  // 2. 일요일(7)을 배열 인덱스(0)로 변환
  const firstDayIndex = firstDayDate.dayOfWeek === 7 ? 0 : firstDayDate.dayOfWeek;
  // 3. 이번 달의 총 일수 추출
  const daysInMonth = firstDayDate.daysInMonth;

  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    fetchHolidays(year).then(setHolidays);
  }, [year, month]);

  const today = Temporal.Now.plainDateISO();
  const isThisMonth = today.year === year && today.month === month;

  const getHoliday = (day: number) => holidays.find((h) => h.date === day);

  const days = [];

  // 앞부분 빈 칸 채우기
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(<S.DayCell key={`empty-${i}`} $isEmpty />);
  }

  // 실제 날짜 채우기
  for (let d = 1; d <= daysInMonth; d++) {
    const holiday = getHoliday(d);

    const currentDayOfWeek = (firstDayIndex + d - 1) % 7;
    const isSunday = currentDayOfWeek === 0;
    const isSaturday = currentDayOfWeek === 6;

    days.push(
      <S.DayCell
        key={d}
        $isToday={isThisMonth && today.day === d}
        $isHoliday={!!holiday}
        $isSunday={isSunday}     // 일요일 여부 전달
        $isSaturday={isSaturday} // 토요일 여부 전달
      >
        <span>{d}</span> {/* flex 구조에서 텍스트가 씹히지 않도록 span으로 감쌈 */}
        {holiday && <S.Tooltip>{holiday.name}</S.Tooltip>}
        {holiday?.name === "성탄절" && <span style={{ marginTop: "4px" }}>🎄</span>}
      {holiday?.name.includes("추석") && <span>🌕</span>}
      </S.DayCell>
    );
  }
    
    return(
        <>
    <S.CalTopMargin >
      <S.CalendarWrapper>
        <S.CalHeader>{year}년 {month}월</S.CalHeader>
        <S.Grid>
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <S.DayName key={day}>{day}</S.DayName>
          ))}
          {days}
        </S.Grid>
        
      </S.CalendarWrapper>  
      </S.CalTopMargin>  
        </>
    )
}