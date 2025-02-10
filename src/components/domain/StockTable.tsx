import { IStock } from "@/types/table";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../table";
import Image from "next/image";

const columnHelper = createColumnHelper<IStock>();

const StockSymbolCell = ({ symbol }: { symbol: string }) => (
  <div className="text-left flex items-center space-x-3">
    <div className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full">
      <Image
        src={`/logos/${symbol}.png`}
        alt={`${symbol} Logo`}
        width={34}
        height={34}
      />
    </div>
    <span className="text-sm font-bold text-white">{symbol}</span>
  </div>
);

const formatPercentage = (value: number) => (
  <div className={`text-right ${value > 0 ? "text-rise" : "text-fall"}`}>
    {Math.round(value * 100) / 100}%
  </div>
);

const getColumns = () => [
  columnHelper.accessor("symbol", {
    id: "symbol",
    header: () => <div className="text-left">Symbol</div>,
    cell: (info) => <StockSymbolCell symbol={info.getValue()} />,
  }),
  columnHelper.accessor("prev_close", {
    id: "prev_close",
    header: () => <div className="text-right">Prev Close</div>,
    cell: (info) => <div className="text-right">${info.getValue()}</div>,
  }),
  columnHelper.accessor("latest_close", {
    id: "latest_close",
    header: () => <div className="text-right">Latest Close</div>,
    cell: (info) => <div className="text-right">${info.getValue()}</div>,
  }),
  columnHelper.accessor("prev_change_percent", {
    id: "prev_change_percent",
    header: () => <div className="text-right">Prev Prediction</div>,
    cell: (info) => formatPercentage(info.getValue() as number),
  }),
  columnHelper.accessor("latest_change_percent", {
    id: "latest_change_percent",
    header: () => <div className="text-right">Latest Prediction</div>,
    cell: (info) => formatPercentage(info.getValue() as number),
  }),
];

interface StockTableProps {
  data: IStock[];
  onDoubleClick?: (row: IStock) => void;
  onSelect?: (row: IStock) => boolean;
}

export default function StockTable({
  data,
  onDoubleClick,
  onSelect,
}: StockTableProps) {
  return (
    <Table<IStock>
      data={data}
      columns={getColumns()}
      onSelect={onSelect}
      onDoubleClick={onDoubleClick}
    />
  );
}
