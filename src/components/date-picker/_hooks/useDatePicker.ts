// hooks.ts
import { useState } from "react";
import { isSameDay } from "../utils/dateUtils";
import { UseDatePickerProps, ViewType } from "../types";
import { useCalendarNavigation } from "./useCalendarNavigation";
import { useSingleDateSelection } from "./useSingleDateSelection";
import { useRangeDateSelection } from "./useRangeDateSelection";

export const useDatePicker = ({
  selectedDate: externalDate,
  displayDateGroups = {},
  enableRange = false,
  doubleCalendar = false,
  onRangeChange,
  onMonthRangeChange,
  onChange,
  rangeDate,
}: UseDatePickerProps) => {
  const [view, setView] = useState<ViewType>("date");
  const { selectedDate, setSelectedDate } = useSingleDateSelection(
    externalDate || new Date()
  );
  const { currentMonth, setCurrentMonth, goToNextMonth, goToPreviousMonth } =
    useCalendarNavigation(
      externalDate || new Date(),
      doubleCalendar,
      onMonthRangeChange
    );

  const { rangeStart, rangeEnd, handleRangeSelect, isDateInRange } =
    useRangeDateSelection(rangeDate, onRangeChange);

  const handleDateSelect = (date: Date) => {
    if (enableRange) {
      handleRangeSelect(date);
    } else {
      setSelectedDate(date);
    }
    onChange?.(date);
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
    rangeDate: { startDate: rangeStart, endDate: rangeEnd },
    isDateInRange,
    handleDateSelect,
  };
};
