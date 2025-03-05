"use client";

import StockPriceTable from "@/components/domain/table/StockPriceTable";
import Typography from "@/components/ui/Typography";
import { useGetStockBySymbol } from "@/services/stock/useGetStockBySymbol";
import { useParams } from "next/navigation";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { ChartData, TooltipProps } from "@/components/charts/core/types";
import { LineChart } from "@/components/charts";
import { formatDate, parseLocalDate } from "@/components/date-picker";
import { IStockPrice } from "@/types/api";
import AnimatedRadio from "@/components/ui/AnimatedRadio";

const rangeOptions = [
  { key: "1w", value: "1주" },
  { key: "1m", value: "1달" },
  { key: "3m", value: "3달" },
  { key: "6m", value: "6달" },
  { key: "1y", value: "1년" },
];

const CustomTooltip: React.FC<TooltipProps> = ({ data }) => {
  if (!data) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, value, ...tempData } = data;
  const stock = tempData as IStockPrice;
  return (
    <Card
      title={formatDate(label as Date) || undefined}
      padding="small"
      className="!w-fit shadow-lg "
    >
      <div className="text-sm text-nowrap">
        <p>
          <strong>Close</strong>: {stock.close}
        </p>
        <p className="text-signature">
          <strong>High</strong>: {stock.high}
        </p>
        <p className="text-fall">
          <strong>Low</strong>: {stock.low}
        </p>
        <p className="text-signature2">
          <strong>Volume</strong>: {stock.volume}
        </p>
      </div>
    </Card>
  );
};

export default function StockDetail() {
  const { symbol } = useParams();
  const symbolStr = symbol as string;

  const [selectedRange, setSelectedRange] = useState("1y");
  const { data, isLoading } = useGetStockBySymbol({
    symbol: symbolStr,
    range: selectedRange,
  });

  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (data) {
      const temp = data
        .map((stock) => ({
          label: parseLocalDate(stock.date) || new Date(),
          value: stock.close,
          ...stock,
        }))
        .reverse();
      setChartData(temp);
    }
  }, [data]);

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
            <Typography variant="h1">${data && data[0]?.close}</Typography>
            <Typography variant="h3" color="primary">
              ₩{data && data[0]?.close}
            </Typography>
          </div>
          <Card padding="none" className="!w-full mb-4" variant="bordered">
            <LineChart
              data={chartData}
              TooltipComponent={CustomTooltip}
              strokeColor="text-signature2"
            />
            <AnimatedRadio
              options={rangeOptions}
              selected={selectedRange}
              onChange={setSelectedRange}
              className="z-20 m-2 ml-auto"
            />
          </Card>
          <Card
            variant="bordered"
            className="!w-full overflow-hidden"
            padding={"none"}
          >
            <StockPriceTable data={data} />
          </Card>
        </>
      )}
    </a>
  );
}
