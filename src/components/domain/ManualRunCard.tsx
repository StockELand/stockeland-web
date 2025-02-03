import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import useSSE from "@/hooks/useSSE";
import { useState } from "react";

export default function ManualRunCard() {
  const { progress, status, startSSE } = useSSE(
    "http://localhost:8080/parse/progress"
  );
  const [isParsing, setIsParsing] = useState(false);

  const startParsing = async () => {
    setIsParsing(true);
    try {
      await fetch("http://localhost:8080/parse/update", { method: "POST" });
      startSSE();
    } catch (error) {
      console.error("Error starting parsing:", error);
    }
  };

  return (
    <Card title="수동실행">
      <div className="flex flex-col space-y-2">
        <Button onClick={startParsing} className="overflow-x-auto relative">
          {status !== "completed" && (
            <div
              className="absolute inset-0 bg-black/20 transition-transform duration-100 ease-linear z-0"
              style={{ transform: `translateX(${-100 + progress}%)` }}
            />
          )}
          <div className="relative z-10">
            {status === "completed"
              ? "Parsing Completed"
              : isParsing
              ? `Parsing... ${progress}%`
              : "Start Parsing"}
          </div>
        </Button>
        <Button className="overflow-x-auto relative">
          <div className="relative z-10">Model Learning</div>
        </Button>
      </div>
    </Card>
  );
}
