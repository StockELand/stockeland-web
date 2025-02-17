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
const getColumns = () => [
  columnHelper.accessor("parsedAt", {
    id: "parsedAt",
    header: () => <div className="text-left">Parsed At</div>,
    cell: (info) => <div>{formatISOToFullDate(info.getValue())}</div>,
    meta: { align: "left" } as CustomColumnMeta,
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: () => <div>Status</div>,
    cell: (info) => <StatusCell status={info.getValue()} />,
    meta: { align: "center" } as CustomColumnMeta,
  }),
  columnHelper.accessor("modifiedCount", {
    id: "modifiedCount",
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
  columnHelper.accessor("executionTime", {
    id: "executionTime",
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
  columnHelper.accessor("message", {
    id: "message",
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
