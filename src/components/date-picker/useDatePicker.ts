// hooks.ts
import { useState } from "react";
import { isSameDay } from "./utils";
import { ViewType } from "./types";

export const useDatePicker = ({
  highlightedDates = [],
  doubleCalendar = false,
}: {
  highlightedDates?: Date[];
  doubleCalendar?: boolean;
}) => {
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
    goToNextMonth,
    view,
    setView,
  };
};
