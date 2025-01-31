import { IStock } from "@/types/table";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "../table";

const columnHelper = createColumnHelper<IStock>();

const getColumns = () => {
  return [
    columnHelper.accessor("ticker", {
      id: "ticker",
      header: () => <div className="text-left">Ticker</div>,
      cell: (info) => <div className="text-left">{info.getValue()}</div>,
    }),
    columnHelper.accessor((row) => row.previous_close, {
      id: "previous_close",
      header: () => <div className="text-right">Prev Close</div>,
      cell: (info) => <div className="text-right">${info.getValue()}</div>,
    }),
    columnHelper.accessor((row) => row.today_close, {
      id: "today_close",
      header: () => <div className="text-right">Today Close</div>,
      cell: (info) => <div className="text-right">${info.getValue()}</div>,
    }),
    columnHelper.accessor((row) => row.previous_prediction_error, {
      id: "previous_prediction_error",
      header: () => <div className="text-right">Prev Prediction Error</div>,
      cell: (info) =>
        (info.getValue() as number) > 0 ? (
          <div className="text-right text-rise">{info.getValue()}%</div>
        ) : (
          <div className="text-right text-fall">{info.getValue()}%</div>
        ),
    }),
    columnHelper.accessor((row) => row.today_prediction_percent, {
      id: "today_prediction_percent",
      header: () => <div className="text-right">Today Prediction Error</div>,
      cell: (info) =>
        (info.getValue() as number) > 0 ? (
          <div className="text-right text-rise">{info.getValue()}%</div>
        ) : (
          <div className="text-right text-fall">{info.getValue()}%</div>
        ),
    }),
  ];
};

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
