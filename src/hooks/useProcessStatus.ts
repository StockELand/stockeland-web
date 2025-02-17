"use client";
import useSWR from "swr";
import { useState } from "react";
import { DisplayDateGroup, formatDate } from "@/components/date-picker";

const statusProcessing = (
  data: { [key: string]: DisplayDateGroup } | undefined
): { [key: string]: DisplayDateGroup } | undefined => {
  if (!data) return;
  data["success"]["color"] = "#a6fc35";
  data["fail"]["color"] = "#F6465D";
  return data;
};

interface useProcessStatusProps {
  uri: "parse" | "predict";
  selectedDate: Date | null;
}

export default function useProcessStatus<T>({
  uri,
  selectedDate,
}: useProcessStatusProps) {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });

  const shouldFetch = dateRange.startDate && dateRange.endDate;

  const { data: logs } = useSWR<T[]>(
    selectedDate
      ? `http://localhost:8080/${uri}/logs?date=${formatDate(selectedDate)}`
      : null
  );

  const { data: status } = useSWR<{ [key: string]: DisplayDateGroup }>(
    shouldFetch
      ? `http://localhost:8080/${uri}/status?startDate=${
          dateRange.startDate && formatDate(dateRange.startDate)
        }&endDate=${dateRange.endDate && formatDate(dateRange.endDate)}`
      : null
  );

  const { data } = useSWR(
    selectedDate
      ? `http://localhost:8080/${uri}?date=${formatDate(selectedDate)}`
      : null
  );

  return {
    data,
    logs,
    status: statusProcessing(status),
    setDateRange,
  };
}
