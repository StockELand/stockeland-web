import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import useSSE from "@/hooks/useSSE";
import { useState } from "react";

export default function ManualRunCard() {
  const { progress, status, startSSE } = useSSE(
    "http://localhost:8080/parse/progress"
  );

  const {
    progress: predictProgress,
    status: predictStatus,
    startSSE: predictStartSSE,
  } = useSSE("http://localhost:8080/predict/progress");

  const [isParsing, setIsParsing] = useState(false);
  const [isLearning, setIsLearning] = useState(false);

  const startParsing = async () => {
    setIsParsing(true);
    try {
      startSSE();
      await fetch("http://localhost:8080/parse/update", { method: "POST" });
    } catch (error) {
      console.error("Error starting parsing:", error);
    }
  };

  const startLearning = async () => {
    setIsLearning(true);
    try {
      predictStartSSE();
      await fetch("http://localhost:8080/predict/update", { method: "POST" });
    } catch (error) {
      console.error("Error starting Learning:", error);
    }
  };

  return (
    <Card title="수동실행">
      <div className="flex flex-col space-y-2">
        <Button onClick={startParsing} className="overflow-x-auto relative">
          {status !== "completed" && (
            <div
              className="absolute inset-0 bg-rise text-xs h-full text-inverseForground text-center leading-none"
              style={{ width: `${progress}%` }}
            />
          )}
          <div className="relative z-10">
            {status === "completed"
              ? "Parsing Completed"
              : isParsing
              ? `Parsing ${status}... ${progress}%`
              : "Start Parsing"}
          </div>
        </Button>
        <Button onClick={startLearning} className="overflow-x-auto relative">
          {predictStatus !== "completed" && (
            <div
              className="absolute inset-0 bg-rise text-xs h-full text-inverseForground text-center leading-none"
              style={{ width: `${predictProgress}%` }}
            />
          )}
          <div className="relative z-10">
            {predictStatus === "completed"
              ? "Learning Completed"
              : isLearning
              ? `Learning ${predictStatus}... ${predictProgress}%`
              : "Start Learning"}
          </div>
        </Button>
      </div>
    </Card>
  );
}
