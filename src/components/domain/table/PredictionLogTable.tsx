import { IPredictionLog, IPredictionStatus } from "@/types/table";
import { createColumnHelper } from "@tanstack/react-table";
import clsx from "clsx";
import { formatISOToFullDate } from "@l11040/eland-datepicker";
import { CustomColumnMeta, Table } from "@l11040/eland-table";

const StatusCell = ({ status }: { status: IPredictionStatus }) => {
  return (
    <div
      className={clsx("border-2 px-3 py-[2px] rounded-lg", {
        "border-fall text-fall": status === "fail",
        "border-signature text-signature": status === "success",
      })}
    >
      {status === "success" ? "Success" : "Fail"}
    </div>
  );
};

const columnHelper = createColumnHelper<IPredictionLog>();

const PREDICTED_AT = "predictedAt";
const STATUS = "status";
const MODIFIED_COUNT = "modifiedCount";
const EXECUTION_TIME = "executionTime";
const MESSAGE = "message";
const LAST_DATA_DATE = "lastDataDate";

const getColumns = () => [
  columnHelper.accessor(PREDICTED_AT, {
    id: PREDICTED_AT,
    header: () => <div className="text-left">Predicted At</div>,
    cell: (info) => <div>{formatISOToFullDate(info.getValue())}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
  columnHelper.accessor(STATUS, {
    id: STATUS,
    header: () => <div>Status</div>,
    cell: (info) => <StatusCell status={info.getValue()} />,
    meta: { align: "center" } as CustomColumnMeta,
  }),
  columnHelper.accessor(LAST_DATA_DATE, {
    id: LAST_DATA_DATE,
    header: () => <div className="text-left">Last Data Date</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "center" } as CustomColumnMeta,
  }),
  columnHelper.accessor(MODIFIED_COUNT, {
    id: MODIFIED_COUNT,
    header: () => (
      <div>
        Modified
        <br />
        Count
      </div>
    ),
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "right" } as CustomColumnMeta,
  }),
  columnHelper.accessor(EXECUTION_TIME, {
    id: EXECUTION_TIME,
    header: () => (
      <div>
        Excution
        <br />
        Time
      </div>
    ),
    cell: (info) => <div>{info.getValue()}s</div>,
    meta: { align: "right" } as CustomColumnMeta,
  }),
  columnHelper.accessor(MESSAGE, {
    id: MESSAGE,
    header: () => <div>Message</div>,
    cell: (info) => <div>{info.getValue()}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
];

interface PredictionLogTableProps {
  data: IPredictionLog[];
}

export default function PredictionLogTable({ data }: PredictionLogTableProps) {
  return <Table<IPredictionLog> data={data} columns={getColumns()} />;
}
