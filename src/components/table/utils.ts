import { Cell, Header } from "@tanstack/react-table";
import { CustomColumnMeta } from "./types";

export function getPinnedClass<T>(
  column: Header<T, unknown> | Cell<T, unknown>
) {
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

export function getTextAlign<T>(column: Header<T, unknown> | Cell<T, unknown>) {
  const meta = column.column.columnDef.meta as CustomColumnMeta | undefined;
  const textAlign = meta?.textAlign;
  const map = { left: "mr-auto", right: "ml-auto", center: "mx-auto" };
  return `${textAlign && map[textAlign]}`;
}
