"use client";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import useSSE from "@/hooks/useSSE";
import { useEffect } from "react";
import { mutate } from "swr";

export default function ManualRunCard() {
  const parse = useSSE("http://localhost:8080/parse/progress");

  const prediction = useSSE("http://localhost:8080/predict/progress");

  const startParsing = async () => {
    try {
      parse.startSSE();
      await fetch("http://localhost:8080/parse/update", { method: "POST" });
    } catch (error) {
      console.error("Error starting parsing:", error);
    }
  };

  const startLearning = async () => {
    try {
      prediction.startSSE();
      await fetch("http://localhost:8080/predict/update", { method: "POST" });
    } catch (error) {
      console.error("Error starting Learning:", error);
    }
  };

  useEffect(() => {
    if (prediction.status === "completed") {
      async function mutatePredictions() {
        await mutate("http://localhost:8080/stock/predictions");
        await mutate("http://localhost:8080/stock/all");
        prediction.setStatus("pending");
      }
      mutatePredictions();
    }
    if (parse.status === "completed") {
      parse.setStatus("pending");
    }
  }, [parse, prediction]);

  return (
    <Card title="수동실행">
      <div className="flex flex-col space-y-2">
        <Button onClick={startParsing} className="overflow-x-auto relative">
          {parse.status !== "completed" && parse.status !== "pending" && (
            <div
              className="absolute inset-0 bg-rise text-xs h-full text-inverseForground text-center leading-none"
              style={{ width: `${parse.progress}%` }}
            />
          )}
          <div className="relative z-10">
            {parse.status === "completed"
              ? "Parsing Completed"
              : parse.status === "pending"
              ? "Start Parsing"
              : `Parsing ${parse.status}... ${parse.progress}%`}
          </div>
        </Button>
        <Button onClick={startLearning} className="overflow-x-auto relative">
          {prediction.status !== "completed" &&
            prediction.status !== "pending" && (
              <div
                className="absolute inset-0 bg-rise text-xs h-full text-inverseForground text-center leading-none"
                style={{ width: `${prediction.progress}%` }}
              />
            )}
          <div className="relative z-10">
            {prediction.status === "completed"
              ? "Learning Completed"
              : prediction.status === "pending"
              ? "Start Learning"
              : `Learning ${prediction.status}... ${prediction.progress}%`}
          </div>
        </Button>
      </div>
    </Card>
  );
}
