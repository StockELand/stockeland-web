import { useCallback, useMemo } from "react";
import { WEEK_DAYS } from "../constants";
import { CalendarGridProps } from "../types";
import { getMonthDays } from "../utils/dateUtils";
import clsx from "clsx";

export default function CalendarGrid({
  selectedDate,
  currentMonth,
  onSelect,
  getDisplayTypeAndColor,
}: CalendarGridProps) {
  const days = useMemo(() => getMonthDays(currentMonth), [currentMonth]);
  const handleSelect = useCallback(
    (day: Date) => {
      if (day) onSelect(day);
    },
    [onSelect]
  );

  return (
    <>
      <div className="grid grid-cols-7 text-center text-xs h-8 items-center text-thTxt px-3">
        {WEEK_DAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 px-3 pb-3">
        {days.map((day, idx) => {
          if (!day) return <div key={idx}></div>;
          const isSelected =
            day &&
            selectedDate &&
            day.toDateString() === selectedDate.toDateString();
          const displayInfo = day && getDisplayTypeAndColor(day);
          const shouldApplyDisplayStyle = !isSelected && displayInfo;

          return (
            <button
              key={idx}
              className="font-bold text-lg size-11 p-1 group"
              onClick={() => day && handleSelect(day)}
            >
              <div
                className={clsx(
                  "flex rounded-xl size-full items-center justify-center",
                  isSelected && "bg-signature2 text-background",
                  shouldApplyDisplayStyle && "text-background",
                  isSelected || shouldApplyDisplayStyle
                    ? "group-hover:opacity-70"
                    : "group-hover:bg-outline1 group-hover:text-foreground"
                )}
                style={
                  shouldApplyDisplayStyle
                    ? { backgroundColor: displayInfo.color }
                    : undefined
                }
              >
                <span className="size-fit">{day.getDate()}</span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
