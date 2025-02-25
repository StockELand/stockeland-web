"use client";
import { useState } from "react";
import {
  DateRangeType,
  DisplayDateGroup,
  formatDate,
} from "@/components/date-picker";
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
  data["success"]["color"] = "#a6fc35";
  data["fail"]["color"] = "#F6465D";
  return data;
};

export function usePredictProcessStatus(selectedDate: Date | null) {
  const [dateStrRange, setDateStrRange] = useState<GetPredictionStatusQuery>({
    startDate: null,
    endDate: null,
  });

  const formatingSelectedDate = () => {
    return selectedDate ? { date: formatDate(selectedDate) } : undefined;
  };

  const { data: logs } = useGetPredictionLog(formatingSelectedDate());

  const { data } = useGetPredictions(formatingSelectedDate());

  const { data: status } = useGetPredictionStatus(dateStrRange);

  const setDateRange = ({ startDate, endDate }: DateRangeType) => {
    setDateStrRange({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

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

  const formatingSelectedDate = () => {
    return selectedDate ? { date: formatDate(selectedDate) } : undefined;
  };

  const { data: logs } = useGetParseLog(formatingSelectedDate());

  const { data } = useGetParseData(formatingSelectedDate());

  const { data: status } = useGetParseStatus(dateStrRange);

  const setDateRange = ({ startDate, endDate }: DateRangeType) => {
    setDateStrRange({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

  return {
    data,
    logs,
    status: statusProcessing(status),
    setDateRange,
  };
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { usePredictProcessStatus, useParseProcessStatus };
