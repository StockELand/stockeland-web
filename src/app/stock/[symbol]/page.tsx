"use client";

import StockPriceTable from "@/components/domain/table/StockPriceTable";
import Typography from "@/components/ui/Typography";
import { useGetStockBySymbol } from "@/services/stock/useGetStockBySymbol";
import { useParams } from "next/navigation";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { useMemo, useState } from "react";
import { ChartData, LineChart, CustomTooltipProps } from "@/components/charts";
import { formatDate, parseLocalDate } from "@l11040/eland-datepicker";
import { IStockPrice } from "@/types/api";
import AnimatedRadio from "@/components/ui/AnimatedRadio";
import BarChart from "@/components/charts/components/BarChart";
import SharedInteractionProvider from "@/components/charts/components/SharedInteractionProvider";

const rangeOptions = [
  { key: "1w", value: "1주" },
  { key: "1m", value: "1달" },
  { key: "3m", value: "3달" },
  { key: "6m", value: "6달" },
  { key: "1y", value: "1년" },
];

const CustomTooltip: React.FC<CustomTooltipProps> = ({ data }) => {
  if (!data) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, value, ...tempData } = data;
  const stock = tempData as IStockPrice;

  return (
    <Card
      title={formatDate(label as Date) || undefined}
      padding="small"
      className="!w-fit shadow-lg z-20"
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
      </div>
    </Card>
  );
};
const CustomTooltip2: React.FC<CustomTooltipProps> = ({ data }) => {
  if (!data) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, value, ...tempData } = data;
  const stock = tempData as IStockPrice;

  return (
    <Card
      title={formatDate(label as Date) || undefined}
      padding="small"
      className="!w-fit shadow-lg z-20"
    >
      <div className="text-sm text-nowrap">
        <p className="text-signature2">
          <strong>Volume</strong>: {stock.volume}
        </p>
      </div>
    </Card>
  );
};

export default function StockDetail() {
  const { symbol } = useParams();

  const symbolStr = useMemo(() => (symbol ? symbol.toString() : ""), [symbol]);

  const [selectedRange, setSelectedRange] = useState("1m");

  const { data, isLoading } = useGetStockBySymbol({
    symbol: symbolStr,
    range: selectedRange,
  });

  const chartData = useMemo<ChartData[]>(() => {
    if (!data) return [];
    return data
      .map((stock) => ({
        label: parseLocalDate(stock.date) || new Date(),
        value: stock.close,
        ...stock,
      }))
      .reverse();
  }, [data]);

  const barChartData = useMemo<ChartData[]>(() => {
    if (!data) return [];
    return data
      .map((stock) => ({
        label: parseLocalDate(stock.date) || new Date(),
        value: stock.volume,
        ...stock,
      }))
      .reverse();
  }, [data]);

  return (
    <div>
      {symbolStr && (
        <div className="flex flex-row gap-2 items-center">
          <div className="flex overflow-hidden rounded-full">
            <Image
              src={`/logos/${symbolStr}.png`}
              alt={`${symbolStr} Logo`}
              width={32}
              height={32}
            />
          </div>
          <Typography variant="h2" className="mb-2" isMargin={false}>
            {symbolStr.toUpperCase()}
          </Typography>
        </div>
      )}

      <div className="flex flex-row gap-2 items-center">
        <Typography variant="h1">
          {isLoading ? "Loading..." : `$${data?.[0]?.close}`}
        </Typography>
        {!isLoading && (
          <Typography variant="h3" color="primary">
            ₩{data?.[0]?.close}
          </Typography>
        )}
      </div>

      <Card padding="none" className="!w-full mb-4 " variant="bordered">
        <AnimatedRadio
          options={rangeOptions}
          selected={selectedRange}
          onChange={setSelectedRange}
          className="z-1 m-2 ml-auto"
        />
        <div className="h-fit">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <p>Loading Chart...</p>
            </div>
          ) : (
            <SharedInteractionProvider>
              <>
                <LineChart
                  className="!h-[260px]"
                  data={chartData}
                  TooltipComponent={CustomTooltip}
                  strokeColor="text-signature2"
                />
                <BarChart
                  className="!h-[100px]"
                  data={barChartData}
                  TooltipComponent={CustomTooltip2}
                  strokeColor="text-signature2"
                />
              </>
            </SharedInteractionProvider>
          )}
        </div>
      </Card>

      <Card
        variant="bordered"
        className="!w-full overflow-hidden"
        padding="none"
      >
        {isLoading ? (
          <div className="h-[200px] flex items-center justify-center text-signature2">
            <p>Loading Data...</p>
          </div>
        ) : (
          <StockPriceTable data={data} />
        )}
      </Card>
    </div>
  );
}
