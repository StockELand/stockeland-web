export const getMonthDays = (date: Date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const days = [];
  const firstDayIndex = firstDayOfMonth.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

  // 첫 주 이전 빈 칸 추가
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }

  // 현재 달의 날짜 추가
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), i));
  }

  return days;
};

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
