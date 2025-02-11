import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getPinnedClass, getTextAlign } from "./utils";
import { DownArrow, HorizontalRule, UpArrow } from "./SortingIcons";

interface TableProps<T> {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  onSelect?: (row: T) => boolean;
  onDoubleClick?: (row: T) => void;
  sortable?: boolean;
}

export default function Table<T>({
  data,
  columns,
  sortable = true,
}: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(sortable && { getSortedRowModel: getSortedRowModel() }),
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
                      {sortable && (
                        <div className="h-fit">
                          {{
                            asc: <UpArrow />,
                            desc: <DownArrow />,
                          }[header.column.getIsSorted() as string] ?? (
                            <HorizontalRule />
                          )}
                        </div>
                      )}
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
