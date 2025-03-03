"use client";

import StockPriceTable from "@/components/domain/table/StockPriceTable";
import Typography from "@/components/ui/Typography";
import { useGetStockBySymbol } from "@/services/stock/useGetStockBySymbol";
import { useParams } from "next/navigation";
import Image from "next/image";
import Card from "@/components/ui/Card";

export default function StockDetail() {
  const { symbol } = useParams();
  const symbolStr = symbol as string;

  const { data, isLoading } = useGetStockBySymbol({ symbol: symbolStr });

  return (
    <a>
      {symbol && (
        <div className="flex flex-row gap-2 items-center">
          <div className="flex overflow-hidden rounded-full">
            <Image
              src={`/logos/${symbol}.png`}
              alt={`${symbol} Logo`}
              width={32}
              height={32}
            />
          </div>
          <Typography variant="h2" className="mb-2" isMargin={false}>
            {(symbol as string).toUpperCase()}
          </Typography>
        </div>
      )}
      {isLoading || (
        <>
          <div className="flex flex-row gap-2 items-center">
            <Typography variant="h1">${data && data[0].close}</Typography>
            <Typography variant="h3" color="primary">
              ₩{data && data[0].close}
            </Typography>
          </div>
          <Card variant="bordered" className="!w-full">
            <StockPriceTable data={data ? data : []} />
          </Card>
        </>
      )}
    </a>
  );
}
