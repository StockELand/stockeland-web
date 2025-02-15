import { Cell, Header } from "@tanstack/react-table";
import { CustomColumnMeta } from "./types";
import clsx from "clsx";

export function getPinnedClass<T>(
  column: Header<T, unknown> | Cell<T, unknown>
) {
  const meta = column.column.columnDef.meta as CustomColumnMeta | undefined;
  const pinAlign = meta?.pinAlign;
  if (!pinAlign) return {};

  const leftValue = column.column.getStart(pinAlign) ?? 0;
  const alignStartStyle = `${pinAlign}-[${leftValue}px]`;

  return clsx("sticky z-10", alignStartStyle);
}

export function getAlignClass<T>(
  column: Header<T, unknown> | Cell<T, unknown>
) {
  const meta = column.column.columnDef.meta as CustomColumnMeta | undefined;
  const align = meta?.align;

  return clsx({
    "mx-auto": align === "center",
    "ml-auto": align === "right",
    "mr-auto": align === "left",
  });
}
