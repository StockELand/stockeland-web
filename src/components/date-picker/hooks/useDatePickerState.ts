// hooks/useDatePickerState.ts
import { useState } from "react";
import { parseLocalDate, formatDate } from "../utils/formatUtils";

export const useDatePickerState = (initialDate: Date | null = null) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [inputValue, setInputValue] = useState<string>(
    formatDate(initialDate) || ""
  );

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setInputValue(formatDate(date) || "");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const parsedDate = parseLocalDate(e.target.value);
    if (parsedDate) setSelectedDate(parsedDate);
  };

  return {
    selectedDate,
    inputValue,
    setInputValue,
    handleDateChange,
    handleInputChange,
    setSelectedDate,
  };
};
