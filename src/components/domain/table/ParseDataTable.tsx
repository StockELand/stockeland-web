import { createColumnHelper } from "@tanstack/react-table";
import { IParseData } from "@/types/table";
import { CustomColumnMeta, Table } from "@l11040/eland-table";

const columnHelper = createColumnHelper<IParseData>();
const getColumns = () => [
  columnHelper.accessor("symbol", {
    id: "symbol",
    header: () => <div>Symbol</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
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

interface ParseDataTableProps {
  data: IParseData[];
}

export default function ParseDataTable({ data }: ParseDataTableProps) {
  return <Table<IParseData> data={data} columns={getColumns()} />;
}
