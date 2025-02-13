"use client";
import { IStock } from "@/types/table";
import StockTable from "@/components/domain/StockTable";
import Typography from "@/components/ui/Typography";
import ManualRunCard from "@/components/domain/ManualRunCard";
import StockListCard from "@/components/domain/StockListCard";
import useSWR from "swr";
import { IStockPrediction } from "@/types/api";
import DatePicker from "@/components/date-picker/DatePicker";

export default function Home() {
  const { data: predictions } = useSWR<IStockPrediction[]>(
    "http://localhost:8080/stock/predictions"
  );
  const { data: stocks } = useSWR<IStock[]>("http://localhost:8080/stock/all");

  return (
    <>
      <DatePicker
        doubleCalendar
        displayDateGroups={[
          { type: "today", dates: [new Date()], color: "#fcd535" },
          {
            type: "success",
            dates: [new Date(2025, 1, 15), new Date(2025, 1, 20)],
            color: "#a6fc35",
          },
          {
            type: "failure",
            dates: [new Date(2025, 1, 18), new Date(2025, 1, 22)],
            color: "#F6465D",
          },
        ]}
      />
      <Typography variant="h2">Dashboard</Typography>
      <div className="flex flex-wrap gap-6 mb-6">
        <ManualRunCard />
        {predictions && (
          <>
            <StockListCard
              title="Top 5"
              stocks={predictions.slice(0, 5)}
              isPositive
            />
            <StockListCard
              title="Bottom 5"
              stocks={predictions.slice(-5).reverse()}
            />
          </>
        )}
      </div>
      {stocks && <StockTable data={stocks} />}
    </>
  );
}
