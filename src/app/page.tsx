"use client";
import Typography from "@/components/ui/Typography";
import ManualRunCard from "@/components/domain/ManualRunCard";
import StockListCard from "@/components/domain/StockListCard";
import StockTable from "@/components/domain/table/StockTable";
import { useGetStockPredictions } from "@/services/stock/useGetStockPredictions";
import { useGetStockAll } from "@/services/stock/useGetStockAll";

export default function Home() {
  const { data: predictions } = useGetStockPredictions();
  const { data: stocks } = useGetStockAll();

  return (
    <>
      <Typography variant="h1">Dashboard</Typography>
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
