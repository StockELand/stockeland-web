import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Header,
  useReactTable,
} from "@tanstack/react-table";

export interface CustomColumnMeta {
  isPinned?: "left" | "right";
}

function getPinnedClass<T>(column: Header<T, unknown> | Cell<T, unknown>) {
  const meta = column.column.columnDef.meta as CustomColumnMeta | undefined;
  const isPinned = meta?.isPinned;

  if (isPinned === "left") {
    return "sticky left-0 z-10 shadow-right bg-background group-hover:bg-selectedBg";
  }
  if (isPinned === "right") {
    return "sticky right-0 z-10 shadow-left bg-background group-hover:bg-selectedBg";
  }
  return "";
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
                    className={`text-thTxt first:pl-8 last:pr-8 py-8 
                    ${getPinnedClass(header)}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                      group-hover:bg-selectedBg ${getPinnedClass(cell)}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
