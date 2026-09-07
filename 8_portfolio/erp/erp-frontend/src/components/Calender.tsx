"use client";

import {useState, useEffect} from "react";
import { Temporal } from "@js-temporal/polyfill";
import * as S from "@/assets/css/Style.style";
import {Holiday } from "@/app/types/holiday";
import {fetchHolidays } from "@/app/api/holidays";

export default function Calender(

 
{year = Temporal.Now.plainDateISO().year,
month = Temporal.Now.plainDateISO().month,  
}:
{year?:number; month?:number}){
//Temporal에서는 1월이 1, 12월이 12입니다


// 입력받은 연/월을 기준으로 Temporal 객체 생성
const targetYearMonth = 
Temporal.PlainYearMonth.from({year, month});
// 해당 월의 1일 날짜 정보 추출
const firstDayDate =
targetYearMonth.toPlainDate({day:1});
/*
Temporal의 dayOfWeek는 1(월요일) ~ 7(일요일)입니다
일요일부터 시작하는 달력 그리드를 위해 0(일) ~ 6(토) 인덱스로 변환합니다.
*/
const firstDayIndex = firstDayDate.dayOfWeek === 7 ? 0 : firstDayDate.dayOfWeek;
// 해당 월의 마지막 날짜(총 일수)를 직관적으로 가져옵니다.
const daysInMonth = targetYearMonth.daysInMonth;

const[holidays, setHolidays] = useState<Holiday[]>([]);

useEffect(() => {
    fetchHolidays(year, month).then(setHolidays);
},[year, month]);

//오늘 날짜 정보
const today = Temporal.Now.plainDateISO();
const isThisMonth = today.year === year && today.month === month;
const getHoliday = (day:number) => holidays.find((h) => h.date === day);
const days = [];

//달력 빈칸 만들기
for(let i=0; i < firstDayIndex; i++){
days.push(<S.DayCell key={`empty-${i}`} $isEmpty/>)
}

//실제 날짜 채우기
for(let d =1; d <= daysInMonth; d++) {
    const holiday = getHoliday(d);

const currentDayOfWeek = (firstDayIndex + d - 1) % 7;
const isSunday = currentDayOfWeek === 0;
const isSaturday = currentDayOfWeek === 6;



    days.push(
<S.DayCell
key={d}
$isToday={isThisMonth && today.day === d}
$isHoliday={!!holiday}
$isSunday={isSunday}
$isSaturday={isSaturday}
>
<span>{d}</span>
{holiday && <S.Tooltip>{holiday.name}</S.Tooltip>}
{holiday?.name === "성탄절" && <span>🎄</span>}
{holiday?.name.includes("추석") && <span>🌕</span>}
</S.DayCell>        
    )
}

return(
        <>
        <S.CalTopMargin>
            <S.CalenderWrapper>
<S.CalHeader>
{year}년{month}월
</S.CalHeader> 
<S.Grid>
{["일","월","화","수","목","금","토"].map((day) =>(
<S.DayName key={day}>
    {day}
</S.DayName>    
))}
{days}
</S.Grid>               
            </S.CalenderWrapper>
        </S.CalTopMargin>
        </>
    )
}