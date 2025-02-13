import { CalenderProps } from "./types";
import { getMonthDays } from "./utils";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from(
  { length: 12 },
  (_, i) => new Date().getFullYear() - 6 + i
);

export default function Calendar({
  currentMonth,
  onSelect,
  isHighlighted,
  setCurrentMonth,
  view,
  setView,
}: CalenderProps) {
  const days = getMonthDays(currentMonth);

  return (
    <div className="p-3 flex flex-col w-[356px]">
      <div className="flex flex-row w-fit mx-auto gap-1 font-bold text-lg z-10">
        <button
          className={`p-2 hover:bg-outline1 rounded-lg ${
            view === "year" && "text-signature"
          }`}
          onClick={() => setView("year")}
        >
          {currentMonth.getFullYear()}
        </button>
        <button
          className={`p-2 hover:bg-outline1 rounded-lg ${
            view === "month" && "text-signature"
          }`}
          onClick={() => setView("month")}
        >
          {currentMonth.getMonth() + 1}
        </button>
      </div>

      {view === "date" && (
        <>
          <div className="grid grid-cols-7 text-center text-xs h-8 items-center text-thTxt px-3">
            {weekDays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 px-3 pb-3">
            {days.map((day, idx) => (
              <button
                key={idx}
                className={`font-bold text-lg size-11 p-1 group`}
                onClick={() => day && onSelect(day)}
              >
                <div
                  className={`flex rounded-xl size-full items-center justify-center group-hover:bg-outline1 group-hover:text-foreground ${
                    day && isHighlighted(day) ? "bg-rise text-background" : ""
                  }`}
                >
                  <span className="size-fit">{day ? day.getDate() : ""}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
      {/* 월 선택 뷰 */}
      {view === "month" && (
        <div className="grid grid-cols-3 pb-3">
          {months.map((month) => (
            <button
              key={month}
              className={`text-lg font-semibold h-14 p-1 group`}
              onClick={() => {
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), month - 1)
                );
                setView("date");
              }}
            >
              <div
                className={`flex rounded-md size-full items-center justify-center group-hover:bg-outline1 group-hover:text-foreground `}
              >
                <span className="size-fit">{month}월</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 년도 선택 뷰 */}
      {view === "year" && (
        <div className="grid grid-cols-3 pb-3">
          {years.map((year) => (
            <button
              key={year}
              className={`text-lg font-semibold h-14 p-1 group`}
              onClick={() => {
                setCurrentMonth(new Date(year, currentMonth.getMonth()));
                setView("date");
              }}
            >
              <div
                className={`flex rounded-md size-full items-center justify-center group-hover:bg-outline1 group-hover:text-foreground `}
              >
                <span className="size-fit">{year}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
