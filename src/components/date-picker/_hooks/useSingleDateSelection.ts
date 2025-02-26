import { useEffect, useState } from "react";
import { isSameDay } from "../utils/dateUtils";

export const useSingleDateSelection = (externalDate: Date | null) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    externalDate || new Date()
  );

  useEffect(() => {
    if (
      externalDate &&
      (!selectedDate || !isSameDay(externalDate, selectedDate))
    ) {
      setSelectedDate(externalDate);
    }
  }, [externalDate, selectedDate]);

  return { selectedDate, setSelectedDate };
};
