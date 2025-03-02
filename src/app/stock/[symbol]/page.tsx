"use client";

import { useGetStockBySymbol } from "@/services/stock/useGetStockBySymbol";
import { useParams } from "next/navigation";

export default function StockDetail() {
  const { symbol } = useParams();
  const symbolStr = symbol as string;

  const { data, isLoading } = useGetStockBySymbol({ symbol: symbolStr });

  return (
    <a>
      {symbol ? symbol : "No symbol provided"}
      {isLoading ? "Loading..." : JSON.stringify(data)}
    </a>
  );
}
