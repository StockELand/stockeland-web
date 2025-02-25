"use client";
import Button from "@/components/ui/Button";
import useSSE from "@/hooks/useSSE";
import { useEffect } from "react";
import clsx from "clsx";
import { usePostParse } from "@/services/parse/usePostParse";

export default function ParseProcessButton() {
  const { startSSE, setStatus, status, progress } = useSSE(
    "http://localhost:8080/event/parse/progress"
  );

  const { startParse } = usePostParse();

  const handlerStartParse = () => {
    startSSE();
    startParse();
  };

  useEffect(() => {
    startSSE();
  }, [startSSE]);

  useEffect(() => {
    if (status === "Completed") setStatus("Pending");
  }, [status, setStatus]);

  const renderButtonText = () => {
    if (status === "Completed") return "Parse completed";
    if (status === "Pending") return "Start parse";
    return `${status}... ${progress}%`;
  };

  return (
    <Button onClick={handlerStartParse} className="relative overflow-x-auto">
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
