import { IParseLog, IParseStatus } from "@/types/table";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomColumnMeta, Table } from "../table";
import clsx from "clsx";
import { formatISOToFullDate } from "../date-picker";

const StatusCell = ({ status }: { status: IParseStatus }) => {
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

const columnHelper = createColumnHelper<IParseLog>();
const PARSED_AT = "parsedAt";
const STATUS = "status";
const MODIFIED_COUNT = "modifiedCount";
const EXECUTION_TIME = "executionTime";
const MESSAGE = "message";
const getColumns = () => [
  columnHelper.accessor(PARSED_AT, {
    id: PARSED_AT,
    header: () => <div className="text-left">Parsed At</div>,
    cell: (info) => <div>{formatISOToFullDate(info.getValue())}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
  columnHelper.accessor(STATUS, {
    id: STATUS,
    header: () => <div>Status</div>,
    cell: (info) => <StatusCell status={info.getValue()} />,
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

interface ParseLogTableProps {
  data: IParseLog[];
}

export default function ParseLogTable({ data }: ParseLogTableProps) {
  return <Table<IParseLog> data={data} columns={getColumns()} />;
}
