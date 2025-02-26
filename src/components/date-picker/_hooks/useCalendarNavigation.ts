import { useEffect, useState } from "react";
import { DateRangeType } from "../types";

export const useCalendarNavigation = (
  initialDate: Date = new Date(),
  doubleCalendar: boolean = false,
  onMonthRangeChange?: ({ startDate, endDate }: DateRangeType) => void
) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);

  useEffect(() => {
    const sDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    let eDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    if (doubleCalendar) {
      eDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 2,
        0
      );
    }
    onMonthRangeChange?.({ startDate: sDate, endDate: eDate });
  }, [currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
    );
  };

  return { currentMonth, setCurrentMonth, goToPreviousMonth, goToNextMonth };
};
