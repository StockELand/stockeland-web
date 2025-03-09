"use client";
import Button from "@/components/ui/Button";
import { API } from "@/constants/api";
import useSSE from "@/hooks/useSSE";
import { refreshPredictionLog } from "@/services/predict/useGetPredictionLog";
import { refreshPredictions } from "@/services/predict/useGetPredictions";
import { usePostPredict } from "@/services/predict/usePostPredict";
import { refreshStockAll } from "@/services/stock/useGetStockAll";
import { useCallback, useEffect } from "react";
import { refreshStockPredictions } from "@/services/stock/useGetStockPredictions";
import clsx from "clsx";
import { formatDate } from "@l11040/eland-datepicker";

interface PredictionProcessButtonProps {
  date?: Date | null;
}

export default function PredictionProcessButton({
  date,
}: PredictionProcessButtonProps) {
  const { startSSE, status, setStatus, progress } = useSSE(
    API.PREDICT.PROGRESS
  );
  const { startPredict } = usePostPredict();

  const handlerStartPredict = useCallback(() => {
    startSSE();
    startPredict({ date: formatDate(date) });
  }, [startSSE, startPredict, date]);

  useEffect(() => {
    if (status === "Completed") {
      (async () => {
        await Promise.all([
          refreshPredictions({ date: formatDate(date) }),
          refreshPredictionLog({ date: formatDate(new Date()) }),
          refreshStockPredictions(),
          refreshStockAll(),
        ]);
        setStatus("Pending");
      })();
    }
  }, [status, setStatus, date]);

  const renderButtonText = useCallback(() => {
    if (status === "Completed") return "Predict completed";
    if (status === "Pending") return "Start predict";
    return `${status}... ${progress}%`;
  }, [status, progress]);

  return (
    <Button
      onClick={handlerStartPredict}
      className="overflow-x-auto relative min-w-40"
    >
      <div
        className={clsx(
          "absolute inset-0 bg-signature text-xs h-full text-[#181a20] text-center leading-none transition-all",
          { hidden: status === "Completed" || status === "Pending" }
        )}
        style={{ width: `${progress}%` }}
      />
      <div className="relative z-10 text-[#181a20]">{renderButtonText()}</div>
    </Button>
  );
}
