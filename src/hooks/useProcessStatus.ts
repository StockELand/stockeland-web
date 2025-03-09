"use client";
import { useState, useCallback } from "react";
import {
  DateRangeType,
  DisplayDateGroup,
  formatDate,
} from "@l11040/eland-datepicker";
import { useGetPredictionLog } from "@/services/predict/useGetPredictionLog";
import {
  GetPredictionStatusQuery,
  useGetPredictionStatus,
} from "@/services/predict/useGetPredictionStatus";
import { useGetPredictions } from "@/services/predict/useGetPredictions";
import {
  GetParseStatusQuery,
  useGetParseStatus,
} from "@/services/parse/useGetParseStatus";
import { useGetParseLog } from "@/services/parse/useGetParseLog";
import { useGetParseData } from "@/services/parse/useGetParseData";

const statusProcessing = (
  data: { [key: string]: DisplayDateGroup } | undefined
): { [key: string]: DisplayDateGroup } | undefined => {
  if (!data) return;
  return {
    ...data,
    success: { ...data.success, color: "signature" },
    fail: { ...data.fail, color: "fall" },
  };
};

export function usePredictProcessStatus(selectedDate: Date | null) {
  const [dateStrRange, setDateStrRange] = useState<GetPredictionStatusQuery>({
    startDate: null,
    endDate: null,
  });

  const formattedSelectedDate = selectedDate
    ? { date: formatDate(selectedDate) }
    : undefined;

  const { data: logs } = useGetPredictionLog(formattedSelectedDate);
  const { data } = useGetPredictions(formattedSelectedDate);
  const { data: status } = useGetPredictionStatus(dateStrRange);

  const setDateRange = useCallback(({ startDate, endDate }: DateRangeType) => {
    const formattedStart = formatDate(startDate);
    const formattedEnd = formatDate(endDate);

    setDateStrRange((prev) => {
      if (prev.startDate === formattedStart && prev.endDate === formattedEnd) {
        return prev;
      }
      return { startDate: formattedStart, endDate: formattedEnd };
    });
  }, []);

  return {
    data,
    logs,
    status: statusProcessing(status),
    setDateRange,
  };
}

export function useParseProcessStatus(selectedDate: Date | null) {
  const [dateStrRange, setDateStrRange] = useState<GetParseStatusQuery>({
    startDate: null,
    endDate: null,
  });

  const formattedSelectedDate = selectedDate
    ? { date: formatDate(selectedDate) }
    : undefined;

  const { data: logs } = useGetParseLog(formattedSelectedDate);
  const { data } = useGetParseData(formattedSelectedDate);
  const { data: status } = useGetParseStatus(dateStrRange);

  const setDateRange = useCallback(({ startDate, endDate }: DateRangeType) => {
    const formattedStart = formatDate(startDate);
    const formattedEnd = formatDate(endDate);

    setDateStrRange((prev) => {
      if (prev.startDate === formattedStart && prev.endDate === formattedEnd) {
        return prev; // 상태 변경 없음
      }
      return { startDate: formattedStart, endDate: formattedEnd };
    });
  }, []);

  return {
    data,
    logs,
    status: statusProcessing(status),
    setDateRange,
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { usePredictProcessStatus, useParseProcessStatus };
