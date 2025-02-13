import { WEEK_DAYS } from "../constants";
import { CalendarGridProps } from "../types";
import { getMonthDays } from "../utils/dateUtils";

export default function CalendarGrid({
  currentMonth,
  onSelect,
  getDisplayTypeAndColor,
}: CalendarGridProps) {
  const days = getMonthDays(currentMonth);

  return (
    <>
      <div className="grid grid-cols-7 text-center text-xs h-8 items-center text-thTxt px-3">
        {WEEK_DAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 px-3 pb-3">
        {days.map((day, idx) => {
          const displayInfo = day && getDisplayTypeAndColor(day);
          const displayStyle = displayInfo
            ? { backgroundColor: displayInfo.color }
            : undefined;

          return (
            <button
              key={idx}
              className="font-bold text-lg size-11 p-1 group"
              onClick={() => day && onSelect(day)}
            >
              <div
                style={displayStyle}
                className={`flex rounded-xl size-full items-center justify-center group-hover:!bg-outline1 group-hover:!text-foreground ${
                  displayStyle && "text-background"
                }`}
              >
                <span className="size-fit">{day ? day.getDate() : ""}</span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
