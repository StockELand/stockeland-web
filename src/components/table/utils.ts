import { Cell, Header } from "@tanstack/react-table";
import { CustomColumnMeta } from "./types";
import clsx from "clsx";

export function getPinnedClass<T>(
  column: Header<T, unknown> | Cell<T, unknown>
) {
  const meta = column.column.columnDef.meta as CustomColumnMeta | undefined;
  const pinAlign = meta?.pinAlign;
  if (!pinAlign) return { className: "", style: {} };

  const posValue = column.column.getStart(pinAlign) ?? 0;
  return {
    className: "sticky z-10",
    style: { [pinAlign]: `${posValue}px` },
  };
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
