// import Image from "next/image";
import Card from "@/components/ui/Card";
import { IStockPrediction } from "@/types/api";

interface StockListCardProps {
  title?: string;
  stocks: IStockPrediction[];
  isPositive?: boolean;
}

export default function StockListCard({
  title,
  stocks,
  isPositive,
}: StockListCardProps) {
  return (
    <Card title={title} variant="bordered">
      <div className="flex flex-col space-y-3">
        {stocks.map((stock, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-2 py-1"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white rounded-full">
                {/* <Image
                  src="/tesla-logo.png"
                  alt={`${stock.symbol} Logo`}
                  width={24}
                  height={24}
                /> */}
              </div>
              <span className="text-sm font-bold text-white">
                {stock.symbol}
              </span>
            </div>
            <div className="flex flex-row space-x-3">
              <span className={`text-sm text-thTxt`}>
                {stock.prev_change_percent &&
                  Math.round(stock.prev_change_percent * 100) / 100}
                %
              </span>
              <span
                className={`text-sm font-bold ${
                  isPositive ? "text-signature" : "text-fall"
                }`}
              >
                {isPositive ? "+" : ""}
                {Math.round(stock.change_percent * 100) / 100}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
