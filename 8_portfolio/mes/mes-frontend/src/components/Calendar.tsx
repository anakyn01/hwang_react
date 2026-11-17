"use client";

import {useState, useEffect} from "react";
import { Temporal } from "@js-temporal/polyfill";
import { Holiday } from "../app/type/holiday";
import { fetchHolidays } from "../app/api/holidays";
import * as S from "@/assets/css/Style.style";
import ScheduleModal from "./modal/ScheduleModal";

//1. 일정 타입 정의 추가
interface Schedule {
  id:string; date:number;
  content:string; 
  status:"대기"|"진행"|"완료";
  createdAt:string;
}
 
export const Calendar = ({
  year = Temporal.Now.plainDateTimeISO().year,
  month = Temporal.Now.plainDateISO().month, // 현재 달(예: 9월)을 자동으로 가져오도록 추가    
}:{year?:number, month?: number;}) => {
  
  // 💡 [추가] 사용자가 좌우 화살표로 달력을 넘길 수 있도록 연도/월 상태(state)를 관리합니다.
  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);

  const [holidays, setHolidays] = useState<Holiday[]>([]);

  //모달에 관련된 추가
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 💡 [변경] props나 상태가 바뀔 때 해당 연도의 공휴일을 불러오도록 currentYear 연동
  useEffect(() => {
    fetchHolidays(currentYear).then(setHolidays);
  }, [currentYear]);

  const today = Temporal.Now.plainDateISO();

  // 💡 [추가] 이전 달과 다음 달의 연도/월을 계산하는 헬퍼 함수
  const getPrevMonth = (y: number, m: number) => {
    if (m === 1) return { year: y - 1, month: 12 };
    return { year: y, month: m - 1 };
  };

  const getNextMonth = (y: number, m: number) => {
    if (m === 12) return { year: y + 1, month: 1 };
    return { year: y, month: m + 1 };
  };

  const prevYM = getPrevMonth(currentYear, currentMonth);
  const nextYM = getNextMonth(currentYear, currentMonth);

  // 💡 [추가] 화살표 클릭 시 월을 이동시키는 핸들러 함수
  const handlePrevMonthClick = () => {
    const prev = getPrevMonth(currentYear, currentMonth);
    setCurrentYear(prev.year);
    setCurrentMonth(prev.month);
  };

  const handleNextMonthClick = () => {
    const next = getNextMonth(currentYear, currentMonth);
    setCurrentYear(next.year);
    setCurrentMonth(next.month);
  };

  // 💡 [추가] 특정 연/월의 달력 그리드 배열을 만들어주는 공통 렌더링 함수
  const renderCalendarGrid = (targetYear: number, targetMonth: number, isBlurred: boolean = false) => {
    const firstDayDate = Temporal.PlainDate.from({ year: targetYear, month: targetMonth, day: 1 });
    const firstDayIndex = firstDayDate.dayOfWeek === 7 ? 0 : firstDayDate.dayOfWeek;
    const daysInMonth = firstDayDate.daysInMonth;
    const isThisMonth = today.year === targetYear && today.month === targetMonth;

    const days = [];

    // 앞부분 빈 칸 채우기
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<S.DayCell key={`empty-${targetYear}-${targetMonth}-${i}`} $isEmpty />);
    }

    // 실제 날짜 채우기
    for (let d = 1; d <= daysInMonth; d++) {
      const holiday = holidays.find((h) => h.date === d && targetMonth === currentMonth); // 중앙 달력 기준 공휴일 매핑
      const currentDayOfWeek = (firstDayIndex + d - 1) % 7;
      const isSunday = currentDayOfWeek === 0;
      const isSaturday = currentDayOfWeek === 6;

      // 해당 날짜에 등록된 일정이 있는지 확인 (파란 점 표시용 - 중앙 달력만 공유)
      const hasSchedule = !isBlurred && schedules.some((sch) => sch.date === d);  

      days.push(
        <S.DayCell
          key={`${targetYear}-${targetMonth}-${d}`}
          $isToday={isThisMonth && today.day === d}$isHoliday={!isBlurred && !!holiday}
          $isSunday={isSunday}$isSaturday={isSaturday} 
          // 💡 블러 처리된 좌우 달력은 클릭해도 메인 일정 모달이 뜨지 않도록 방지
          onClick={() => {
            if (!isBlurred) hanldleDayClick(d);
          }}
          style={isBlurred ? { cursor: "default" } : {}}
        >
          <span>{d}</span>
          {!isBlurred && holiday && <S.Tooltip>{holiday.name}</S.Tooltip>}
          {!isBlurred && holiday?.name === "성탄절" && <span style={{ marginTop: "4px" }}>🎄</span>}
          {!isBlurred && holiday?.name.includes("추석") && <span>🌕</span>}
          {!isBlurred && hasSchedule && <S.ScheduleDot/>}
        </S.DayCell>
      );
    }

    return (
      <S.CalendarWrapper $isBlurred={isBlurred}>
        <S.CalHeader>{targetYear}년 {targetMonth}월</S.CalHeader>
        <S.Grid>
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <S.DayName key={day}>{day}</S.DayName>
          ))}
          {days}
        </S.Grid>
      </S.CalendarWrapper>
    );
  };

  const hanldleDayClick = (day: number) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };
    
  return(
    <>
      <S.CalTopMargin>
        {/* 💡 [추가] 좌우 화살표와 3분할 뷰를 감싸는 컨테이너 구조 */}
        <S.CalendarAll>
          
          {/* 왼쪽 화살표 버튼 */}
          <S.Button $variant="leftArrow"
            onClick={handlePrevMonthClick}           
          >
            ◀
          </S.Button>

          {/* 1. 왼쪽 달력 (이전 달 - 블러 처리) */}
          <S.LeftDirection>
            {renderCalendarGrid(prevYM.year, prevYM.month, true)}
          </S.LeftDirection>

          {/* 2. 중앙 달력 (현재 선택된 달 - 메인 조작 및 일정 등록 가능) */}
          <S.CurrentDirection>
            {renderCalendarGrid(currentYear, currentMonth, false)}
          </S.CurrentDirection>

          {/* 3. 오른쪽 달력 (다음 달 - 블러 처리) */}
          <S.RightDirection>
            {renderCalendarGrid(nextYM.year, nextYM.month, true)}
          </S.RightDirection>

          {/* 오른쪽 화살표 버튼 */}
          <S.Button
            onClick={handleNextMonthClick}
  $variant="rightArrow"
          >
            ▶
          </S.Button>

        </S.CalendarAll>
      </S.CalTopMargin> 

      {/* 분리한 스케줄 모달 컴포넌트 렌더링 */} 
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        month={currentMonth}
        selectedDate={selectedDate}
        schedules={schedules}
        setSchedules={setSchedules}      
      />
    </>
  );
};