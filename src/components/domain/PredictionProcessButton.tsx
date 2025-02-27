"use client";
import Button from "@/components/ui/Button";
import { API } from "@/constants/api";
import useSSE from "@/hooks/useSSE";
import { refreshPredictionLog } from "@/services/predict/useGetPredictionLog";
import { refreshPredictions } from "@/services/predict/useGetPredictions";
import { usePostPredict } from "@/services/predict/usePostPredict";
import { refreshStockAll } from "@/services/stock/useGetStockAll";
import { useEffect } from "react";
import { formatDate } from "../date-picker";
import { refreshStockPredictions } from "@/services/stock/useGetStockPredictions";

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

  const handlerStartPredict = () => {
    startSSE();
    startPredict({ date: formatDate(date) });
  };

  useEffect(() => {
    if (status === "Completed") {
      async function mutatePredictions() {
        await refreshPredictions({ date: formatDate(date) });
        await refreshPredictionLog({ date: formatDate(new Date()) });
        await refreshStockPredictions();
        await refreshStockAll();
        setStatus("Pending");
      }
      mutatePredictions();
    }
  }, [status]);

  const renderButtonText = () => {
    if (status === "Completed") return "Predict completed";
    if (status === "Pending") return "Start predict";
    return `${status}... ${progress}%`;
  };

  return (
    <Button
      onClick={handlerStartPredict}
      className="overflow-x-auto relative min-w-40"
    >
      {status !== "Completed" && status !== "Pending" && (
        <div
          className="absolute inset-0 bg-rise text-xs h-full text-inverseForground text-center leading-none"
          style={{ width: `${progress}%` }}
        />
      )}
      <div className="relative z-10">{renderButtonText()}</div>
    </Button>
  );
}
