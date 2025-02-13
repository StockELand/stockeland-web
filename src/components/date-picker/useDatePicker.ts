// hooks.ts
import { useState } from "react";
import { isSameDay } from "./utils";
import { UseDatePickerProps, ViewType } from "./types";

export const useDatePicker = ({
  highlightedDates = [],
  displayDateGroups = [],
  doubleCalendar = false,
}: UseDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
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

  const isHighlighted = (date: Date) => {
    return highlightedDates.some((d) => isSameDay(d, date));
  };

  return {
    selectedDate,
    setSelectedDate,
    currentMonth,
    setCurrentMonth,
    isHighlighted,
    doubleCalendar,
    goToPreviousMonth,
    getDisplayTypeAndColor,
    goToNextMonth,
    view,
    setView,
  };
};
