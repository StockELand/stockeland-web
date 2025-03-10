import { IStock } from "@/types/table";
import { CustomColumnMeta, Table } from "@l11040/eland-table";
import { createColumnHelper, SortingFn } from "@tanstack/react-table";
import Image from "next/image";

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
      <span className="text-sm font-bold text-foreground">{symbol}</span>
      <span className="text-xs text-thTxt truncate overflow-hidden max-w-[80px] w-none sm:max-w-[200px] md:w-[300px] md:max-w-none">
        {name}
      </span>
    </div>
  </div>
);

const createPercentageSortFn = <T,>(key: keyof T): SortingFn<T> => {
  return (rowA, rowB) => {
    const statusA = Number(rowA.original[key]);
    const statusB = Number(rowB.original[key]);

    return statusA - statusB;
  };
};

const formatPercentage = (value: number) => (
  <div className={`${value > 0 ? "text-signature" : "text-fall"}`}>
    {Math.round(value * 100) / 100}%
  </div>
);

const columnHelper = createColumnHelper<IStock>();

const SYMBOL = "symbol";
const PREV_CLOSE = "prevClose";
const LATEST_CLOSE = "latestClose";
const PREV_CHANGE_PERCENT = "prevChangePercent";
const LATEST_CHANGE_PERCENT = "latestChangePercent";

const getColumns = () => [
  columnHelper.accessor(SYMBOL, {
    id: SYMBOL,
    header: () => <div className="text-left">Symbol</div>,
    cell: (info) => (
      <StockSymbolCell symbol={info.getValue()} name={info.row.original.name} />
    ),
    meta: { pinAlign: "left", align: "left" },
  }),
  columnHelper.accessor(PREV_CLOSE, {
    id: PREV_CLOSE,
    header: () => <div>Prev Close</div>,
    cell: (info) => <div>${info.getValue()}</div>,
    meta: { align: "right" } as CustomColumnMeta,
  }),
  columnHelper.accessor(LATEST_CLOSE, {
    id: LATEST_CLOSE,
    header: () => <div>Latest Close</div>,
    cell: (info) => <div>${info.getValue()}</div>,
    meta: { align: "right" } as CustomColumnMeta,
  }),
  columnHelper.accessor(PREV_CHANGE_PERCENT, {
    id: PREV_CHANGE_PERCENT,
    header: () => <div>Prev Prediction</div>,
    cell: (info) => formatPercentage(info.getValue() as number),
    sortingFn: createPercentageSortFn<IStock>(PREV_CHANGE_PERCENT),
    meta: { align: "right" } as CustomColumnMeta,
  }),
  columnHelper.accessor(LATEST_CHANGE_PERCENT, {
    id: LATEST_CHANGE_PERCENT,
    header: () => <div>Latest Prediction</div>,
    cell: (info) => formatPercentage(info.getValue() as number),
    sortingFn: createPercentageSortFn<IStock>(LATEST_CHANGE_PERCENT),
    meta: { align: "right" } as CustomColumnMeta,
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
