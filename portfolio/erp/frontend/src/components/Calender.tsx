"use client";

import { useState, useEffect } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { Holiday } from "../app/types/holiday";
import { fetchHolidays } from "../app/api/holidays";
import ScheduleModal from "./modal/ScheduleModal";
import styles from "./Calender.module.css";

// 1. 일정 타입 정의
interface Schedule {
  id: string; 
  date: number;
  content: string; 
  status: "대기" | "진행" | "완료";
  createdAt: string;
}

export const Calender = ({
  year = Temporal.Now.plainDateTimeISO().year,
  month = Temporal.Now.plainDateISO().month,
}: {
  year?: number;
  month?: number;
}) => {
  // 1. 해당 연/월의 1일을 명시적으로 직접 생성
  const firstDayDate = Temporal.PlainDate.from({ year, month, day: 1 });
  
  // 2. 일요일(7)을 배열 인덱스(0)로 변환
  const firstDayIndex = firstDayDate.dayOfWeek === 7 ? 0 : firstDayDate.dayOfWeek;
  // 3. 이번 달의 총 일수 추출
  const daysInMonth = firstDayDate.daysInMonth;

  const [holidays, setHolidays] = useState<Holiday[]>([]);

  // 모달 관련 상태
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchHolidays(year, month).then(setHolidays);
  }, [year, month]);

  const today = Temporal.Now.plainDateISO();
  const isThisMonth = today.year === year && today.month === month;

  const getHoliday = (day: number) => holidays.find((h) => h.date === day);

  const handleDayClick = (day: number) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const days = [];

  // 앞부분 빈 칸 채우기
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(<div key={`empty-${i}`} className={styles.emptyCell} />);
  }

  // 실제 날짜 채우기
  for (let d = 1; d <= daysInMonth; d++) {
    const holiday = getHoliday(d);
    const currentDayOfWeek = (firstDayIndex + d - 1) % 7;
    const isSunday = currentDayOfWeek === 0;
    const isSaturday = currentDayOfWeek === 6;
    const isToday = isThisMonth && today.day === d;

    // 해당 날짜에 등록된 일정이 있는지 확인 (블루 점 표시용)
    const hasSchedule = schedules.some((sch) => sch.date === d);  

    // 클래스 조합 생성
    let cellClassName = styles.dayCell;
    if (isToday) cellClassName += ` ${styles.todayCell}`;

    let numberClassName = styles.dayNumber;
    if (holiday || isSunday) {
      numberClassName += ` ${styles.redText}`;
    } else if (isSaturday) {
      numberClassName += ` ${styles.blueText}`;
    }

    days.push(
      <div
        key={d}
        className={cellClassName}
        onClick={() => handleDayClick(d)}
      >
        <span className={numberClassName}>{d}</span>
        {holiday && <span className={styles.tooltip}>{holiday.name}</span>}
        
        <div className={styles.emojiContainer}>
          {holiday?.name === "성탄절" && <span>🎄</span>}
          {holiday?.name.includes("추석") && <span>🌕</span>}
        </div>

        {hasSchedule && <div className={styles.scheduleDot} />}
      </div>
    );
  }
    
  return (
    <>
      <div className={styles.calTopMargin}>
        <div className={styles.calendarWrapper}>
          <h2 className={styles.calHeader}>{year}년 {month}월</h2>
          <div className={styles.grid}>
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <div key={day} className={styles.dayName}>{day}</div>
            ))}
            {days}
          </div>
        </div>  
      </div> 

      {/* 스케줄 모달 컴포넌트 렌더링 */} 
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        month={month}
        selectedDate={selectedDate}
        schedules={schedules}
        setSchedules={setSchedules}      
      />
    </>
  );
};