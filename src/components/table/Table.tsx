import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Header,
  useReactTable,
} from "@tanstack/react-table";
import UpArrow from "@/../public/assets/up-arrow.svg";
import DownArrow from "@/../public/assets/down-arrow.svg";
import HorizontalRule from "@/../public/assets/horizontal-rule.svg";

export interface CustomColumnMeta {
  pinAlign?: "left" | "right";
  textAlign?: "left" | "right" | "center";
}

function getPinnedClass<T>(column: Header<T, unknown> | Cell<T, unknown>) {
  const meta = column.column.columnDef.meta as CustomColumnMeta | undefined;
  const pinAlign = meta?.pinAlign;

  if (pinAlign === "left") {
    return "sticky left-0 z-10 shadow-right bg-background group-hover:bg-selectedBg";
  }
  if (pinAlign === "right") {
    return "sticky right-0 z-10 shadow-left bg-background group-hover:bg-selectedBg";
  }
  return "";
}

function getTextAlign<T>(column: Header<T, unknown> | Cell<T, unknown>) {
  const meta = column.column.columnDef.meta as CustomColumnMeta | undefined;
  const textAlign = meta?.textAlign;
  const map = { left: "mr-auto", right: "ml-auto", center: "mx-auto" };
  return `${textAlign && map[textAlign]}`;
}

interface TableProps<T> {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  onSelect?: (row: T) => boolean;
  onDoubleClick?: (row: T) => void;
}

export default function Table<T>({ data, columns }: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="max-h-[720px] overflow-y-scroll">
      <table className="w-full">
        <thead className="sticky top-0 h-16 shadow-sm bg-background z-20">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="h-full" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className={`text-xs text-thTxt first:pl-8 last:pr-8 py-8  
                    ${getPinnedClass(header)}`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div
                      className={`flex flex-row w-fit items-center gap-1 text-right select-none ${getTextAlign(
                        header
                      )}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <div className="h-fit">
                        {{
                          asc: <UpArrow className="w-2 h-2 fill-signature2" />,
                          desc: (
                            <DownArrow className="w-2 h-2 fill-signature2" />
                          ),
                        }[header.column.getIsSorted() as string] ?? (
                          <HorizontalRule className="w-2 h-2 stroke-signature2" />
                        )}
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="h-16 group relative hover:bg-selectedBg"
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className={`font-bold first:rounded-l-lg first:pl-8 last:rounded-r-lg last:pr-8 
                      w-fit group-hover:bg-selectedBg ${getPinnedClass(cell)}`}
                  >
                    <div className={`w-fit ${getTextAlign(cell)}`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
