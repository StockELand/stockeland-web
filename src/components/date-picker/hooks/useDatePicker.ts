// hooks.ts
import { useEffect, useState } from "react";
import { isSameDay } from "../utils/dateUtils";
import { UseDatePickerProps, ViewType } from "../types";

export const useDatePicker = ({
  selectedDate: externalSelectedDate,
  displayDateGroups = {},
  doubleCalendar = false,
  onDateRangeChange,
}: UseDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    externalSelectedDate || new Date()
  );
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const [view, setView] = useState<ViewType>("date");

  useEffect(() => {
    if (externalSelectedDate) setSelectedDate(externalSelectedDate);
  }, [externalSelectedDate]);

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

    if (onDateRangeChange && sDate && eDate) {
      onDateRangeChange?.({ startDate: sDate, endDate: eDate });
    }
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

  const getDisplayTypeAndColor = (date: Date) => {
    for (const [type, group] of Object.entries(displayDateGroups)) {
      if (group.dates.some((d) => isSameDay(new Date(d), date))) {
        return { type, color: group.color };
      }
    }
    return null;
  };

  return {
    selectedDate,
    setSelectedDate,
    currentMonth,
    setCurrentMonth,
    doubleCalendar,
    goToPreviousMonth,
    getDisplayTypeAndColor,
    goToNextMonth,
    view,
    setView,
  };
};
