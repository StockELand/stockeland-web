"use client";
import Button from "@/components/ui/Button";
import useSSE from "@/hooks/useSSE";
import { useEffect } from "react";
import { mutate } from "swr";

export default function PredictionProcessButton() {
  const { startSSE, status, setStatus, progress } = useSSE(
    "http://localhost:8080/event/predict/progress"
  );

  const startPredicting = async () => {
    try {
      startSSE();
      await fetch("http://localhost:8080/predict", { method: "POST" });
    } catch (error) {
      console.error("Error start Predict:", error);
    }
  };

  useEffect(() => {
    startSSE();
  }, [startSSE]);

  useEffect(() => {
    if (status === "Completed") {
      async function mutatePredictions() {
        await mutate("http://localhost:8080/stock/predictions");
        await mutate("http://localhost:8080/stock/all");
        setStatus("Pending");
      }
      mutatePredictions();
    }
  }, [status, setStatus]);

  const renderButtonText = () => {
    if (status === "Completed") return "Predict completed";
    if (status === "Pending") return "Start predict";
    return `${status}... ${progress}%`;
  };

  return (
    <Button onClick={startPredicting} className="overflow-x-auto relative">
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
