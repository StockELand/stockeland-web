"use client";
import Typography from "@/components/ui/Typography";
import ManualRunCard from "@/components/domain/ManualRunCard";
import StockListCard from "@/components/domain/StockListCard";
import StockTable from "@/components/domain/table/StockTable";
import { useGetStockPredictions } from "@/services/stock/useGetStockPredictions";
import { useGetStockAll } from "@/services/stock/useGetStockAll";
import { IStock } from "@/types/table";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: predictions } = useGetStockPredictions();
  const { data: stocks } = useGetStockAll();
  const router = useRouter();

  // ✅ 테이블 행 더블 클릭 시 특정 주식 페이지로 이동
  const onDoubleClick = (row: IStock) => {
    if (row.symbol) {
      router.push(`/stock/${row.symbol}`);
    }
  };

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
      {stocks && <StockTable onDoubleClick={onDoubleClick} data={stocks} />}
    </>
  );
}
