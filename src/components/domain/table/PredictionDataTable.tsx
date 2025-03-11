import { createColumnHelper } from "@tanstack/react-table";
import { IPredictionData } from "@/types/table";
import { CustomColumnMeta, Table } from "@l11040/eland-table";

const columnHelper = createColumnHelper<IPredictionData>();

const SYMBOL = "symbol";
const PREDICTED_AT = "predictedAt";
const CHANGE_PERCENT = "changePercent";

const getColumns = () => [
  columnHelper.accessor(SYMBOL, {
    id: SYMBOL,
    header: () => <div>Symbol</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
  columnHelper.accessor(PREDICTED_AT, {
    id: PREDICTED_AT,
    header: () => <div>Date</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
  columnHelper.accessor(CHANGE_PERCENT, {
    id: CHANGE_PERCENT,
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
