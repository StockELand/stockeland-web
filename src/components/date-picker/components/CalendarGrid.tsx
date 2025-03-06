import { useCallback, useMemo } from "react";
import { WEEK_DAYS } from "../constants";
import { CalendarGridProps } from "../types";
import { getMonthDays, isSameDay } from "../utils/dateUtils";
import clsx from "clsx";

export default function CalendarGrid({
  selectedDate,
  currentMonth,
  onSelect,
  getDisplayTypeAndColor,
  isDateInRange,
  rangeDate,
}: CalendarGridProps) {
  const days = useMemo(() => getMonthDays(currentMonth), [currentMonth]);

  const handleSelect = useCallback(
    (day: Date) => {
      if (day) onSelect(day);
    },
    [onSelect]
  );

  return (
    <div className="flex flex-col px-3 pb-2">
      <div className="grid grid-cols-7 text-center text-xs h-8 items-center text-thTxt">
        {WEEK_DAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, idx) => {
          if (!day) return <div key={idx}></div>;

          const isSelected = selectedDate && isSameDay(day, selectedDate);

          const displayInfo = day && getDisplayTypeAndColor(day);
          const displayColor = displayInfo?.color
            ? `bg-${displayInfo.color}`
            : "";
          const shouldApplyDisplayStyle = !isSelected && displayInfo;

          const isRangeStart =
            rangeDate?.startDate && isSameDay(day, rangeDate.startDate);
          const isRangeEnd =
            rangeDate?.endDate && isSameDay(day, rangeDate.endDate);
          const inRange = isDateInRange?.(day);
          const isOnlyRangeStart = isRangeStart && !isRangeEnd;

          return (
            <button
              key={idx}
              className="font-bold text-lg h-11 p-1.5 group relative"
              onClick={() => day && handleSelect(day)}
            >
              {isOnlyRangeStart && (
                <div
                  className={
                    "absolute inset-0 rounded-xl !bg-signature2 transition-all "
                  }
                />
              )}
              {inRange && (
                <div
                  className={clsx(
                    "absolute inset-0 bg-signature2/70 transition-all ",
                    isRangeStart && "!rounded-l-xl !bg-signature2",
                    isRangeEnd && "rounded-r-xl !bg-signature2"
                  )}
                />
              )}

              <div
                className={clsx(
                  "relative flex rounded-xl size-full items-center justify-center transition-all ",
                  shouldApplyDisplayStyle && `${displayColor} text-background `,
                  isSelected && "bg-signature2 text-background ",
                  isSelected || shouldApplyDisplayStyle
                    ? "group-hover:opacity-70 "
                    : "group-hover:bg-outline1 group-hover:text-foreground ",
                  (inRange || isOnlyRangeStart) && "text-background "
                )}
              >
                {day.getDate()}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
