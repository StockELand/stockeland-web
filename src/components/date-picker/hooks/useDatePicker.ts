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
  const [currentMonth, setCurrentMonth] = useState(
    externalSelectedDate || new Date()
  );
  const [view, setView] = useState<ViewType>("date");

  // ✅ 외부에서 전달된 selectedDate가 변경될 때 currentMonth 업데이트
  useEffect(() => {
    if (externalSelectedDate) {
      setSelectedDate(externalSelectedDate);
      setCurrentMonth(
        new Date(
          externalSelectedDate.getFullYear(),
          externalSelectedDate.getMonth(),
          1
        )
      );
    }
  }, [externalSelectedDate]);

  // ✅ currentMonth 변경 시 onDateRangeChange 호출
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
