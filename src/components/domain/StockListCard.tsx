import Image from "next/image";
import Card from "@/components/ui/Card";

interface StockListCardProps {
  title?: string;
  stocks: { ticker: string; percent: number }[];
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
                <Image
                  src="/tesla-logo.png"
                  alt={`${stock.ticker} Logo`}
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-sm font-bold text-white">
                {stock.ticker}
              </span>
            </div>
            <span
              className={`text-sm font-bold ${
                isPositive ? "text-signature" : "text-fall"
              }`}
            >
              {isPositive ? "+" : ""}
              {stock.percent}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
