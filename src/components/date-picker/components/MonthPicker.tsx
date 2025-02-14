import { LABELS } from "../constants";
import { PickerProps } from "../types";

const months = Array.from({ length: 12 }, (_, i) => i + 1);

export default function MonthPicker({ setCurrentMonth, setView }: PickerProps) {
  return (
    <div className="grid grid-cols-3 pb-3">
      {months.map((month) => (
        <button
          key={month}
          className="text-lg font-semibold h-14 p-1 group"
          onClick={() => {
            setView("date");
            setCurrentMonth(
              (prevMonth) => new Date(prevMonth.getFullYear(), month - 1)
            );
          }}
        >
          <div className="flex rounded-md size-full items-center justify-center group-hover:bg-outline1 group-hover:text-foreground">
            <span className="size-fit">
              {month}
              {LABELS.month}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
