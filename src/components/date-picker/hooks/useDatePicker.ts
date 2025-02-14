// hooks.ts
import { useState } from "react";
import { isSameDay } from "../utils/dateUtils";
import { UseDatePickerProps, ViewType } from "../types";

export const useDatePicker = ({
  selectedDate: externalSelectedDate,
  displayDateGroups = [],
  doubleCalendar = false,
}: UseDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    externalSelectedDate || new Date()
  );
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const [view, setView] = useState<ViewType>("date");

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
    for (const group of displayDateGroups) {
      if (group.dates.some((d) => isSameDay(d, date))) {
        return { type: group.type, color: group.color };
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
