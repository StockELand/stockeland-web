// src/hooks/useRangeDateSelection.ts
import { useEffect, useState } from "react";
import { isBefore, isWithinInterval } from "../utils/dateUtils";
import { DateRangeType } from "../types";

export const useRangeDateSelection = (
  externalRangeDate?: DateRangeType,
  onRangeChange?: ({ startDate, endDate }: DateRangeType) => void
) => {
  const [rangeStart, setRangeStart] = useState<Date | null | undefined>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null | undefined>(null);

  const handleRangeSelect = (date: Date) => {
    if (rangeStart && !rangeEnd) {
      if (isBefore(date, rangeStart)) {
        setRangeStart(date);
        setRangeEnd(rangeStart);
        onRangeChange?.({ startDate: date, endDate: rangeStart });
      } else {
        setRangeEnd(date);
        onRangeChange?.({ startDate: rangeStart, endDate: date });
      }
    } else {
      setRangeStart(date);
      setRangeEnd(null);
      onRangeChange?.({ startDate: date, endDate: null });
    }
  };

  useEffect(() => {
    if (externalRangeDate) {
      setRangeStart(externalRangeDate.startDate);
      setRangeEnd(externalRangeDate.endDate);
    }
  }, [externalRangeDate]);

  const isDateInRange = (date: Date) =>
    rangeStart && rangeEnd
      ? isWithinInterval(date, { start: rangeStart, end: rangeEnd })
      : false;

  return { rangeStart, rangeEnd, handleRangeSelect, isDateInRange };
};
