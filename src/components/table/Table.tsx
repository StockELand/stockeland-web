import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
        <thead className="sticky top-0 h-16 shadow-sm bg-background">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="h-full" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="text-thTxt first:pl-8 last:pr-8 py-8"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="h-16  hover:bg-selectedBg">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="font-bold first:rounded-l-lg first:pl-8 last:rounded-r-lg last:pr-8 group-hover:bg-selectedBg"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
