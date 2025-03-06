import { useState, useMemo } from "react";
import { parseLocalDate, formatDate } from "../utils/formatUtils";
import { DateRangeType } from "../types";

export const useRangeDatePickerState = (
  initialStartDate: Date | null = null,
  initialEndDate: Date | null = null
) => {
  const [rangeDate, setRangeDate] = useState<DateRangeType>({
    startDate: initialStartDate,
    endDate: initialEndDate,
  });

  // ✅ `inputValue`를 `useMemo`로 최적화하여 불필요한 `setState` 방지
  const inputValue = useMemo(() => {
    const startText = rangeDate.startDate
      ? formatDate(rangeDate.startDate)
      : "";
    const endText = rangeDate.endDate ? formatDate(rangeDate.endDate) : "";
    return startText && endText
      ? `${startText} ~ ${endText}`
      : startText || endText;
  }, [rangeDate.startDate, rangeDate.endDate]);

  const handleRangeChange = (range: DateRangeType) => {
    setRangeDate(range);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (!value.includes("~")) return; // ✅ 구분자가 없으면 변경하지 않음

    const [startString, endString] = value.split("~").map((v) => v.trim());
    const parsedStart = parseLocalDate(startString);
    const parsedEnd = parseLocalDate(endString);

    // ✅ 유효한 날짜일 경우만 업데이트
    if (parsedStart && parsedEnd) {
      setRangeDate({ startDate: parsedStart, endDate: parsedEnd });
    }
  };

  return {
    rangeDate,
    inputValue,
    handleRangeChange,
    handleInputChange,
  };
};
