import { LABELS } from "../constants";
import { PickerProps } from "../types";
import { getYearRange } from "../utils/dateUtils";

export default function YearPicker({ setCurrentMonth, setView }: PickerProps) {
  const years = getYearRange();

  return (
    <div className="grid grid-cols-3 pb-3">
      {years.map((year) => (
        <button
          key={year}
          className="text-lg font-semibold h-14 p-1 group"
          onClick={() => {
            setView("month");
            setCurrentMonth(new Date(year, new Date().getMonth()));
          }}
        >
          <div className="flex rounded-md size-full items-center justify-center group-hover:bg-outline1 group-hover:text-foreground">
            <span className="size-fit">
              {year}
              {LABELS.year}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
