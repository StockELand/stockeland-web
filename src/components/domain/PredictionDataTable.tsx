import { createColumnHelper } from "@tanstack/react-table";
import { CustomColumnMeta, Table } from "../table";
import { IPredictionData } from "@/types/table";

const columnHelper = createColumnHelper<IPredictionData>();
const getColumns = () => [
  columnHelper.accessor("symbol", {
    id: "symbol",
    header: () => <div>Symbol</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
  columnHelper.accessor("predicted_at", {
    id: "predicted_at",
    header: () => <div>Date</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
  columnHelper.accessor("change_percent", {
    id: "change_percent",
    header: () => <div>Change Percent</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "right" } as CustomColumnMeta,
  }),
];

interface PredictionDataTableProps {
  data: IPredictionData[];
}

export default function PredictionDataTable({
  data,
}: PredictionDataTableProps) {
  return <Table<IPredictionData> data={data} columns={getColumns()} />;
}
