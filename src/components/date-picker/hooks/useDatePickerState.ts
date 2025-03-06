// hooks/useDatePickerState.ts
import { useCallback, useEffect, useState } from "react";
import { parseLocalDate, formatDate } from "../utils/formatUtils";

export const useDatePickerState = (initialDate: Date | null = null) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [inputValue, setInputValue] = useState<string>(
    formatDate(initialDate) || ""
  );

  useEffect(() => {
    setInputValue(selectedDate ? formatDate(selectedDate) || "" : "");
  }, [selectedDate]);

  const handleDateChange = useCallback((date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      const parsedDate = parseLocalDate(value);
      if (parsedDate) {
        setSelectedDate(parsedDate);
      }
    },
    []
  );

  return {
    selectedDate,
    inputValue,
    setInputValue,
    handleDateChange,
    handleInputChange,
  };
};
