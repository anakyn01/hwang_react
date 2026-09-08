// src/app/api/holidays.ts
import { Holiday } from "@/app/types/holiday";

// 임시 공휴일 데이터 (현재 2026년 9월 기준으로 작성)
const mockHolidays: Record<string, Holiday[]> = {
  "2026-9": [
    { date: 24, name: "추석" },
    { date: 25, name: "추석" },
    { date: 26, name: "추석" }
  ],
  "2026-10": [
    { date: 3, name: "개천절" },
    { date: 9, name: "한글날" }
  ],
  "2026-12": [
    { date: 25, name: "성탄절" }
  ]
};

export const fetchHolidays = async (year: number, month: number): Promise<Holiday[]> => {
  // 실제 API 통신을 하는 것처럼 살짝 지연 효과를 줌 (필요 시 삭제 가능)
  await new Promise((resolve) => setTimeout(resolve, 100));

  const key = `${year}-${month}`;
  return mockHolidays[key] || [];
};