import { Cell, Header } from "@tanstack/react-table";
import { CustomColumnMeta } from "./types";
import { CSSProperties } from "react";

export function getPinnedStyle<T>(
  column: Header<T, unknown> | Cell<T, unknown>
): CSSProperties {
  const meta = column.column.columnDef.meta as CustomColumnMeta | undefined;
  const pinAlign = meta?.pinAlign;
  if (!pinAlign) return {};

  const leftValue = column.column.getStart(pinAlign) ?? 0;

  return {
    position: "sticky",
    [pinAlign]: `${leftValue}px`,
    zIndex: 10,
  };
}

export function getAlignStyle<T>(
  column: Header<T, unknown> | Cell<T, unknown>
): CSSProperties {
  const meta = column.column.columnDef.meta as CustomColumnMeta | undefined;
  const align = meta?.align;
  if (!align) return {};
  return {
    margin: align === "center" ? "auto" : undefined,
    marginLeft: align === "right" ? "auto" : undefined,
    marginRight: align === "left" ? "auto" : undefined,
  };
}
