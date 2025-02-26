// hooks/useRangeDatePickerState.ts
import { useState } from "react";
import { parseLocalDate, formatDate } from "../utils/formatUtils";
import { DateRangeType } from "../types";

export const useRangeDatePickerState = (
  initialStartDate: Date | null = null,
  initialEndDate: Date | null = null
) => {
  const [rangeStart, setRangeStart] = useState<Date | null | undefined>(
    initialStartDate
  );
  const [rangeEnd, setRangeEnd] = useState<Date | null | undefined>(
    initialEndDate
  );

  const [inputValue, setInputValue] = useState<string>(
    initialStartDate && initialEndDate
      ? `${formatDate(initialStartDate) || ""} ~ ${
          formatDate(initialEndDate) || ""
        }`
      : ""
  );

  const handleRangeChange = (range: DateRangeType) => {
    const { startDate, endDate } = range;

    setRangeStart(startDate || null);
    setRangeEnd(endDate || null);

    const startText = startDate ? formatDate(startDate) : "";
    const endText = endDate ? formatDate(endDate) : "";
    setInputValue(`${startText}${startText && endText ? " ~ " : ""}${endText}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const [startString, endString] = value.split("~").map((v) => v.trim());
    const parsedStart = parseLocalDate(startString);
    const parsedEnd = parseLocalDate(endString);

    if (parsedStart && parsedEnd) {
      handleRangeChange({ startDate: parsedStart, endDate: parsedEnd });
    }
  };

  return {
    rangeDate: { startDate: rangeStart, endDate: rangeEnd },
    inputValue,
    setInputValue,
    handleRangeChange,
    handleInputChange,
  };
};
