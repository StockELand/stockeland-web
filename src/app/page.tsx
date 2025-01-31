"use client";

import { useEffect, useState } from "react";

import { getStocks } from "@/utils/getStocks";
import { IStock } from "@/types/table";
import StockTable from "@/components/domain/StockTable";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import ManualRunCard from "@/components/domain/ManualRunCard";
import StockListCard from "@/components/domain/StockListCard";

export default function Home() {
  const [stocks, setStocks] = useState<IStock[]>([]);

  useEffect(() => {
    getStocks().then(setStocks).catch(console.error);
  }, []);

  return (
    <>
      <Typography variant="h2">Dashboard</Typography>

      <div className="flex flex-wrap gap-6 mb-6">
        <ManualRunCard />
        {/* Top 5 Card */}
        <StockListCard
          title="Top 5"
          stocks={[
            { ticker: "TSLA", percent: 23.19 },
            { ticker: "TSLA", percent: 23.19 },
            { ticker: "TSLA", percent: 23.19 },
            { ticker: "TSLA", percent: 23.19 },
            { ticker: "TSLA", percent: 23.19 },
          ]}
          isPositive
        />
        <StockListCard
          title="Bottom 5"
          stocks={[
            { ticker: "TSLA", percent: 23.19 },
            { ticker: "TSLA", percent: 23.19 },
            { ticker: "TSLA", percent: 23.19 },
            { ticker: "TSLA", percent: 23.19 },
            { ticker: "TSLA", percent: 23.19 },
          ]}
        />
      </div>
      <Card
        variant="bordered"
        padding="none"
        className="overflow-hidden w-full"
      >
        <StockTable data={stocks} />
      </Card>
    </>
  );
}
