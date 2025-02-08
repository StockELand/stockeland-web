"use client";
import { IStock } from "@/types/table";
import StockTable from "@/components/domain/StockTable";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import ManualRunCard from "@/components/domain/ManualRunCard";
import StockListCard from "@/components/domain/StockListCard";
import useSWR from "swr";
import { IStockPrediction } from "@/types/api";

export default function Home() {
  const { data: predictions } = useSWR<IStockPrediction[]>(
    "http://localhost:8080/stock/predictions"
  );
  const { data: stocks } = useSWR<IStock[]>("http://localhost:3000/api/mock");

  return (
    <>
      <Typography variant="h2">Dashboard</Typography>

      <div className="flex flex-wrap gap-6 mb-6">
        <ManualRunCard />
        {predictions && (
          <>
            <StockListCard
              title="Top 5"
              stocks={predictions.splice(0, 5)}
              isPositive
            />
            <StockListCard title="Bottom 5" stocks={predictions.splice(-5)} />
          </>
        )}
      </div>
      {stocks && (
        <Card
          variant="bordered"
          padding="none"
          className="overflow-hidden w-full"
        >
          <StockTable data={stocks} />
        </Card>
      )}
    </>
  );
}
