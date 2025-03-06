import { useEffect, useState, useCallback } from "react";
import { DateRangeType } from "../types";

export const useCalendarNavigation = (
  initialDate: Date = new Date(),
  doubleCalendar: boolean = false,
  onMonthRangeChange?: ({ startDate, endDate }: DateRangeType) => void
) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);

  useEffect(() => {
    if (!onMonthRangeChange) return;

    const startDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const endDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + (doubleCalendar ? 2 : 1),
      0
    );

    onMonthRangeChange({ startDate, endDate });
  }, [currentMonth, doubleCalendar, onMonthRangeChange]);

  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
    );
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
    );
  }, []);

  return { currentMonth, setCurrentMonth, goToPreviousMonth, goToNextMonth };
};
