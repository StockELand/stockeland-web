import { YEAR_RANGE } from "../constants";

/**
 * 주어진 월의 모든 날짜를 가져오는 함수
 */
export function getMonthDays(date: Date): (Date | null)[] {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const days = [];

  // 첫 주 시작 전 빈 칸 채우기
  for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
    days.push(null);
  }

  // 현재 월의 날짜 추가
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), i));
  }

  return days;
}

/**
 * 연도 범위 생성 함수 (현재 연도 기준 ±YEAR_RANGE)
 */
export function getYearRange(): number[] {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: YEAR_RANGE * 2 },
    (_, i) => currentYear - YEAR_RANGE + i
  );
}

/**
 * 날짜가 같은지 비교하는 함수
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
