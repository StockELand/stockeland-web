import { IStock } from "@/types/table";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../table";
import Image from "next/image";
import { CustomColumnMeta } from "../table/Table";

const columnHelper = createColumnHelper<IStock>();

const StockSymbolCell = ({
  symbol,
  name,
}: {
  symbol: string;
  name: string;
}) => (
  <div className="text-left flex items-center space-x-3">
    <div className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full">
      <Image
        src={`/logos/${symbol}.png`}
        alt={`${symbol} Logo`}
        width={34}
        height={34}
      />
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-bold text-white">{symbol}</span>
      <span className="text-xs text-thTxt truncate overflow-hidden max-w-[100px] sm:max-w-[200px] md:max-w-none">
        {name}
      </span>
    </div>
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
    cell: (info) => (
      <StockSymbolCell symbol={info.getValue()} name={info.row.original.name} />
    ),
    meta: { isPinned: "left" } as CustomColumnMeta,
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
