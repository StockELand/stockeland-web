import { createColumnHelper } from "@tanstack/react-table";
import { CustomColumnMeta, Table } from "@/components/table";
import { IStockPrice } from "@/types/api";

const columnHelper = createColumnHelper<IStockPrice>();
const getColumns = () => [
  columnHelper.accessor("date", {
    id: "date",
    header: () => <div>Date</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
  columnHelper.accessor("open", {
    id: "open",
    header: () => <div>Open</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "right" } as CustomColumnMeta,
  }),
  columnHelper.accessor("close", {
    id: "close",
    header: () => <div>Close</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "right" } as CustomColumnMeta,
  }),
  columnHelper.accessor("high", {
    id: "high",
    header: () => <div>High</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "right" } as CustomColumnMeta,
  }),
  columnHelper.accessor("low", {
    id: "low",
    header: () => <div>Low</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "right" } as CustomColumnMeta,
  }),
  columnHelper.accessor("volume", {
    id: "volume",
    header: () => <div>Volume</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "right" } as CustomColumnMeta,
  }),
];

interface StockPriceTableProps {
  data: IStockPrice[];
}

export default function StockPriceTable({ data }: StockPriceTableProps) {
  return <Table<IStockPrice> data={data} columns={getColumns()} />;
}
