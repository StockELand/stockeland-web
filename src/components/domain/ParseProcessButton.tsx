"use client";
import Button from "@/components/ui/Button";
import useSSE from "@/hooks/useSSE";
import { useEffect } from "react";
import clsx from "clsx";
import { usePostParse } from "@/services/parse/usePostParse";
import { API } from "@/constants/api";
import { refreshParseData } from "@/services/parse/useGetParseData";
import { formatDate } from "../date-picker";
import { refreshParseLog } from "@/services/parse/useGetParseLog";
import { refreshStockAll } from "@/services/stock/useGetStockAll";

interface ParseProcessButtonProps {
  startDate?: Date | null;
  endDate?: Date | null;
}

export default function ParseProcessButton({
  startDate,
  endDate,
}: ParseProcessButtonProps) {
  const { startSSE, setStatus, status, progress } = useSSE(API.PARSE.PROGRESS);

  const { startParse } = usePostParse();

  const handlerStartParse = () => {
    startSSE();
    startParse({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

  useEffect(() => {
    if (status === "Completed") {
      async function mutatePredictions() {
        await refreshParseData();
        await refreshParseLog({ date: formatDate(new Date()) });
        await refreshStockAll();
        setStatus("Pending");
      }
      mutatePredictions();
    }
  }, [status]);

  const renderButtonText = () => {
    if (status === "Completed") return "Parse completed";
    if (status === "Pending") return "Start parse";
    return `${status}... ${progress}%`;
  };

  return (
    <Button
      onClick={handlerStartParse}
      className="overflow-x-auto relative min-w-40"
    >
      <div
        className={clsx(
          "absolute inset-0 bg-rise text-xs h-full text-inverseForground text-center leading-none transition-all",
          { hidden: status === "Completed" || status === "Pending" }
        )}
        style={{ width: `${progress}%` }}
      />
      <div className="relative z-10">{renderButtonText()}</div>
    </Button>
  );
}
