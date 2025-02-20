"use client";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import useSSE from "@/hooks/useSSE";
import { useEffect } from "react";
import { mutate } from "swr";

export default function ManualRunCard() {
  const parse = useSSE("http://localhost:8080/event/parse/progress");

  const predict = useSSE("http://localhost:8080/event/predict/progress");

  const startParsing = async () => {
    try {
      parse.startSSE();
      await fetch("http://localhost:8080/parse", { method: "POST" });
    } catch (error) {
      console.error("Error starting parsing:", error);
    }
  };

  const startPredicting = async () => {
    try {
      predict.startSSE();
      await fetch("http://localhost:8080/predict", { method: "POST" });
    } catch (error) {
      console.error("Error starting Predicting:", error);
    }
  };

  useEffect(() => {
    parse.startSSE();
    predict.startSSE();
  }, []);

  useEffect(() => {
    if (predict.status === "Completed") {
      async function mutatePredictions() {
        await mutate("http://localhost:8080/stock/predictions");
        await mutate("http://localhost:8080/stock/all");
        predict.setStatus("Pending");
      }
      mutatePredictions();
    }
    if (parse.status === "Completed") {
      parse.setStatus("Pending");
    }
  }, [parse, predict]);

  return (
    <Card title="수동실행">
      <div className="flex flex-col space-y-2">
        <Button onClick={startParsing} className="overflow-x-auto relative">
          {parse.status !== "Completed" && parse.status !== "Pending" && (
            <div
              className="absolute inset-0 bg-rise text-xs h-full text-inverseForground text-center leading-none"
              style={{ width: `${parse.progress}%` }}
            />
          )}
          <div className="relative z-10">
            {parse.status === "Completed"
              ? "Parsing Completed"
              : parse.status === "Pending"
              ? "Start Parsing"
              : `${parse.status}... ${parse.progress}%`}
          </div>
        </Button>
        <Button onClick={startPredicting} className="overflow-x-auto relative">
          {predict.status !== "Completed" && predict.status !== "Pending" && (
            <div
              className="absolute inset-0 bg-rise text-xs h-full text-inverseForground text-center leading-none"
              style={{ width: `${predict.progress}%` }}
            />
          )}
          <div className="relative z-10">
            {predict.status === "Completed"
              ? "Predicting Completed"
              : predict.status === "Pending"
              ? "Start Predicting"
              : `${predict.status}... ${predict.progress}%`}
          </div>
        </Button>
      </div>
    </Card>
  );
}
