"use client";
import Card from "@/components/ui/Card";
import ParseProcessButton from "./ParseProcessButton";
import PredictProcessButton from "./PredictProcessButton";

export default function ManualRunCard() {
  return (
    <Card title="수동실행">
      <div className="flex flex-col space-y-2">
        <ParseProcessButton />
        <PredictProcessButton />
      </div>
    </Card>
  );
}
