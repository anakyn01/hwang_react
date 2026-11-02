"use client";

import { useState, useEffect } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { Holiday } from "@/app/types/holiday";
import { fetchHolidays } from "@/app/api/holidays";
import { Schedule } from "@/components/modal/ScheduleModal";
import styles from "@/assets/sass/main.module.scss";

interface CalenderProps {
  year?: number;
  month?: number;
  schedules?: Schedule[];
  onDayClick?: (day: number, year: number, month: number) => void;
}

export const Calender = ({
  year = Temporal.Now.plainDateTimeISO().year,
  month = Temporal.Now.plainDateISO().month,
  schedules = [],
  onDayClick,
}: CalenderProps) => {
  const firstDayDate = Temporal.PlainDate.from({ year, month, day: 1 });
  const firstDayIndex = firstDayDate.dayOfWeek === 7 ? 0 : firstDayDate.dayOfWeek;
  const daysInMonth = firstDayDate.daysInMonth;

  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    fetchHolidays(year, month).then(setHolidays);
  }, [year, month]);

  const today = Temporal.Now.plainDateISO();
  const isThisMonth = today.year === year && today.month === month;

  const getHoliday = (day: number) => holidays.find((h) => h.date === day);

  const days = [];

  // 1. 앞부분 빈 칸 채우기
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(<div key={`empty-${i}`} className={styles.emptyCell} />);
  }

  // 2. 실제 날짜 채우기
  for (let d = 1; d <= daysInMonth; d++) {
    const holiday = getHoliday(d);
    const currentDayOfWeek = (firstDayIndex + d - 1) % 7;
    const isSunday = currentDayOfWeek === 0;
    const isSaturday = currentDayOfWeek === 6;
    const isToday = isThisMonth && today.day === d;

    // 💡 해당 연/월/일에 등록된 일정 필터링
    const daySchedules = schedules.filter(
      (sch) =>
        (sch.year ? sch.year === year : true) &&
        (sch.month ? sch.month === month : true) &&
        sch.date === d
    );

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
        onClick={() => onDayClick && onDayClick(d, year, month)}
      >
        <span className={numberClassName}>{d}</span>
        {holiday && <span className={styles.tooltip}>{holiday.name}</span>}
        
        <div className={styles.emojiContainer}>
          {holiday?.name === "성탄절" && <span>🎄</span>}
          {holiday?.name.includes("추석") && <span>🌕</span>}
        </div>

        {/* 💡 달력 칸 내부 일정 뱃지 표시 */}
        <div className={styles.calendarScheduleList}>
          {daySchedules.slice(0, 2).map((sch) => {
            const badgeBg = sch.status === "완료" ? "rgba(52, 199, 89, 0.15)" : "rgba(0, 102, 204, 0.12)";
            const badgeColor = sch.status === "완료" ? "#248A3D" : "#0066CC";

            return (
              <div
                key={sch.id}
                className={styles.scheduleBadge}
                style={{ backgroundColor: badgeBg, color: badgeColor }}
              >
                {sch.title || sch.content}
              </div>
            );
          })}
          {daySchedules.length > 2 && (
            <span style={{ fontSize: "8px", color: "#86868B", textAlign: "center" }}>
              +{daySchedules.length - 2}
            </span>
          )}
        </div>
      </div>
    );
  }

  // 3. 뒷부분 남은 칸 채우기 (42칸 유지)
  const remainingCells = 42 - days.length;
  for (let i = 0; i < remainingCells; i++) {
    days.push(<div key={`empty-end-${i}`} className={styles.emptyCell} />);
  }
    
  return (
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
  );
};